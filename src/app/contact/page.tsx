// import type { Metadata } from "next";

// import SeoJsonLd from "../components/SeoJsonLd";

// import {
//   buildSeoMetadata,
//   extractJsonLdSchemas,
//   getSeoData,
// } from "../lib/seo";
import ContactPage from "./ContactPage";

// const Contact_SEO_ID = "7";

// export async function generateMetadata(): Promise<Metadata> {
//   return buildSeoMetadata({
//     id: Contact_SEO_ID,

//     fallbackTitle:
//       "Contact Us | Purple Phase",

//     fallbackDescription:
//       "Explore Purple Phase branding Contact.",
//   });
// }

export default async function CaseStudyPage() {
  // const seo =
  //   await getSeoData(
  //     Contact_SEO_ID,
  //   );

  // const schemas =
  //   extractJsonLdSchemas(
  //     seo?.head,
  //     seo?.body,
  //   );

  return (
    <>
      {/* <SeoJsonLd
        schemas={schemas}
        idPrefix="case-study-api-schema"
      /> */}

      <ContactPage />
    </>
  );
}