"use client";

import React, { useState } from "react";

export function LineChart({
  title,
  xAxisLabel,
  yAxisLabel,
  initialSlope = 1.5,
  initialIntercept = 2,
  showDataPoints = true,
}: {
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  initialSlope?: number;
  initialIntercept?: number;
  showDataPoints?: boolean;
}) {
  const [slope, setSlope] = useState(initialSlope);
  const [intercept, setIntercept] = useState(initialIntercept);

  // SVG configuration
  const width = 450;
  const height = 280;
  const margin = 40;

  // Coordinate mapping functions
  const getSvgX = (x: number) => margin + (x / 10) * (width - 2 * margin);
  const getSvgY = (y: number) => height - margin - (y / 20) * (height - 2 * margin);

  // Hardcoded real-world dataset representing the example
  const points = [
    { x: 1, y: 3.5 },
    { x: 3, y: 6.5 },
    { x: 5, y: 9.5 },
    { x: 7, y: 12.5 },
    { x: 9, y: 15.5 },
  ];

  // Regression line calculation points
  const yStart = intercept;
  const yEnd = slope * 10 + intercept;

  const svgXStart = getSvgX(0);
  const svgYStart = getSvgY(yStart);
  const svgXEnd = getSvgX(10);
  const svgYEnd = getSvgY(yEnd);

  return (
    <div
      style={{
        border: "2px solid var(--border-color)",
        padding: "20px",
        margin: "24px 0",
        backgroundColor: "var(--card-bg)",
        boxShadow: "4px 4px 0px var(--border-color)",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h4
        style={{
          fontSize: "1rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color)",
          marginTop: 0,
          marginBottom: "15px",
          textAlign: "center",
        }}
      >
        {title}
      </h4>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {/* Plot canvas rendering */}
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid var(--border-color)",
            padding: "10px",
            borderRadius: "2px",
          }}
        >
          <svg width={width} height={height} style={{ display: "block" }}>
            {/* Grid background lines */}
            {[2, 4, 6, 8, 10].map((val) => (
              <React.Fragment key={val}>
                <line
                  x1={getSvgX(val)}
                  y1={margin}
                  x2={getSvgX(val)}
                  y2={height - margin}
                  stroke="#eaeaea"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                <line
                  x1={margin}
                  y1={getSvgY(val * 2)}
                  x2={width - margin}
                  y2={getSvgY(val * 2)}
                  stroke="#eaeaea"
                  strokeWidth="1"
                  strokeDasharray="4,4"
                />
                {/* Labels */}
                <text
                  x={getSvgX(val)}
                  y={height - margin + 15}
                  fontSize="10"
                  textAnchor="middle"
                  fill="var(--text-muted)"
                  fontFamily="monospace"
                >
                  {val}
                </text>
                <text
                  x={margin - 8}
                  y={getSvgY(val * 2) + 4}
                  fontSize="10"
                  textAnchor="end"
                  fill="var(--text-muted)"
                  fontFamily="monospace"
                >
                  {val * 2}
                </text>
              </React.Fragment>
            ))}

            {/* Axes */}
            <line
              x1={margin}
              y1={height - margin}
              x2={width - margin}
              y2={height - margin}
              stroke="var(--border-color)"
              strokeWidth="2"
            />
            <line
              x1={margin}
              y1={margin}
              x2={margin}
              y2={height - margin}
              stroke="var(--border-color)"
              strokeWidth="2"
            />

            {/* Axis titles */}
            <text
              x={width / 2}
              y={height - 5}
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              fill="var(--foreground)"
            >
              {xAxisLabel}
            </text>
            <text
              x={12}
              y={height / 2}
              fontSize="11"
              fontWeight="bold"
              textAnchor="middle"
              transform={`rotate(-90, 12, ${height / 2})`}
              fill="var(--foreground)"
            >
              {yAxisLabel}
            </text>

            {/* Simulated Regression Line */}
            <line
              x1={svgXStart}
              y1={Math.max(margin, Math.min(height - margin, svgYStart))}
              x2={svgXEnd}
              y2={Math.max(margin, Math.min(height - margin, svgYEnd))}
              stroke="var(--accent-red)"
              strokeWidth="3"
            />

            {/* Data points */}
            {showDataPoints &&
              points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={getSvgX(p.x)}
                  cy={getSvgY(p.y)}
                  r="5"
                  fill="var(--primary)"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              ))}
          </svg>
        </div>

        {/* Controls Slider */}
        <div
          style={{
            flex: "1",
            minWidth: "200px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            justifyContent: "center",
            fontFamily: "'Courier New', monospace",
          }}
        >
          <div style={{ fontSize: "0.8rem", fontWeight: "bold", textTransform: "uppercase", color: "var(--text-muted)" }}>
            Equation Controls
          </div>
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: "bold", color: "var(--title-color)" }}>
              y = {slope.toFixed(2)}x + {intercept.toFixed(1)}
            </div>
          </div>

          <div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
              <span>Slope (w):</span>
              <strong>{slope.toFixed(2)}</strong>
            </label>
            <input
              type="range"
              min="0"
              max="3"
              step="0.1"
              value={slope}
              onChange={(e) => setSlope(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-red)", cursor: "ew-resize" }}
            />
          </div>

          <div>
            <label style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "4px" }}>
              <span>Intercept (b):</span>
              <strong>{intercept.toFixed(1)}</strong>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={intercept}
              onChange={(e) => setIntercept(parseFloat(e.target.value))}
              style={{ width: "100%", accentColor: "var(--accent-red)", cursor: "ew-resize" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
