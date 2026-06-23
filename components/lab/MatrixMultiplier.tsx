"use client";

import React, { useState } from "react";

export default function MatrixMultiplier() {
  const [matrixA, setMatrixA] = useState<number[][]>([
    [2, 3],
    [1, -4],
  ]);
  const [matrixB, setMatrixB] = useState<number[][]>([
    [5, 1],
    [0, 2],
  ]);
  const [activeCell, setActiveCell] = useState<{ r: number; c: number } | null>(null);

  const handleCellChange = (matrix: "A" | "B", r: number, c: number, val: string) => {
    const num = val === "" ? 0 : parseFloat(val);
    if (isNaN(num)) return;

    if (matrix === "A") {
      const newA = matrixA.map((row, ri) =>
        row.map((cell, ci) => (ri === r && ci === c ? num : cell))
      );
      setMatrixA(newA);
    } else {
      const newB = matrixB.map((row, ri) =>
        row.map((cell, ci) => (ri === r && ci === c ? num : cell))
      );
      setMatrixB(newB);
    }
  };

  // Compute product Matrix C
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length;
  const colsB = matrixB[0].length;

  const matrixC: number[][] = Array(rowsA)
    .fill(0)
    .map(() => Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      matrixC[i][j] = sum;
    }
  }

  // Get details of active cell calculation
  const getCalculationStep = () => {
    if (!activeCell) return "Hover over a cell in Matrix C to view its calculation details.";
    const { r, c } = activeCell;
    const parts: string[] = [];
    let sum = 0;
    for (let k = 0; k < colsA; k++) {
      const aVal = matrixA[r][k];
      const bVal = matrixB[k][c];
      parts.push(`(${aVal} × ${bVal})`);
      sum += aVal * bVal;
    }
    return `C[${r + 1},${c + 1}] = ${parts.join(" + ")} = ${sum}`;
  };

  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", color: "var(--foreground)" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", margin: "0 0 15px 0", color: "var(--title-color)" }}>
        🧮 Linear Algebra: Matrix Multiplier Visualizer
      </h2>
      <p style={{ fontSize: "0.95rem", color: "var(--foreground)", marginBottom: "20px" }}>
        Matrix multiplication is a fundamental building block of neural networks and graphics engines. 
        Input your matrices below, hover over cells in the output Matrix C, and inspect the dot product computation.
      </p>

      <div style={{ 
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px", 
        marginBottom: "30px" 
      }}>
        {/* Matrix A */}
        <div>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "8px" }}>
            Matrix A (2x2)
          </div>
          <div style={{
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 60px)",
            gap: "5px",
            borderLeft: "2px solid var(--border-color)",
            borderRight: "2px solid var(--border-color)",
            padding: "5px 10px"
          }}>
            {matrixA.map((row, r) =>
              row.map((val, c) => (
                <input
                  key={`A-${r}-${c}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleCellChange("A", r, c, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 4px",
                    textAlign: "center",
                    border: activeCell && activeCell.r === r ? "1.5px solid var(--accent-red)" : "1px solid var(--dashed-border-color)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.95rem",
                    backgroundColor: "var(--input-bg)",
                    color: "var(--foreground)",
                    outline: "none"
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Multiply Sign */}
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-muted)" }}>×</div>

        {/* Matrix B */}
        <div>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "8px" }}>
            Matrix B (2x2)
          </div>
          <div style={{
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 60px)",
            gap: "5px",
            borderLeft: "2px solid var(--border-color)",
            borderRight: "2px solid var(--border-color)",
            padding: "5px 10px"
          }}>
            {matrixB.map((row, r) =>
              row.map((val, c) => (
                <input
                  key={`B-${r}-${c}`}
                  type="number"
                  value={val}
                  onChange={(e) => handleCellChange("B", r, c, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "6px 4px",
                    textAlign: "center",
                    border: activeCell && activeCell.c === c ? "1.5px solid var(--accent-green)" : "1px solid var(--dashed-border-color)",
                    fontFamily: "'Courier New', monospace",
                    fontSize: "0.95rem",
                    backgroundColor: "var(--input-bg)",
                    color: "var(--foreground)",
                    outline: "none"
                  }}
                />
              ))
            )}
          </div>
        </div>

        {/* Equals Sign */}
        <div style={{ fontSize: "2rem", fontWeight: "bold", color: "var(--text-muted)" }}>=</div>

        {/* Matrix C (Result) */}
        <div>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "8px" }}>
            Matrix C (Output)
          </div>
          <div style={{
            display: "inline-grid",
            gridTemplateColumns: "repeat(2, 60px)",
            gap: "5px",
            borderLeft: "2px solid var(--border-color)",
            borderRight: "2px solid var(--border-color)",
            padding: "5px 10px"
          }}>
            {matrixC.map((row, r) =>
              row.map((val, c) => (
                <div
                  key={`C-${r}-${c}`}
                  onMouseEnter={() => setActiveCell({ r, c })}
                  onMouseLeave={() => setActiveCell(null)}
                  style={{
                    width: "60px",
                    padding: "8px 4px",
                    textAlign: "center",
                    backgroundColor: activeCell && activeCell.r === r && activeCell.c === c ? "var(--primary)" : "var(--card-bg)",
                    color: activeCell && activeCell.r === r && activeCell.c === c ? "var(--primary-contrast)" : "var(--foreground)",
                    border: "1px solid var(--dashed-border-color)",
                    fontWeight: "bold",
                    fontSize: "0.95rem",
                    cursor: "crosshair",
                    transition: "all 0.15s ease"
                  }}
                >
                  {val}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Detail Computation Panel */}
      <div style={{
        backgroundColor: "var(--card-bg)",
        borderLeft: activeCell ? "4px solid var(--accent-red)" : "4px solid var(--dashed-border-color)",
        padding: "15px 20px",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.9rem",
        minHeight: "50px",
        display: "flex",
        alignItems: "center",
        transition: "all 0.2s ease"
      }}>
        <div>
          <span style={{ fontWeight: "bold", color: "var(--foreground)" }}>DOT_PRODUCT_METRIC:</span>
          <p style={{ margin: "5px 0 0 0", color: "var(--text-muted)", fontSize: "0.95rem" }}>
            {getCalculationStep()}
          </p>
        </div>
      </div>
    </div>
  );
}
