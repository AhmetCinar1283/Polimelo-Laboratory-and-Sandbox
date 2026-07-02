"use client";

import React, { useState } from "react";

export function LinearTransformationVisualizer() {
  const [matrix, setMatrix] = useState({ a: 1.5, b: 0.5, c: 0.5, d: 1.5 });

  const size = 300;
  const gridMax = 4;
  const margin = 20;

  const toSvgX = (x: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    return margin + (x + gridMax) * scale;
  };

  const toSvgY = (y: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    return size - (margin + (y + gridMax) * scale);
  };

  // Math calculations
  const det = matrix.a * matrix.d - matrix.b * matrix.c;
  const area = Math.abs(det);

  // Transformed basis vectors
  const transI = { x: matrix.a, y: matrix.c };
  const transJ = { x: matrix.b, y: matrix.d };
  const transCorner = { x: matrix.a + matrix.b, y: matrix.c + matrix.d };

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

  // Predefined matrices for quick loading
  const presets = [
    { name: "Identity (No change)", a: 1, b: 0, c: 0, d: 1 },
    { name: "Shear (Tilt)", a: 1.5, b: 1, c: 0, d: 1 },
    { name: "Scale (Stretch)", a: 1.5, b: 0, c: 0, d: 1.5 },
    { name: "Collapse (Singular)", a: 1, b: 2, c: 0.5, d: 1 },
    { name: "Reflection (Flip)", a: -1, b: 0, c: 0, d: 1 }
  ];

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
        Interactive 2D Linear Transformation Visualizer
      </h4>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* SVG Plot */}
        <div style={{ backgroundColor: "#ffffff", border: "1px solid var(--border-color, #000)", padding: "10px", borderRadius: "2px" }}>
          <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
            <defs>
              <marker id="arrow-i" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#0066cc" />
              </marker>
              <marker id="arrow-j" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#009944" />
              </marker>
            </defs>

            {gridLines}

            {/* Principal Axes */}
            <line x1={margin} y1={toSvgY(0)} x2={size - margin} y2={toSvgY(0)} stroke="#666" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1={margin} x2={toSvgX(0)} y2={size - margin} stroke="#666" strokeWidth="1.5" />

            {/* Transformed Unit Parallelogram */}
            {area > 0.01 && (
              <polygon
                points={`
                  ${toSvgX(0)},${toSvgY(0)} 
                  ${toSvgX(transI.x)},${toSvgY(transI.y)} 
                  ${toSvgX(transCorner.x)},${toSvgY(transCorner.y)} 
                  ${toSvgX(transJ.x)},${toSvgY(transJ.y)}
                `}
                fill="rgba(255, 200, 0, 0.15)"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="1"
              />
            )}

            {/* Transformed basis vector i (Blue) */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(transI.x)}
              y2={toSvgY(transI.y)}
              stroke="#0066cc"
              strokeWidth="3.5"
              markerEnd="url(#arrow-i)"
            />
            <text x={toSvgX(transI.x) + 5} y={toSvgY(transI.y) - 5} fill="#0066cc" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              î' [{transI.x.toFixed(1)}, {transI.y.toFixed(1)}]
            </text>

            {/* Transformed basis vector j (Green) */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(transJ.x)}
              y2={toSvgY(transJ.y)}
              stroke="#009944"
              strokeWidth="3.5"
              markerEnd="url(#arrow-j)"
            />
            <text x={toSvgX(transJ.x) + 5} y={toSvgY(transJ.y) + 12} fill="#009944" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
              ĵ' [{transJ.x.toFixed(1)}, {transJ.y.toFixed(1)}]
            </text>
          </svg>
        </div>

        {/* Sliders & Presets */}
        <div style={{ flex: "1", minWidth: "240px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Quick Presets
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setMatrix({ a: preset.a, b: preset.b, c: preset.c, d: preset.d })}
                  style={{
                    padding: "4px 8px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    border: "1px solid var(--border-color, #000)",
                    backgroundColor: "#ffffff",
                    color: "var(--border-color, #000)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Matrix Entries: M = [[a, b], [c, d]]
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {/* Row 1 */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "#0066cc" }}>a (î_x): {matrix.a.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="-3" max="3" step="0.1" value={matrix.a}
                  onChange={(e) => setMatrix({ ...matrix, a: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "#009944" }}>b (ĵ_x): {matrix.b.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="-3" max="3" step="0.1" value={matrix.b}
                  onChange={(e) => setMatrix({ ...matrix, b: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                />
              </div>

              {/* Row 2 */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "#0066cc" }}>c (î_y): {matrix.c.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="-3" max="3" step="0.1" value={matrix.c}
                  onChange={(e) => setMatrix({ ...matrix, c: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span style={{ color: "#009944" }}>d (ĵ_y): {matrix.d.toFixed(1)}</span>
                </div>
                <input
                  type="range" min="-3" max="3" step="0.1" value={matrix.d}
                  onChange={(e) => setMatrix({ ...matrix, d: parseFloat(e.target.value) })}
                  style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                />
              </div>
            </div>
          </div>

          {/* Diagnostics Panel */}
          <div style={{ borderTop: "1px dashed #ccc", paddingTop: "12px" }}>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Determinant Analysis
            </div>
            <div style={{ padding: "8px", backgroundColor: "#f9f9f9", border: "1px solid #ddd", fontFamily: "monospace", fontSize: "0.8rem" }}>
              det(M) = ad - bc <br />
              det(M) = ({matrix.a.toFixed(2)} × {matrix.d.toFixed(2)}) - ({matrix.b.toFixed(2)} × {matrix.c.toFixed(2)}) <br />
              det(M) = <strong>{det.toFixed(2)}</strong>
            </div>

            {Math.abs(det) < 0.05 ? (
              <div style={{ marginTop: "10px", padding: "8px", backgroundColor: "rgba(204,51,0,0.05)", borderLeft: "3px solid #cc3300", fontSize: "0.75rem" }}>
                <strong>⚠️ Singular Matrix (det ≈ 0):</strong> Space collapsed into a line or point. You lost a dimension, meaning you cannot reconstruct original inputs. It is **non-invertible**!
              </div>
            ) : det < -0.05 ? (
              <div style={{ marginTop: "10px", padding: "8px", backgroundColor: "rgba(0,102,204,0.05)", borderLeft: "3px solid #0066cc", fontSize: "0.75rem" }}>
                <strong>🔄 Negative Determinant:</strong> Space was reflected (flipped). It still stretches areas by a factor of <strong>{area.toFixed(2)}</strong>, but the orientation is inverted.
              </div>
            ) : (
              <div style={{ marginTop: "10px", padding: "8px", backgroundColor: "rgba(0,153,68,0.05)", borderLeft: "3px solid #009944", fontSize: "0.75rem" }}>
                <strong>✅ Non-Singular:</strong> Area of the unit square scales by a factor of <strong>{area.toFixed(2)}</strong>. Space is not collapsed, so the transformation is **fully invertible**!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
