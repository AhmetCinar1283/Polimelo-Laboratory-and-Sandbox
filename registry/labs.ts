export interface ReferencedLecture {
  courseId: string;
  lectureSlug: string;
  lectureTitle: string;
  code: string;
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
        courseId: "linear-algebra",
        lectureSlug: "sparse-matrices",
        lectureTitle: "Sparse Matrices & CSR Data Representation",
        code: "MATH-LA-01",
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
  }
];
