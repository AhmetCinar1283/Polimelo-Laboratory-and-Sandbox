"use client";

import { useEffect, useRef, useState } from "react";

export default function SayHello() {
  const [status, setStatus] = useState("Loading engine...");
  const [inputName, setInputName] = useState("Ahmet");
  const [pythonOutput, setPythonOutput] = useState("");
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Start Web Worker in the background
    workerRef.current = new Worker(
      new URL("../../local-workers/sparse-solver.worker.ts", import.meta.url)
    );

    // Listen to worker messages
    workerRef.current.onmessage = (event: MessageEvent) => {
      const { type, message, data } = event.data;

      if (type === "READY") {
        setStatus("Active (Python running in browser via WebAssembly)");
      } else if (type === "HELLO_RESPONSE") {
        setPythonOutput(data);
      } else if (type === "ERROR") {
        setStatus(`Error occurred!`);
        console.error(message);
      }
    };

    // Send init message
    workerRef.current.postMessage({ type: "INIT_ENGINE" });

    // Clean up worker on unmount
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleHelloClick = () => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        type: "SAY_HELLO",
        name: inputName,
      });
    }
  };

  return (
    <div style={{ fontFamily: "'Courier New', Courier, monospace", color: "var(--foreground)" }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.6rem", margin: "0 0 15px 0", color: "var(--title-color)" }}>
        🔬 WebAssembly Python Runtime Verification
      </h2>
      <p style={{ fontSize: "0.95rem", color: "var(--foreground)", marginBottom: "20px" }}>
        This page verifies the setup of Pyodide running inside a background Web Worker thread.
        It downloads a Python module compiled in WebAssembly, loads it inside the worker, and invokes it.
      </p>

      <div style={{ 
        padding: "15px", 
        border: "1px dashed var(--dashed-border-color)", 
        backgroundColor: "var(--card-bg)", 
        marginBottom: "20px",
        fontSize: "0.9rem",
        color: "var(--foreground)"
      }}>
        <div><strong>Engine Status:</strong> <span style={{ color: status.startsWith("Active") ? "var(--accent-green)" : "var(--accent-red)", fontWeight: "bold" }}>{status}</span></div>
      </div>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "25px" }}>
        <input
          type="text"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={{ 
            padding: "8px 12px", 
            border: "1px solid var(--border-color)", 
            fontFamily: "'Courier New', monospace",
            fontSize: "0.9rem",
            backgroundColor: "var(--input-bg)",
            color: "var(--foreground)",
            outline: "none"
          }}
        />
        <button
          onClick={handleHelloClick}
          className="btn-execute"
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "var(--primary)", 
            color: "var(--primary-contrast)", 
            border: "1px solid var(--border-color)", 
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            cursor: "pointer" 
          }}
        >
          SEND_TO_PYTHON() →
        </button>
      </div>

      {pythonOutput && (
        <div style={{ 
          marginTop: "20px", 
          padding: "15px", 
          backgroundColor: "var(--code-bg)", 
          borderLeft: "4px solid var(--border-color)",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.9rem"
        }}>
          <strong>PYTHON_STDOUT:</strong>
          <p style={{ margin: "5px 0 0 0", color: "var(--foreground)" }}>{pythonOutput}</p>
        </div>
      )}
    </div>
  );
}
