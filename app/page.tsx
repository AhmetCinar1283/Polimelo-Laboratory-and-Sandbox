"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";

export default function GlobalPortfolioHub() {
  return (
    <div style={{
      padding: "80px 40px 100px 40px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "var(--background)", 
      color: "var(--foreground)",
      minHeight: "100vh",
      lineHeight: "1.6"
    }}>
      {/* Precision Academic Animations & Hover Mechanics */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .section-block {
          margin-bottom: 50px;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .link-item {
          color: var(--foreground);
          text-decoration: underline;
          text-underline-offset: 4px;
          transition: all 0.2s ease;
        }
        .link-item:hover {
          color: var(--text-muted);
          background-color: var(--card-bg-hover);
        }
        .lab-portal-btn {
          background-color: var(--primary);
          color: var(--primary-contrast);
          border: 1px solid var(--border-color);
          padding: 12px 24px;
          font-family: "'Courier New', monospace";
          font-weight: bold;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: auto;
          display: inline-block;
          margin-top: 15px;
          box-shadow: 2px 2px 0px var(--border-color);
        }
        .lab-portal-btn:hover {
          background-color: var(--primary-contrast) !important;
          color: var(--primary) !important;
          letter-spacing: 1px;
          box-shadow: none;
          transform: translate(2px, 2px);
        }
      `}</style>

      <div style={{ maxWidth: "850px", margin: "0 auto" }} className="animate-fade-in">
        
        {/* Dossier Meta Header */}
        <header style={{ 
          marginBottom: "60px", 
          borderBottom: "2px solid var(--border-color)", 
          paddingBottom: "25px",
          position: "relative"
        }}>
          <div style={{ display: "flex", justifyContent: "between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: "5px", flex: 1, fontWeight: "bold" }}>
              Computer Engineering / Full-Stack & Architecture / AI & Database
            </div>
            {/* Polimelo Yönlendirmesi */}
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem" }}>
              <a href="https://polimelo.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--foreground)", textDecoration: "none", borderBottom: "1px solid var(--border-color)", paddingBottom: "2px" }}>
                // LAB_CORE: POLIMELO.COM ↗
              </a>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "15px", marginBottom: "5px" }}>
            <SafeImage 
              src="/logo-square.png" 
              alt="Polimelo Logo" 
              style={{ 
                width: "56px", 
                height: "56px", 
                borderRadius: "12px", 
                border: "2px solid var(--border-color)",
                backgroundColor: "var(--card-bg)",
                objectFit: "cover"
              }}
            />
            <h1 style={{ 
              fontSize: "2.8rem", 
              margin: 0, 
              fontWeight: "700", 
              letterSpacing: "-0.03em", 
              color: "var(--title-color)",
              fontFamily: "Georgia, serif" 
            }}>
              AHMET ÇINAR
            </h1>
          </div>
          <div style={{ 
            marginTop: "12px", 
            fontSize: "1.1rem", 
            color: "var(--foreground)", 
            fontFamily: "Georgia, serif", 
            fontStyle: "italic"
          }}>
            "Engineering decoupled full-stack ecosystems, reactive mobile interfaces, and intelligent serverless architectures."
          </div>

          {/* Navigation Bar */}
          <nav style={{ 
            marginTop: "25px", 
            display: "flex", 
            gap: "12px", 
            fontSize: "0.8rem", 
            fontFamily: "'Courier New', monospace", 
            fontWeight: "bold",
            flexWrap: "wrap"
          }}>
            <Link href="/about" style={{ color: "var(--foreground)", textDecoration: "none", border: "1px solid var(--border-color)", padding: "5px 10px", backgroundColor: "var(--card-bg)" }} className="ref-link-hover">
              // PROFILE
            </Link>
            <Link href="/contact" style={{ color: "var(--foreground)", textDecoration: "none", border: "1px solid var(--border-color)", padding: "5px 10px", backgroundColor: "var(--card-bg)" }} className="ref-link-hover">
              // COMM_NODE
            </Link>
            <Link href="/courses" style={{ color: "var(--foreground)", textDecoration: "none", border: "1px solid var(--border-color)", padding: "5px 10px", backgroundColor: "var(--card-bg)" }} className="ref-link-hover">
              // ACADEMIC_OUTLINE
            </Link>
            <Link href="/lab" style={{ color: "var(--foreground)", textDecoration: "none", border: "1px solid var(--border-color)", padding: "5px 10px", backgroundColor: "var(--card-bg)" }} className="ref-link-hover">
              // LAB_SANDBOX
            </Link>
          </nav>
        </header>

        {/* Section I: Professional Synopsis (Abstract) */}
        <section className="section-block" style={{ animationDelay: "0.1s" }}>
          <h2 style={{ fontSize: "0.85rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", margin: "0 0 15px 0", fontWeight: "bold" }}>
            [01] SYNOPSIS
          </h2>
          <p style={{ textAlign: "justify", fontSize: "1rem", lineHeight: "1.7", color: "var(--foreground)" }}>
            I am a Computer Engineering student at Ankara University and an independent full-stack developer operating under my digital lab and portfolio ecosystem, <a href="https://polimelo.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--title-color)", fontWeight: "600", textDecoration: "underline", textUnderlineOffset: "3px" }}>Polimelo</a>. My work bridges reactive, user-centric client interfaces with highly scalable, serverless backend infrastructures. Specializing in the Next.js and React Native ecosystems, I engineer optimized computing pipelines leveraging Cloudflare architectures, Firebase integrations, and intelligent AI runtime APIs. Combining bilingual academic training with a heavy focus on data systems, I design decoupled, performant, and memory-conscious modern software solutions.
          </p>
        </section>

        {/* Section II: Primary Core Competencies */}
        <section className="section-block" style={{ animationDelay: "0.2s" }}>
          <h2 style={{ fontSize: "0.85rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", margin: "0 0 15px 0", fontWeight: "bold" }}>
            [02] TECHNICAL METRICS
          </h2>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse", 
            fontSize: "0.95rem"
          }}>
            <tbody>
              {/* Frameworks & Libraries */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", width: "30%", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>Frameworks</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>Next.js, React, React-Native (Expo), FastAPI, Node.js</td>
              </tr>
              
              {/* Languages */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>Languages</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>TypeScript, JavaScript, Python, SQL</td>
              </tr>

              {/* Cloud & BaaS */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>Cloud & Backend</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>Cloudflare (Workers, D1...), Firebase (Firestore, Storage, Functions, Analytics...)</td>
              </tr>

              {/* Architecture & Compute */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>Architecture</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>WebAssembly (WASM), Web Workers, Client-Side Compute, RESTful APIs, AI APIs Integrations</td>
              </tr>

              {/* Data & Infrastructure */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>Data Systems</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>SQL, NoSQL, Sparse Formats (CSR), Computational Geometry, Database Normalization</td>
              </tr>

              {/* AI & Mathematics */}
              <tr style={{ borderBottom: "1px dashed var(--dashed-border-color)" }}>
                <td style={{ padding: "12px 0", fontWeight: "bold", color: "var(--title-color)", fontFamily: "'Courier New', monospace" }}>AI & Math (Learning)</td>
                <td style={{ padding: "12px 0", color: "var(--foreground)" }}>Machine Learning Concepts, Linear Algebra / Core Math</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Section III: Split Portal Gateways */}
        <section className="section-block" style={{ 
          animationDelay: "0.3s",
          marginTop: "40px"
        }}>
          <h2 style={{ fontSize: "0.85rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", margin: "0 0 20px 0", fontWeight: "bold" }}>
            [03] PORTAL GATEWAYS
          </h2>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            width: "100%"
          }}>
            {/* Laboratory Portal */}
            <div style={{ 
              backgroundColor: "var(--card-bg)",
              padding: "30px",
              borderLeft: "4px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "220px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
            }}>
              <div>
                <h3 style={{ fontSize: "0.75rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "2px", color: "var(--accent-red)", margin: "0 0 10px 0", fontWeight: "bold" }}>
                  ⚠️ COMPUTATIONAL OUTPOST
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 10px 0" }}>
                  <SafeImage 
                    src="/logo-square.png" 
                    alt="Lab Icon" 
                    style={{ width: "24px", height: "24px", borderRadius: "6px", border: "1px solid var(--border-color)", objectFit: "cover" }}
                  />
                  <h4 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: "bold", color: "var(--title-color)" }}>
                    Digital Laboratory Sandbox
                  </h4>
                </div>
                <p style={{ margin: "0 0 20px 0", fontSize: "0.95rem", color: "var(--foreground)", textAlign: "justify", lineHeight: "1.5" }}>
                  Decoupled browser modules, runtime WebAssembly experiments, live linear regression models, and matrix visualizers operating within browser scopes.
                </p>
              </div>
              <Link href="/lab">
                <button className="lab-portal-btn">
                  LAUNCH_LABORATORY_REGISTRY() ↗
                </button>
              </Link>
            </div>

            {/* Courses Portal */}
            <div style={{ 
              backgroundColor: "var(--card-bg)",
              padding: "30px",
              borderLeft: "4px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: "220px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)"
            }}>
              <div>
                <h3 style={{ fontSize: "0.75rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "2px", color: "var(--accent-green)", margin: "0 0 10px 0", fontWeight: "bold" }}>
                  📚 ACADEMIC OUTLINE
                </h3>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "0 0 10px 0" }}>
                  <SafeImage 
                    src="/logo-square.png" 
                    alt="Course Icon" 
                    style={{ width: "24px", height: "24px", borderRadius: "6px", border: "1px solid var(--border-color)", objectFit: "cover" }}
                  />
                  <h4 style={{ margin: 0, fontFamily: "Georgia, serif", fontSize: "1.3rem", fontWeight: "bold", color: "var(--title-color)" }}>
                    Structured Study Summaries
                  </h4>
                </div>
                <p style={{ margin: "0 0 20px 0", fontSize: "0.95rem", color: "var(--foreground)", textAlign: "justify", lineHeight: "1.5" }}>
                  Chronological study notes, mathematical derivations, backpropagation calculators, and algorithmic formulations typeset in LaTeX.
                </p>
              </div>
              <Link href="/courses">
                <button className="lab-portal-btn">
                  LAUNCH_ACADEMIC_OUTLINE() ↗
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Section IV: External Communication Nodes */}
        <section className="section-block" style={{ animationDelay: "0.4s", marginTop: "40px" }}>
          <h2 style={{ fontSize: "0.85rem", fontFamily: "'Courier New', monospace", textTransform: "uppercase", letterSpacing: "1.5px", color: "var(--text-muted)", margin: "0 0 15px 0", fontWeight: "bold" }}>
            [04] CHANNELS
          </h2>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0, fontSize: "1rem" }}>
            <li style={{ marginBottom: "12px" }}>
              <span style={{ color: "var(--text-muted)", fontFamily: "'Courier New', monospace", fontSize: "0.9rem" }}>GitHub: </span>
              <a href="https://github.com/AhmetCinar1283" target="_blank" rel="noopener noreferrer" className="link-item" style={{ fontFamily: "'Courier New', monospace", fontSize: "0.95rem" }}>github.com/AhmetCinar1283</a>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <span style={{ color: "var(--text-muted)", fontFamily: "'Courier New', monospace", fontSize: "0.9rem" }}>LinkedIn: </span>
              <a href="https://www.linkedin.com/in/ahmet-cinar-a1283c/" target="_blank" rel="noopener noreferrer" className="link-item" style={{ fontFamily: "'Courier New', monospace", fontSize: "0.95rem" }}>linkedin.com/in/ahmet-cinar-a1283c/</a>
            </li>
            <li style={{ marginBottom: "12px" }}>
              <span style={{ color: "var(--text-muted)", fontFamily: "'Courier New', monospace", fontSize: "0.9rem" }}>Secure Mail: </span>
              <a href="mailto:hello@polimelo.com" className="link-item" style={{ fontFamily: "'Courier New', monospace", fontSize: "0.95rem" }}>hello@polimelo.com</a>
            </li>
          </ul>
        </section>

        {/* Portfolio Global Footer */}
        <footer style={{ marginTop: "100px", borderTop: "1px solid var(--border-color)", paddingTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center", fontFamily: "'Courier New', monospace" }}>
          Polimelo Indexing Protocol • Last Verified: June 2026 • Ankara, Turkey
        </footer>

      </div>
    </div>
  );
}