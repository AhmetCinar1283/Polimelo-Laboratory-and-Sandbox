import React from "react";
import type { Metadata } from "next";
import GlobalPortfolioHub from "@/components/GlobalPortfolioHub";

export const metadata: Metadata = {
  title: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
  description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ahmet Çınar",
    "Ahmet Cinar",
    "Computer Engineer",
    "Full-Stack Developer",
    "Ankara University",
    "Polimelo",
    "React Native",
    "Next.js",
    "WebAssembly",
    "Cloudflare Workers",
    "Digital Laboratory",
    "Sandbox"
  ],
  openGraph: {
    title: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
    description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures.",
    url: "https://polimelo.com",
    type: "website",
    images: [
      {
        url: "/polimelo-lab-logo.png",
        width: 1200,
        height: 630,
        alt: "Polimelo Laboratory and Sandbox",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmet Çınar | Computer Engineer & Full-Stack Developer",
    description: "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems.",
    images: ["/polimelo-lab-logo.png"],
  },
};

export default function HomePage() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ahmet Çınar - Digital Lab",
    "url": "https://polimelo.com",
    "description": "Computer Engineering student at Ankara University and full-stack developer. Operating Polimelo, engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures.",
    "publisher": {
      "@type": "Person",
      "name": "Ahmet Çınar",
      "sameAs": [
        "https://github.com/AhmetCinar1283",
        "https://www.linkedin.com/in/ahmet-cinar-a1283c/"
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <GlobalPortfolioHub />
    </>
  );
}