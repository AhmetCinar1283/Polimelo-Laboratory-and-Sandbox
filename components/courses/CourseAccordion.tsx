"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Course, CourseSection, Lecture } from "@/registry/courses";
import { labsRegistry } from "@/registry/labs";

interface CourseAccordionProps {
  course: Course;
}

export default function CourseAccordion({ course }: CourseAccordionProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!course.sections || course.sections.length === 0) return;

    const lastVisited = localStorage.getItem(`last-visited-item:${course.id}`);
    let matchedSectionIndex = 0; // Default to first section

    if (lastVisited) {
      course.sections.forEach((section, idx) => {
        const hasItem = section.items.some((item) => {
          if (item.type === "lecture") {
            return `lecture:${item.slug}` === lastVisited || item.slug === lastVisited;
          } else if (item.type === "lab") {
            return `lab:${item.id}` === lastVisited || item.id === lastVisited;
          }
          return false;
        });
        if (hasItem) {
          matchedSectionIndex = idx;
        }
      });
    }

    setOpenSections({ [matchedSectionIndex]: true });
  }, [course.id, course.sections]);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const getLectureDetails = (slug: string): Lecture | undefined => {
    return course.lectures.find((l) => l.slug === slug);
  };

  const getLabDetails = (id: string) => {
    return labsRegistry.find((l) => l.id === id);
  };

  if (!course.sections || course.sections.length === 0) {
    return (
      <div className="text-center py-8 font-mono text-sm text-neutral-500">
        No syllabus sections registered for this course.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full animate-fade-in">
      {course.sections.map((section, sectionIdx) => {
        const isOpen = !!openSections[sectionIdx];
        return (
          <div
            key={sectionIdx}
            className="border border-neutral-800 bg-background transition-all duration-300"
          >
            {/* Section Header */}
            <button
              onClick={() => toggleSection(sectionIdx)}
              className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-neutral-800 hover:bg-neutral-50 transition-colors border-none cursor-pointer focus:outline-none"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-mono font-normal uppercase tracking-wider text-neutral-500">
                  SECTION {sectionIdx + 1}
                </span>
                <span className="text-lg md:text-xl text-neutral-800">
                  {section.title}
                </span>
              </div>
              <span className="font-mono text-xs text-neutral-800 bg-neutral-100 hover:bg-neutral-200 px-2.5 py-1 border border-neutral-800 transition-colors">
                {isOpen ? "[-] COLLAPSE" : "[+] EXPAND"}
              </span>
            </button>

            {/* Section Content */}
            {isOpen && (
              <div className="border-t border-neutral-800 p-6 bg-background">
                <div className="border-l-2 border-neutral-800 pl-6 flex flex-col gap-9 relative ml-3">
                  {section.items.map((item, itemIdx) => {
                    if (item.type === "lecture") {
                      const lecture = getLectureDetails(item.slug);
                      if (!lecture) return null;

                      return (
                        <div
                          key={`lecture-${lecture.slug}`}
                          className="transition-all duration-200 border-l-4 border-transparent hover:border-neutral-800 hover:bg-neutral-100 ml-[-29px] pl-[25px] relative py-2.5"
                        >
                          {/* Timeline node bullet */}
                          <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 bg-neutral-800 border-2 border-background rounded-full" />

                          {/* Lecture Meta */}
                          <div className="flex items-center text-xs font-bold text-neutral-500 mb-1.5 font-mono">
                            <span className="mr-3 bg-neutral-800 text-background px-1.5 py-0.5 font-mono">
                              {lecture.code}
                            </span>
                            <span className="mr-3">
                              {lecture.difficulty.toUpperCase()}
                            </span>
                            <span>{lecture.duration}</span>
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
                          <Link
                            href={`/courses/${course.id}/${lecture.slug}`}
                            className="text-decoration-none"
                          >
                            <button className="transition-all duration-200 border border-neutral-800 px-3.5 py-1.5 bg-neutral-800 text-background hover:bg-background hover:text-neutral-800 font-bold font-mono text-xs cursor-pointer">
                              OPEN_LECTURE() →
                            </button>
                          </Link>
                        </div>
                      );
                    } else {
                      const lab = getLabDetails(item.id);
                      if (!lab) return null;

                      return (
                        <div
                          key={`lab-${lab.id}`}
                          className="transition-all duration-200 border-l-4 border-transparent hover:border-amber-600 hover:bg-amber-50/20 ml-[-29px] pl-[25px] relative py-2.5"
                        >
                          {/* Timeline node bullet (diamond shape for experiment) */}
                          <div className="absolute left-[-6px] top-6 w-2.5 h-2.5 bg-amber-600 border-2 border-background rotate-45" />

                          {/* Lab Meta */}
                          <div className="flex items-center text-xs font-bold text-amber-700 mb-1.5 font-mono">
                            <span className="mr-3 bg-amber-600 text-white px-1.5 py-0.5">
                              {lab.code}
                            </span>
                            <span className="mr-3">🔬 COMPUTATIONAL SANDBOX</span>
                            <span>{lab.status.toUpperCase()}</span>
                          </div>

                          {/* Lab Title */}
                          <h3 className="m-0 mb-2 text-xl text-neutral-800 font-serif font-bold">
                            {lab.title}
                          </h3>

                          {/* Description */}
                          <p className="text-neutral-700 text-sm mb-4 font-sans">
                            {lab.abstract}
                          </p>

                          {/* Link */}
                          <Link
                            href={`/lab/${lab.id}`}
                            className="text-decoration-none"
                          >
                            <button className="transition-all duration-200 border border-amber-600 px-3.5 py-1.5 bg-amber-600 text-white hover:bg-background hover:text-amber-700 font-bold font-mono text-xs cursor-pointer">
                              LAUNCH_SANDBOX() ↗
                            </button>
                          </Link>
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
