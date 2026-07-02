"use client";

import React, { useState } from "react";

export function NormVisualizer() {
  const [point, setPoint] = useState({ x: 4, y: 3 });

  const size = 300;
  const gridMax = 6;
  const margin = 20;

  const toSvgX = (x: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    return margin + (x + gridMax) * scale;
  };

  const toSvgY = (y: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    return size - (margin + (y + gridMax) * scale);
  };

  // Math Calculations
  const l1Norm = Math.abs(point.x) + Math.abs(point.y);
  const l2Norm = Math.sqrt(point.x * point.x + point.y * point.y);

  // Generate Grid Lines
  const gridLines = [];
  for (let i = -gridMax; i <= gridMax; i++) {
    if (i !== 0) {
      gridLines.push(
        <React.Fragment key={`grid-${i}`}>
          <line x1={toSvgX(i)} y1={margin} x2={toSvgX(i)} y2={size - margin} stroke="#eaeaea" strokeWidth="0.8" />
          <line x1={margin} y1={toSvgY(i)} x2={size - margin} y2={toSvgY(i)} stroke="#eaeaea" strokeWidth="0.8" />
          {i % 2 === 0 && (
            <>
              <text x={toSvgX(i)} y={toSvgY(0) + 12} fontSize="9" textAnchor="middle" fill="#aaa" fontFamily="monospace">{i}</text>
              <text x={toSvgX(0) - 6} y={toSvgY(i) + 3} fontSize="9" textAnchor="end" fill="#aaa" fontFamily="monospace">{i}</text>
            </>
          )}
        </React.Fragment>
      );
    }
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
        Interactive L1 vs L2 Norm Visualizer
      </h4>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color, #000)", padding: "10px", borderRadius: "2px" }}>
          <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#333" />
              </marker>
            </defs>

            {gridLines}

            {/* Axes */}
            <line x1={margin} y1={toSvgY(0)} x2={size - margin} y2={toSvgY(0)} stroke="#666" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1={margin} x2={toSvgX(0)} y2={size - margin} stroke="#666" strokeWidth="1.5" />

            {/* L1 Path (Manhattan): Go along X, then along Y */}
            {/* Horizontal part */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(point.x)}
              y2={toSvgY(0)}
              stroke="var(--accent-red, #cc3300)"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />
            {/* Vertical part */}
            <line
              x1={toSvgX(point.x)}
              y1={toSvgY(0)}
              x2={toSvgX(point.x)}
              y2={toSvgY(point.y)}
              stroke="var(--accent-red, #cc3300)"
              strokeWidth="2.5"
              strokeDasharray="4,4"
            />

            {/* L2 Path (Euclidean): Straight line vector */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(point.x)}
              y2={toSvgY(point.y)}
              stroke="#0066cc"
              strokeWidth="3"
              markerEnd="url(#arrow)"
            />

            {/* Coordinate node */}
            <circle cx={toSvgX(point.x)} cy={toSvgY(point.y)} r="6" fill="#000" />
            <text x={toSvgX(point.x) + 8} y={toSvgY(point.y) - 8} fontSize="11" fontWeight="bold" fontFamily="monospace">
              ({point.x}, {point.y})
            </text>
          </svg>
        </div>

        {/* Sliders and Calculations */}
        <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px" }}>
              Coordinate Settings
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>X Coordinate:</span>
                <strong>{point.x}</strong>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={point.x}
                onChange={(e) => setPoint({ ...point, x: parseInt(e.target.value) })}
                style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
                <span>Y Coordinate:</span>
                <strong>{point.y}</strong>
              </div>
              <input
                type="range"
                min="-5"
                max="5"
                step="1"
                value={point.y}
                onChange={(e) => setPoint({ ...point, y: parseInt(e.target.value) })}
                style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
              />
            </div>
          </div>

          <div style={{ borderTop: "1px dashed #ccc", paddingTop: "12px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Computed Norms
            </div>

            {/* L1 Block */}
            <div style={{ marginBottom: "10px", padding: "8px", backgroundColor: "rgba(204,51,0,0.05)", borderLeft: "3px solid var(--accent-red, #cc3300)" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#cc3300" }}>
                L1 Norm (Manhattan Distance)
              </div>
              <div style={{ fontSize: "0.8rem", fontFamily: "monospace", marginTop: "2px" }}>
                ||v||₁ = |x| + |y| = |{point.x}| + |{point.y}| = <strong>{l1Norm}</strong>
              </div>
            </div>

            {/* L2 Block */}
            <div style={{ padding: "8px", backgroundColor: "rgba(0,102,204,0.05)", borderLeft: "3px solid #0066cc" }}>
              <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#0066cc" }}>
                L2 Norm (Euclidean Distance)
              </div>
              <div style={{ fontSize: "0.8rem", fontFamily: "monospace", marginTop: "2px" }}>
                ||v||₂ = √(x² + y²) = √({point.x}² + {point.y}²) = <strong>{l2Norm.toFixed(3)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
