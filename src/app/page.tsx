import AchievementSection from "./components/AchievementSection";
import BrandPage from "./components/BrandPage";
import { ContactSection } from "./components/ContactSection";
import ExpertiseSection from "./components/ExpertiseSection";
import HeaderHero from "./components/Hero";
import { LogoSlider } from "./components/LogoSlider";
import PortfolioSection from "./components/PortfolioSection";
import ProcessSection from "./components/ProcessSection";
import VideoSection from "./components/VideoSection";

export default function Home() {
  return (
    <>
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
