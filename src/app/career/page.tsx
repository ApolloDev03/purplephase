import type { Metadata } from "next";

import SeoJsonLd from "../components/SeoJsonLd";

import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "../lib/seo";
import CareerDetail from "./careerDetail";

const career_SEO_ID = "5";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: career_SEO_ID,

    fallbackTitle:
      "career Purple Phase",

    fallbackDescription:
      "Learn career Purple Phase.",
  });
}

export default async function careerPage() {
  const seo =
    await getSeoData(
      career_SEO_ID,
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
        idPrefix="about-api-schema"
      />

      <CareerDetail />
    </>
  );
}