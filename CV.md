# 6/24/2026

# Polimelo Laboratory & Polyvo-Worker CV Rehberi

Bu doküman, **Polimelo Digital Laboratory** (bu proje) ve **polyvo-worker** projelerinden elde ettiğiniz deneyimleri, CV'nizi parlatacak kurşun noktaları ve öne çıkan yazılım tekniklerini kısa ve öz şekilde sunmaktadır.

---

## 1. Polimelo Digital Laboratory (Bu Proje)

### Proje Özeti
* **Türkçe:** Matematiksel modelleri, lineer cebir görselleştirmelerini ve tarayıcı içi WebAssembly (WASM) tabanlı Python çalışma zamanını barındıran, yüksek performanslı ve interaktif bir dijital laboratuvar platformu.
* **English:** A high-performance, interactive digital laboratory platform featuring mathematical models, linear algebra visualizations, and in-browser WebAssembly (WASM)-based Python runtime.

### Kullanılan Teknolojiler
Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Pyodide (WASM Python), Web Workers API, HTML5 Canvas, KaTeX (remark-math/rehype-katex), Cloudflare Pages.

### CV İçin Kurşun Noktalar (Resume Bullet Points)
* **WebAssembly & Multithreading:** Tarayıcı ana iş parçacığını (main thread) kilitlemeden Python kodlarını çalıştırmak için **Pyodide (WASM)** motorunu arka planda **Web Worker** üzerinde koşturarak asenkron mesajlaşma altyapısı kuruldu.
* **İnteraktif Matematik Simülasyonları:** HTML5 Canvas kullanarak En Küçük Kareler (Least Squares) yöntemiyle çalışan gerçek zamanlı doğrusal regresyon ve gradyan fit etme simülatörü geliştirildi.
* **Performans & Derleme Optimizasyonu:** Next.js projesinin Cloudflare Pages dağıtımındaki prerender ve Edge Runtime (nodejs_compat) uyumluluk sorunları çözülerek hatasız ve hızlı derleme sağlandı.
* **Dinamik Tema & Çizim Senkronizasyonu:** React Context tabanlı tema motoru ile Canvas çizimlerinin renklerini gerçek zamanlı güncelleyen özel event tetikleyicileri (`themechange`) entegre edildi.

---

## 2. Polyvo-Worker (Serverless Edge Backend)

### Proje Özeti
* **Türkçe:** Polyvo dil öğrenme uygulaması için tasarlanmış; yapay zeka destekli akıllı çeviri, grafik veri yapısı (kelime ilişkileri) ve aralıklı tekrar (SM-2) veri akışını yöneten, düşük gecikmeli sunucusuz (serverless) edge backend projesi.
* **English:** A low-latency serverless edge backend for the Polyvo language app, managing AI-powered translations, graph data structures (word relationships), and spaced repetition (SM-2) data flow.

### Kullanılan Teknolojiler
Cloudflare Workers, `itty-router`, Cloudflare Workers AI (Llama 3.1-8B-Instruct), Cloudflare KV, Cloudflare D1 (SQLite), Firebase Auth JWT, Python (NLTK WordNet Import).

### CV İçin Kurşun Noktalar (Resume Bullet Points)
* **Edge AI ve Akıllı Ön Bellek (Smart Caching):** Cloudflare Workers AI (Llama 3.1) ile bağlamsal çeviriler üretildi; mükerrer yapay zeka maliyetlerini önlemek için **Cloudflare KV** üzerinde kaynak etiketli (source-tagged) çeviri önbellek katmanı tasarlandı.
* **İlişkisel & Graf Veri Yapısı (Graph Database):** Kelime eş anlamlı, zıt anlamlı ve morfolojik ilişkilerini **Cloudflare D1 (Edge SQL)** üzerinde tutan iki yönlü bir kelime grafı (word graph) yapısı modellendi.
* **Uçtan Uca Güvenlik & Rate-Limiting:** Firebase JWT doğrulama, Cloudflare Turnstile bot koruması ve **Cloudflare KV** tabanlı kullanıcı bazlı istek limitleme (rate-limiting & monthly quota) middleware'leri (ara katmanları) geliştirildi.
* **Veri Göçü (Data Migration):** NLTK WordNet veritabanını parse edip D1 SQL formatına dönüştüren ve yığınlar halinde (batch) import eden Python otomasyon script'leri yazıldı.

---

## 3. CV'yi Parlatacak Yazılım Teknikleri

1. **Client-Side Heavy Compute:** Tarayıcıda WASM (Pyodide) ve Web Workers ile ağır hesaplama yüklerini ana thread'den ayırma vizyonu.
2. **Edge Computing & Serverless:** Geleneksel sunucular yerine Cloudflare Workers ve Edge DB (D1, KV) kullanarak sıfır soğuk başlama (zero cold start) ve düşük maliyetli küresel ölçekleme mimarisi.
3. **Graf Modelleme & Algoritmalar:** Kelime ilişkilerini grafik veri yapısı olarak saklama ve Spaced Repetition (SuperMemo SM-2) algoritması ile veri işleme.
4. **Resilient API Design:** Arka plandaki D1 veri yazma işlemlerini asenkron ve "fire-and-forget" tasarlayarak istemciye sıfır gecikme yansıtma ve hata toleransı sağlama.
