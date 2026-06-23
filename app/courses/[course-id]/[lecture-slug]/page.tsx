import React from "react";
import Link from "next/link";
import { coursesRegistry } from "@/registry/courses";
import { labsRegistry } from "@/registry/labs";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    "course-id": string;
    "lecture-slug": string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const courseId = resolvedParams["course-id"];
  const lectureSlug = resolvedParams["lecture-slug"];

  const course = coursesRegistry.find(c => c.id === courseId);
  const lecture = course?.lectures.find(l => l.slug === lectureSlug);

  if (!course || !lecture) {
    return {
      title: "Lecture Not Found",
    };
  }

  return {
    title: lecture.title,
    description: lecture.description,
    openGraph: {
      title: `${lecture.title} | ${course.title}`,
      description: lecture.description,
      type: "article",
    }
  };
}

export default async function LectureDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const courseId = resolvedParams["course-id"];
  const lectureSlug = resolvedParams["lecture-slug"];

  // Find course and lecture
  const course = coursesRegistry.find(c => c.id === courseId);
  const lecture = course?.lectures.find(l => l.slug === lectureSlug);

  if (!course || !lecture) {
    return (
      <div className="py-20 px-10 text-center font-mono bg-background text-foreground min-h-screen">
        <h1 className="font-serif text-3xl mb-4 font-bold text-neutral-800">Lecture Not Found</h1>
        <p className="mb-6 text-sm text-neutral-500">The requested study note could not be retrieved from the directory.</p>
        <Link href="/courses" className="text-neutral-800 underline font-bold">
          RETURN_TO_COURSES()
        </Link>
      </div>
    );
  }

  // Find index of current lecture in syllabus for next/previous navigation
  const currentIdx = course.lectures.findIndex(l => l.slug === lectureSlug);
  const prevLecture = currentIdx > 0 ? course.lectures[currentIdx - 1] : null;
  const nextLecture = currentIdx < course.lectures.length - 1 ? course.lectures[currentIdx + 1] : null;

  // Find lab experiments referencing this lecture
  const relatedLabs = labsRegistry.filter(lab => 
    lab.referencedLectures.some(ref => ref.courseId === courseId && ref.lectureSlug === lectureSlug)
  );

  // Dynamic import of the MDX post
  let Post;
  try {
    const module = await import(`@/content/courses/${courseId}/${lectureSlug}.mdx`);
    Post = module.default;
  } catch (error) {
    console.error("Failed to load MDX content:", error);
    return (
      <div className="py-20 px-10 text-center font-mono bg-background text-foreground min-h-screen">
        <h1 className="font-serif text-3xl mb-4 font-bold text-neutral-800">Content Error</h1>
        <p className="mb-6 text-sm text-neutral-500">The MDX note file for this lecture could not be loaded.</p>
      </div>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": lecture.title,
    "description": lecture.description,
    "inLanguage": "en",
    "author": {
      "@type": "Person",
      "name": "Ahmet Çınar",
      "url": "https://polimelo.com"
    },
    "publisher": {
      "@type": "Person",
      "name": "Ahmet Çınar",
      "url": "https://polimelo.com"
    },
    "isPartOf": {
      "@type": "Course",
      "name": course.title,
      "description": course.description
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen leading-relaxed py-16 px-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="max-w-[1150px] mx-auto animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12 items-start">
          
          {/* 1. Sticky Sidebar Course Syllabus Navigation */}
          <aside className="md:sticky md:top-10 mb-8 md:mb-0">
            <Link 
              href={`/courses/${courseId}`} 
              className="block text-xs uppercase font-mono font-bold text-neutral-500 mb-5 underline underline-offset-4 hover:text-neutral-800"
            >
              ← VIEW_SYLLABUS_OVERVIEW()
            </Link>

            <div className="border border-neutral-800 bg-neutral-50 p-4">
              <h4 className="m-0 mb-3 text-xs uppercase tracking-wider text-neutral-800 font-mono font-bold border-b border-neutral-800 pb-1">
                Course Syllabus
              </h4>
              <nav className="flex flex-col gap-1.5">
                {course.lectures.map((l) => (
                  <Link
                    key={l.slug}
                    href={`/courses/${courseId}/${l.slug}`}
                    className={`transition-all duration-200 block p-2 border-l-2 ${
                      l.slug === lectureSlug 
                        ? "text-neutral-800 border-neutral-800 font-bold bg-neutral-100" 
                        : "text-neutral-500 border-neutral-300 hover:text-neutral-800 hover:border-neutral-800 hover:bg-neutral-50"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-neutral-500 mb-0.5">
                      {l.code}
                    </div>
                    <div className="text-sm font-sans">{l.title}</div>
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* 2. Main Article Body */}
          <article className="min-w-0">
            {/* Note Meta Header */}
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 mb-3 flex justify-between border-b border-dashed border-neutral-300 pb-2 flex-wrap gap-2.5">
              <span>INDEX: {course.id.toUpperCase()} / {lecture.code}</span>
              <span>READING_TIME: {lecture.duration}</span>
            </div>

            {/* Rendered MDX Content */}
            <main className="min-h-[300px]">
              <Post />
            </main>

            {/* Prev/Next Navigation Buttons */}
            <div className="flex justify-between mt-12 pt-5 border-t border-neutral-800 gap-4 flex-wrap">
              {prevLecture ? (
                <Link 
                  href={`/courses/${courseId}/${prevLecture.slug}`} 
                  className="transition-all duration-200 border border-neutral-800 px-4 py-2 bg-background text-neutral-800 font-bold text-xs shadow-[2px_2px_0px_var(--border-color)] hover:bg-neutral-800 hover:text-background hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  ← PREV: {prevLecture.title}
                </Link>
              ) : (
                <div />
              )}
              {nextLecture ? (
                <Link 
                  href={`/courses/${courseId}/${nextLecture.slug}`} 
                  className="transition-all duration-200 border border-neutral-800 px-4 py-2 bg-background text-neutral-800 font-bold text-xs shadow-[2px_2px_0px_var(--border-color)] hover:bg-neutral-800 hover:text-background hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                >
                  NEXT: {nextLecture.title} →
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Related Laboratory Experiments Panel */}
            {relatedLabs.length > 0 && (
              <section className="mt-16 p-6 border-2 border-neutral-800 bg-neutral-50 shadow-[3px_3px_0px_var(--border-color)]">
                <h3 className="text-xs uppercase tracking-widest text-neutral-800 mb-2.5 font-bold font-mono">
                  🔬 Interactive Laboratory Sandbox
                </h3>
                <p className="text-sm text-neutral-800 mb-5 font-sans">
                  Run practical simulations and numerical verifications associated with the mathematical equations derived in this note:
                </p>

                <div className="flex flex-col gap-2.5">
                  {relatedLabs.map(lab => (
                    <Link 
                      key={lab.id} 
                      href={`/lab/${lab.id}`}
                      className="text-decoration-none color-inherit"
                    >
                      <div 
                        className="transition-all duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 border border-neutral-300 bg-background p-4 flex justify-between items-center"
                      >
                        <div>
                          <div className="text-[10px] font-mono text-neutral-500 mb-0.5">
                            {lab.code}
                          </div>
                          <h4 className="m-0 font-serif text-base font-bold text-neutral-800">
                            {lab.title}
                          </h4>
                        </div>
                        <div className="text-xs text-neutral-800 font-bold font-mono">
                          RUN_SANDBOX() ↗
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </article>

        </div>
      </div>
    </div>
  );
}

// Pre-render dynamic course detail slug static paths
export async function generateStaticParams() {
  const paths: { "course-id": string; "lecture-slug": string }[] = [];
  coursesRegistry.forEach(course => {
    course.lectures.forEach(lecture => {
      paths.push({
        "course-id": course.id,
        "lecture-slug": lecture.slug
      });
    });
  });
  return paths;
}
