"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";

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

type CaseStudyResponse = {
  success: boolean;
  message: string;
  data: CaseStudyItem[];
};

export default function BrandPage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const TOTAL = brandStories.length;

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);

      const res = await axios.post<CaseStudyResponse>(
        `${apiUrl}/caseStudyList`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success) {
        setBrandStories(res.data.data || []);
      } else {
        setBrandStories([]);
      }
    } catch (error) {
      console.error("Case study list API error:", error);
      setBrandStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll animation
const smoothProgress = useSpring(scrollYProgress, {
  stiffness: 45,
  damping: 30,
  mass: 1,
});

  return (
    <main className="bg-[#e5e5e5] font-sans py-16 px-4 sm:px-6 lg:px-20 2xl:px-32">
      <section
        ref={sectionRef}
        className="relative mb-10"
        style={{
          height: loading || TOTAL === 0
  ? "100vh"
  : `${TOTAL * 90}vh`,
        }}
      >
        <div className="sticky top-0 h-screen overflow-hidden ">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
            <h2 className="
leading-none
text-primary">
                Story Behind Brand Building
              </h2>

              <p className="mt-4 text-lg xl:text-2xl text-black ">
                Explore the process behind crafting memorable brand experiences.
              </p>
            </div>
        
          </div>

          {loading ? (
            <div className="flex h-[calc(100vh-150px)] items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full  border-t-[#A62666]" />
            </div>
          ) : TOTAL === 0 ? (
            <div className="flex h-[calc(100vh-150px)] items-center justify-center">
              <p className="text-[#626262]">No case studies found.</p>
            </div>
          ) : (
            <div className="relative mt-8 bg-[#e5e5e5] h-[calc(100vh-100px)] overflow-hidden">
              {brandStories.map((item, i) => (
                <ScrollSlide
                  key={item.id}
                  item={item}
                  index={i}
                  total={TOTAL}
                  progress={smoothProgress}
                />
              ))}
            </div>
          )}
        </div>
      <div className="absolute -bottom-16 left-0  z-[999]">
      <Link
        href="/CaseStudies"
        className="inline-flex items-center gap-2 rounded-full bg-[#A62666] px-6 py-3 font-medium text-white hover:bg-[#8d2157]"
      >
        View All
        <MoveUpRight className="h-5 w-5" />
      </Link>
    </div>
      </section>

      {/* View All Button */}
    </main>
  );
}

function ScrollSlide({
  item,
  index,
  total,
  progress,
}: {
  item: CaseStudyItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const step = 1 / total;

  const start = index * step;
 const mid = start + step * 0.6;
  const end = start + step;

const inputRange = [
  Math.max(0, start - step * 0.6),
  start,
  mid,
  Math.min(1, end + step * 0.1),
];

const y = useTransform(
  progress,
  inputRange,
  isFirst
    ? ["0%", "0%", "-4%", "-8%"]
    : ["100%", "0%", "-4%", "-8%"]
);

  const scale = useTransform(
    progress,
    inputRange,
    isFirst
      ? [1, 1, isLast ? 1 : 0.97, isLast ? 1 : 0.95]
      : [0.95, 1, isLast ? 1 : 0.97, isLast ? 1 : 0.95]
  );

  const rotate = useTransform(
    progress,
    inputRange,
    isFirst
      ? [0, 0, isLast ? 0 : -0.8, isLast ? 0 : -1.2]
      : [1.2, 0, isLast ? 0 : -0.8, isLast ? 0 : -1.2]
  );

  const opacity = useTransform(
    progress,
    inputRange,
    isFirst ? [1, 1, 1, isLast ? 1 : 0.95] : [0, 1, 1, isLast ? 1 : 0.95]
  );

  const imageScale = useTransform(
    progress,
    inputRange,
    isFirst ? [1, 1, 1.03, 1.05] : [1.05, 1, 1.03, 1.05]
  );

  return (
    <motion.div
      style={{
        y,
        scale,
        // opacity,
        zIndex: index + 1,
      }}
      className="absolute inset-0 origin-top "
    >
      <Link
        href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
        className="group block h-full"
      >
        <div className="relative h-full overflow-hidden rounded-2xl ">
          <motion.img
            src={item.hero_image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover object-top"
            style={{
              scale: imageScale,
            }}
          />

          <div className="absolute left-0 right-0 top-0 flex items-start justify-between gap-4 p-5 md:p-7 lg:p-8">
          <h3 className="max-w-[80%] text-lg font-bold uppercase leading-tight text-white sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
