import type { Metadata } from "next";

import SeoJsonLd from "../components/SeoJsonLd";

import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "../lib/seo";
import BlogPage from "./BlogPage";

const blog_SEO_ID = "6";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: blog_SEO_ID,

    fallbackTitle:
      "KnowledgeCorner	 | Purple Phase",

    fallbackDescription:
      "Explore Purple Phase branding KnowledgeCorner.",
  });
}

export default async function CaseStudyPage() {
  const seo =
    await getSeoData(
      blog_SEO_ID,
    );

  const schemas =
    extractJsonLdSchemas(
      seo?.head,
      seo?.body,
    );

  return (
    <>
      <SeoJsonLd
        schemas={schemas}
        idPrefix="case-study-api-schema"
      />

      <BlogPage />
    </>
  );
}