"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  motion,
  type MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuMoveUpRight } from "react-icons/lu";

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

type CaseStudyResponse = {
  success: boolean;
  message: string;
  data: CaseStudyItem[];
};

type SectionHeightStyles = CSSProperties & {
  "--mobile-section-height": string;
  "--tablet-section-height": string;
  "--desktop-section-height": string;
  "--wide-section-height": string;
  "--full-hd-section-height": string;
};

export default function BrandPage() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const total = brandStories.length;
  const transitionCount = Math.max(total - 1, 0);

  /*
   * Separate scroll distances for:
   * 375px
   * 789px
   * 1024px
   * 1410px
   * 1920px
   */
  const sectionHeightStyle: SectionHeightStyles = {
    "--mobile-section-height":
      loading || total === 0
        ? "100svh"
        : `calc(100svh + ${transitionCount * 82}svh)`,

    "--tablet-section-height":
      loading || total === 0
        ? "100svh"
        : `calc(100svh + ${transitionCount * 68}svh)`,

    "--desktop-section-height":
      loading || total === 0
        ? "100svh"
        : `calc(100svh + ${transitionCount * 75}svh)`,

    "--wide-section-height":
      loading || total === 0
        ? "100dvh"
        : `calc(100dvh + ${transitionCount * 88}dvh)`,

    "--full-hd-section-height":
      loading || total === 0
        ? "100dvh"
        : `calc(100dvh + ${transitionCount * 92}dvh)`,
  };

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);

        const response = await axios.post<CaseStudyResponse>(
          `${apiUrl}/caseStudyList`,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (response.data?.success) {
          setBrandStories(response.data.data ?? []);
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

    fetchCaseStudies();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    mass: 1,
  });

  return (
    <main
      className="
        overflow-visible
        bg-[#f6f6f6]
        px-4
        pb-0
        pt-6
        font-sans

        md:px-6
        md:pt-8

        min-[1440px]:px-10
    min-[1440px]:pt-[50px]

    min-[1680px]:px-16
    min-[1920px]:px-20
    min-[1920px]:pt-[60px]
      "
    >
      <section
  ref={sectionRef}
  style={sectionHeightStyle}
  className="
       brand-scroll-section
    mx-auto
    w-full

    h-[var(--mobile-section-height)]
    min-[789px]:h-[var(--tablet-section-height)]
    min-[1024px]:h-[var(--desktop-section-height)]
    min-[1410px]:h-[var(--wide-section-height)]

 
  "
>
 <div className="brand-sticky-shell">
  <div className="brand-sticky-grid">
    {/* Heading */}
    <div className="shrink-0">
      <h2
        className="
          text-[28px]
          font-bold
          leading-[1.05]
          text-primary

          sm:text-[32px]
          md:text-[38px]
          lg:text-[44px]
          min-[1440px]:text-[48px]
          min-[1920px]:text-[54px]
        "
      >
        Story Behind Brand Building
      </h2>

      <p
        className="
          mt-2
          max-w-[900px]
          text-[14px]
          leading-relaxed
          text-black

          sm:text-[16px]
          md:text-[18px]
          lg:text-[20px]
          min-[1440px]:text-[22px]
          min-[1920px]:text-[24px]
        "
      >
        Explore the process behind crafting memorable brand experiences.
      </p>
    </div>

    {loading ? (
      <div className="flex min-h-[360px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
      </div>
    ) : total === 0 ? (
      <div className="flex min-h-[360px] items-center justify-center">
        <p className="text-[#626262]">No case studies found.</p>
      </div>
    ) : (
      <div className="brand-image-stage">
        {brandStories.map((item, index) => (
          <ScrollSlide
            key={item.id}
            item={item}
            index={index}
            total={total}
            progress={smoothProgress}
          />
        ))}
      </div>
    )}

    {!loading && total > 0 && (
      <div className="brand-action-row">
        <button
          type="button"
          onClick={() => router.push("/CaseStudies")}
          className="
            brand-case-study-button
            group
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-full
            bg-primary
            px-5
            py-2.5
            text-[14px]
            font-bold
            text-white
            shadow-lg
            shadow-primary/20
            transition-all
            duration-300

            hover:-translate-y-1
            hover:bg-[#7a1f50]
            hover:shadow-xl

            sm:px-6
            sm:py-3
            sm:text-[16px]

            lg:gap-5
            lg:px-7
            lg:text-[18px]

            min-[1440px]:gap-6
            min-[1440px]:px-8
            min-[1440px]:text-[20px]

            min-[1920px]:px-9
            min-[1920px]:text-[22px]
          "
        >
          Case Studies

          <LuMoveUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1

              lg:h-5
              lg:w-5
            "
          />
        </button>
      </div>
    )}
  </div>
</div>
</section>
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

  const step = total > 0 ? 1 / total : 1;
  const start = index * step;

  const inputRange =
    total === 1
      ? [0, 0.5, 1]
      : isFirst
        ? [0, Math.min(0.99, step * 0.6), Math.min(1, step)]
        : [
            Math.max(0, start - step * 0.55),
            start,
            Math.min(1, start + step * 0.8),
          ];

  const y = useTransform(
    progress,
    inputRange,
    total === 1
      ? ["0%", "0%", "0%"]
      : isFirst
        ? ["0%", "-2%", "-5%"]
        : isLast
          ? ["100%", "0%", "0%"]
          : ["100%", "0%", "-5%"],
  );

  const scale = useTransform(
    progress,
    inputRange,
    total === 1
      ? [1, 1, 1]
      : isFirst
        ? [1, 0.99, 0.97]
        : isLast
          ? [0.97, 1, 1]
          : [0.97, 1, 0.97],
  );

 

  return (
 <motion.article
  style={{
    y,
    scale,
    zIndex: index + 1,
  }}
  className="
    absolute
    inset-0
    origin-top
    overflow-hidden
    rounded-lg

    sm:rounded-xl
    lg:rounded-2xl
  "
>
  <Link
    href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
    aria-label={`View case study: ${item.title}`}
    className="group relative block h-full w-full overflow-hidden"
  >
    <img
      src={item.hero_image}
      alt={item.title}
      draggable={false}
      className="
        absolute
        inset-0
        block
        h-full
        w-full
        max-w-none
        object-cover
        object-center
      "
    />

    {/* Title position */}
    <div
      className="
        absolute
        inset-x-0
        top-0
        z-10

        p-2.5
        sm:p-3
        md:p-5
        lg:p-7
        min-[1410px]:p-8
      "
    >
      {/* Title box */}
      <div
        className="
          inline-block
          max-w-[85%]
          rounded-lg
          border
          border-white/25
          bg-black/45

          px-3
          py-2

          shadow-[0_6px_20px_rgba(0,0,0,0.18)]
          backdrop-blur-md

          sm:max-w-[80%]
          sm:rounded-xl
          sm:px-4
          sm:py-2.5

          md:max-w-[75%]
          md:px-5
          md:py-3

          lg:max-w-[78%]
          lg:rounded-2xl
          lg:px-7
          lg:py-4

          min-[1410px]:rounded-[20px]
          min-[1410px]:px-8
          min-[1410px]:py-5
        "
      >
        <h3
          className="
            !m-0
            !capitalize
            font-bold
            leading-tight
            text-white

            text-[16px]
            sm:text-[18px]
            md:text-[24px]
            lg:text-[36px]
            xl:text-[42px]
            min-[1410px]:text-[48px]
          "
        >
          {item.title}
        </h3>
      </div>
    </div>
  </Link>
</motion.article>
  );
}