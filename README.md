# 🔬 Polimelo Digital Laboratory & Portfolio Hub

Bu proje, Ankara Üniversitesi Bilgisayar Mühendisliği öğrencisi ve **Polimelo** dijital laboratuvarının kurucusu **Ahmet Çınar**'ın akademik notlarını, interaktif bilimsel hesaplama modüllerini ve tarayıcı içi WebAssembly deneysel çalışmalarını barındıran modern, yüksek performanslı bir web uygulamasıdır.

Proje; Next.js 16 (App Router), React 19, TypeScript ve Tailwind CSS v4 gibi en güncel teknolojilerle geliştirilmiş olup, tarayıcı tarafında asenkron hesaplamaları ve dinamik görselleştirmeleri odak noktasına almaktadır.

---

## 🚀 Öne Çıkan Özellikler

### 1. 📚 Akademik Çalışma Özetleri (Academic Outline)
Karmaşık matematiksel ve yapay zeka konularının teorik türetimlerini ve kodlama temellerini içeren, MDX tabanlı ders notları:
* **Matematik & Lineer Cebir**: Seyrek Matrisler (Sparse Matrices) ve CSR (Compressed Sparse Row) veri gösterim modelleri, bellek verimliliği hesaplamaları.
* **Yapay Zeka & Derin Öğrenme**: Yapay sinir ağları için zincir kuralı (chain rule) ile backpropagation (geri yayılım) algoritmasının birinci prensiplerden matematiksel olarak türetilmesi.
* **Gelişmiş Formül Gösterimi**: Matematiksel formüllerin ve sembollerin tarayıcıda kusursuz gösterilmesi için **KaTeX** (`remark-math` & `rehype-katex`) entegrasyonu.

### 2. 🔬 İnteraktif Laboratuvar Modülleri (Lab Sandbox)
Kullanıcının etkileşime girebileceği, hesaplamaların tamamen istemci (client-side) tarafında yapıldığı deneysel modüller:
* **WebAssembly Python Çalışma Zamanı (Say Hello)**: 
  * [Pyodide](https://pyodide.org/) altyapısı kullanılarak tarayıcı içerisinde WebAssembly üzerinde çalışan izole bir Python 3.11 motoru oluşturulmuştur.
  * Ana arayüzü kilitlememesi için tüm Python motoru arka planda bir **Web Worker** (`local-workers/sparse-solver.worker.ts`) içinde koşturulur.
  * JavaScript/TypeScript UI katmanı ile Python worker'ı asenkron mesajlaşarak veri alışverişi yapar.
* **Matrix Multiplier & Vektör Uzayı Görselleştirici**:
  * İki matrisin ($A \times B = C$) çarpımını adım adım ve görsel olarak takip etmeyi sağlayan interaktif araç.
  * Her bir hücrenin dot product (noktasal çarpım) hesabının mekanik mantığını animasyonlarla görselleştirir.
* **Görsel Doğrusal Regresyon & Gradyan Fit Etme (Linear Regression)**:
  * HTML5 Canvas tabanlı interaktif regresyon simülatörü.
  * Kullanıcı koordinat düzlemine tıklayarak veri noktaları ekler.
  * Sistem, En Küçük Kareler (Least Squares) yöntemini kullanarak $y = mx + b$ formundaki en iyi uyum doğrusunu anlık fit eder.
  * Regresyon doğrusuyla birlikte eğim ($m$), kesişim noktası ($b$) ve açıklayıcılık oranı ($R^2$ - R-squared) parametrelerini gerçek zamanlı günceller.

### 3. 🌓 Akıllı Tema Yönetimi (Theme Engine)
* Sistem tercihlerini (`prefers-color-scheme`) veya kullanıcının manuel seçimini algılayıp tarayıcı hafızasında saklayan React Context tabanlı tema motoru (`ThemeProvider`).
* Karanlık ve aydınlık modlar arasında yumuşak geçişler ve Tailwind CSS v4 CSS değişkenleri ile tam uyum.
* Tema değişimlerinde HTML5 Canvas bileşenlerini haberdar ederek çizim renklerini dinamik güncelleyen özel event tetikleyicisi (`themechange`).

### 4. 📈 SEO ve Keşfedilebilirlik (Metadata & SEO)
* Google, Bing ve diğer arama motorlarında maksimum görünürlük için SEO optimizasyonları.
* Dinamik `sitemap.ts` ve `robots.ts` dosyaları.
* Sayfa bazlı özel meta açıklamaları, başlıkları ve semantik HTML yapısı.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

* **Çatı**: [Next.js 16.2 (App Router)](https://nextjs.org/) & [React 19.2](https://react.dev/)
* **Dil**: [TypeScript 5](https://www.typescriptlang.org/)
* **Stil**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Matematik Dizgi & Kod Renklendirme**:
  * `@next/mdx` & `@mdx-js/react` (MDX Desteği)
  * `remark-math` & `rehype-katex` (LaTeX Desteği)
  * `rehype-highlight` (Kod Blokları Renklendirme)
  * `katex` (Matematiksel render motoru)
* **İstemci Tarafı Python**:
  * [Pyodide v0.26.1 (WASM)](https://pyodide.org/)
  * Web Workers API

---

## 📁 Proje Klasör Yapısı

```text
laboratory/
├── app/                      # Next.js App Router (Rotalar ve Sayfalar)
│   ├── about/                # Kişisel Özgeçmiş / Synopsis
│   ├── contact/              # İletişim Formu (ContactForm)
│   ├── courses/              # Akademik Kurs Notları ve Rotaları
│   ├── lab/                  # Laboratuvar Rotaları ve Sayfaları
│   ├── globals.css           # Global CSS & Tailwind v4 Değişkenleri
│   ├── layout.tsx            # Global Layout ve ThemeProvider Sarmalayıcısı
│   ├── robots.ts             # Arama motoru robot yapılandırması
│   └── sitemap.ts            # Dinamik Sitemap oluşturucu
├── components/               # Tekrar Kullanılabilir Arayüz Bileşenleri
│   ├── lab/                  # Laboratuvar modül bileşenleri (LinearRegression, MatrixMultiplier...)
│   ├── ContactForm.tsx       # E-posta iletişim formu bileşeni
│   ├── ThemeProvider.tsx     # Karanlık/Aydınlık mod React Context
│   └── ThemeToggle.tsx       # Arayüz tema geçiş butonu
├── content/                  # MDX tabanlı statik veya dinamik içerikler
├── local-workers/            # Arka plan Web Worker dosyaları (Pyodide worker)
├── public/
│   └── python/               # İstemcide çalışacak Python betikleri (main.py)
├── registry/                 # Kurs ve Lab içerik kayıt listeleri (courses.ts, labs.ts)
├── next.config.ts            # Next.js MDX ve derleme ayarları
└── tsconfig.json             # TypeScript yapılandırması
```

---

## 💻 Kurulum ve Çalıştırma

### Gereksinimler
* [Node.js](https://nodejs.org/) (v18 veya üzeri önerilir)
* npm, yarn veya pnpm paket yöneticisi

### 1. Bağımlılıkları Yükleyin
Proje dizininde terminali açın ve bağımlılıkları indirin:
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

### 2. Geliştirme Sunucusunu Başlatın
Lokal geliştirme sunucusunu çalıştırmak için:
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

### 3. Üretim Yapısını Oluşturun ve Çalıştırın
Uygulamayı canlıya almadan önce optimize edilmiş sürümü derlemek için:
```bash
npm run build
npm run start
```

---

## 📝 Katkıda Bulunma ve Lisans

Bu proje Ahmet Çınar'ın kişisel araştırma ve geliştirme laboratuvarıdır. Sorularınız veya iş birliği önerileriniz için aşağıdaki kanallardan ulaşabilirsiniz:

* **Web Sitesi**: [polimelo.com](https://polimelo.com)
* **LinkedIn**: [linkedin.com/in/ahmet-cinar-a1283c/](https://www.linkedin.com/in/ahmet-cinar-a1283c/)
* **E-posta**: [hello@polimelo.com](mailto:hello@polimelo.com)
* **GitHub**: [@AhmetCinar1283](https://github.com/AhmetCinar1283)
