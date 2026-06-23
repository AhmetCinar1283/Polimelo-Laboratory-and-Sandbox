import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Ahmet Çınar | Academic & Professional Bio",
  description: "Learn more about Ahmet Çınar, Computer Engineering student at Ankara University, specializing in reactive full-stack development, serverless systems, and WebAssembly.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-10 bg-background text-foreground min-h-screen leading-relaxed">
      <div className="max-w-[850px] mx-auto animate-fade-in">
        <nav>
          <Link 
            href="/" 
            className="transition-all duration-200 inline-flex items-center gap-1.5 text-neutral-500 font-bold hover:text-neutral-800 hover:-translate-x-1 mb-10 text-sm font-mono"
          >
            ← RETURN_TO_DASHBOARD()
          </Link>
        </nav>

        <header className="mb-12 border-b-2 border-neutral-800 pb-6">
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1 font-mono font-bold">
            Biographical Dossier / Profile
          </div>
          <h1 className="text-4xl m-0 font-bold tracking-tight text-neutral-800 font-serif">
            ABOUT_AHMET_ÇINAR
          </h1>
        </header>

        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono font-bold">
            [01] BIOGRAPHY
          </h2>
          <p className="text-base text-neutral-800 font-sans text-justify mb-4">
            I am a Computer Engineering student at <strong className="font-semibold text-neutral-800">Ankara University</strong> and an independent developer. Under my digital workspace brand, <strong className="font-semibold text-neutral-800">Polimelo</strong>, I design and build highly optimized, reactive web applications and mobile ecosystems. My technical work spans custom state management systems in React, low-latency computing models using Web Workers and WebAssembly, and backend microservices deployed on serverless infrastructures like Cloudflare and Firebase.
          </p>
          <p className="text-base text-neutral-800 font-sans text-justify">
            My goal is to bridge mathematical rigor with modern software architectures. Whether deriving equations for machine learning backpropagation or constructing dense memory representations for sparse matrices, I prioritize clean documentation, execution transparency, and elegant UX design.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono font-bold">
            [02] KEY PROJECTS & INITIATIVES
          </h2>
          
          <div className="bg-neutral-50 p-6 border-l-4 border-neutral-800 mb-6">
            <h3 className="m-0 mb-2 font-serif text-xl font-bold text-neutral-800">
              Polimelo (Core Ecosystem)
            </h3>
            <p className="text-sm text-neutral-800">
              A digital outpost serving as a hub for performant mobile apps, lightweight web modules, and serverless compute pipelines. Available at <a href="https://polimelo.com" target="_blank" rel="noopener noreferrer" className="text-neutral-800 font-bold underline hover:text-neutral-500 transition-colors">polimelo.com ↗</a>.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 border-l-4 border-neutral-800 mb-6">
            <h3 className="m-0 mb-2 font-serif text-xl font-bold text-neutral-800">
              Digital Laboratory Sandbox
            </h3>
            <p className="text-sm text-neutral-800">
              An interactive web environment dedicated to testing client-side capabilities. Includes Matrix Multiplication visualizers and in-browser Linear Regression gradient fitting utilizing WebAssembly and HTML5 Canvas.
            </p>
          </div>

          <div className="bg-neutral-50 p-6 border-l-4 border-neutral-800">
            <h3 className="m-0 mb-2 font-serif text-xl font-bold text-neutral-800">
              Academic Study Outlines
            </h3>
            <p className="text-sm text-neutral-800">
              Rigorous, typeset study documents spanning key computer engineering disciplines like Linear Algebra, Sparse Matrix representations, and Neural Network mathematics from first principles.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono font-bold">
            [03] RESEARCH FIELDS
          </h2>
          <table className="w-full border-collapse text-sm">
            <tbody>
              <tr className="border-b border-dashed border-neutral-300">
                <td className="py-3.5 pr-4 font-bold w-1/3 text-neutral-800 font-mono">01. Reactive Systems</td>
                <td className="py-3.5 text-neutral-800">React, React Native, Declarative UI design, and Client-Side state structures.</td>
              </tr>
              <tr className="border-b border-dashed border-neutral-300">
                <td className="py-3.5 pr-4 font-bold text-neutral-800 font-mono">02. Cloud Architecture</td>
                <td className="py-3.5 text-neutral-800">Serverless architectures, edge workers, and distributed database models (Firestore, D1).</td>
              </tr>
              <tr className="border-b border-dashed border-neutral-300">
                <td className="py-3.5 pr-4 font-bold text-neutral-800 font-mono">03. Mathematical Compute</td>
                <td className="py-3.5 text-neutral-800">Matrix algorithms, linear optimization, and low-level WebAssembly integrations.</td>
              </tr>
            </tbody>
          </table>
        </section>

        <footer className="mt-20 border-t border-neutral-800 pt-5 text-center text-xs text-neutral-500 font-mono">
          Polimelo Indexing Protocol • Last Verified: June 2026 • Ankara, Turkey
        </footer>
      </div>
    </div>
  );
}
