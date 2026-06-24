import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Configure pageExtensions to include md and mdx files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: 'export',
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-math",
    ],
    rehypePlugins: [
      "rehype-katex",
      "rehype-highlight",
    ],
  },
});

export default withMDX(nextConfig);
