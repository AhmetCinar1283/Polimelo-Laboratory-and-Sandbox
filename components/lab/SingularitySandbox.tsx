"use client";

import React, { useState } from "react";

export default function SingularitySandbox() {
  // Preset options representing the cases from the lecture notes
  const presets = {
    unique: {
      name: "Unique Solution (Non-Singular)",
      matrix: [
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 2]
      ],
      description: "Case I: Equations provide distinct information. They cross at exactly one point. Determinant is non-zero, and the matrix is invertible."
    },
    redundant: {
      name: "Infinite Solutions (Redundant Singular)",
      matrix: [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3]
      ],
      description: "Case II: The equations look different but carry redundant/duplicate information. They lie directly on top of each other. Determinant is zero."
    },
    contradictory: {
      name: "No Solution (Contradictory Singular)",
      matrix: [
        [1, 1, 1],
        [1, 1, 1], // identical inputs but could have different targets
        [1, 2, 1]
      ],
      description: "Case III: The equations contradict each other, describing parallel planes that never meet. The coefficient matrix is singular (determinant is zero)."
    }
  };

  // State for current matrix values
  const [matrix, setMatrix] = useState<number[][]>(presets.unique.matrix);
  const [activePreset, setActivePreset] = useState<string>("unique");

  // Handle cell input change
  const handleCellChange = (row: number, col: number, value: string) => {
    const numValue = parseFloat(value);
    const newMatrix = matrix.map((r, rIdx) =>
      r.map((c, cIdx) => (rIdx === row && cIdx === col ? (isNaN(numValue) ? 0 : numValue) : c))
    );
    setMatrix(newMatrix);
    setActivePreset("custom");
  };

  // Apply preset
  const applyPreset = (key: keyof typeof presets) => {
    setMatrix(presets[key].matrix);
    setActivePreset(key);
  };

  // Compute 3x3 Determinant:
  // a(ei − fh) − b(di − fg) + c(dh − eg)
  const calculateDeterminant = (m: number[][]) => {
    const a = m[0][0], b = m[0][1], c = m[0][2];
    const d = m[1][0], e = m[1][1], f = m[1][2];
    const g = m[2][0], h = m[2][1], i = m[2][2];

    return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
  };

  const det = calculateDeterminant(matrix);
  const isSingular = Math.abs(det) < 1e-9;

  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", color: "var(--foreground)" }}>
      {/* Header Info */}
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", margin: "0 0 15px 0", color: "var(--title-color)" }}>
        🔬 Singularity & Dimension Sandbox
      </h2>
      <p style={{ fontSize: "0.95rem", color: "var(--text-muted)", marginBottom: "20px" }}>
        Test custom 3×3 coefficient matrices to verify if they represent a <strong>singular</strong> or <strong>non-singular</strong> system. Compare your results with the cases outlined in Lecture 1.
      </p>

      {/* Preset Selectors */}
      <div style={{ marginBottom: "25px" }}>
        <div style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "8px", fontWeight: "bold" }}>
          Load Preset Systems:
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {(Object.keys(presets) as Array<keyof typeof presets>).map((key) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              style={{
                padding: "8px 14px",
                backgroundColor: activePreset === key ? "var(--primary)" : "var(--card-bg)",
                color: activePreset === key ? "var(--primary-contrast)" : "var(--foreground)",
                border: "1px solid var(--border-color)",
                cursor: "pointer",
                fontSize: "0.85rem",
                fontWeight: "bold",
                fontFamily: "'Courier New', monospace",
                transition: "all 0.2s ease",
                boxShadow: activePreset === key ? "none" : "2px 2px 0px var(--border-color)",
                transform: activePreset === key ? "translate(2px, 2px)" : "none"
              }}
            >
              {key.toUpperCase()} Presets
            </button>
          ))}
        </div>
        {activePreset !== "custom" && (
          <div style={{ marginTop: "12px", fontSize: "0.85rem", fontStyle: "italic", color: "var(--text-muted)" }}>
            {presets[activePreset as keyof typeof presets].description}
          </div>
        )}
      </div>

      {/* Grid Layout: Input and Output Panel */}
      <div style={{ display: "grid", gap: "30px", marginBottom: "30px" }} className="grid grid-cols-1 md:grid-cols-2">
        {/* Matrix Inputs */}
        <div style={{ padding: "20px", border: "1px solid var(--border-color)", backgroundColor: "var(--card-bg)" }}>
          <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px dashed var(--dashed-border-color)", paddingBottom: "5px" }}>
            Coefficient Matrix [A] (3×3)
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "240px", margin: "0 auto" }}>
            {matrix.map((row, rIdx) => (
              <div key={rIdx} style={{ display: "flex", gap: "10px" }}>
                {row.map((val, cIdx) => (
                  <div key={cIdx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <input
                      type="number"
                      step="any"
                      value={val}
                      onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "8px",
                        textAlign: "center",
                        border: "1px solid var(--border-color)",
                        fontFamily: "'Courier New', monospace",
                        fontSize: "1rem",
                        backgroundColor: "var(--input-bg)",
                        color: "var(--foreground)",
                        outline: "none"
                      }}
                    />
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      a<sub>{rIdx+1}{cIdx+1}</sub>
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Compute Results */}
        <div style={{ padding: "20px", border: "1px solid var(--border-color)", backgroundColor: "var(--card-bg)", display: "flex", flexDirection: "column", justifyContent: "between" }}>
          <div>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "bold", marginBottom: "15px", borderBottom: "1px dashed var(--dashed-border-color)", paddingBottom: "5px" }}>
              Mathematical Diagnostics
            </div>

            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>DETERMINANT:</div>
              <div style={{ fontSize: "1.8rem", fontWeight: "bold", fontFamily: "Georgia, serif" }}>
                det(A) = {Number(det.toFixed(4))}
              </div>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "4px" }}>SINGULARITY STATE:</div>
              <span
                style={{
                  display: "inline-block",
                  padding: "4px 8px",
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  color: "white",
                  backgroundColor: isSingular ? "var(--accent-red)" : "var(--accent-green)",
                  border: "1px solid var(--border-color)"
                }}
              >
                {isSingular ? "SINGULAR (det = 0)" : "NON-SINGULAR (det ≠ 0)"}
              </span>
            </div>
          </div>

          <div style={{ borderTop: "1px dashed var(--dashed-border-color)", paddingTop: "15px", fontSize: "0.85rem" }}>
            <strong>Geometric Outlay:</strong>{" "}
            {isSingular ? (
              <span style={{ color: "var(--accent-red)" }}>
                The equations describe parallel or overlapping structures. System has either <strong>no solution</strong> (contradictory) or <strong>infinite solutions</strong> (redundant). Cannot invert this matrix.
              </span>
            ) : (
              <span style={{ color: "var(--accent-green)" }}>
                The equations describe independent spans that meet at a <strong>unique coordinate</strong>. This system is fully solvable and the matrix is invertible.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive System Equation Preview */}
      <div style={{ padding: "15px", border: "1px dashed var(--dashed-border-color)", fontSize: "0.85rem" }}>
        <div style={{ fontWeight: "bold", marginBottom: "6px" }}>Equivalent System of Equations (Mock Target: y = [0, 0, 0]ᵀ)</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px", paddingLeft: "10px", borderLeft: "2px solid var(--border-color)" }}>
          {matrix.map((row, idx) => (
            <div key={idx}>
              {row[0]}x₁ {row[1] >= 0 ? "+" : "-"} {Math.abs(row[1])}x₂ {row[2] >= 0 ? "+" : "-"} {Math.abs(row[2])}x₃ = 0
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
