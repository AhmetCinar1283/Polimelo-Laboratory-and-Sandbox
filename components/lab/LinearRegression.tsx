"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../ThemeProvider";

interface Point {
  x: number;
  y: number;
}

export default function LinearRegression() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [points, setPoints] = useState<Point[]>([
    { x: 100, y: 220 },
    { x: 150, y: 190 },
    { x: 250, y: 150 },
    { x: 300, y: 110 },
    { x: 380, y: 70 },
  ]);

  const [metrics, setMetrics] = useState({
    slope: 0,
    intercept: 0,
    r2: 0,
  });

  const { theme } = useTheme();


  // Calculate Linear Regression Parameters
  useEffect(() => {
    if (points.length < 2) {
      setMetrics({ slope: 0, intercept: 0, r2: 0 });
      return;
    }

    const n = points.length;
    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumXX = 0;
    let sumYY = 0;

    points.forEach((p) => {
      sumX += p.x;
      sumY += p.y;
      sumXY += p.x * p.y;
      sumXX += p.x * p.x;
      sumYY += p.y * p.y;
    });

    const numSlope = n * sumXY - sumX * sumY;
    const denSlope = n * sumXX - sumX * sumX;

    if (denSlope === 0) {
      setMetrics({ slope: 0, intercept: 0, r2: 0 });
      return;
    }

    const slope = numSlope / denSlope;
    const intercept = (sumY - slope * sumX) / n;

    // R2 Calculation
    const meanY = sumY / n;
    let ssTot = 0;
    let ssRes = 0;

    points.forEach((p) => {
      const predY = slope * p.x + intercept;
      ssTot += Math.pow(p.y - meanY, 2);
      ssRes += Math.pow(p.y - predY, 2);
    });

    const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;

    setMetrics({ slope, intercept, r2 });
  }, [points]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const isDark = theme === "dark";

    // Clear Canvas
    ctx.fillStyle = isDark ? "#222225" : "#ffffff";
    ctx.fillRect(0, 0, width, height);

    // Draw Grid Lines (light dashed)
    ctx.strokeStyle = isDark ? "#2e2e32" : "#eaeaea";
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    for (let x = 50; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 50; y < height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.setLineDash([]); // Reset dashed lines

    // Draw Axis lines
    ctx.strokeStyle = isDark ? "#4e4e54" : "#ccc";
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, height - 30);
    ctx.lineTo(width, height - 30);
    ctx.stroke();

    // Draw Regression Line
    if (points.length >= 2) {
      ctx.strokeStyle = isDark ? "#e3e3e6" : "#111";
      ctx.lineWidth = 2;
      ctx.beginPath();

      const startX = 30;
      const startY = metrics.slope * startX + metrics.intercept;
      const endX = width - 20;
      const endY = metrics.slope * endX + metrics.intercept;

      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }

    // Draw Data Points
    points.forEach((p) => {
      ctx.fillStyle = isDark ? "#e3e3e6" : "#111";
      ctx.strokeStyle = isDark ? "#222225" : "#fff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    });
  }, [points, metrics, theme]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Don't add point if it's too close to the margins/axes
    if (x < 20 || y > canvas.height - 20) return;

    setPoints([...points, { x, y }]);
  };

  const handleReset = () => {
    setPoints([]);
  };

  // Convert canvas pixels back to logical numbers for mathematical notation
  // Canvas y goes down, so we flip it for typical coordinate systems
  const logicalSlope = -metrics.slope;
  const logicalIntercept = 300 - metrics.intercept;

  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", color: "var(--foreground)" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", margin: "0 0 15px 0", color: "var(--title-color)" }}>
        📉 Machine Learning: Linear Regression Simulator
      </h2>
      <p style={{ fontSize: "0.95rem", color: "var(--foreground)", marginBottom: "20px" }}>
        Linear regression fits a linear equation to observed data. Click anywhere inside the white grid area to insert custom 2D data points. The model will recalculate the optimal slope and intercept parameters dynamically.
      </p>

      <div style={{ display: "flex", gap: "25px", flexWrap: "wrap", marginBottom: "25px" }}>
        {/* Canvas Area */}
        <div style={{ border: "2px solid var(--border-color)", display: "inline-block", backgroundColor: "var(--card-bg)" }}>
          <canvas
            ref={canvasRef}
            width={500}
            height={300}
            onClick={handleCanvasClick}
            style={{ display: "block", cursor: "crosshair" }}
          />
        </div>

        {/* Control and Metrics Panel */}
        <div style={{ flex: "1", minWidth: "220px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ padding: "15px", border: "1px dashed var(--dashed-border-color)", backgroundColor: "var(--card-bg)" }}>
            <div style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "1px", color: "var(--text-muted)", marginBottom: "12px", fontWeight: "bold" }}>
              COMPUTED_PARAMETERS
            </div>
            
            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "var(--text-muted)" }}>Model Equation:</span>
              <div style={{ fontSize: "1.05rem", fontWeight: "bold", marginTop: "3px", color: "var(--title-color)" }}>
                ŷ = {logicalSlope.toFixed(4)}x + {logicalIntercept.toFixed(2)}
              </div>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "var(--text-muted)" }}>Slope (m):</span>{" "}
              <strong style={{ color: "var(--foreground)" }}>{logicalSlope.toFixed(4)}</strong>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "var(--text-muted)" }}>y-Intercept (b):</span>{" "}
              <strong style={{ color: "var(--foreground)" }}>{logicalIntercept.toFixed(2)}</strong>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <span style={{ color: "var(--text-muted)" }}>R² Score:</span>{" "}
              <strong style={{ color: metrics.r2 > 0.7 ? "var(--accent-green)" : "var(--accent-red)" }}>
                {metrics.r2.toFixed(4)}
              </strong>
            </div>

            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "12px" }}>
              Data count: <strong>{points.length} points</strong>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="btn-execute"
            style={{
              padding: "10px 18px",
              backgroundColor: "var(--primary)",
              color: "var(--primary-contrast)",
              border: "1px solid var(--border-color)",
              fontWeight: "bold",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              marginTop: "15px",
              alignSelf: "flex-start"
            }}
          >
            RESET_SIMULATOR() ↺
          </button>
        </div>
      </div>
    </div>
  );
}
