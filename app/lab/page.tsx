"use client";

import React, { useState } from "react";
import Link from "next/link";
import { labsRegistry } from "@/registry/labs";

export default function LabDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Extract all unique tags/keywords for filtering
  const allTags = ["All", ...Array.from(new Set(labsRegistry.flatMap(item => item.keywords)))];

  // Filter registry modules based on search and tags
  const filteredModules = labsRegistry.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag === "All" || item.keywords.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div style={{
      padding: "60px 40px 80px 40px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "var(--background)", 
      color: "var(--foreground)",
      minHeight: "100vh",
      lineHeight: "1.6"
    }}>
      {/* Global CSS for Animations & Hover Mechanics */}
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .research-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background-color 0.3s ease;
        }
        .research-card:hover {
          transform: translateX(6px);
          border-bottom-color: var(--border-color) !important;
          background-color: var(--card-bg-hover);
        }
        .btn-execute {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 2px 2px 0px var(--border-color);
        }
        .btn-execute:hover {
          background-color: var(--primary-contrast) !important;
          color: var(--primary) !important;
          letter-spacing: 1px;
          box-shadow: none;
          transform: translate(2px, 2px);
        }
        .btn-back {
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: var(--text-muted);
          font-family: "'Courier New', monospace";
          font-size: 0.9rem;
          font-weight: bold;
          margin-bottom: 40px;
        }
        .btn-back:hover {
          color: var(--title-color);
          transform: translateX(-4px);
        }
        .filter-tab {
          padding: 6px 12px;
          border: 1px solid var(--border-color);
          background-color: var(--background);
          color: var(--foreground);
          font-family: "'Courier New', monospace";
          font-size: 0.8rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.15s ease;
          box-shadow: 2px 2px 0px var(--border-color);
        }
        .filter-tab.active {
          background-color: var(--primary);
          color: var(--primary-contrast);
          box-shadow: none;
          transform: translate(2px, 2px);
        }
        .theory-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background-color: var(--theory-badge-bg);
          color: var(--foreground);
          border: 1px dashed var(--dashed-border-color);
          padding: 3px 8px;
          font-size: 0.8rem;
          font-family: "'Courier New', monospace";
          text-decoration: none;
          font-weight: bold;
          transition: all 0.2s ease;
        }
        .theory-badge:hover {
          background-color: var(--primary);
          color: var(--primary-contrast);
          border-style: solid;
        }
      `}</style>

      <div style={{ maxWidth: "850px", margin: "0 auto" }} className="animate-fade-in">
        
        {/* Navigation */}
        <nav>
          <Link href="/" className="btn-back">
            ← RETURN_TO_HUB()
          </Link>
        </nav>

        {/* Academic Header */}
        <header style={{ 
          marginBottom: "40px", 
          borderBottom: "2px solid var(--border-color)", 
          paddingBottom: "20px"
        }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: "5px" }}>
            Ankara University / Open Research Platform / Public Registry
          </div>
          <h1 style={{ 
            fontSize: "2.4rem", 
            margin: 0, 
            fontWeight: "700", 
            letterSpacing: "-0.02em", 
            color: "var(--title-color)",
            fontFamily: "Georgia, serif" 
          }}>
            POLIMELO RESEARCH LAB
          </h1>
          <div style={{ 
            marginTop: "15px", 
            fontSize: "0.95rem", 
            color: "var(--foreground)", 
            fontFamily: "Georgia, serif", 
            fontStyle: "italic",
            maxWidth: "700px" 
          }}>
            "An open-access sandbox for verifying decoupled computational routines, sandbox math engines, and independent peer-contributed algorithm blocks inside modern browser runtimes."
          </div>
        </header>

        {/* Search and Filters Panel */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "20px", 
          marginBottom: "40px",
          padding: "20px",
          border: "1px solid var(--border-color)",
          backgroundColor: "var(--card-bg)"
        }}>
          {/* Search Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>SEARCH_REGISTRY_QUERY</label>
            <input
              type="text"
              placeholder="Filter by title, keywords, index code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--border-color)",
                fontFamily: "'Courier New', monospace",
                fontSize: "0.9rem",
                outline: "none",
                backgroundColor: "var(--input-bg)",
                color: "var(--foreground)"
              }}
            />
          </div>

          {/* Filter Tags */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>FILTER_BY_KEYWORDS</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`filter-tab ${selectedTag === tag ? "active" : ""}`}
                >
                  {tag.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modules Counter */}
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "20px", fontFamily: "'Courier New', monospace" }}>
          REGISTERED_MODULES_FOUND: {filteredModules.length} of {labsRegistry.length}
        </div>

        {/* Modules List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {filteredModules.length > 0 ? (
            filteredModules.map((project, index) => (
              <article 
                key={project.id}
                className="research-card"
                style={{
                  borderBottom: "1px dashed var(--dashed-border-color)",
                  padding: "25px 15px",
                  position: "relative",
                  borderRadius: "4px",
                  animationDelay: `${index * 0.08}s` 
                }}
              >
                {/* Technical Meta Headers */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "space-between",
                  fontSize: "0.8rem", 
                  fontWeight: "bold",
                  color: "var(--text-muted)",
                  marginBottom: "10px",
                  fontFamily: "'Courier New', monospace",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "20px", backgroundColor: "var(--card-bg-hover)", padding: "2px 6px", borderRadius: "3px" }}>
                      {project.code}
                    </span>
                    <span style={{
                      color: project.status === "Active" ? "var(--accent-green)" : "var(--accent-red)",
                      textTransform: "uppercase"
                    }}>
                      ● [{project.status}]
                    </span>
                  </div>
                </div>

                {/* Module Title */}
                <h2 style={{ 
                  margin: "0 0 10px 0", 
                  fontSize: "1.4rem", 
                  color: "var(--title-color)", 
                  fontFamily: "Georgia, serif",
                  fontWeight: "bold"
                }}>
                  {project.title}
                </h2>

                {/* Abstract Body */}
                <p style={{ 
                  color: "var(--foreground)", 
                  fontSize: "0.95rem", 
                  marginBottom: "15px",
                  textAlign: "justify",
                  fontFamily: "system-ui, sans-serif"
                }}>
                  <strong style={{ fontFamily: "'Courier New', monospace", fontSize: "0.85rem", textTransform: "uppercase" }}>Abstract — </strong> 
                  {project.abstract}
                </p>

                {/* Theoretical References Links */}
                {project.referencedLectures.length > 0 && (
                  <div style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontFamily: "'Courier New', monospace" }}>THEORY_NODE:</span>
                    {project.referencedLectures.map((lecture, idx) => (
                      <Link 
                        key={idx} 
                        href={`/courses/${lecture.courseId}/${lecture.lectureSlug}`}
                        className="theory-badge"
                      >
                        📚 {lecture.code} {lecture.lectureTitle}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Keyword Index tokens */}
                <div style={{ 
                  display: "flex", 
                  flexWrap: "wrap", 
                  gap: "6px", 
                  marginBottom: "25px",
                  alignItems: "center" 
                }}>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginRight: "5px" }}>Keywords:</span>
                  {project.keywords.map((tag, idx) => (
                    <span 
                      key={idx}
                      style={{
                        fontSize: "0.8rem",
                        padding: "2px 6px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border-color)"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Trigger */}
                <Link href={`/lab/${project.id}`} style={{ textDecoration: "none" }}>
                  <button 
                    className="btn-execute"
                    style={{
                      padding: "8px 18px",
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-contrast)",
                      border: "1px solid var(--border-color)",
                      borderRadius: "0px",
                      fontWeight: "bold",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      fontFamily: "'Courier New', monospace"
                    }}
                  >
                    EXECUTE_MODULE() →
                  </button>
                </Link>
              </article>
            ))
          ) : (
            <div style={{ padding: "40px 0", textAlign: "center", border: "1px dashed var(--dashed-border-color)" }}>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>No research modules matched your query.</p>
            </div>
          )}
        </div>

        {/* Global Academic Academic Footer */}
        <footer style={{ marginTop: "100px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          — Polimelo Open Research Registry • Compiled using WebAssembly Core Ecosystem —
        </footer>

      </div>
    </div>
  );
}