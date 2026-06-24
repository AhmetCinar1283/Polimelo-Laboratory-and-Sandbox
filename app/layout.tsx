import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Ahmet Çınar - Digital Lab",
    default: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
  },
  description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures.",
  keywords: ["Ahmet Çınar", "Ahmet Cinar", "Computer Engineer", "Full-Stack Developer", "Ankara University", "Polimelo", "React Native", "Next.js", "WebAssembly", "Cloudflare Workers", "Digital Laboratory"],
  authors: [{ name: "Ahmet Çınar", url: "https://polimelo.com" }],
  creator: "Ahmet Çınar",
  publisher: "Ahmet Çınar",
  metadataBase: new URL("https://polimelo.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://polimelo.com",
    siteName: "Ahmet Çınar - Digital Lab",
    title: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
    description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
    description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      
      <head>
        <link rel="icon" href="/logo-round.png" type="image/png" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.setAttribute('data-theme', 'dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.setAttribute('data-theme', 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ahmet Çınar",
              "url": "https://polimelo.com",
              "alumniOf": {
                "@type": "CollegeOrUniversity",
                "name": "Ankara University",
                "sameAs": "https://en.wikipedia.org/wiki/Ankara_University"
              },
              "jobTitle": "Full-Stack Developer & Computer Engineering Student",
              "sameAs": [
                "https://github.com/AhmetCinar1283",
                "https://www.linkedin.com/in/ahmet-cinar-a1283c/"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}


