import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Computational Outpost & Digital Sandbox",
  description: "Interactive browser modules, runtime WebAssembly Python environments, live linear regression simulations, and matrix calculators developed by Ahmet Çınar.",
  openGraph: {
    title: "Computational Outpost & Digital Sandbox | Ahmet Çınar",
    description: "Interactive browser modules, runtime WebAssembly Python environments, live linear regression simulations, and matrix calculators developed by Ahmet Çınar.",
    type: "website",
  }
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
