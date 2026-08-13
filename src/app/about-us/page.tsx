// import type { Metadata } from "next";

import AboutClient from "./AboutClient";
// import SeoJsonLd from "../components/SeoJsonLd";

// import {
//   buildSeoMetadata,
//   extractJsonLdSchemas,
//   getSeoData,
// } from "../lib/seo";

// const ABOUT_SEO_ID = "2";

// export async function generateMetadata(): Promise<Metadata> {
//   return buildSeoMetadata({
//     id: ABOUT_SEO_ID,

//     fallbackTitle:
//       "About Purple Phase",

//     fallbackDescription:
//       "Learn about Purple Phase.",
//   });
// }

export default async function AboutPage() {
  // const seo =
  //   await getSeoData(
  //     ABOUT_SEO_ID,
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
        idPrefix="about-api-schema"
      /> */}

      <AboutClient />
    </>
  );
}