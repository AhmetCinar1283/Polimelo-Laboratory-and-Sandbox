import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import React from "react";
import { Callout, Quiz } from "@/components/shared";

interface RefProps {
  lab?: string;
  course?: string;
  lecture?: string;
  label: string;
}

const Ref: React.FC<RefProps> = ({ lab, course, lecture, label }) => {
  let href = "";
  let icon = "🔗";
  
  if (lab) {
    href = `/lab/${lab}`;
    icon = "🔬";
  } else if (course) {
    if (lecture) {
      href = `/courses/${course}/${lecture}`;
      icon = "📚";
    } else {
      href = `/courses/${course}`;
      icon = "📚";
    }
  }

  return (
    <Link 
      href={href} 
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        backgroundColor: "var(--theory-badge-bg)",
        color: "var(--foreground)",
        border: "1px solid var(--border-color)",
        padding: "3px 8px",
        fontSize: "0.85rem",
        fontFamily: "'Courier New', monospace",
        textDecoration: "none",
        fontWeight: "bold",
        margin: "0 4px",
        verticalAlign: "middle",
        transition: "all 0.15s ease",
        boxShadow: "2px 2px 0px var(--border-color)"
      }}
      className="ref-link-hover"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Ref: Ref as any, // Expose globally to MDX files
    Callout: Callout as any,
    Quiz: Quiz as any,
    h1: ({ children }) => (
      <h1
        style={{
          fontSize: "2rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color)",
          borderBottom: "2px solid var(--border-color)",
          paddingBottom: "10px",
          marginTop: "40px",
          marginBottom: "20px",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "1.5rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color)",
          borderBottom: "1px dashed var(--dashed-border-color)",
          paddingBottom: "5px",
          marginTop: "30px",
          marginBottom: "15px",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "1.2rem",
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          color: "var(--title-color)",
          marginTop: "25px",
          marginBottom: "10px",
        }}
      >
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p
        style={{
          fontSize: "1rem",
          fontFamily: "system-ui, sans-serif",
          lineHeight: "1.6",
          color: "var(--foreground)",
          marginBottom: "20px",
          textAlign: "justify",
        }}
      >
        {children}
      </p>
    ),
    a: ({ href, children }) => {
      const isInternal = href && href.startsWith("/");
      const style = {
        color: "var(--foreground)",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        transition: "all 0.2s ease",
        fontWeight: "bold" as const,
      };
      if (isInternal) {
        return (
          <Link href={href} style={style}>
            {children}
          </Link>
        );
      }
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={style}>
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul
        style={{
          listStyleType: "square",
          paddingLeft: "20px",
          marginBottom: "20px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          listStyleType: "decimal",
          paddingLeft: "20px",
          marginBottom: "20px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li
        style={{
          marginBottom: "8px",
          fontSize: "0.95rem",
          color: "var(--foreground)",
        }}
      >
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid var(--border-color)",
          paddingLeft: "20px",
          fontStyle: "italic",
          color: "var(--text-muted)",
          margin: "20px 0",
          backgroundColor: "var(--card-bg)",
          padding: "15px 20px",
        }}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          backgroundColor: "var(--code-bg)",
          border: "1px solid var(--dashed-border-color)",
          padding: "15px",
          overflowX: "auto",
          marginBottom: "25px",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.9rem",
          lineHeight: "1.4",
        }}
      >
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code
        style={{
          backgroundColor: "var(--code-inline-bg)",
          padding: "2px 5px",
          borderRadius: "3px",
          fontFamily: "'Courier New', monospace",
          fontSize: "0.85rem",
        }}
      >
        {children}
      </code>
    ),
    hr: () => (
      <hr
        style={{
          border: "none",
          borderBottom: "1px dashed var(--dashed-border-color)",
          margin: "30px 0",
        }}
      />
    ),
    ...components,
  };
}

