"use client";

import React, { useState } from "react";

export function VectorVisualizer() {
  const [vectorA, setVectorA] = useState({ x: 3, y: 2 });
  const [vectorB, setVectorB] = useState({ x: -1, y: 3 });
  const [scalar, setScalar] = useState(1.5);
  const [operation, setOperation] = useState<"add" | "sub" | "scale">("add");

  // Grid / SVG Dimensions
  const size = 300;
  const gridMax = 6;
  const margin = 20;

  // Map math coordinates to SVG coordinates
  const toSvgX = (x: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    return margin + (x + gridMax) * scale;
  };

  const toSvgY = (y: number) => {
    const scale = (size - 2 * margin) / (2 * gridMax);
    // Invert Y axis for standard math coordinates
    return size - (margin + (y + gridMax) * scale);
  };

  // Result calculations
  const result = {
    x: operation === "add" ? vectorA.x + vectorB.x : operation === "sub" ? vectorA.x - vectorB.x : vectorA.x * scalar,
    y: operation === "add" ? vectorA.y + vectorB.y : operation === "sub" ? vectorA.y - vectorB.y : vectorA.y * scalar,
  };

  // Generate grid lines
  const gridLines = [];
  for (let i = -gridMax; i <= gridMax; i++) {
    if (i !== 0) {
      gridLines.push(
        <React.Fragment key={`grid-${i}`}>
          {/* Vertical */}
          <line
            x1={toSvgX(i)}
            y1={margin}
            x2={toSvgX(i)}
            y2={size - margin}
            stroke="#e5e5e5"
            strokeWidth="0.8"
            strokeDasharray={i === 0 ? "" : "3,3"}
          />
          {/* Horizontal */}
          <line
            x1={margin}
            y1={toSvgY(i)}
            x2={size - margin}
            y2={toSvgY(i)}
            stroke="#e5e5e5"
            strokeWidth="0.8"
            strokeDasharray={i === 0 ? "" : "3,3"}
          />
          {/* Axis Labels */}
          {i % 2 === 0 && (
            <>
              <text
                x={toSvgX(i)}
                y={toSvgY(0) + 12}
                fontSize="9"
                textAnchor="middle"
                fill="#999"
                fontFamily="monospace"
              >
                {i}
              </text>
              <text
                x={toSvgX(0) - 8}
                y={toSvgY(i) + 3}
                fontSize="9"
                textAnchor="end"
                fill="#999"
                fontFamily="monospace"
              >
                {i}
              </text>
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
        Interactive Vector Operations Workspace
      </h4>

      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* SVG Visualization */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--border-color, #000)",
            padding: "10px",
            borderRadius: "2px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <svg width={size} height={size} style={{ display: "block", overflow: "visible" }}>
            {/* Arrow Marker Definitions */}
            <defs>
              <marker id="arrow-a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#0066cc" />
              </marker>
              <marker id="arrow-b" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#009944" />
              </marker>
              <marker id="arrow-result" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#cc3300" />
              </marker>
              <marker id="arrow-dashed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 2 L 10 5 L 0 8 z" fill="#009944" opacity="0.6" />
              </marker>
            </defs>

            {/* Grid lines */}
            {gridLines}

            {/* Principal Axes */}
            <line
              x1={margin}
              y1={toSvgY(0)}
              x2={size - margin}
              y2={toSvgY(0)}
              stroke="#666666"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0)}
              y1={margin}
              x2={toSvgX(0)}
              y2={size - margin}
              stroke="#666666"
              strokeWidth="1.5"
            />

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
            <text
              x={toSvgX(vectorA.x / 2) - 8}
              y={toSvgY(vectorA.y / 2) - 8}
              fill="#0066cc"
              fontSize="12"
              fontWeight="bold"
              fontFamily="monospace"
            >
              A
            </text>

            {/* Vector B & Tip-to-Tail (Green) */}
            {operation !== "scale" && (
              <>
                {/* Vector B from Origin (Dashed) */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(0)}
                  x2={toSvgX(vectorB.x)}
                  y2={toSvgY(vectorB.y)}
                  stroke="#009944"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  opacity="0.5"
                />
                
                {/* Tip-to-Tail positioning */}
                {operation === "add" && (
                  <line
                    x1={toSvgX(vectorA.x)}
                    y1={toSvgY(vectorA.y)}
                    x2={toSvgX(vectorA.x + vectorB.x)}
                    y2={toSvgY(vectorA.y + vectorB.y)}
                    stroke="#009944"
                    strokeWidth="2.5"
                    markerEnd="url(#arrow-b)"
                  />
                )}

                {/* Subtraction visualization: -B added to A */}
                {operation === "sub" && (
                  <>
                    <line
                      x1={toSvgX(vectorA.x)}
                      y1={toSvgY(vectorA.y)}
                      x2={toSvgX(vectorA.x - vectorB.x)}
                      y2={toSvgY(vectorA.y - vectorB.y)}
                      stroke="#009944"
                      strokeWidth="2"
                      strokeDasharray="3,3"
                      markerEnd="url(#arrow-dashed)"
                      opacity="0.8"
                    />
                    <text
                      x={toSvgX(vectorA.x - vectorB.x / 2) + 8}
                      y={toSvgY(vectorA.y - vectorB.y / 2) - 8}
                      fill="#009944"
                      fontSize="10"
                      fontFamily="monospace"
                      opacity="0.8"
                    >
                      -B
                    </text>
                  </>
                )}
                
                <text
                  x={operation === "add" ? toSvgX(vectorA.x + vectorB.x / 2) + 8 : toSvgX(vectorB.x / 2) - 8}
                  y={operation === "add" ? toSvgY(vectorA.y + vectorB.y / 2) - 8 : toSvgY(vectorB.y / 2) - 8}
                  fill="#009944"
                  fontSize="12"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  B
                </text>
              </>
            )}

            {/* Result Vector (Red) */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(result.x)}
              y2={toSvgY(result.y)}
              stroke="#cc3300"
              strokeWidth="3"
              markerEnd="url(#arrow-result)"
            />
            <text
              x={toSvgX(result.x) + (result.x >= 0 ? 8 : -16)}
              y={toSvgY(result.y) + (result.y >= 0 ? -8 : 12)}
              fill="#cc3300"
              fontSize="12"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {operation === "add" ? "A+B" : operation === "sub" ? "A-B" : `${scalar}A`}
            </text>
          </svg>
          <div style={{ marginTop: "12px", fontSize: "0.8rem", color: "#666", fontFamily: "monospace" }}>
            Result Vector: [{result.x.toFixed(1)}, {result.y.toFixed(1)}]
          </div>
        </div>

        {/* Controls */}
        <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "8px" }}>
              Select Operation
            </div>
            <div style={{ display: "flex", gap: "6px" }}>
              {(["add", "sub", "scale"] as const).map((op) => (
                <button
                  key={op}
                  onClick={() => setOperation(op)}
                  style={{
                    flex: 1,
                    padding: "6px 4px",
                    fontSize: "0.75rem",
                    fontWeight: "bold",
                    fontFamily: "monospace",
                    cursor: "pointer",
                    border: "1px solid var(--border-color, #000)",
                    backgroundColor: operation === op ? "var(--border-color, #000)" : "#ffffff",
                    color: operation === op ? "#ffffff" : "var(--border-color, #000)",
                    transition: "all 0.15s ease",
                  }}
                >
                  {op === "add" ? "ADD (A+B)" : op === "sub" ? "SUB (A-B)" : "SCALE (cA)"}
                </button>
              ))}
            </div>
          </div>

          {/* Vector A Sliders */}
          <div>
            <div style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "monospace", color: "#0066cc", marginBottom: "4px" }}>
              Vector A = [{vectorA.x}, {vectorA.y}]
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span>X Component:</span>
                  <strong>{vectorA.x}</strong>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={vectorA.x}
                  onChange={(e) => setVectorA({ ...vectorA, x: parseInt(e.target.value) })}
                  style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                />
              </div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                  <span>Y Component:</span>
                  <strong>{vectorA.y}</strong>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="1"
                  value={vectorA.y}
                  onChange={(e) => setVectorA({ ...vectorA, y: parseInt(e.target.value) })}
                  style={{ width: "100%", accentColor: "#0066cc", cursor: "ew-resize" }}
                />
              </div>
            </div>
          </div>

          {/* Vector B Sliders (only if add or sub) */}
          {operation !== "scale" ? (
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "monospace", color: "#009944", marginBottom: "4px" }}>
                Vector B = [{vectorB.x}, {vectorB.y}]
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span>X Component:</span>
                    <strong>{vectorB.x}</strong>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={vectorB.x}
                    onChange={(e) => setVectorB({ ...vectorB, x: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                    <span>Y Component:</span>
                    <strong>{vectorB.y}</strong>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={vectorB.y}
                    onChange={(e) => setVectorB({ ...vectorB, y: parseInt(e.target.value) })}
                    style={{ width: "100%", accentColor: "#009944", cursor: "ew-resize" }}
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Scalar Slider (only if scale) */
            <div>
              <div style={{ fontSize: "0.8rem", fontWeight: "bold", fontFamily: "monospace", color: "#cc3300", marginBottom: "4px" }}>
                Scalar Factor (c) = {scalar.toFixed(1)}
              </div>
              <input
                type="range"
                min="-2"
                max="2"
                step="0.1"
                value={scalar}
                onChange={(e) => setScalar(parseFloat(e.target.value))}
                style={{ width: "100%", accentColor: "#cc3300", cursor: "ew-resize" }}
              />
            </div>
          )}

          {/* Equation Text */}
          <div
            style={{
              padding: "10px",
              backgroundColor: "#f0f0f0",
              border: "1px solid #ddd",
              fontSize: "0.75rem",
              fontFamily: "monospace",
              color: "#333",
            }}
          >
            {operation === "add" && (
              <>
                [{vectorA.x}, {vectorA.y}] + [{vectorB.x}, {vectorB.y}] = [
                {vectorA.x} + ({vectorB.x}), {vectorA.y} + ({vectorB.y})] = [{result.x}, {result.y}]
              </>
            )}
            {operation === "sub" && (
              <>
                [{vectorA.x}, {vectorA.y}] - [{vectorB.x}, {vectorB.y}] = [
                {vectorA.x} - ({vectorB.x}), {vectorA.y} - ({vectorB.y})] = [{result.x}, {result.y}]
              </>
            )}
            {operation === "scale" && (
              <>
                {scalar.toFixed(1)} * [{vectorA.x}, {vectorA.y}] = [
                {scalar.toFixed(1)} * {vectorA.x}, {scalar.toFixed(1)} * {vectorA.y}] = [
                {result.x.toFixed(1)}, {result.y.toFixed(1)}]
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
