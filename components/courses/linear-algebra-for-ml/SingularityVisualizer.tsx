"use client";

import React, { useState } from "react";

export function SingularityVisualizer() {
  const [state, setState] = useState<"unique" | "none" | "infinite">("unique");

  const size = 300;
  const margin = 20;

  // Coordinate mapping
  const toSvgX = (x: number) => margin + ((x + 5) / 10) * (size - 2 * margin);
  const toSvgY = (y: number) => size - (margin + ((y + 5) / 10) * (size - 2 * margin));

  // Render grid background
  const grid = [];
  for (let i = -4; i <= 4; i += 2) {
    grid.push(
      <React.Fragment key={`grid-${i}`}>
        <line x1={toSvgX(i)} y1={margin} x2={toSvgX(i)} y2={size - margin} stroke="#f0f0f0" strokeWidth="1" />
        <line x1={margin} y1={toSvgY(i)} x2={size - margin} y2={toSvgY(i)} stroke="#f0f0f0" strokeWidth="1" />
      </React.Fragment>
    );
  }

  // Define line functions based on selected state
  // State 1: Unique: L1: y = -x + 2, L2: y = 2x - 1 (intersects at x=1, y=1)
  // State 2: No solution: L1: y = x + 1, L2: y = x - 2 (parallel)
  // State 3: Infinite: L1: y = 0.5x + 1, L2: 2y = x + 2 (overlapping, same line)
  
  let line1 = { x1: -5, y1: 0, x2: 5, y2: 0, label: "", color: "#0066cc" };
  let line2 = { x1: -5, y1: 0, x2: 5, y2: 0, label: "", color: "#009944" };
  let intersectionNode = null;
  let explanationText = "";

  if (state === "unique") {
    // y = -x + 2
    line1 = { x1: -5, y1: 7, x2: 5, y2: -3, label: "y = -x + 2", color: "#0066cc" };
    // y = 2x - 1
    line2 = { x1: -2, y1: -5, x2: 3, y2: 5, label: "y = 2x - 1", color: "#009944" };
    intersectionNode = <circle cx={toSvgX(1)} cy={toSvgY(1)} r="6" fill="#cc3300" stroke="#fff" strokeWidth="2" />;
    explanationText = "Lines intersect at exactly one point (1, 1). There is a single unique solution to the system.";
  } else if (state === "none") {
    // y = x + 1
    line1 = { x1: -5, y1: -4, x2: 4, y2: 5, label: "y = x + 1", color: "#0066cc" };
    // y = x - 2
    line2 = { x1: -3, y1: -5, x2: 5, y2: 3, label: "y = x - 2", color: "#009944" };
    explanationText = "Lines are parallel (they have the same slope but different intercepts). They never intersect, meaning there is no solution.";
  } else if (state === "infinite") {
    // y = 0.5x + 1
    line1 = { x1: -5, y1: -1.5, x2: 5, y2: 3.5, label: "y = 0.5x + 1", color: "#0066cc" };
    // 2y = x + 2 (lies directly on top)
    line2 = { x1: -5, y1: -1.5, x2: 5, y2: 3.5, label: "2y = x + 2", color: "#009944" };
    explanationText = "Lines lie directly on top of each other. Every point on the line is a solution, meaning there are infinite solutions.";
  }

  return (
    <div
      style={{
        border: "2px solid var(--border-color, #000)",
        padding: "20px",
        margin: "24px 0",
        backgroundColor: "var(--card-bg, #fafafa)",
        boxShadow: "4px 4px 0px var(--border-color, #000)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h4
        style={{
          fontSize: "1.1rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color, #000)",
          marginTop: 0,
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        Interactive System Singularity Visualizer
      </h4>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color, #000)", padding: "10px", borderRadius: "2px" }}>
          <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
            {grid}

            {/* Principal Axes */}
            <line x1={margin} y1={toSvgY(0)} x2={size - margin} y2={toSvgY(0)} stroke="#bbb" strokeWidth="1" />
            <line x1={toSvgX(0)} y1={margin} x2={toSvgX(0)} y2={size - margin} stroke="#bbb" strokeWidth="1" />

            {/* Line 1 */}
            <line
              x1={toSvgX(line1.x1)}
              y1={toSvgY(line1.y1)}
              x2={toSvgX(line1.x2)}
              y2={toSvgY(line1.y2)}
              stroke={line1.color}
              strokeWidth={state === "infinite" ? "5" : "3"}
              opacity={state === "infinite" ? 0.6 : 1}
            />

            {/* Line 2 */}
            <line
              x1={toSvgX(line2.x1)}
              y1={toSvgY(line2.y1)}
              x2={toSvgX(line2.x2)}
              y2={toSvgY(line2.y2)}
              stroke={line2.color}
              strokeWidth="2.5"
              strokeDasharray={state === "infinite" ? "4,4" : ""}
            />

            {intersectionNode}
          </svg>
        </div>

        {/* Controls */}
        <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Select System Type
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {[
                { id: "unique", label: "Unique Solution (Non-Singular)" },
                { id: "none", label: "No Solution (Singular)" },
                { id: "infinite", label: "Infinite Solutions (Singular)" }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setState(item.id as any)}
                  style={{
                    padding: "8px 12px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    textAlign: "left",
                    cursor: "pointer",
                    border: "1px solid var(--border-color, #000)",
                    backgroundColor: state === item.id ? "var(--border-color, #000)" : "#ffffff",
                    color: state === item.id ? "#ffffff" : "var(--border-color, #000)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ borderTop: "1px dashed #ccc", paddingTop: "12px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "6px" }}>
              System Analysis
            </div>
            <div style={{ fontSize: "0.85rem", color: "#333", lineHeight: "1.4" }}>
              {explanationText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
