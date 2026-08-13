// import type { Metadata } from "next";

// import AchievementSection from "./components/AchievementSection";
// import BrandPage from "./components/BrandPage";
// import { ContactSection } from "./components/ContactSection";
// import ExpertiseSection from "./components/ExpertiseSection";
// import HeaderHero from "./components/Hero";
// import { LogoSlider } from "./components/LogoSlider";
// import PortfolioSection from "./components/PortfolioSection";
// import ProcessSection from "./components/ProcessSection";
// import VideoSection from "./components/VideoSection";

// import { buildSeoMetadata } from "./lib/seo";

// export async function generateMetadata(): Promise<Metadata> {
//   return buildSeoMetadata({
//     id: "1",

//     fallbackTitle:
//       "Purple Phase | Creative Branding Agency",

//     fallbackDescription:
//       "Purple Phase delivers strategic branding, creative design and digital marketing experiences.",
//   });
// }

// export default function Home() {
//   return (
//     <>
//       <HeaderHero />
//       <ProcessSection />
//       <VideoSection />
//       <ExpertiseSection />
//       <BrandPage />
//       <PortfolioSection />
//       <AchievementSection />
//       <LogoSlider />
//       <ContactSection />
//     </>
//   );
// }


// import type { Metadata } from "next";

import AchievementSection from "./components/AchievementSection";
import BrandPage from "./components/BrandPage";
import { ContactSection } from "./components/ContactSection";
import ExpertiseSection from "./components/ExpertiseSection";
import HeaderHero from "./components/Hero";
import { LogoSlider } from "./components/LogoSlider";
import PortfolioSection from "./components/PortfolioSection";
import ProcessSection from "./components/ProcessSection";
import SeoJsonLd from "./components/SeoJsonLd";
import VideoSection from "./components/VideoSection";

// import {
//   buildSeoMetadata,
//   extractJsonLdSchemas,
//   getSeoData,
// } from "./lib/seo";

// const HOME_SEO_ID = "1";

// export async function generateMetadata(): Promise<Metadata> {
//   return buildSeoMetadata({
//     id: HOME_SEO_ID,

//     fallbackTitle:
//       "Purple Phase | Creative Branding Agency",

//     fallbackDescription:
//       "Purple Phase delivers strategic branding, creative design and digital marketing experiences.",
//   });
// }

export default async function Home() {
  // const seo =
  //   await getSeoData(
  //     HOME_SEO_ID,
  //   );

  /*
   * Dynamic schema only from API.
   *
   * API head/bodyમાં schema નહીં હોય
   * તો schemas empty રહેશે અને
   * <script> render નહીં થાય.
   */
  // const schemas =
  //   extractJsonLdSchemas(
  //     seo?.head,
  //     seo?.body,
  //   );

  return (
    <>
      {/* <SeoJsonLd
        schemas={schemas}
        idPrefix="home-api-schema"
      /> */}

      <HeaderHero />
      <ProcessSection />
      <VideoSection />
      <ExpertiseSection />
      <BrandPage />
      <PortfolioSection />
      <AchievementSection />
      <LogoSlider />
      <ContactSection />
    </>
  );
}