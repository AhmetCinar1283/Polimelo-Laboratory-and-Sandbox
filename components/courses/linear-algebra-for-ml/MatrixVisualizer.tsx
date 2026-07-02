"use client";

import React from "react";

export function MatrixVisualizer({
  matrix,
  type,
  determinant,
}: {
  matrix: number[][];
  type: string;
  determinant: string;
}) {
  const isSingular = type === "Singular";
  const badgeBg = isSingular ? "rgba(239, 90, 90, 0.15)" : "rgba(68, 184, 85, 0.15)";
  const badgeColor = isSingular ? "var(--accent-red)" : "var(--accent-green)";
  const badgeBorder = isSingular ? "1px solid var(--accent-red)" : "1px solid var(--accent-green)";

  return (
    <div
      style={{
        border: "1px solid var(--border-color)",
        backgroundColor: "var(--card-bg)",
        padding: "20px",
        margin: "24px 0",
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: "bold" }}>
          MATRIX_COEFFICIENT_GRID
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "2px 8px",
              backgroundColor: badgeBg,
              color: badgeColor,
              border: badgeBorder,
              fontWeight: "bold",
            }}
          >
            {type.toUpperCase()}
          </span>
          <span
            style={{
              fontSize: "0.75rem",
              padding: "2px 8px",
              backgroundColor: "var(--theory-badge-bg)",
              color: "var(--foreground)",
              border: "1px solid var(--border-color)",
              fontWeight: "bold",
            }}
          >
            DET: {determinant.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "15px 0" }}>
        <div
          style={{
            display: "flex",
            borderLeft: "3px solid var(--border-color)",
            borderRight: "3px solid var(--border-color)",
            borderRadius: "4px",
            padding: "0 8px",
            gap: "12px",
            flexDirection: "column",
          }}
        >
          {matrix.map((row, rIdx) => (
            <div key={rIdx} style={{ display: "flex", gap: "16px", justifyContent: "space-around" }}>
              {row.map((val, cIdx) => (
                <div
                  key={cIdx}
                  style={{
                    width: "40px",
                    textAlign: "center",
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    color: "var(--title-color)",
                  }}
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
