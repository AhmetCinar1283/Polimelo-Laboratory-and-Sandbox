import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academic Outlines & Structured Study Notes",
  description: "Explore chronological study notes, mathematical derivations, neural network calculus, and algorithmic formulations typeset in LaTeX by Ahmet Çınar.",
  openGraph: {
    title: "Academic Outlines & Structured Study Notes | Ahmet Çınar",
    description: "Explore chronological study notes, mathematical derivations, neural network calculus, and algorithmic formulations typeset in LaTeX by Ahmet Çınar.",
    type: "website",
  }
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
