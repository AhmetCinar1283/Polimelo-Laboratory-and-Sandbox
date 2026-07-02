"use client";

import React, { useState } from "react";

export function DotProductVisualizer() {
  const [vectorA, setVectorA] = useState({ x: 4, y: 1 });
  const [vectorB, setVectorB] = useState({ x: 2, y: 3 });

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
  const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
  const normA = Math.sqrt(vectorA.x * vectorA.x + vectorA.y * vectorA.y);
  const normB = Math.sqrt(vectorB.x * vectorB.x + vectorB.y * vectorB.y);
  
  // Calculate angle in degrees
  let angleDeg = 0;
  if (normA > 0 && normB > 0) {
    const cosTheta = Math.max(-1, Math.min(1, dotProduct / (normA * normB)));
    angleDeg = (Math.acos(cosTheta) * 180) / Math.PI;
  }

  // Alignment classification
  let alignment = "Orthogonal (Perpendicular)";
  let alignmentColor = "#777777";
  if (dotProduct > 0.01) {
    alignment = "Acute Angle (Pointing in similar directions)";
    alignmentColor = "#009944";
  } else if (dotProduct < -0.01) {
    alignment = "Obtuse Angle (Pointing in opposite directions)";
    alignmentColor = "#cc3300";
  }

  // Generate grid lines
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
        Interactive Dot Product Alignment Workspace
      </h4>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color, #000)", padding: "10px", borderRadius: "2px" }}>
          <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
            <defs>
              <marker id="arrow-a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#0066cc" />
              </marker>
              <marker id="arrow-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#009944" />
              </marker>
            </defs>

            {gridLines}

            {/* Axes */}
            <line x1={margin} y1={toSvgY(0)} x2={size - margin} y2={toSvgY(0)} stroke="#666" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1={margin} x2={toSvgX(0)} y2={size - margin} stroke="#666" strokeWidth="1.5" />

            {/* Vector A (Blue) */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(vectorA.x)}
              y2={toSvgY(vectorA.y)}
              stroke="#0066cc"
              strokeWidth="2.5"
              markerEnd="url(#arrow-a)"
            />
            <text x={toSvgX(vectorA.x) + 5} y={toSvgY(vectorA.y) - 5} fill="#0066cc" fontSize="11" fontWeight="bold" fontFamily="monospace">
              A ({vectorA.x}, {vectorA.y})
            </text>

            {/* Vector B (Green) */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(vectorB.x)}
              y2={toSvgY(vectorB.y)}
              stroke="#009944"
              strokeWidth="2.5"
              markerEnd="url(#arrow-b)"
            />
            <text x={toSvgX(vectorB.x) + 5} y={toSvgY(vectorB.y) + 12} fill="#009944" fontSize="11" fontWeight="bold" fontFamily="monospace">
              B ({vectorB.x}, {vectorB.y})
            </text>

            {/* Arc to show angle (simplified) */}
            {normA > 0.5 && normB > 0.5 && (
              <circle
                cx={toSvgX(0)}
                cy={toSvgY(0)}
                r="30"
                fill="none"
                stroke="#bbb"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            )}
          </svg>
        </div>

        {/* Sliders and Calculations */}
        <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "10px" }}>
              Vector Controls
            </div>

            {/* Vector A sliders */}
            <div style={{ marginBottom: "12px" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#0066cc" }}>Vector A</div>
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>X: {vectorA.x}</span>
                  <input
                    type="range" min="-5" max="5" step="1" value={vectorA.x}
                    onChange={(e) => setVectorA({ ...vectorA, x: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>Y: {vectorA.y}</span>
                  <input
                    type="range" min="-5" max="5" step="1" value={vectorA.y}
                    onChange={(e) => setVectorA({ ...vectorA, y: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                  />
                </div>
              </div>
            </div>

            {/* Vector B sliders */}
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: "#009944" }}>Vector B</div>
              <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>X: {vectorB.x}</span>
                  <input
                    type="range" min="-5" max="5" step="1" value={vectorB.x}
                    onChange={(e) => setVectorB({ ...vectorB, x: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: "0.7rem", color: "#666" }}>Y: {vectorB.y}</span>
                  <input
                    type="range" min="-5" max="5" step="1" value={vectorB.y}
                    onChange={(e) => setVectorB({ ...vectorB, y: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px dashed #ccc", paddingTop: "12px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Dot Product & Alignment
            </div>

            {/* Algebraic View */}
            <div style={{ marginBottom: "10px", padding: "8px", backgroundColor: "#f9f9f9", border: "1px solid #ddd" }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>Algebraic Calculation:</div>
              <div style={{ fontSize: "0.8rem", fontFamily: "monospace", marginTop: "2px" }}>
                A · B = (x₁ · x₂) + (y₁ · y₂) <br />
                A · B = ({vectorA.x} · {vectorB.x}) + ({vectorA.y} · {vectorB.y}) <br />
                A · B = <strong>{dotProduct}</strong>
              </div>
            </div>

            {/* Alignment Details */}
            <div style={{ padding: "8px", backgroundColor: "rgba(0,0,0,0.02)", borderLeft: `3px solid ${alignmentColor}` }}>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", color: alignmentColor }}>
                {alignment}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#555", marginTop: "2px" }}>
                Angle between vectors (θ): <strong>{angleDeg.toFixed(1)}°</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
