import type { Metadata } from "next";

import SeoJsonLd from "../components/SeoJsonLd";

import {
  buildSeoMetadata,
  extractJsonLdSchemas,
  getSeoData,
} from "../lib/seo";
import PortfolioPage from "./PortfolioPage";

const Portfolio_SEO_ID = "4";

export async function generateMetadata(): Promise<Metadata> {
  return buildSeoMetadata({
    id: Portfolio_SEO_ID,

    fallbackTitle:
      "Portfolio | Purple Phase",

    fallbackDescription:
      "Explore Purple Phase branding Portfolio.",
  });
}

export default async function CaseStudyPage() {
  const seo =
    await getSeoData(
      Portfolio_SEO_ID,
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

      <PortfolioPage />
    </>
  );
}