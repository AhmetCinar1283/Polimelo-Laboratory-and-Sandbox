import { Course, Lecture } from "../courses";

const lectures: Lecture[] = [
  // Module 1: Foundations of Vectors
  {
    slug: "vector-operations-intro",
    title: "1.1 Introduction to Vectors & Vector Operations",
    code: "MATH-LA-01",
    description: "Learn how vectors represent data as lists of numbers and geometric arrows, and master operations like addition and scalar multiplication.",
    difficulty: "Beginner",
    duration: "10 mins"
  },
  {
    slug: "vector-norms-and-distance",
    title: "1.2 Vector Norms and Distance Metrics",
    code: "MATH-LA-02",
    description: "Understand L1 (Manhattan) and L2 (Euclidean) norms and distances, and see how machine learning uses them to measure errors.",
    difficulty: "Beginner",
    duration: "12 mins"
  },
  {
    slug: "dot-product-views",
    title: "1.3 The Dot Product: Algebraic & Geometric Views",
    code: "MATH-LA-03",
    description: "Master the dot product mathematically and geometrically to measure alignment, angles, and projection between vectors.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },
  
  // Module 2: Linear Systems and Matrices
  {
    slug: "introduction-to-linear-systems",
    title: "2.1 Introduction to Linear Systems",
    code: "MATH-LA-04",
    description: "Learn how systems of equations represent real-world problems like simple linear regression, solving for weights and bias.",
    difficulty: "Beginner",
    duration: "12 mins"
  },
  {
    slug: "visualizing-singularity-in-systems",
    title: "2.2 Visualizing Singularity in Systems",
    code: "MATH-LA-05",
    description: "Explore the geometric meaning of unique solutions, infinite solutions, and no solutions using parallel and overlapping lines.",
    difficulty: "Beginner",
    duration: "15 mins"
  },
  {
    slug: "transition-to-matrices",
    title: "2.3 Transition to Matrices",
    code: "MATH-LA-06",
    description: "Transition from written equations to matrix form (Ax = b) and learn the mechanics of matrix-vector and matrix-matrix multiplication.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },

  // Module 3: Solving Systems and Matrix Characteristics
  {
    slug: "gaussian-elimination-and-row-echelon",
    title: "3.1 Gaussian Elimination & Row Echelon Forms",
    code: "MATH-LA-07",
    description: "A step-by-step guide to solving systems using row operations to reach Row Echelon Form (REF) and Reduced Row Echelon Form (RREF).",
    difficulty: "Intermediate",
    duration: "18 mins"
  },
  {
    slug: "linear-dependence-independence-and-rank",
    title: "3.2 Linear Dependence, Independence, and Matrix Rank",
    code: "MATH-LA-08",
    description: "Identify redundant equations or features using linear independence and calculate the rank of a matrix to check system solvability.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },
  {
    slug: "determinant-as-system-diagnostics",
    title: "3.3 The Determinant as a System Diagnostics Tool",
    code: "MATH-LA-09",
    description: "Learn how the determinant works as a space scaling factor and how it diagnostics whether a system has a unique solution.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },

  // Module 4: Linear Transformations and Matrix Inverses
  {
    slug: "matrices-as-linear-transformations",
    title: "4.1 Matrices as Linear Transformations",
    code: "MATH-LA-10",
    description: "Visualize how multiplying a vector by a matrix transforms, rotates, stretches, or shears the underlying coordinate space.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },
  {
    slug: "special-matrices-identity",
    title: "4.2 Special Matrices: The Identity Matrix",
    code: "MATH-LA-11",
    description: "Meet the Identity Matrix, the neutral element of matrix multiplication that preserves coordinates and vectors unchanged.",
    difficulty: "Beginner",
    duration: "8 mins"
  },
  {
    slug: "matrix-inverse-and-invertibility",
    title: "4.3 Matrix Inverse & Invertibility",
    code: "MATH-LA-12",
    description: "Understand how to undo linear transformations using matrix inverses, and why singular matrices cannot be inverted.",
    difficulty: "Intermediate",
    duration: "15 mins"
  },
  {
    slug: "neural-networks-and-matrices",
    title: "4.4 Neural Networks and Matrices (Bridging to ML)",
    code: "MATH-LA-13",
    description: "See how layers in deep learning are represented as matrix operations (Wx + b) transforming representations across feature spaces.",
    difficulty: "Advanced",
    duration: "20 mins"
  }
];

export const machineLearningMathCourse: Course = {
  id: "linear-algebra-for-ml",
  title: "Linear Algebra for Machine Learning",
  category: "mathematics",
  description: "Master the foundational linear algebra concepts required for machine learning. This course covers linear equations, matrices, singularity, and vectors with practical data science examples.",
  difficulty: "Intermediate",
  tags: ["Linear Algebra", "Machine Learning", "Vectors", "Matrices", "Data Science"],
  lectures: lectures,
  sections: [
    {
      title: "Module 1: Foundations of Vectors",
      items: [
        { type: "lecture", slug: "vector-operations-intro" },
        { type: "lecture", slug: "vector-norms-and-distance" },
        { type: "lecture", slug: "dot-product-views" }
      ]
    },
    {
      title: "Module 2: Linear Systems and Matrices",
      items: [
        { type: "lecture", slug: "introduction-to-linear-systems" },
        { type: "lecture", slug: "visualizing-singularity-in-systems" },
        { type: "lab", id: "singularity-sandbox" },
        { type: "lecture", slug: "transition-to-matrices" },
        { type: "lab", id: "matrix-multiplier" }
      ]
    },
    {
      title: "Module 3: Solving Systems and Matrix Characteristics",
      items: [
        { type: "lecture", slug: "gaussian-elimination-and-row-echelon" },
        { type: "lecture", slug: "linear-dependence-independence-and-rank" },
        { type: "lecture", slug: "determinant-as-system-diagnostics" }
      ]
    },
    {
      title: "Module 4: Linear Transformations and Matrix Inverses",
      items: [
        { type: "lecture", slug: "matrices-as-linear-transformations" },
        { type: "lecture", slug: "special-matrices-identity" },
        { type: "lecture", slug: "matrix-inverse-and-invertibility" },
        { type: "lecture", slug: "neural-networks-and-matrices" }
      ]
    }
  ]
};
