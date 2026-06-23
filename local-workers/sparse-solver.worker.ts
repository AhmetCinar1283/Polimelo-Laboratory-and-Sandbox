// Tarayıcı ortamında Pyodide kütüphanesini dışarıdan (CDN) yükliyoruz

// @ts-ignore
importScripts("https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js");

let pyodide: any = null;

// Worker hazır olduğunda Next.js'ten mesaj beklemeye başlar
self.onmessage = async (event: MessageEvent) => {
  const { type, name } = event.data;

  if (type === "INIT_ENGINE") {
    try {
      // @ts-ignore (importScripts ile gelen loadPyodide global değişkenini tanımak için)
      pyodide = await loadPyodide();
      
      // Bizim public/python/main.py dosyamızı internet üzerinden tarayıcı belleğine indiriyoruz
      const response = await fetch("/python/main.py");
      const pythonCode = await response.text();
      
      // İndirilen Python kodunu Pyodide hafızasına yüklüyoruz
      await pyodide.runPythonAsync(pythonCode);

      self.postMessage({ type: "READY", message: "Python motoru başarıyla yüklendi!" });
    } catch (error: any) {
      self.postMessage({ type: "ERROR", message: `Yükleme hatası: ${error.message}` });
    }
  }

  if (type === "SAY_HELLO") {
    if (!pyodide) {
      self.postMessage({ type: "ERROR", message: "Motor henüz yüklenmedi!" });
      return;
    }

    try {
      // Python'daki 'say_hello' fonksiyonunu çağırıyoruz ve JavaScript değişkenini (name) gönderiyoruz
      const pythonResult = pyodide.globals.get("say_hello")(name);
      
      self.postMessage({ type: "HELLO_RESPONSE", data: pythonResult });
    } catch (error: any) {
      self.postMessage({ type: "ERROR", message: `Çalıştırma hatası: ${error.message}` });
    }
  }
};