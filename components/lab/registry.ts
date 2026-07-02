import dynamic from "next/dynamic";

export const LAB_COMPONENTS: Record<string, React.ComponentType> = {
  "say-hello": dynamic(() => import("./SayHello")),
  "matrix-multiplier": dynamic(() => import("./MatrixMultiplier")),
  "linear-regression": dynamic(() => import("./LinearRegression")),
  "singularity-sandbox": dynamic(() => import("./SingularitySandbox")),
};
