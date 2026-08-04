import type { Metadata } from "next";

import CaseStudyClient from "./CaseStudyClient";
import SeoJsonLd from "../components/SeoJsonLd";

import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "../lib/seo";

const CASE_STUDY_SEO_ID = "3";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: CASE_STUDY_SEO_ID,

    fallbackTitle:
      "Case Studies | Purple Phase",

    fallbackDescription:
      "Explore Purple Phase branding case studies.",
  });
}

export default async function CaseStudyPage() {
  const seo =
    await getSeoData(
      CASE_STUDY_SEO_ID,
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

      <CaseStudyClient />
    </>
  );
}