"use client";

import {  type CSSProperties, useEffect, useRef, useState } from "react";
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
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

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
  const router=useRouter();

  const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const TOTAL = brandStories.length;
 const sectionHeightStyle = {
  "--mobile-section-height":
    loading || TOTAL === 0
      ? "540px"
      : `${540 + Math.max(TOTAL - 1, 0) * 375}px`,

  "--wide-section-height":
    loading || TOTAL === 0
      ? "100vh"
      : `${TOTAL * 90}vh`,
} as CSSProperties;

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
    <main className="bg-[#f6f6f6] font-sans py-10 px-4  lg:px-20 2xl:px-32 xl:py-[85px]">
      {/* <section
  ref={sectionRef}
  className="
    relative mb-10
    h-[var(--mobile-section-height)]
    2xl:h-[var(--wide-section-height)]!
  "
  style={sectionHeightStyle}
>
  <div
    className="
      sticky top-0
      h-[560px]
      overflow-hidden
      2xl:h-screen!
    "
  >
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
            <h2 className="
leading-none
text-primary">
                Story Behind Brand Building
              </h2>

              <p className="mt-5 text-lg xl:text-2xl text-black ">
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
           <div
  className="
    relative mt-8
    h-[375px]
    overflow-hidden
    rounded-xl
    bg-[#f6f6f6]
    2xl:h-[calc(100vh-100px)]
  "
>
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
      <div className="absolute bottom-1 2xl:-bottom-20 left-0 z-50">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            onClick={()=> router.push("/CaseStudies")}
            className="mt-14 flex justify-center  lg:justify-start"
          >
            <button className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-3 py-2 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:gap-[25px] lg:px-6 sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
              Case Studies

              <span className="flex h-4 w-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </span>
            </button>
          </motion.div>
          
   
    </div>
      </section> */}
<section
  ref={sectionRef}
  style={sectionHeightStyle}
  className="
    relative mb-10
    h-[var(--mobile-section-height)]
    2xl:h-[var(--wide-section-height)]
  "
>
  <div
    className="
      sticky top-0
      overflow-visible
      2xl:h-screen
      2xl:overflow-hidden
    "
  >
    <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="leading-none text-primary">
          Story Behind Brand Building
        </h2>

        <p className="mt-5 text-lg text-black xl:text-2xl">
          Explore the process behind crafting memorable brand experiences.
        </p>
      </div>
    </div>

    {loading ? (
      <div className="flex h-[375px] items-center justify-center 2xl:h-[calc(100vh-150px)]">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
      </div>
    ) : TOTAL === 0 ? (
      <div className="flex h-[375px] items-center justify-center 2xl:h-[calc(100vh-150px)]">
        <p className="text-[#626262]">No case studies found.</p>
      </div>
    ) : (
      <>
        <div
          className="
            relative mt-8
            h-[375px]
            overflow-hidden
            rounded-xl
            bg-[#f6f6f6]
            2xl:h-[calc(100vh-100px)]
          "
        >
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

        {/* Button directly below image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="
            relative z-50
            mt-5
            flex justify-start
            2xl:absolute
            2xl:-bottom-20
            2xl:left-0
            2xl:mt-14
          "
        >
          <button
            type="button"
            onClick={() => router.push("/CaseStudies")}
            className="
              motion-shine group
              inline-flex items-center gap-2
              rounded-full bg-primary
              px-3 py-2
              text-[14px] font-bold text-white
              shadow-lg shadow-primary/20
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#7a1f50]
              hover:shadow-xl
              hover:shadow-primary/30
              sm:text-[16px]
              lg:gap-[25px]
              lg:px-6
              lg:text-[18px]
              xl:text-[20px]
              2xl:text-[24px]
            "
          >
            Case Studies

            <span className="flex h-4 w-4 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 lg:h-5 lg:w-5">
              <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
            </span>
          </button>
        </motion.div>
      </>
    )}
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
        zIndex: index + 1,
      }}
      className="absolute inset-0 origin-top rounded-xl "
    >
      <Link
        href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
        className="group block h-full rounded-xl "
      >
        <div className="relative h-full overflow-hidden rounded-xl ">
          <motion.img
            src={item.hero_image}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover object-top rounded-xl "
            style={{
              scale: imageScale,
            }}
          />

          <div className="absolute  rounded-xl  left-0 right-0 top-0 flex items-start justify-between gap-4 p-5 md:p-7 lg:p-8">
         <div className="inline-block max-w-[80%] rounded-[20px] border border-black/80 bg-black/40 px-5 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-md sm:px-6 sm:py-5 md:px-8">
    <h3 className="!capitalize text-lg font-bold leading-tight text-white sm:text-xl md:text-3xl lg:text-4xl 2xl:text-5xl">
        {item.title}
    </h3>
</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
