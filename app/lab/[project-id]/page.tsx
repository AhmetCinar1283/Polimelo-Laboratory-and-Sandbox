import React from "react";
import Link from "next/link";
import { labsRegistry, getResolvedLecture } from "@/registry/labs";
import { LAB_COMPONENTS } from "@/components/lab/registry";
import SafeImage from "@/components/SafeImage";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    "project-id": string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const projectId = resolvedParams["project-id"];
  const activeLab = labsRegistry.find(item => item.id === projectId);

  if (!activeLab) {
    return {
      title: "Lab Module Not Found",
    };
  }

  return {
    title: `${activeLab.title} | Digital Laboratory`,
    description: activeLab.abstract,
    openGraph: {
      title: `${activeLab.title} | Digital Laboratory Sandbox`,
      description: activeLab.abstract,
      type: "website",
    }
  };
}

export default async function LabDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams["project-id"];

  // Find active lab module for backlinks
  const activeLab = labsRegistry.find(item => item.id === projectId);

  // Component lookup
  const renderVisualizer = () => {
    const Component = LAB_COMPONENTS[projectId];
    if (Component) {
      return <Component />;
    }
    return (
      <div style={{ padding: "40px 0", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif" }}>Module Not Found</h2>
        <p>The requested computation registry entry could not be located.</p>
      </div>
    );
  };

  const labSchema = activeLab ? {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": activeLab.title,
    "description": activeLab.abstract,
    "author": {
      "@type": "Person",
      "name": "Ahmet Çınar",
      "url": "https://polimelo.com"
    },
    "keywords": activeLab.keywords.join(", ")
  } : null;

  return (
    <div style={{
      padding: "60px 40px 80px 40px",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      backgroundColor: "var(--background)", 
      color: "var(--foreground)",
      minHeight: "100vh",
      lineHeight: "1.6"
    }}>
      {labSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(labSchema) }}
        />
      )}
      {activeLab && activeLab.referencedLectures.map((ref) => (
        <script
          key={ref.courseId}
          dangerouslySetInnerHTML={{
            __html: `localStorage.setItem('last-visited-item:${ref.courseId}', 'lab:${projectId}')`
          }}
        />
      ))}
      <div style={{ maxWidth: "850px", margin: "0 auto" }} className="animate-fade-in">
        
        {/* Navigation */}
        <nav>
          <Link 
            href="/lab" 
            className="transition-all duration-200 inline-flex items-center gap-1.5 text-neutral-500 font-bold hover:text-neutral-800 hover:-translate-x-1 mb-10 text-sm font-mono"
          >
            ← RETURN_TO_LAB_REGISTRY()
          </Link>
        </nav>

        {/* Lab Header */}
        <header style={{ 
          marginBottom: "50px", 
          borderBottom: "2px solid var(--border-color)", 
          paddingBottom: "20px"
        }}>
          <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "2px", color: "var(--text-muted)", marginBottom: "5px" }}>
            Open Research Sandbox / Component Node: {projectId.toUpperCase()}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
            <SafeImage 
              src="/logo-square.png"
              alt="Polimelo Logo" 
              style={{ width: "36px", height: "36px", borderRadius: "8px", border: "1.5px solid var(--border-color)", objectFit: "cover" }}
            />
            <h1 style={{ 
              fontSize: "2.2rem", 
              margin: 0, 
              fontWeight: "700", 
              letterSpacing: "-0.02em", 
              color: "var(--title-color)",
              fontFamily: "Georgia, serif" 
            }}>
              LAB_PROJECT_RUN()
            </h1>
          </div>
        </header>

        {/* Render Interactive Module */}
        <main style={{ minHeight: "350px" }}>
          {renderVisualizer()}
        </main>

        {/* Backlinks to theoretical references */}
        {activeLab && activeLab.referencedLectures.length > 0 && (
          <section style={{
            marginTop: "50px",
            padding: "20px",
            border: "1px dashed var(--dashed-border-color)",
            backgroundColor: "var(--card-bg)",
            animationDelay: "0.1s"
          }} className="animate-fade-in">
            <h3 style={{
              fontSize: "0.8rem",
              textTransform: "uppercase",
              letterSpacing: "1px",
              color: "var(--text-muted)",
              margin: "0 0 12px 0",
              fontWeight: "bold",
              fontFamily: "'Courier New', monospace"
            }}>
              Theoretical References
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {activeLab.referencedLectures.map((ref, idx) => {
                const lecture = getResolvedLecture(ref);
                return (
                  <div key={idx} style={{ fontSize: "0.95rem" }}>
                    <span style={{ color: "var(--text-muted)", fontFamily: "'Courier New', monospace", marginRight: "8px" }}>[{lecture.code}]</span>
                    <Link 
                      href={`/courses/${lecture.courseId}/${lecture.lectureSlug}`}
                      style={{
                        color: "var(--foreground)",
                        textDecoration: "underline",
                        fontWeight: "bold"
                      }}
                    >
                      {lecture.lectureTitle} ↗
                    </Link>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Global Footer */}
        <footer style={{ marginTop: "100px", borderTop: "1px dashed var(--dashed-border-color)", paddingTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "center" }}>
          Polimelo Indexing Protocol • Node {projectId} active
        </footer>

      </div>
    </div>
  );
}

// Pre-render lab detail static params
export async function generateStaticParams() {
  return labsRegistry.map(lab => ({
    "project-id": lab.id
  }));
}

export const dynamicParams = false;

