import React from "react";
import type { Metadata } from "next";
import { coursesRegistry } from "@/registry/courses";
import CoursesHubClient from "@/components/courses/CoursesHubClient";

export const metadata: Metadata = {
  title: "Structured Courses & Study Roadmaps | Ahmet Çınar",
  description: "Explore structured academic outlines, study roadmaps, and detailed derivations covering linear algebra, neural networks, machine learning mechanics, and numerical computing.",
  alternates: {
    canonical: "/courses",
  },
  keywords: [
    "Linear Algebra for ML",
    "Neural Networks syllabus",
    "Academic roadmaps",
    "Study guides",
    "Linear algebra course",
    "Deep learning roadmap",
    "Ahmet Çınar courses",
    "Polimelo courses"
  ],
  openGraph: {
    title: "Structured Courses & Study Roadmaps | Ahmet Çınar",
    description: "Explore structured academic outlines, study roadmaps, and detailed derivations covering linear algebra, neural networks, machine learning mechanics, and numerical computing.",
    url: "https://polimelo.com/courses",
    type: "website",
    images: [
      {
        url: "/polimelo-lab-logo.png",
        width: 1200,
        height: 630,
        alt: "Structured Courses Outlines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Structured Courses & Study Roadmaps | Ahmet Çınar",
    description: "Explore structured academic outlines, study roadmaps, and detailed derivations covering linear algebra, neural networks, machine learning mechanics, and numerical computing.",
    images: ["/polimelo-lab-logo.png"],
  },
};

export default function CoursesPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ahmet Çınar's Academic Outlines & Study Tracks",
    "description": "A curated directory of mathematical, algorithmic, and computational study guides.",
    "url": "https://polimelo.com/courses",
    "itemListElement": coursesRegistry.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://polimelo.com/courses/${course.id}`,
      "name": course.title,
      "description": course.description
    }))
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Structured Courses & Study Roadmaps",
    "description": "Rigorous academic study tracks on computing and mathematics.",
    "url": "https://polimelo.com/courses",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Hub",
          "item": "https://polimelo.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Courses",
          "item": "https://polimelo.com/courses"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <CoursesHubClient courses={coursesRegistry} />
    </>
  );
}
