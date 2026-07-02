import { coursesRegistry } from "./courses";

export interface ReferencedLecture {
  courseId: string;
  lectureSlug: string;
  lectureTitle?: string;
  code?: string;
}

export interface LabModule {
  id: string;
  code: string;
  title: string;
  abstract: string;
  keywords: string[];
  status: "Active" | "Maintenance" | "Experimental";
  link: string;
  referencedLectures: ReferencedLecture[];
}

export function getResolvedLecture(ref: ReferencedLecture) {
  const course = coursesRegistry.find(c => c.id === ref.courseId);
  const lecture = course?.lectures.find(l => l.slug === ref.lectureSlug);
  return {
    courseId: ref.courseId,
    lectureSlug: ref.lectureSlug,
    lectureTitle: lecture?.title || ref.lectureTitle || "Unknown Lecture",
    code: lecture?.code || ref.code || "UNKNOWN",
  };
}

export const labsRegistry: LabModule[] = [
  {
    id: "say-hello",
    code: "MODULE-REF: 01A",
    title: "WebAssembly Python Runtime Verification (Hello World)",
    abstract: "A core architectural test validating client-side execution of Python 3.11 environments within the browser kernel via Pyodide and WebAssembly. Serves as the foundational bridge for pipeline communication between TypeScript UI threads and decoupled low-level backends.",
    keywords: ["Pyodide Engine", "WebAssembly", "Web Workers", "Runtime Verification"],
    status: "Active",
    link: "/lab/say-hello",
    referencedLectures: [],
  },
  {
    id: "matrix-multiplier",
    code: "MODULE-REF: 02B",
    title: "Matrix Multiplication & Vector Space Visualizer",
    abstract: "An interactive workspace for visualizing matrix multiplication step-by-step. Users can input values for matrices A and B, compute C = A × B, and trace the dot product calculation for individual cells to build mechanical intuition.",
    keywords: ["Linear Algebra", "Dot Product", "Vector Spaces", "Interactive Compute"],
    status: "Active",
    link: "/lab/matrix-multiplier",
    referencedLectures: [
      {
        courseId: "linear-algebra-for-ml",
        lectureSlug: "transition-to-matrices",
        lectureTitle: "2.3 Transition to Matrices",
        code: "MATH-LA-06",
      }
    ],
  },
  {
    id: "linear-regression",
    code: "MODULE-REF: 03C",
    title: "Interactive Linear Regression & Gradient Fitting",
    abstract: "A client-side regression simulator. Users plot custom coordinates on a canvas grid, and the model fits a line of best fit y = mx + b using least-squares, plotting the regression line and detailing slope, intercept, and R-squared parameters.",
    keywords: ["Machine Learning", "Least Squares", "Regression Model", "HTML5 Canvas"],
    status: "Active",
    link: "/lab/linear-regression",
    referencedLectures: [
      {
        courseId: "neural-networks",
        lectureSlug: "backpropagation",
        lectureTitle: "Backpropagation from First Principles",
        code: "AI-NN-01",
      }
    ],
  },
  {
    id: "singularity-sandbox",
    code: "MODULE-REF: 04D",
    title: "Singularity & Dimension Sandbox",
    abstract: "An interactive workspace for testing equations for singularity, computing determinants, and exploring the geometric dimension of solution spaces (kernel, image, and singularity states).",
    keywords: ["Linear Algebra", "Singularity", "Determinant", "Dimension Space"],
    status: "Experimental",
    link: "/lab/singularity-sandbox",
    referencedLectures: [
      {
        courseId: "linear-algebra-for-ml",
        lectureSlug: "visualizing-singularity-in-systems",
        lectureTitle: "2.2 Visualizing Singularity in Systems",
        code: "MATH-LA-05",
      }
    ],
  }
];
