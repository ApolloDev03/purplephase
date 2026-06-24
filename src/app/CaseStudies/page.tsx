"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Breadcrumb from "../components/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { apiUrl } from "../config";

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

      <main className="bg-[#eeeeee] font-body text-[#333333]">
        <section className="mx-auto max-w-[1440px] px-6 py-10 md:px-20 lg:px-[25px]">
          {/* Page Title */}
          <div className="mb-7">
            <h1 className="font-heading text-[20px] font-bold text-[#a20d69] md:text-[26px]">
              Story Behind Brand Building
            </h1>
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
            <div className="space-y-9">
              {caseStudies.map((study, idx) => {
                const detailSlug = study.slug || makeSlug(study.title);

                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: idx * 0.06 }}
                    className="w-full"
                  >
                    <Link
                      href={`/case-study-detail?slug=${encodeURIComponent(
                        detailSlug
                      )}`}
                      className="block"
                    >
                      <div className="overflow-hidden rounded-md bg-white">
                        <img
                          src={study.hero_image}
                          alt={study.award_title || study.title}
                          className="h-auto w-full rounded-md object-cover"
                        />
                      </div>

                      <div className="mt-3">
                        <h2 className="font-heading text-[16px] font-bold text-[#202020] md:text-[18px]">
                          {study.title}
                        </h2>

                        <p className="mt-1 text-[12px] leading-relaxed text-[#5f5f5f] md:text-[13px]">
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
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex w-auto min-w-[120px] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[#a20d69] px-6 py-3 text-[12px] font-bold leading-none text-white transition hover:bg-[#7b0043]"
              >
                <span className="leading-none">View More</span>
                <ArrowUpRight size={14} className="shrink-0" />
              </motion.button>
            </div>
          )}
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
          <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 py-9 text-center md:px-20 lg:px-[115px]">
            <p className="font-bold uppercase tracking-wide text-white text-3xl md:text-5xl lg:text-3xl">
              Want to scale your brand ?
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#720048] px-7 py-3 text-[12px] font-bold text-white transition hover:bg-[#720048]"
            >
              Get A Quote
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
