import type { MetadataRoute } from "next";
import { coursesRegistry } from "@/registry/courses";
import { labsRegistry } from "@/registry/labs";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://polimelo.com";
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/lab`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Dynamic Courses Syllabus
  const coursePages = coursesRegistry.map((course) => ({
    url: `${baseUrl}/courses/${course.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Lectures Detail Pages
  const lecturePages = coursesRegistry.flatMap((course) => 
    course.lectures.map((lecture) => ({
      url: `${baseUrl}/courses/${course.id}/${lecture.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  // Dynamic Lab Projects
  const labPages = labsRegistry.map((lab) => ({
    url: `${baseUrl}/lab/${lab.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...coursePages, ...lecturePages, ...labPages];
}
