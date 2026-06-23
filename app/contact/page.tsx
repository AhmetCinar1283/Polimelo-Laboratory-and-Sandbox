import React from "react";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Ahmet Çınar | Communication Protocols",
  description: "Get in touch with Ahmet Çınar. Send transmission payloads directly or connect via GitHub, LinkedIn, or secure email hello@polimelo.com.",
};

export default function ContactPage() {
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
            External Communication Nodes
          </div>
          <h1 className="text-4xl m-0 font-bold tracking-tight text-neutral-800 font-serif">
            CONTACT_CHANNELS
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_280px] gap-12">
          
          {/* Left Column: Form */}
          <section className="min-w-0">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-6 font-mono font-bold">
              [01] TRANSMISSION GATEWAY
            </h2>
            <ContactForm />
          </section>

          {/* Right Column: Information */}
          <aside className="flex flex-col gap-8">
            <section>
              <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono font-bold">
                [02] NETWORKS
              </h2>
              <ul className="list-none p-0 m-0 text-sm flex flex-col gap-3 font-mono">
                <li>
                  <span className="text-neutral-500 block mb-0.5">GitHub:</span>
                  <a 
                    href="https://github.com/AhmetCinar1283" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline text-neutral-800 hover:text-neutral-500 transition-colors"
                  >
                    github.com/AhmetCinar1283
                  </a>
                </li>
                <li>
                  <span className="text-neutral-500 block mb-0.5">LinkedIn:</span>
                  <a 
                    href="https://www.linkedin.com/in/ahmet-cinar-a1283c/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline text-neutral-800 hover:text-neutral-500 transition-colors"
                  >
                    linkedin.com/in/ahmet-cinar-a1283c/
                  </a>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-4 font-mono font-bold">
                [03] SECURE MAIL
              </h2>
              <p className="text-sm font-mono">
                <a 
                  href="mailto:hello@polimelo.com" 
                  className="underline text-neutral-800 hover:text-neutral-500 transition-colors font-bold"
                >
                  hello@polimelo.com
                </a>
              </p>
              <p className="text-xs text-neutral-500 mt-2 font-mono">
                Expect typical response processing cycles within 24-48 computation hours.
              </p>
            </section>
          </aside>

        </div>

        <footer className="mt-20 border-t border-neutral-800 pt-5 text-center text-xs text-neutral-500 font-mono">
          Polimelo Indexing Protocol • Last Verified: June 2026 • Ankara, Turkey
        </footer>
      </div>
    </div>
  );
}
