"use client";

import React, { useState } from "react";

export function Quiz({
  question,
  options,
  explanation,
}: {
  question: string;
  options: { text: string; isCorrect: boolean }[];
  explanation: string;
}) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (submitted) return;
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setSubmitted(false);
  };

  return (
    <div
      style={{
        border: "2px solid var(--border-color)",
        padding: "24px",
        backgroundColor: "var(--card-bg)",
        boxShadow: "4px 4px 0px var(--border-color)",
        margin: "32px 0",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          fontFamily: "'Courier New', monospace",
          fontSize: "0.8rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          color: "var(--text-muted)",
          marginBottom: "12px",
        }}
      >
        Quiz / Test Your Knowledge
      </div>
      <h3
        style={{
          fontSize: "1.15rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color)",
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        {question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        {options.map((opt, idx) => {
          let bg = "var(--background)";
          let border = "1px solid var(--dashed-border-color)";
          let color = "var(--foreground)";
          let cursor = "pointer";

          if (submitted) {
            cursor = "default";
            if (opt.isCorrect) {
              bg = "rgba(68, 184, 85, 0.2)";
              border = "1px solid var(--accent-green)";
            } else if (idx === selectedIdx) {
              bg = "rgba(239, 90, 90, 0.2)";
              border = "1px solid var(--accent-red)";
            }
          } else if (idx === selectedIdx) {
            border = "2px solid var(--border-color)";
            bg = "var(--card-bg-hover)";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleOptionClick(idx)}
              style={{
                textAlign: "left",
                padding: "12px 16px",
                backgroundColor: bg,
                border: border,
                color: color,
                cursor: cursor,
                fontSize: "0.95rem",
                width: "100%",
                transition: "all 0.15s ease",
              }}
            >
              {opt.text}
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedIdx === null}
            style={{
              padding: "8px 16px",
              backgroundColor: selectedIdx === null ? "var(--dashed-border-color)" : "var(--primary)",
              color: "var(--primary-contrast)",
              border: "1px solid var(--border-color)",
              fontWeight: "bold",
              cursor: selectedIdx === null ? "not-allowed" : "pointer",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.85rem",
            }}
          >
            SUBMIT_ANSWER()
          </button>
        ) : (
          <button
            onClick={handleReset}
            style={{
              padding: "8px 16px",
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border-color)",
              fontWeight: "bold",
              cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              fontSize: "0.85rem",
            }}
          >
            RETRY_QUIZ()
          </button>
        )}
      </div>

      {submitted && (
        <div
          style={{
            marginTop: "20px",
            paddingTop: "15px",
            borderTop: "1px dashed var(--dashed-border-color)",
            fontSize: "0.9rem",
            lineHeight: "1.5",
            color: "var(--foreground)",
          }}
        >
          <strong>{options[selectedIdx!].isCorrect ? "Correct! " : "Incorrect. "}</strong>
          {explanation}
        </div>
      )}
    </div>
  );
}
