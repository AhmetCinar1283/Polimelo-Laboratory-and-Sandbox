import { Course } from "../courses";

export const neuralNetworksCourse: Course = {
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
  sections: [
    {
      title: "Backpropagation Foundations",
      items: [
        { type: "lecture", slug: "backpropagation" },
        { type: "lab", id: "linear-regression" }
      ]
    }
  ]
};
