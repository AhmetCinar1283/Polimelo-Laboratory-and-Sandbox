"use client";

import React from "react";

export function Callout({ type = "info", children }: { type?: string; children: React.ReactNode }) {
  const isWarning = type === "warning";
  const icon = isWarning ? "⚠️" : "ℹ️";
  const borderColor = isWarning ? "var(--accent-red)" : "var(--border-color)";
  const bgColor = isWarning ? "rgba(239, 90, 90, 0.05)" : "var(--theory-badge-bg)";
  return (
    <div
      style={{
        borderLeft: `4px solid ${borderColor}`,
        padding: "16px",
        margin: "24px 0",
        backgroundColor: bgColor,
        color: "var(--foreground)",
        fontFamily: "system-ui, sans-serif",
        fontSize: "0.95rem",
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
        <span style={{ fontSize: "1.2rem", lineHeight: "1.2" }}>{icon}</span>
        <div>{children}</div>
      </div>
    </div>
  );
}
