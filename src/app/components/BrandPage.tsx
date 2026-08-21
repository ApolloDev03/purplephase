"use client";

import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  AnimatePresence,
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

/* =====================================================
   TYPES
===================================================== */

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
  show_home_page: number | string;
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

type ScrollDistanceStyles = CSSProperties & {
  "--mobile-scroll-distance": string;
  "--tablet-scroll-distance": string;
  "--desktop-scroll-distance": string;
  "--wide-scroll-distance": string;
  "--full-hd-scroll-distance": string;
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

export default function BrandPage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);

  const [brandStories, setBrandStories] = useState<
    CaseStudyItem[]
  >([]);

  const [loading, setLoading] = useState(true);

  /* =====================================================
     MOBILE AUTO SLIDER INDEX
  ===================================================== */

  const [mobileActiveIndex, setMobileActiveIndex] =
    useState(0);

  const total = brandStories.length;

  const transitionCount = Math.max(total - 1, 0);

  /* =====================================================
     SCROLL DISTANCE
  ===================================================== */

  const scrollDistanceStyle: ScrollDistanceStyles = {
    "--mobile-scroll-distance":
      loading || total <= 1
        ? "0px"
        : `${transitionCount * 50}svh`,

    "--tablet-scroll-distance":
      loading || total <= 1
        ? "0px"
        : `${transitionCount * 58}svh`,

    "--desktop-scroll-distance":
      loading || total <= 1
        ? "0px"
        : `${transitionCount * 70}svh`,

    "--wide-scroll-distance":
      loading || total <= 1
        ? "0px"
        : `${transitionCount * 82}dvh`,

    "--full-hd-scroll-distance":
      loading || total <= 1
        ? "0px"
        : `${transitionCount * 88}dvh`,
  };

  /* =====================================================
     DEVICE CHECK
     MOBILE = BELOW 768PX
  ===================================================== */

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 767px)"
    );

    const updateDevice = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateDevice();

    mediaQuery.addEventListener(
      "change",
      updateDevice
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        updateDevice
      );
    };
  }, []);

  /* =====================================================
     FETCH CASE STUDIES
  ===================================================== */

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        setLoading(true);

        const response =
          await axios.post<CaseStudyResponse>(
            `${apiUrl}/caseStudyList`,
            {},
            {
              headers: {
                Accept: "application/json",
              },
            }
          );

        if (response.data?.success) {
          const homePageStories = (
            response.data.data ?? []
          ).filter(
            (item) =>
              Number(item.show_home_page) === 1
          );

          setBrandStories(homePageStories);
        } else {
          setBrandStories([]);
        }
      } catch (error) {
        console.error(
          "Case study list API error:",
          error
        );

        setBrandStories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudies();
  }, []);

  /* =====================================================
     RESET MOBILE INDEX
     WHEN API DATA CHANGES
  ===================================================== */

  useEffect(() => {
    setMobileActiveIndex(0);
  }, [brandStories.length]);

  /* =====================================================
     MOBILE AUTO SLIDER

     MOBILE ONLY:
     EVERY 3.5 SECOND NEXT IMAGE
  ===================================================== */

  useEffect(() => {
    if (!isMobile) return;

    if (brandStories.length <= 1) return;

    const autoSlideInterval =
      window.setInterval(() => {
        setMobileActiveIndex((currentIndex) => {
          if (
            currentIndex ===
            brandStories.length - 1
          ) {
            return 0;
          }

          return currentIndex + 1;
        });
      }, 3500);

    return () => {
      window.clearInterval(autoSlideInterval);
    };
  }, [isMobile, brandStories.length]);

  /* =====================================================
     DESKTOP SCROLL PROGRESS
  ===================================================== */

  const { scrollYProgress } = useScroll({
    target: sectionRef,

    offset: isMobile
      ? ["start start", "end start"]
      : ["start start", "end end"],
  });

  const smoothProgress = useSpring(
    scrollYProgress,
    {
      stiffness: 45,
      damping: 30,
      mass: 1,
    }
  );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <main
      className="
        overflow-visible
        bg-[#f6f6f6]
        px-4
        pb-0
        pt-0
        mb-0
        font-sans

        md:px-6
        md:pt-8

        min-[1440px]:px-10
        min-[1440px]:pt-[50px]

        min-[1680px]:px-16

        min-[1920px]:px-32!
        min-[1920px]:py-[60px]
      "
    >
      <section
        ref={sectionRef}
        style={scrollDistanceStyle}
        className="
          brand-scroll-section
          mx-auto
          mb-0
          w-full
          py-[20px]
        "
      >
        <div className="brand-sticky-shell">
          <div className="brand-sticky-grid">

            {/* =====================================================
                HEADING
            ===================================================== */}

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
                Explore the process behind crafting
                memorable brand experiences.
              </p>
            </div>

            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading ? (
              <div
                className="
                  flex
                  min-h-[360px]
                  items-center
                  justify-center
                "
              >
                <div
                  className="
                    h-12
                    w-12
                    animate-spin
                    rounded-full
                    border-4
                    border-black/10
                    border-t-[#A62666]
                  "
                />
              </div>
            ) : total === 0 ? (
              <div
                className="
                  flex
                  min-h-[360px]
                  items-center
                  justify-center
                "
              >
                <p className="text-[#626262]">
                  No case studies found.
                </p>
              </div>
            ) : (
              /* =====================================================
                 IMAGE STAGE
              ===================================================== */

              <div
                className="
                  brand-image-stage
                  relative
                  w-full
                "
              >
                {/* =================================================
                    MOBILE
                    AUTO SLIDER
                ================================================= */}

                {isMobile ? (
                  <AnimatePresence
                    mode="popLayout"
                    initial={false}
                  >
                    {brandStories[
                      mobileActiveIndex
                    ] && (
                      <MobileAutoSlide
                        key={
                          brandStories[
                            mobileActiveIndex
                          ].id
                        }
                        item={
                          brandStories[
                            mobileActiveIndex
                          ]
                        }
                      />
                    )}
                  </AnimatePresence>
                ) : (
                  /* ===============================================
                     TABLET + DESKTOP
                     MOUSE / PAGE SCROLL
                  =============================================== */

                  <>
                    {brandStories.map(
                      (item, index) => (
                        <ScrollSlide
                          key={item.id}
                          item={item}
                          index={index}
                          total={total}
                          progress={smoothProgress}
                        />
                      )
                    )}
                  </>
                )}

                {/* =================================================
                    MOBILE DOT INDICATORS
                ================================================= */}

                {isMobile && total > 1 && (
                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-3
                      left-1/2
                      z-50
                      flex
                      -translate-x-1/2
                      items-center
                      justify-center
                      gap-1.5
                    "
                  >
                    {brandStories.map(
                      (story, index) => (
                        <span
                          key={story.id}
                          className={`
                            block
                            h-1.5
                            rounded-full
                            transition-all
                            duration-300

                            ${
                              index ===
                              mobileActiveIndex
                                ? "w-6 bg-white"
                                : "w-1.5 bg-white/50"
                            }
                          `}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* =====================================================
                CASE STUDY BUTTON
            ===================================================== */}

            {!loading && total > 0 && (
              <div className="brand-action-row">
                <button
                  type="button"
                  onClick={() =>
                    router.push("/case-study")
                  }
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

        {/* =====================================================
            DESKTOP / TABLET SCROLL HEIGHT
        ===================================================== */}

        {!loading && total > 1 && (
          <div
            className="brand-scroll-spacer"
            aria-hidden="true"
          />
        )}
      </section>
    </main>
  );
}

/* =========================================================
   MOBILE AUTO SLIDE COMPONENT
========================================================= */

function MobileAutoSlide({
  item,
}: {
  item: CaseStudyItem;
}) {
  return (
    <motion.article
      initial={{
        y: "100%",
        opacity: 0,
        scale: 1.02,
      }}
      animate={{
        y: "0%",
        opacity: 1,
        scale: 1,
      }}
      exit={{
        y: "-100%",
        opacity: 0,
        scale: 0.98,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        absolute
        inset-0
        z-10
        origin-top
        overflow-hidden
        rounded-lg

        sm:rounded-xl
      "
    >
      <Link
        href={`/case-study-detail?title=${encodeURIComponent(
          item.slug
        )}`}
        aria-label={`View case study: ${item.title}`}
        className="
          group
          relative
          block
          h-full
          w-full
          overflow-hidden
        "
      >
        {/* IMAGE */}

        <motion.img
          src={item.hero_image}
          alt={item.title}
          draggable={false}
          initial={{
            scale: 1.07,
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: 4,
            ease: "linear",
          }}
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

        {/* DARK OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-b
            from-black/30
            via-transparent
            to-black/15
          "
        />

        {/* TITLE */}

        <div
          className="
            absolute
            inset-x-0
            top-0
            z-20
            p-2.5

            sm:p-3
          "
        >
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
            "
          >
            <h3
              className="
                !m-0
                !capitalize

                text-[16px]
                font-bold
                leading-tight
                text-white

                sm:text-[18px]
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

/* =========================================================
   TABLET + DESKTOP SCROLL SLIDE
========================================================= */

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

  const transitionCount = Math.max(
    total - 1,
    1
  );

  /*
   * First image stays visible.
   * Every next image comes from bottom
   * based on mouse/page scroll.
   */

  const enterStart = isFirst
    ? 0
    : (index - 1) / transitionCount;

  const enterEnd = isFirst
    ? 1
    : index / transitionCount;

  /* =====================================================
     Y POSITION
  ===================================================== */

  const y = useTransform(
    progress,

    isFirst
      ? [0, 1]
      : [enterStart, enterEnd],

    isFirst
      ? ["0%", "0%"]
      : ["100%", "0%"],

    {
      clamp: true,
    }
  );

  /* =====================================================
     OPACITY
  ===================================================== */

  const opacity = useTransform(
    progress,

    isFirst
      ? [0, 1]
      : [
          enterStart,
          Math.min(
            enterStart + 0.03,
            enterEnd
          ),
        ],

    isFirst
      ? [1, 1]
      : [0, 1],

    {
      clamp: true,
    }
  );

  /*
   * Scale image underneath while
   * next image enters.
   */

  const scaleStart =
    index / transitionCount;

  const scaleEnd = Math.min(
    1,
    scaleStart +
      1 / transitionCount
  );

  /* =====================================================
     SCALE
  ===================================================== */

  const scale = useTransform(
    progress,

    isFirst
      ? [
          0,
          Math.min(
            1,
            1 / transitionCount
          ),
        ]
      : [scaleStart, scaleEnd],

    [1, 0.97],

    {
      clamp: true,
    }
  );

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <motion.article
      style={{
        y,
        opacity,
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
        href={`/case-study-detail?title=${encodeURIComponent(
          item.slug
        )}`}
        aria-label={`View case study: ${item.title}`}
        className="
          group
          relative
          block
          h-full
          w-full
          overflow-hidden
        "
      >
        {/* IMAGE */}

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

        {/* TITLE */}

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

                text-[16px]
                font-bold
                leading-tight
                text-white

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