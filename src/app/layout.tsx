import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TransparentLLM - Open AI Research Platform",
  description: "Training data explorer, training dashboard, evaluation suite, ablation viewer, compute tracker, contamination checker",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}
