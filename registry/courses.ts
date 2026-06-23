export interface Lecture {
  slug: string;
  title: string;
  code: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string; // e.g. "15 mins"
}

export interface Course {
  id: string;
  title: string;
  category: "mathematics" | "artificial-intelligence";
  description: string;
  difficulty: "Intermediate" | "Advanced";
  tags: string[];
  lectures: Lecture[];
}

export const coursesRegistry: Course[] = [
  {
    id: "linear-algebra",
    title: "Linear Algebra & Sparse Systems",
    category: "mathematics",
    description: "Foundational mathematical structures for efficient computational pipelines. Explores vector spaces, matrices, and sparse representation models.",
    difficulty: "Intermediate",
    tags: ["Math", "Linear Algebra", "Data Formats"],
    lectures: [
      {
        slug: "sparse-matrices",
        title: "Sparse Matrices & CSR Data Representation",
        code: "MATH-LA-01",
        description: "Compressed Sparse Row (CSR) representation mapping, index pointers, storage efficiency calculations, and sparse matrix-vector multiplication (SpMV).",
        difficulty: "Intermediate",
        duration: "15 mins",
      }
    ],
  },
  {
    id: "neural-networks",
    title: "Neural Networks Deep Dive",
    category: "artificial-intelligence",
    description: "Theoretical derivations and concrete implementations of deep learning primitives from scratch.",
    difficulty: "Advanced",
    tags: ["AI", "Neural Networks", "Calculus"],
    lectures: [
      {
        slug: "backpropagation",
        title: "Backpropagation from First Principles",
        code: "AI-NN-01",
        description: "Mathematical derivation of error delta terms, output layer gradients, hidden layer backpropagation, and weight/bias updates using the chain rule.",
        difficulty: "Advanced",
        duration: "25 mins",
      }
    ],
  }
];
