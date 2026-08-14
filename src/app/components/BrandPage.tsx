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
  export default function BrandPage() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const router = useRouter();
const [isMobile, setIsMobile] = useState(false);
    const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
    const [loading, setLoading] = useState(true);

    const total = brandStories.length;
    const transitionCount = Math.max(total - 1, 0);

    
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
  const homePageStories = (response.data.data ?? []).filter(
    (item) => Number(item.show_home_page) === 1,
  );

  setBrandStories(homePageStories);
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
  offset: isMobile
    ? ["start start", "end start"]
    : ["start start", "end end"],
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
        <div className="brand-image-stage relative w-full">
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
            onClick={() => router.push("/case-study")}
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

  // function ScrollSlide({
  //   item,
  //   index,
  //   total,
  //   progress,
  // }: {
  //   item: CaseStudyItem;
  //   index: number;
  //   total: number;
  //   progress: MotionValue<number>;
  // }) {
  //   const isFirst = index === 0;
  // const isLast = index === total - 1;

  // const step = total > 1 ? 1 / (total - 1) : 1;

  // let inputRange: number[];
  // let yOutput: string[];
  // let scaleOutput: number[];

  // if (total === 1) {
  //   inputRange = [0, 1];
  //   yOutput = ["0%", "0%"];
  //   scaleOutput = [1, 1];
  // } else if (isFirst) {
  //   inputRange = [0, Math.min(1, step)];
  //   yOutput = ["0%", "-5%"];
  //   scaleOutput = [1, 0.97];
  // } else if (isLast) {
  //   inputRange = [
  //     Math.max(0, 1 - step * 0.75),
  //     1,
  //   ];

  //   yOutput = ["100%", "0%"];
  //   scaleOutput = [0.97, 1];
  // } else {
  //   const center = index * step;

  //   inputRange = [
  //     Math.max(0, center - step * 0.7),
  //     center,
  //     Math.min(1, center + step * 0.7),
  //   ];

  //   yOutput = ["100%", "0%", "-5%"];
  //   scaleOutput = [0.97, 1, 0.97];
  // }

  // const y = useTransform(
  //   progress,
  //   inputRange,
  //   yOutput,
  // );

  // const scale = useTransform(
  //   progress,
  //   inputRange,
  //   scaleOutput,
  // );



  //   return (
  //  <motion.article
  //   style={{
  //     y,
  //     scale,
  //     zIndex: index + 1,
  //   }}
  //   className="
  //     absolute
  //     inset-0
  //     origin-top
  //     overflow-hidden
  //     rounded-lg
  //     sm:rounded-xl
  //     lg:rounded-2xl
  //   "
  // >
  //   <Link
  //     href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
  //     aria-label={`View case study: ${item.title}`}
  //     className="group relative block h-full w-full overflow-hidden"
  //   >
  //     <img
  //       src={item.hero_image}
  //       alt={item.title}
  //       draggable={false}
  //       className="
  //        absolute
  //     inset-0
  //     block
  //     h-full
  //     w-full
  //     max-w-none
  //     bg-white
  //     object-contain
  //     object-center

  //     md:bg-transparent
  //     md:object-cover
  //       "
  //     />

  //     {/* Title position */}
  //     <div
  //       className="
  //         absolute
  //         inset-x-0
  //         top-0
  //         z-10
  //         p-2.5
  //         sm:p-3
  //         md:p-5
  //         lg:p-7
  //         min-[1410px]:p-8
  //       "
  //     >
  //       {/* Title box */}
  //       <div
  //         className="
  //           inline-block
  //           max-w-[85%]
  //           rounded-lg
  //           border
  //           border-white/25
  //           bg-black/45
  //           px-3
  //           py-2
  //           shadow-[0_6px_20px_rgba(0,0,0,0.18)]
  //           backdrop-blur-md
  //           sm:max-w-[80%]
  //           sm:rounded-xl
  //           sm:px-4
  //           sm:py-2.5
  //           md:max-w-[75%]
  //           md:px-5
  //           md:py-3
  //           lg:max-w-[78%]
  //           lg:rounded-2xl
  //           lg:px-7
  //           lg:py-4
  //           min-[1410px]:rounded-[20px]
  //           min-[1410px]:px-8
  //           min-[1410px]:py-5
  //         "
  //       >
  //         <h3
  //           className="
  //             !m-0
  //             !capitalize
  //             font-bold
  //             leading-tight
  //             text-white

  //             text-[16px]
  //             sm:text-[18px]
  //             md:text-[24px]
  //             lg:text-[36px]
  //             xl:text-[42px]
  //             min-[1410px]:text-[48px]
  //           "
  //         >
  //           {item.title}
  //         </h3>
  //       </div>
  //     </div>
  //   </Link>
  // </motion.article>
  //   );
  // }

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
  const transitionCount = Math.max(total - 1, 1);

  /*
   * Image 1 stays visible at the beginning.
   * Each next image enters from the bottom.
   */
  const enterStart = isFirst
    ? 0
    : (index - 1) / transitionCount;

  const enterEnd = isFirst
    ? 1
    : index / transitionCount;

  const y = useTransform(
    progress,
    isFirst ? [0, 1] : [enterStart, enterEnd],
    isFirst ? ["0%", "0%"] : ["100%", "0%"],
    {
      clamp: true,
    },
  );

  const opacity = useTransform(
    progress,
    isFirst
      ? [0, 1]
      : [
          enterStart,
          Math.min(enterStart + 0.03, enterEnd),
        ],
    isFirst ? [1, 1] : [0, 1],
    {
      clamp: true,
    },
  );

  /*
   * Scale the image underneath when the next image enters.
   */
  const scaleStart = index / transitionCount;
  const scaleEnd = Math.min(
    1,
    scaleStart + 1 / transitionCount,
  );

  const scale = useTransform(
    progress,
    isFirst
      ? [0, Math.min(1, 1 / transitionCount)]
      : [scaleStart, scaleEnd],
    [1, 0.97],
    {
      clamp: true,
    },
  );

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
        href={`/case-study-detail?slug=${encodeURIComponent(
          item.slug,
        )}`}
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

// "use client";

//   import {
//     type CSSProperties,
//     useEffect,
//     useRef,
//     useState,
//   } from "react";

//   import {
//     motion,
//     type MotionValue,
//     useScroll,
//     useSpring,
//     useTransform,
//   } from "framer-motion";

//   import axios from "axios";
//   import Link from "next/link";
//   import { useRouter } from "next/navigation";
//   import { LuMoveUpRight } from "react-icons/lu";

//   import { apiUrl } from "../config";

//   type SectionImage = {
//     id: number;
//     mu_title: string;
//     image_1: string;
//     image_2: string;
//     image_3: string;
//     description: string;
//     sort_order: number;
//   };

//   type MoreImage = {
//     id: number;
//     image_url: string;
//     sort_order: number;
//   };

//   type CaseStudyItem = {
//     id: number;
//       show_home_page: number | string;
//     slug: string;
//     title: string;
//     description: string;
//     hero_image: string;
//     meta_title: string;
//     meta_keyword: string;
//     meta_description: string;
//     head: string;
//     body: string;
//     award_title: string;
//     award_image: string;
//     section_images: SectionImage[];
//     more_images: MoreImage[];
//     created_at: string;
//   };

//   type CaseStudyResponse = {
//     success: boolean;
//     message: string;
//     data: CaseStudyItem[];
//   };

//   type ScrollDistanceStyles = CSSProperties & {
//     "--mobile-scroll-distance": string;
//     "--tablet-scroll-distance": string;
//     "--desktop-scroll-distance": string;
//     "--wide-scroll-distance": string;
//     "--full-hd-scroll-distance": string;
//   };
//   export default function BrandPage() {
//     const sectionRef = useRef<HTMLElement | null>(null);
//     const router = useRouter();
// const [isMobile, setIsMobile] = useState(false);
//     const [brandStories, setBrandStories] = useState<CaseStudyItem[]>([]);
//     const [loading, setLoading] = useState(true);

//     const total = brandStories.length;
//     const transitionCount = Math.max(total - 1, 0);

    
//   const scrollDistanceStyle: ScrollDistanceStyles = {
//     "--mobile-scroll-distance":
//       loading || total <= 1
//         ? "0px"
//         : `${transitionCount * 60}svh`,

//     "--tablet-scroll-distance":
//       loading || total <= 1
//         ? "0px"
//         : `${transitionCount * 58}svh`,

//     "--desktop-scroll-distance":
//       loading || total <= 1
//         ? "0px"
//         : `${transitionCount * 70}svh`,

//     "--wide-scroll-distance":
//       loading || total <= 1
//         ? "0px"
//         : `${transitionCount * 82}dvh`,

//     "--full-hd-scroll-distance":
//       loading || total <= 1
//         ? "0px"
//         : `${transitionCount * 88}dvh`,
//   };
//   useEffect(() => {
//   const mediaQuery = window.matchMedia(
//     "(max-width: 767px)"
//   );

//   const updateDevice = () => {
//     setIsMobile(mediaQuery.matches);
//   };

//   updateDevice();

//   mediaQuery.addEventListener(
//     "change",
//     updateDevice
//   );

//   return () => {
//     mediaQuery.removeEventListener(
//       "change",
//       updateDevice
//     );
//   };
// }, []);

//     useEffect(() => {
//       const fetchCaseStudies = async () => {
//         try {
//           setLoading(true);

//           const response = await axios.post<CaseStudyResponse>(
//             `${apiUrl}/caseStudyList`,
//             {},
//             {
//               headers: {
//                 Accept: "application/json",
//               },
//             },
//           );

//         if (response.data?.success) {
//   const homePageStories = (response.data.data ?? []).filter(
//     (item) => Number(item.show_home_page) === 1,
//   );

//   setBrandStories(homePageStories);
// } else {
//   setBrandStories([]);
// }
//         } catch (error) {
//           console.error("Case study list API error:", error);
//           setBrandStories([]);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchCaseStudies();
//     }, []);

//     const { scrollYProgress } = useScroll({
//       target: sectionRef,
//       // Sticky section progress: animation ends exactly when the section releases.
//       offset: ["start start", "end end"],
//     });

//     const smoothProgress = useSpring(scrollYProgress, {
//       stiffness: isMobile ? 70 : 45,
//       damping: isMobile ? 24 : 30,
//       mass: isMobile ? 0.75 : 1,
//     });

//     return (
//      <main
//   className="
//        overflow-visible
//     bg-[#f6f6f6]
//     px-4
//     pb-0
//     pt-0
//     mb-0
//     font-sans

//     md:px-6
//     md:pt-8

//     min-[1440px]:px-10
//     min-[1440px]:pt-[50px]

//     min-[1680px]:px-16
//     min-[1920px]:px-32!
//     min-[1920px]:py-[60px]
//   "
// >
//     <section
//   ref={sectionRef}
//   style={scrollDistanceStyle}
//   className="
//     brand-scroll-section
//     mx-auto
//     mb-0
//     w-full
//     py-[20px]
//   "
// >
//   <div
//     className="
//       brand-sticky-shell
//       max-md:sticky
//       max-md:top-0
//       max-md:z-20
//       max-md:h-[100svh]
//       max-md:overflow-hidden
//       max-md:bg-[#f6f6f6]
//     "
//   >
//     <div
//       className="
//         brand-sticky-grid
//         max-md:grid
//         max-md:h-full
//         max-md:grid-rows-[auto_minmax(0,1fr)_auto]
//         max-md:gap-3
//         max-md:py-3
//       "
//     >
//       {/* Heading */}
//       <div className="shrink-0">
//         <h2
//           className="
//             text-[28px]
//             font-bold
//             leading-[1.05]
//             text-primary

//             sm:text-[32px]
//             md:text-[38px]
//             lg:text-[44px]
//             min-[1440px]:text-[48px]
//             min-[1920px]:text-[54px]
//           "
//         >
//           Story Behind Brand Building
//         </h2>

//         <p
//           className="
//             mt-2
//             max-w-[900px]
//             text-[14px]
//             leading-relaxed
//             text-black

//             sm:text-[16px]
//             md:text-[18px]
//             lg:text-[20px]
//             min-[1440px]:text-[22px]
//             min-[1920px]:text-[24px]
//           "
//         >
//           Explore the process behind crafting memorable brand experiences.
//         </p>
//       </div>

//       {loading ? (
//         <div className="flex min-h-[360px] items-center justify-center">
//           <div className="h-12 w-12 animate-spin rounded-full border-4 border-black/10 border-t-[#A62666]" />
//         </div>
//       ) : total === 0 ? (
//         <div className="flex min-h-[360px] items-center justify-center">
//           <p className="text-[#626262]">No case studies found.</p>
//         </div>
//       ) : (
//         <div
//           className="
//             brand-image-stage
//             relative
//             w-full
//             max-md:h-[58svh]
//             max-md:min-h-[300px]
//             max-md:max-h-[520px]
//             max-md:overflow-hidden
//             max-md:rounded-xl
//           "
//         >
//           {brandStories.map((item, index) => (
//             <ScrollSlide
//               key={item.id}
//               item={item}
//               index={index}
//               total={total}
//               progress={smoothProgress}
//               isMobile={isMobile}
//             />
//           ))}
//         </div>
//       )}

//       {!loading && total > 0 && (
//         <div className="brand-action-row">
//           <button
//             type="button"
//             onClick={() => router.push("/case-study")}
//             className="
//               brand-case-study-button
//               group
//               inline-flex
//               items-center
//               justify-center
//               gap-3
//               rounded-full
//               bg-primary
//               px-5
//               py-2.5
//               text-[14px]
//               font-bold
//               text-white
//               shadow-lg
//               shadow-primary/20
//               transition-all
//               duration-300

//               hover:-translate-y-1
//               hover:bg-[#7a1f50]
//               hover:shadow-xl

//               sm:px-6
//               sm:py-3
//               sm:text-[16px]

//               lg:gap-5
//               lg:px-7
//               lg:text-[18px]

//               min-[1440px]:gap-6
//               min-[1440px]:px-8
//               min-[1440px]:text-[20px]

//               min-[1920px]:px-9
//               min-[1920px]:text-[22px]
//             "
//           >
//             Case Studies

//             <LuMoveUpRight
//               className="
//                 h-4
//                 w-4
//                 transition-transform
//                 duration-300
//                 group-hover:translate-x-1
//                 group-hover:-translate-y-1

//                 lg:h-5
//                 lg:w-5
//               "
//             />
//           </button>
//         </div>
//       )}
//     </div>
//   </div>

//   {!loading && total > 1 && (
//   <div
//     className="brand-scroll-spacer"
//     aria-hidden="true"
//     style={
//       isMobile
//         ? { height: `${transitionCount * 92}svh` }
//         : undefined
//     }
//   />
// )}
//   </section>
//       </main>
//     );
//   }

//   // function ScrollSlide({
//   //   item,
//   //   index,
//   //   total,
//   //   progress,
//   // }: {
//   //   item: CaseStudyItem;
//   //   index: number;
//   //   total: number;
//   //   progress: MotionValue<number>;
//   // }) {
//   //   const isFirst = index === 0;
//   // const isLast = index === total - 1;

//   // const step = total > 1 ? 1 / (total - 1) : 1;

//   // let inputRange: number[];
//   // let yOutput: string[];
//   // let scaleOutput: number[];

//   // if (total === 1) {
//   //   inputRange = [0, 1];
//   //   yOutput = ["0%", "0%"];
//   //   scaleOutput = [1, 1];
//   // } else if (isFirst) {
//   //   inputRange = [0, Math.min(1, step)];
//   //   yOutput = ["0%", "-5%"];
//   //   scaleOutput = [1, 0.97];
//   // } else if (isLast) {
//   //   inputRange = [
//   //     Math.max(0, 1 - step * 0.75),
//   //     1,
//   //   ];

//   //   yOutput = ["100%", "0%"];
//   //   scaleOutput = [0.97, 1];
//   // } else {
//   //   const center = index * step;

//   //   inputRange = [
//   //     Math.max(0, center - step * 0.7),
//   //     center,
//   //     Math.min(1, center + step * 0.7),
//   //   ];

//   //   yOutput = ["100%", "0%", "-5%"];
//   //   scaleOutput = [0.97, 1, 0.97];
//   // }

//   // const y = useTransform(
//   //   progress,
//   //   inputRange,
//   //   yOutput,
//   // );

//   // const scale = useTransform(
//   //   progress,
//   //   inputRange,
//   //   scaleOutput,
//   // );



//   //   return (
//   //  <motion.article
//   //   style={{
//   //     y,
//   //     scale,
//   //     zIndex: index + 1,
//   //   }}
//   //   className="
//   //     absolute
//   //     inset-0
//   //     origin-top
//   //     overflow-hidden
//   //     rounded-lg
//   //     sm:rounded-xl
//   //     lg:rounded-2xl
//   //   "
//   // >
//   //   <Link
//   //     href={`/case-study-detail?slug=${encodeURIComponent(item.slug)}`}
//   //     aria-label={`View case study: ${item.title}`}
//   //     className="group relative block h-full w-full overflow-hidden"
//   //   >
//   //     <img
//   //       src={item.hero_image}
//   //       alt={item.title}
//   //       draggable={false}
//   //       className="
//   //        absolute
//   //     inset-0
//   //     block
//   //     h-full
//   //     w-full
//   //     max-w-none
//   //     bg-white
//   //     object-contain
//   //     object-center

//   //     md:bg-transparent
//   //     md:object-cover
//   //       "
//   //     />

//   //     {/* Title position */}
//   //     <div
//   //       className="
//   //         absolute
//   //         inset-x-0
//   //         top-0
//   //         z-10
//   //         p-2.5
//   //         sm:p-3
//   //         md:p-5
//   //         lg:p-7
//   //         min-[1410px]:p-8
//   //       "
//   //     >
//   //       {/* Title box */}
//   //       <div
//   //         className="
//   //           inline-block
//   //           max-w-[85%]
//   //           rounded-lg
//   //           border
//   //           border-white/25
//   //           bg-black/45
//   //           px-3
//   //           py-2
//   //           shadow-[0_6px_20px_rgba(0,0,0,0.18)]
//   //           backdrop-blur-md
//   //           sm:max-w-[80%]
//   //           sm:rounded-xl
//   //           sm:px-4
//   //           sm:py-2.5
//   //           md:max-w-[75%]
//   //           md:px-5
//   //           md:py-3
//   //           lg:max-w-[78%]
//   //           lg:rounded-2xl
//   //           lg:px-7
//   //           lg:py-4
//   //           min-[1410px]:rounded-[20px]
//   //           min-[1410px]:px-8
//   //           min-[1410px]:py-5
//   //         "
//   //       >
//   //         <h3
//   //           className="
//   //             !m-0
//   //             !capitalize
//   //             font-bold
//   //             leading-tight
//   //             text-white

//   //             text-[16px]
//   //             sm:text-[18px]
//   //             md:text-[24px]
//   //             lg:text-[36px]
//   //             xl:text-[42px]
//   //             min-[1410px]:text-[48px]
//   //           "
//   //         >
//   //           {item.title}
//   //         </h3>
//   //       </div>
//   //     </div>
//   //   </Link>
//   // </motion.article>
//   //   );
//   // }

// function ScrollSlide({
//   item,
//   index,
//   total,
//   progress,
//   isMobile,
// }: {
//   item: CaseStudyItem;
//   index: number;
//   total: number;
//   progress: MotionValue<number>;
//   isMobile: boolean;
// }) {
//   const isFirst = index === 0;
//   const isLast = index === total - 1;
//   const transitionCount = Math.max(total - 1, 1);
//   const step = 1 / transitionCount;

//   const enterStart = isFirst ? 0 : (index - 1) * step;
//   const enterEnd = isFirst ? 0 : index * step;
//   const exitEnd = Math.min(1, (index + 1) * step);

//   /*
//    * Mobile stacked-scroll behaviour:
//    * 1) first card is already visible,
//    * 2) each following card slides up from below,
//    * 3) the card underneath shifts upward and scales down slightly,
//    * 4) the last card fully settles before the sticky section releases.
//    */
//   let mobileInput: number[];
//   let mobileYOutput: string[];

//   if (total <= 1) {
//     mobileInput = [0, 1];
//     mobileYOutput = ["0%", "0%"];
//   } else if (isFirst) {
//     mobileInput = [0, step];
//     mobileYOutput = ["0%", "-3.5%"];
//   } else if (isLast) {
//     mobileInput = [enterStart, enterEnd];
//     mobileYOutput = ["108%", "0%"];
//   } else {
//     mobileInput = [enterStart, enterEnd, exitEnd];
//     mobileYOutput = ["108%", "0%", "-3.5%"];
//   }

//   const desktopInput = isFirst
//     ? [0, 1]
//     : [enterStart, enterEnd];

//   const desktopYOutput = isFirst
//     ? ["0%", "0%"]
//     : ["100%", "0%"];

//   const y = useTransform(
//     progress,
//     isMobile ? mobileInput : desktopInput,
//     isMobile ? mobileYOutput : desktopYOutput,
//     { clamp: true },
//   );

//   // Mobile uses a physical slide rather than fading cards in/out.
//   const opacity = useTransform(
//     progress,
//     isMobile
//       ? [0, 1]
//       : isFirst
//         ? [0, 1]
//         : [
//             enterStart,
//             Math.min(enterStart + 0.03, enterEnd),
//           ],
//     isMobile
//       ? [1, 1]
//       : isFirst
//         ? [1, 1]
//         : [0, 1],
//     { clamp: true },
//   );

//   let scaleInput: number[];
//   let scaleOutput: number[];

//   if (total <= 1 || isLast) {
//     scaleInput = [0, 1];
//     scaleOutput = [1, 1];
//   } else {
//     const scaleStart = index * step;
//     const scaleEnd = Math.min(1, (index + 1) * step);
//     scaleInput = [scaleStart, scaleEnd];
//     scaleOutput = [1, isMobile ? 0.955 : 0.97];
//   }

//   const scale = useTransform(
//     progress,
//     scaleInput,
//     scaleOutput,
//     { clamp: true },
//   );

//   return (
//     <motion.article
//       style={{
//         y,
//         opacity,
//         scale,
//         zIndex: index + 1,
//         willChange: "transform",
//       }}
//       className="
//         absolute
//         inset-0
//         origin-top
//         overflow-hidden
//         rounded-lg
//         shadow-[0_18px_45px_rgba(0,0,0,0.12)]
//         sm:rounded-xl
//         md:shadow-none
//         lg:rounded-2xl
//       "
//     >
//       <Link
//         href={`/case-study-detail?slug=${encodeURIComponent(
//           item.slug,
//         )}`}
//         aria-label={`View case study: ${item.title}`}
//         className="group relative block h-full w-full overflow-hidden"
//       >
//         <img
//           src={item.hero_image}
//           alt={item.title}
//           draggable={false}
//           className="
//             absolute
//             inset-0
//             block
//             h-full
//             w-full
//             max-w-none
//             object-cover
//             object-center
//           "
//         />

//         <div
//           className="
//             absolute
//             inset-x-0
//             top-0
//             z-10
//             p-2.5
//             sm:p-3
//             md:p-5
//             lg:p-7
//             min-[1410px]:p-8
//           "
//         >
//           <div
//             className="
//               inline-block
//               max-w-[85%]
//               rounded-lg
//               border
//               border-white/25
//               bg-black/45
//               px-3
//               py-2
//               shadow-[0_6px_20px_rgba(0,0,0,0.18)]
//               backdrop-blur-md

//               sm:max-w-[80%]
//               sm:rounded-xl
//               sm:px-4
//               sm:py-2.5

//               md:max-w-[75%]
//               md:px-5
//               md:py-3

//               lg:max-w-[78%]
//               lg:rounded-2xl
//               lg:px-7
//               lg:py-4

//               min-[1410px]:rounded-[20px]
//               min-[1410px]:px-8
//               min-[1410px]:py-5
//             "
//           >
//             <h3
//               className="
//                 !m-0
//                 !capitalize
//                 text-[16px]
//                 font-bold
//                 leading-tight
//                 text-white

//                 sm:text-[18px]
//                 md:text-[24px]
//                 lg:text-[36px]
//                 xl:text-[42px]
//                 min-[1410px]:text-[48px]
//               "
//             >
//               {item.title}
//             </h3>
//           </div>
//         </div>
//       </Link>
//     </motion.article>
//   );
// }
