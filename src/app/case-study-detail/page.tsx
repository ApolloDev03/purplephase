"use client";

import { motion } from "framer-motion";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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
        { slug: slug },
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
      <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
        <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <main className="bg-[#fdfdfd] px-6 py-20 text-center font-sans text-red-500">
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

  const allImages = [
    ...sortedSections.flatMap((section) =>
      [section.image_1, section.image_2, section.image_3].filter(Boolean)
    ),
    ...sortedMoreImages.map((img) => img.image_url),
  ];

  const pattern = [2, 3, 2, 3, 2, 3];
  let start = 0;

  return (
    <main className="bg-[#f3f3f3] font-sans text-[#333]">
      {/* HERO */}

      <section className="w-full bg-[#f3f3f3] px-4 py-16 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-full"></div>
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-full rounded-xl overflow-hidden bg-white"
        >
          <div className="relative">
            <img
              src={caseStudy.hero_image}
              alt={caseStudy.title}
              className="w-full object-cover"
            />

            {caseStudy.award_image && (
              <div className="absolute bottom-6 right-6">
                <img src={caseStudy.award_image} className="w-32 md:w-48" />

                <p className="text-white text-sm mt-2 text-center">
                  {caseStudy.award_title}
                </p>
              </div>
            )}
          </div>

          <div className="p-8">
            <h1 className="text-3xl font-semibold">{caseStudy.title}</h1>

            <p className="mt-2 text-[#666]">{caseStudy.description}</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION IMAGES */}

      <section className="w-full px-4 pb-16 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-full"></div>
        {pattern.map((count, index) => {
          const imgs = allImages.slice(start, start + count);

          start += count;

          if (!imgs.length) return null;

          return (
            <div key={index} className="mb-5">
              <div className={`grid grid-cols-${count} gap-5`}>
                {imgs.map((img, i) => (
                  <div key={i} className="h-[300px] rounded-xl overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {/* MORE IMAGES */}
        {/* PREV NEXT */}

        <div className="flex justify-between items-center mt-12">
          <button className="text-sm text-[#666]">← Previous Project</button>

          <button
            className="bg-[#A62666]
      text-white
      px-6
      py-2
      rounded-full"
          >
            Explore More
          </button>

          <button className="text-sm text-[#666]">Next Project →</button>
        </div>
      </section>

      {/* CTA */}

      <section className="bg-[#9C1367] py-16 mt-10">
        <div className="text-center">
          <h2 className="text-white font-bold text-3xl">
            WANT TO EXPAND YOUR BUSINESS ?
          </h2>

          <button
            className="mt-6
      bg-[#7b0d50]
      px-8
      py-3
      rounded-full
      text-white"
          >
            Lets Discuss ↗
          </button>
        </div>
      </section>
    </main>
  );
}

export default function CaseStudyDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
          <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
        </div>
      }
    >
      <CaseStudyDetailContent />
    </Suspense>
  );
}
