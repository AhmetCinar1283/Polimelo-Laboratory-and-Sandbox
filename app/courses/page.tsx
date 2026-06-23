"use client";

import React, { useState } from "react";
import Link from "next/link";
import { coursesRegistry } from "@/registry/courses";

export default function CoursesHub() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter courses based on category and search query
  const filteredCourses = coursesRegistry.filter(course => {
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;

    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      course.title.toLowerCase().includes(query) ||
      course.description.toLowerCase().includes(query) ||
      course.tags.some(tag => tag.toLowerCase().includes(query)) ||
      course.lectures.some(lecture => 
        lecture.title.toLowerCase().includes(query) || 
        lecture.description.toLowerCase().includes(query)
      );

    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: "All", label: "ALL" },
    { id: "mathematics", label: "MATHEMATICS" },
    { id: "artificial-intelligence", label: "ARTIFICIAL INTELLIGENCE" }
  ];

  return (
    <div style={{
      padding: "60px 40px 80px 40px",
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
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .course-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background-color 0.3s ease;
        }
        .course-card:hover {
          transform: translateX(6px);
          border-bottom-color: var(--border-color) !important;
          background-color: var(--card-bg-hover);
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
        .btn-action {
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 2px 2px 0px var(--border-color);
        }
        .btn-action:hover {
          background-color: var(--primary-contrast) !important;
          color: var(--primary) !important;
          letter-spacing: 1px;
          box-shadow: none;
          transform: translate(2px, 2px);
        }
        .category-tab {
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
        .category-tab.active {
          background-color: var(--primary);
          color: var(--primary-contrast);
          box-shadow: none;
          transform: translate(2px, 2px);
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
            Academic Outline / Core Roadmaps / Study Guides
          </div>
          <h1 style={{ 
            fontSize: "2.4rem", 
            margin: 0, 
            fontWeight: "700", 
            letterSpacing: "-0.02em", 
            color: "var(--title-color)",
            fontFamily: "Georgia, serif" 
          }}>
            STRUCTURED COURSES
          </h1>
          <div style={{ 
            marginTop: "15px", 
            fontSize: "0.95rem", 
            color: "var(--foreground)", 
            fontFamily: "Georgia, serif", 
            fontStyle: "italic",
            maxWidth: "700px" 
          }}>
            "Chronological and thematic course tracks covering core mathematical foundations, computing algorithms, and machine learning models."
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
            <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>SEARCH_COURSE_QUERY</label>
            <input
              type="text"
              placeholder="Search by course title, description, keywords, lectures..."
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

          {/* Filter Categories */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "0.8rem", fontWeight: "bold", color: "var(--text-muted)" }}>FILTER_BY_ACADEMIC_DOMAIN</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`category-tab ${selectedCategory === cat.id ? "active" : ""}`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Courses Counter */}
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "20px", fontFamily: "'Courier New', monospace" }}>
          REGISTERED_COURSES_FOUND: {filteredCourses.length} of {coursesRegistry.length}
        </div>

        {/* Courses Grid List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <article 
                key={course.id}
                className="course-card"
                style={{
                  borderBottom: "1px solid var(--dashed-border-color)",
                  paddingBottom: "30px",
                  position: "relative",
                  animationDelay: `${index * 0.08}s` 
                }}
              >
                {/* Header line metadata */}
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  fontSize: "0.8rem", 
                  fontWeight: "bold",
                  color: "var(--text-muted)",
                  marginBottom: "12px",
                  fontFamily: "'Courier New', monospace",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px"
                }}>
                  <div style={{ display: "flex", gap: "15px" }}>
                    <span style={{ backgroundColor: "var(--card-bg-hover)", padding: "2px 6px", borderRadius: "3px" }}>
                      TRACK: {course.category.toUpperCase().replace("-", " ")}
                    </span>
                    <span>
                      DIFFICULTY: {course.difficulty.toUpperCase()}
                    </span>
                  </div>
                  <span>
                    LECTURES: {course.lectures.length} units
                  </span>
                </div>

                {/* Course Title */}
                <h2 style={{ 
                  margin: "0 0 12px 0", 
                  fontSize: "1.6rem", 
                  color: "var(--title-color)", 
                  fontFamily: "Georgia, serif",
                  fontWeight: "bold"
                }}>
                  {course.title}
                </h2>

                {/* Short description */}
                <p style={{ 
                  color: "var(--foreground)", 
                  fontSize: "0.95rem", 
                  marginBottom: "20px",
                  textAlign: "justify",
                  fontFamily: "system-ui, sans-serif"
                }}>
                  {course.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "25px" }}>
                  {course.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 6px",
                        backgroundColor: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px dashed var(--dashed-border-color)"
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Action Trigger */}
                <Link href={`/courses/${course.id}`} style={{ textDecoration: "none" }}>
                  <button 
                    className="btn-action"
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
                    VIEW_SYLLABUS() →
                  </button>
                </Link>
              </article>
            ))
          ) : (
            <div style={{ padding: "40px 0", textAlign: "center", border: "1px dashed var(--dashed-border-color)" }}>
              <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)" }}>No courses matched your query.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer style={{ marginTop: "100px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          — Polimelo Indexing Protocol • Structured courses are updated periodically —
        </footer>

      </div>
    </div>
  );
}
