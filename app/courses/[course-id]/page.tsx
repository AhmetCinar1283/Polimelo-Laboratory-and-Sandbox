import React from "react";
import Link from "next/link";
import { coursesRegistry } from "@/registry/courses";
import { labsRegistry } from "@/registry/labs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    "course-id": string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const courseId = resolvedParams["course-id"];
  const course = coursesRegistry.find(item => item.id === courseId);

  if (!course) {
    return {
      title: "Course Not Found",
    };
  }

  return {
    title: course.title,
    description: course.description,
    openGraph: {
      title: `${course.title} | Academic Outlines`,
      description: course.description,
      type: "website",
    }
  };
}

export default async function CourseSyllabusPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = resolvedParams["course-id"];

  // Find course in registry
  const course = coursesRegistry.find(item => item.id === courseId);

  if (!course) {
    return (
      <div className="py-20 px-10 text-center font-mono bg-background text-foreground min-h-screen">
        <h1 className="font-serif text-3xl mb-4 font-bold text-neutral-800">Course Not Found</h1>
        <p className="mb-6 text-sm text-neutral-500">The requested course track could not be found in our database.</p>
        <Link href="/courses" className="text-neutral-800 underline font-bold">
          RETURN_TO_COURSES()
        </Link>
      </div>
    );
  }

  // Find lab experiments related to this course
  const relatedLabs = labsRegistry.filter(lab => 
    lab.referencedLectures.some(lecture => lecture.courseId === courseId)
  );

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": course.title,
    "description": course.description,
    "provider": {
      "@type": "Person",
      "name": "Ahmet Çınar",
      "sameAs": "https://polimelo.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "instructionalProgramName": "Ahmet Çınar's Academic Outlines"
    }
  };

  return (
    <div className="py-16 px-10 bg-background text-foreground min-h-screen leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <div className="max-w-[850px] mx-auto animate-fade-in">
        
        {/* Navigation */}
        <nav>
          <Link 
            href="/courses" 
            className="transition-all duration-200 inline-flex items-center gap-1.5 text-neutral-500 font-bold hover:text-neutral-800 hover:-translate-x-1 mb-10 text-sm font-mono"
          >
            ← RETURN_TO_COURSES()
          </Link>
        </nav>

        {/* Syllabus Header */}
        <header className="mb-12 border-b-2 border-neutral-800 pb-6">
          <div className="text-xs uppercase tracking-widest text-neutral-500 mb-1">
            Track Outline / Course: {course.id.toUpperCase()}
          </div>
          <h1 className="text-4xl m-0 font-bold tracking-tight text-neutral-800 font-serif">
            {course.title}
          </h1>
          <p className="mt-3 text-base text-neutral-800 font-sans">
            {course.description}
          </p>

          <div className="flex flex-wrap gap-2.5 mt-4">
            {course.tags.map((tag, idx) => (
              <span key={idx} className="text-xs py-0.5 px-1.5 border border-dashed border-neutral-300 text-neutral-500">
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Timeline Roadmap */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-6">
            Syllabus Chronological Outline
          </h2>

          <div className="border-l-2 border-neutral-800 pl-6 flex flex-col gap-9 relative">
            {course.lectures.map((lecture) => (
              <div 
                key={lecture.slug}
                className="transition-all duration-200 border-l-4 border-transparent hover:border-neutral-800 hover:bg-neutral-100 ml-[-29px] pl-[25px] relative py-2.5"
              >
                {/* Timeline node bullet */}
                <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 bg-neutral-800 border-2 border-background rounded-full" />

                {/* Lecture Meta */}
                <div className="flex items-center text-xs font-bold text-neutral-500 mb-1.5 font-mono">
                  <span className="mr-3 bg-neutral-800 text-background px-1.5 py-0.5">
                    {lecture.code}
                  </span>
                  <span className="mr-3">
                    {lecture.difficulty.toUpperCase()}
                  </span>
                  <span>
                    {lecture.duration}
                  </span>
                </div>

                {/* Lecture Title */}
                <h3 className="m-0 mb-2 text-xl text-neutral-800 font-serif font-bold">
                  {lecture.title}
                </h3>

                {/* Description */}
                <p className="text-neutral-700 text-sm mb-4 font-sans">
                  {lecture.description}
                </p>

                {/* Link */}
                <Link href={`/courses/${course.id}/${lecture.slug}`} className="text-decoration-none">
                  <button 
                    className="transition-all duration-200 border border-neutral-800 px-3.5 py-1.5 bg-neutral-800 text-background hover:bg-background hover:text-neutral-800 font-bold font-mono text-xs cursor-pointer"
                  >
                    OPEN_LECTURE() →
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Linked Experiments Section */}
        {relatedLabs.length > 0 && (
          <section className="mt-16 border-t-2 border-neutral-800 pt-8">
            <h2 className="text-xs uppercase tracking-widest text-neutral-500 mb-5 font-bold">
              🔬 Linked Computational Sandbox Experiments
            </h2>
            <p className="text-sm text-neutral-800 mb-5 font-sans">
              Practical browser simulations and numerical benchmarks validating the mathematical theories discussed in this course:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedLabs.map(lab => (
                <Link 
                  key={lab.id}
                  href={`/lab/${lab.id}`}
                  className="text-decoration-none color-inherit"
                >
                  <div 
                    className="transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 border border-neutral-800 bg-neutral-100 p-5 shadow-[3px_3px_0px_var(--border-color)] flex flex-col justify-between h-full min-h-[150px]"
                  >
                    <div>
                      <div className="text-xs font-mono text-neutral-500 mb-1">
                        {lab.code}
                      </div>
                      <h4 className="m-0 mb-2 font-serif text-lg font-bold text-neutral-800">
                        {lab.title}
                      </h4>
                    </div>
                    <div className="text-xs text-neutral-800 font-bold text-right">
                      RUN_SIMULATOR() ↗
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

// Pre-render course detail static params
export async function generateStaticParams() {
  return coursesRegistry.map(course => ({
    "course-id": course.id
  }));
}

export const dynamicParams = false;

