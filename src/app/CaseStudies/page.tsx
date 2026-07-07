"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Breadcrumb from "../components/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { apiUrl } from "../config";
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
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
  slug?: string;
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

export default function CaseStudyPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router=useRouter();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };
  const makeSlug = (text: string) => {
    return text
      ?.toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${apiUrl}/caseStudyList`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success) {
        setCaseStudies(res.data?.data || []);
      } else {
        setError(res.data?.message || "Failed to fetch case studies.");
      }
    } catch (err) {
      console.error("Case Study API Error:", err);
      setError("Something went wrong while loading case studies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  return (
    <>
      {/* <Breadcrumb /> */}

      <main className="bg-[#f6f6f6] font-body text-[#333333]">
        <section className="mx-auto max-w-full px-4 py-16 xl:py-[85px] sm:px-6 lg:px-20 2xl:px-32">
          {/* Page Title */}
          <div className="">
            <h2 className="text-[#a20d69] ">
              Story Behind Brand Building
            </h2>
          </div>

          {/* Loading */}
          {loading && (
            <p className="py-10 text-center text-sm font-medium text-[#626262]">
              Loading case studies...
            </p>
          )}

          {/* Error */}
          {!loading && error && (
            <p className="py-10 text-center text-sm font-medium text-red-500">
              {error}
            </p>
          )}

          {/* Case Studies */}
          {!loading && !error && (
            <div className="space-y-9 mt-14">
              {caseStudies.map((study, idx) => {
                const detailSlug = study.slug || makeSlug(study.title);

                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="w-full mt-10"
                  >
                    <Link
                      href={`/case-study-detail?slug=${encodeURIComponent(
                        detailSlug
                      )}`}
                      className="block"
                    >
                      <div className="overflow-hidden rounded-xl bg-white">
                        <img
                          src={study.hero_image}
                          alt={study.award_title || study.title}
                          className="h-auto w-full rounded-xl object-cover"
                        />
                      </div>

                      <div className="mt-5">
                        <h2 className="font-heading text-[16px] font-bold text-[#202020] md:text-[18px]">
                          {study.title}
                        </h2>

                        <p className="mt-4 text-[12px] leading-relaxed text-[#5f5f5f] md:text-[13px]">
                          {study.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* View More */}
          {!loading && !error && caseStudies.length > 0 && (
            <div className="mt-8 flex justify-center">
                <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: 0.45 }}
                                      //  onClick={()=>handleContactPopupOpen()}
                                      className=" flex justify-center lg:justify-start"
                                  >
                                      <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                           view More
              
                                          <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                              <LuMoveUpRight className="h-5 w-5" />
                                          </span>
                                      </button>
                                  </motion.div>
          
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
          <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
            <h3 style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}  className="font-bold  tracking-wide text-white ">
              Want to scale your brand ?
            </h3>
   <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: 0.45 }}
                                     onClick={()=>handleContactPopupOpen()}
                                      className="mt-10 flex justify-center lg:justify-start"
                                  >
                                      <button className="motion-shine group inline-flex items-center gap-4 rounded-full bg-[#720048] px-8 py-5 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                         Lets Discuss
              
                                          <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                              <LuMoveUpRight className="h-5 w-5" />
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
