import type { Metadata } from "next";
import { Suspense } from "react";

import CaseStudyDetailClient from "./CaseStudyDetailClient";

export const metadata: Metadata = {
  title: "Case Study | Purple Phase",
  description:
    "Explore branding, website design, marketing and creative case studies by Purple Phase.",
  robots: {
    index: true,
    follow: true,
  },
};

function LoadingScreen() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f6f6f6]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#A62666]/20 border-t-[#A62666]" />
    </main>
  );
}

export default function CaseStudyDetailPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <CaseStudyDetailClient />
    </Suspense>
  );
}