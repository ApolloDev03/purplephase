"use client";

import { motion ,AnimatePresence} from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";
import { LuMoveUpRight } from "react-icons/lu";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import ContactPopup from "../components/ContactPopup";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  previous_slug: string | null;
  next_slug: string | null;
  section_images: SectionImage[];
  more_images: MoreImage[];
  created_at: string;
};

function CaseStudyDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };

  const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [activeMoreImageIndex, setActiveMoreImageIndex] = useState<number | null>(null);
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
useEffect(() => {
  if (activeMoreImageIndex === null) return;

  const moreImagesLength = caseStudy?.more_images?.length || 0;
  if (moreImagesLength === 0) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setActiveMoreImageIndex((prev) => {
        if (prev === null) return 0;
        return prev === 0 ? moreImagesLength - 1 : prev - 1;
      });
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setActiveMoreImageIndex((prev) => {
        if (prev === null) return 0;
        return prev === moreImagesLength - 1 ? 0 : prev + 1;
      });
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setActiveMoreImageIndex(null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [activeMoreImageIndex, caseStudy?.more_images?.length]);
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
  const handleProjectChange = (projectSlug: string | null) => {
  if (!projectSlug) return;

  router.push(`/case-study-detail?slug=${projectSlug}`);

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
};

const openMoreImageSlider = (imageId: number) => {
  const imageIndex = sortedMoreImages.findIndex((img) => img.id === imageId);
  setActiveMoreImageIndex(imageIndex >= 0 ? imageIndex : 0);
};

const closeMoreImageSlider = () => {
  setActiveMoreImageIndex(null);
};

const handlePrevMoreImage = () => {
  if (!sortedMoreImages.length) return;

  setActiveMoreImageIndex((prev) => {
    if (prev === null) return 0;
    return prev === 0 ? sortedMoreImages.length - 1 : prev - 1;
  });
};

const handleNextMoreImage = () => {
  if (!sortedMoreImages.length) return;

  setActiveMoreImageIndex((prev) => {
    if (prev === null) return 0;
    return prev === sortedMoreImages.length - 1 ? 0 : prev + 1;
  });
};

const activeMoreImage =
  activeMoreImageIndex !== null ? sortedMoreImages[activeMoreImageIndex] : null;


  return (
    <>
    <main className="py-16 bg-[#f6f6f6] font-sans text-[#242424] ">
      {/* HERO */}
      <section className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
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
        <section className=" mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
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
                className="w-full my-4"
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
                  <p className="mt-5 ">
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
      {/* {sortedMoreImages.length > 0 && (
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
      )} */}
      {/* MORE IMAGES */}
{sortedMoreImages.length > 0 && (
  <section className="mx-auto w-full max-w-full px-4 py-5 sm:px-6 lg:px-20 2xl:px-32">
    {moreImageRows.map((row, rowIndex) => {
      const isThreeGrid = row.length === 3;

      return (
        <div
          key={rowIndex}
          className={`mb-5 grid grid-cols-1 gap-5 ${
            isThreeGrid ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2"
          }`}
        >
          {row.map((img, index) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              onClick={() => openMoreImageSlider(img.id)}
              className={`group cursor-pointer overflow-hidden rounded-[12px] bg-white ${
                isThreeGrid ? "aspect-[536/335]" : "aspect-[815/509]"
              }`}
            >
              <img
                src={img.image_url}
                alt={`More image ${rowIndex + 1}-${index + 1}`}
                className="block h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      );
    })}
  </section>
)}

{/* PREV NEXT */}
<section className="mx-auto w-full max-w-full px-4 py-10 sm:px-6 lg:px-20 2xl:px-32">
  <div className="flex flex-col items-center justify-between gap-5  pt-5 sm:flex-row">
    {/* Previous Button */}
    <button
      type="button"
      onClick={() => handleProjectChange(caseStudy.previous_slug)}
      disabled={!caseStudy.previous_slug}
      className={`inline-flex items-center gap-2 text-sm font-medium transition sm:text-base ${
        caseStudy.previous_slug
          ? "cursor-pointer text-[#666] hover:text-[#A62666]"
          : "cursor-not-allowed text-gray-300"
      }`}
    >
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
      <button
        type="button"
        onClick={() => router.push("/case-study")}
        className="motion-shine group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:text-[20px] 2xl:text-[24px]"
      >
        Explore More
        <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
          <LuMoveUpRight className="h-5 w-5" />
        </span>
      </button>
    </motion.div>

    {/* Next Button */}
    <button
      type="button"
      onClick={() => handleProjectChange(caseStudy.next_slug)}
      disabled={!caseStudy.next_slug}
      className={`inline-flex items-center gap-2 text-sm font-medium transition sm:text-base ${
        caseStudy.next_slug
          ? "cursor-pointer text-[#666] hover:text-[#A62666]"
          : "cursor-not-allowed text-gray-300"
      }`}
    >
      <span>Next Project</span>
      <FaAnglesRight className="text-[13px]" />
    </button>
  </div>
</section>

      {/* CTA */}
          <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
          <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
            <h1  className="uppercase text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
            WANT TO EXPAND YOUR BUSINESS ?
            </h1>
   <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: 0.45 }}
                                     onClick={()=>handleContactPopupOpen()}
                                      className="mt-10 flex justify-center lg:justify-start"
                                  >
                                      <button className="motion-shine group inline-flex items-center gap-4 rounded-full bg-[#720048] px-8 py-5 text-[15px] lg:text-[20px] 2xl:text-[32px]! font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                         Lets Discuss
              
                                          <span className="flex h-8 w-8 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                              <LuMoveUpRight className="h-8 w-8" />
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
                      <AnimatePresence>
  {activeMoreImage && (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeMoreImageSlider}
    >
      <button
        type="button"
        onClick={closeMoreImageSlider}
        className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white"
      >
        <X size={24} />
      </button>

      {sortedMoreImages.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevMoreImage();
          }}
          className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:left-10"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      <motion.div
        key={activeMoreImage.id}
        className="relative flex max-h-[82vh] w-full max-w-[1100px] items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={activeMoreImage.image_url}
          alt="Gallery preview"
          className="max-h-[82vh] w-auto max-w-full rounded-[10px] object-contain"
        />
      </motion.div>

      {sortedMoreImages.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextMoreImage();
          }}
          className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:right-10"
        >
          <ChevronRight size={30} />
        </button>
      )}
    </motion.div>
  )}
</AnimatePresence>
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