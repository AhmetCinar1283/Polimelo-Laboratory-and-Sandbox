import { machineLearningMathCourse } from "./courses/linear-algebra-for-ml";
import { neuralNetworksCourse } from "./courses/neural-networks";

export interface Lecture {
  slug: string;
  title: string;
  code: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // e.g. "15 mins"
}

export interface CourseSection {
  title: string;
  items: CourseSyllabusItem[];
}

export type CourseSyllabusItem =
  | { type: "lecture"; slug: string }
  | { type: "lab"; id: string };

export interface Course {
  id: string;
  title: string;
  category: "mathematics" | "artificial-intelligence";
  description: string;
  difficulty: "Intermediate" | "Advanced";
  tags: string[];
  lectures: Lecture[];
  sections?: CourseSection[];
}

export const coursesRegistry: Course[] = [
  machineLearningMathCourse,
  neuralNetworksCourse
];

