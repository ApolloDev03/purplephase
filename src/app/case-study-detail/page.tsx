"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";
import { HiArrowUpRight } from "react-icons/hi2";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import ContactPopup from "../components/ContactPopup";

type SectionImage = {
  id: number;
  mu_title: string;
  image_1: string;
  image_2: string;
  image_3: string;
  description: string;
  sort_order: number;
};

type MoreImage = {
  id: number;
  image_url: string;
  sort_order: number;
};

type CaseStudyItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  hero_image: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  head: string;
  body: string;
  award_title: string;
  award_image: string;
  section_images: SectionImage[];
  more_images: MoreImage[];
  created_at: string;
};

function CaseStudyDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };

  const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCaseStudyDetail = async () => {
    if (!slug) {
      setError("Case study slug not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${apiUrl}/get_id_based_case_studay`,
        { slug },
        { headers: { Accept: "application/json" } }
      );

      if (res.data?.success && res.data?.data?.length > 0) {
        setCaseStudy(res.data.data[0]);
      } else {
        setError(res.data?.message || "Case study not found.");
      }
    } catch (err) {
      console.error("Case Study Detail API Error:", err);
      setError("Something went wrong while loading case study detail.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudyDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
        <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <main className="bg-[#f3f3f3] px-6 py-24 text-center font-sans text-red-500">
        {error || "Case study not found."}
      </main>
    );
  }

  const sortedSections = [...(caseStudy.section_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  const sortedMoreImages = [...(caseStudy.more_images || [])].sort(
    (a, b) => a.sort_order - b.sort_order
  );
  const moreImageRows: MoreImage[][] = [];

  let moreStart = 0;
  let rowNumber = 1;

  while (moreStart < sortedMoreImages.length) {
    const count = rowNumber % 2 === 1 ? 3 : 2;

    moreImageRows.push(sortedMoreImages.slice(moreStart, moreStart + count));

    moreStart += count;
    rowNumber++;
  }
  return (
    <>
    <main className=" font-sans text-[#242424] ">
      {/* HERO */}
      <section className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-[1550px]"
        >
          <div className="overflow-hidden rounded-[14px] ">
            <div className="relative">
              <img
                src={caseStudy.hero_image}
                alt={caseStudy.title}
                className="h-auto w-full object-cover"
              />

              {caseStudy.award_image && (
                <div className="absolute bottom-5 right-5 hidden text-center sm:block">
                  <img
                    src={caseStudy.award_image}
                    alt={caseStudy.award_title}
                    className="mx-auto w-24 md:w-36 lg:w-44"
                  />

                  {caseStudy.award_title && (
                    <p className="mt-2 text-xs text-white md:text-sm">
                      {caseStudy.award_title}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className=" py-6 ">
              <h1 className="text-[48px] font-semibold text-[#242424] md:text-4xl">
                {caseStudy.title}
              </h1>

              {caseStudy.description && (
                <p className="mt-3  leading-[1.7] text-[#666] md:text-base">
                  {caseStudy.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </section>



      {/* SECTION IMAGES */}
      {sortedSections.length > 0 && (
        <section className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          {sortedSections.map((section, index) => {
            const images = [
              section.image_1,
              section.image_2,
              section.image_3,
            ].filter(Boolean);

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="h-[328px] w-full overflow-hidden rounded-[12px] bg-white"
                    >
                      <img
                        src={img}
                        alt={`${section.mu_title || "Case study image"} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {(section.mu_title || section.description) && (
                  <p className="my-4 ">
                    <span className=" font-bold text-[#242424]">
                      {section.mu_title}</span> : <span className="text-[#424242]">{section.description}</span>


                  </p>
                )}
              </motion.div>
            );
          })}
        </section>
      )}

      {/* MORE IMAGES */}
      {sortedMoreImages.length > 0 && (
        <section className="py-5 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          {moreImageRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={
                row.length === 3
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid grid-cols-1 gap-5 sm:grid-cols-2"
              }
            >
              {row.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="overflow-hidden rounded-[12px] bg-white"
                >
                  <img
                    src={img.image_url}
                    alt={`More image ${rowIndex + 1}-${index + 1}`}
                    className="block h-[372px] w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </section>
      )}

      {/* PREV NEXT */}
     <section className="mx-auto w-full max-w-full px-4 py-10 sm:px-6 lg:px-20 2xl:px-32">
  <div className="flex items-center justify-between gap-4 border-t border-[#ddd] pt-8">
    
    {/* Previous Button */}
    <button className="inline-flex items-center gap-2 text-sm font-medium text-[#666] transition hover:text-[#A62666] sm:text-base">
      <FaAnglesLeft className="text-[13px]" />
      <span>Previous Project</span>
    </button>

    {/* Explore More Button */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.45 }}
      className="flex justify-center"
    >
      <button className="motion-shine group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:text-[20px] 2xl:text-[24px]">
        Explore More
        <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <HiArrowUpRight className="h-5 w-5" />
              </span>
      </button>
    </motion.div>

    {/* Next Button */}
    <button className="inline-flex items-center gap-2 text-sm font-medium text-[#666] transition hover:text-[#A62666] sm:text-base">
      <span>Next Project</span>
      <FaAnglesRight className="text-[13px]" />
    </button>

  </div>
</section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 py-14 text-center md:px-20 lg:px-[115px]">
          <h3 className="font-bold uppercase tracking-wide text-white text-3xl md:text-5xl lg:text-3xl">
            WANT TO EXPAND YOUR BUSINESS ?
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
             onClick={()=>handleContactPopupOpen()}
            className="mt-5 flex justify-center lg:justify-start"
          >
            <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
              Let&apos;s Discuss 

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <HiArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>

        </div>
      </section>

    </main>
      <ContactPopup
                          isOpen={isContactPopupOpen}
                          onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
                      />
    </>
  );
}

export default function CaseStudyDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
          <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
        </div>
      }
    >
      <CaseStudyDetailContent />
    </Suspense>
  );
}