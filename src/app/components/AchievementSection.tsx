// "use client";

// import { useEffect, useState } from "react";
// import {
//     motion,
//     AnimatePresence,
//     useMotionValue,
//     useTransform,
//     animate,
// } from "framer-motion";
// import axios from "axios";
// import { apiUrl } from "../config";

// type CounterItemProps = {
//     value: string;
//     label: string;
// };

// const CounterItem = ({ value, label }: CounterItemProps) => {
//     const numericTarget = parseInt(value.replace(/[^0-9]/g, ""));
//     const suffix = value.replace(/[0-9]/g, "");

//     const count = useMotionValue(0);
//     const rounded = useTransform(count, (latest) => Math.round(latest));
//     const [displayValue, setDisplayValue] = useState(0);

//     useEffect(() => {
//         const controls = animate(count, numericTarget, {
//             duration: 2,
//             ease: "easeOut",
//         });

//         const unsubscribe = rounded.on("change", (latest) => {
//             setDisplayValue(latest);
//         });

//         return () => {
//             controls.stop();
//             unsubscribe();
//         };
//     }, [count, numericTarget, rounded]);

//     return (
//         <div className="flex flex-col items-center justify-center text-center">
//             <h3 className="text-white text-[42px] md:text-[54px] lg:text-[56px] font-semibold leading-none">
//                 {displayValue}
//                 {suffix}
//             </h3>

//             <p className="mt-3 text-white text-[16px] md:text-[20px] font-normal leading-none">
//                 {label}
//             </p>
//         </div>
//     );
// };

// type Testimonial = {
//     id: number;
//     name: string;
//     designation: string;
//     city: string;
//     title: string;
//     description: string;
//     image: string;
//     created_at: string;
// };

// export default function AchievementSection() {
//     const [testIndex, setTestIndex] = useState(0);
//     const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchTestimonials = async () => {
//             try {
//                 const res = await axios.post(`${apiUrl}/testimoniallist`);

//                 if (res.data?.success && Array.isArray(res.data.data)) {
//                     setTestimonials(res.data.data);
//                 } else {
//                     setTestimonials([]);
//                 }
//             } catch (error) {
//                 console.error("Testimonial API Error:", error);
//                 setTestimonials([]);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchTestimonials();
//     }, []);

//     useEffect(() => {
//         if (testimonials.length <= 1) return;

//         const timer = setInterval(() => {
//             setTestIndex((prev) => (prev + 1) % testimonials.length);
//         }, 3500);

//         return () => clearInterval(timer);
//     }, [testimonials.length]);

//     const currentTestimonial = testimonials[testIndex];
//     return (
//         <section className="relative overflow-hidden py-14 md:py-16 lg:py-20 font-sans bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
//             <div className="max-w-[1140px] mx-auto px-5 md:px-8 lg:px-0">

// {/* Counter Box */}
// <div className="counter-only-border relative mb-14 md:mb-16 lg:mb-20 rounded-full">

//     <div className="relative z-10 rounded-full px-6 md:px-12 lg:px-20 py-8 md:py-10">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
//             <CounterItem value="15+" label="Successful Years" />
//             <CounterItem value="20+" label="Industries Served" />
//             <CounterItem value="500+" label="Satisfied Clients" />
//             <CounterItem value="3000+" label="Completed Projects" />
//         </div>
//     </div>

// </div>

//                 {/* Title */}
//                 <h2 className="text-white text-[34px] md:text-[42px] font-semibold mb-10 md:mb-11 tracking-wide">
//                     Pat on the Back
//                 </h2>

//                 {loading ? (
//                     <div className="min-h-[220px] flex items-center justify-center">
//                         <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
//                     </div>
//                 ) : testimonials.length === 0 ? (
//                     <div className="text-white text-lg">
//                         No testimonials found.
//                     </div>
//                 ) : (
//                     <div>
//                         <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-9 md:gap-12 items-center">

//                             {/* Image Card */}
//                             <AnimatePresence mode="wait">
//                                 <motion.div
//                                     key={`image-${currentTestimonial.id}`}
//                                     initial={{ opacity: 0, y: 25 }}
//                                     animate={{ opacity: 1, y: 0 }}
//                                     exit={{ opacity: 0, y: -25 }}
//                                     transition={{ duration: 0.45 }}
//                                     className="relative w-full max-w-[275px] h-[185px] rounded-[20px] border border-white/75 bg-white/15 flex items-center justify-center overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
//                                 >
//                                     <img
//                                         src={currentTestimonial.image}
//                                         alt={currentTestimonial.name}
//                                         className=""
//                                     />
//                                 </motion.div>
//                             </AnimatePresence>

//                             {/* Text Slider */}
//                             <div className="text-white overflow-hidden">
//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={currentTestimonial.id}
//                                         initial={{ opacity: 0, x: 50 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: -50 }}
//                                         transition={{ duration: 0.5, ease: "easeOut" }}
//                                     >
//                                         <p className="text-[16px] md:text-[21px] leading-[1.45] md:leading-[1.45] max-w-[820px] font-normal">
//                                             {currentTestimonial.description}
//                                         </p>

//                                         <h4 className="mt-9 text-[18px] md:text-[21px] font-semibold">
//                                             {currentTestimonial.name}
//                                         </h4>

//                                         {currentTestimonial.designation && (
//                                             <p className="mt-1 text-white/80 text-sm md:text-base">
//                                                 {currentTestimonial.designation}
//                                             </p>
//                                         )}
//                                     </motion.div>
//                                 </AnimatePresence>
//                             </div>
//                         </div>

//                         {/* Dots */}
//                         {testimonials.length > 1 && (
//                             <div className="flex justify-center items-center gap-2 mt-12">
//                                 {testimonials.map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setTestIndex(i)}
//                                         aria-label={`Go to testimonial ${i + 1}`}
//                                         className={`h-2 rounded-full transition-all duration-300 ${
//                                             i === testIndex
//                                                 ? "w-7 bg-white"
//                                                 : "w-2 bg-white/45 hover:bg-white/70"
//                                         }`}
//                                     />
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 )}
//             </div>

//         </section>

//     );
// }

"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config";

type CounterItemProps = {
  value: string;
  label: string;
};

const CounterItem = ({ value, label }: CounterItemProps) => {
  const numericTarget = parseInt(value.replace(/[^0-9]/g, ""));
  const suffix = value.replace(/[0-9]/g, "");

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, numericTarget || 0, {
      duration: 2,
      ease: "easeOut",
    });

    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [count, numericTarget, rounded]);

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <h3 className="text-white text-[30px] sm:text-[38px] md:text-[54px] lg:text-[56px] font-semibold leading-none">
        {displayValue}
        {suffix}
      </h3>

      <p className="mt-2 text-white text-[13px] sm:text-[15px] md:text-[20px] font-normal leading-none">
        {label}
      </p>
    </div>
  );
};

type Testimonial = {
  id: number;
  name: string;
  designation: string;
  city: string;
  title: string;
  description: string;
  image: string;
  created_at: string;
};

export default function AchievementSection() {
  const [testIndex, setTestIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.post(`${apiUrl}/testimoniallist`);

        if (res.data?.success && Array.isArray(res.data.data)) {
          setTestimonials(res.data.data);
        } else {
          setTestimonials([]);
        }
      } catch (error) {
        console.error("Testimonial API Error:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length <= 1) return;

    const timer = setInterval(() => {
      setTestIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const currentTestimonial = testimonials[testIndex];

  return (
    <section className="relative overflow-hidden py-14 md:py-16 lg:py-20 font-sans bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
        {/* Counter Box */}
        <div className="group relative mb-14 overflow-hidden rounded-[28px] md:rounded-full border border-white/25 bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.18)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/40 hover:bg-white/15 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)] md:mb-16 lg:mb-20">
          <div className="gradient-spin absolute inset-[-150%] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0  bg-gradient-to-b from-white/20 via-transparent to-transparent group-hover:from-white/30 transition-all duration-500" />
          <div className="relative z-10 px-4 py-6 sm:px-6 md:px-12 md:py-10 lg:px-20">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-10">
              <CounterItem value="15+" label="Successful Years" />
              <CounterItem value="20+" label="Industries Served" />
              <CounterItem value="500+" label="Satisfied Clients" />
              <CounterItem value="3000+" label="Completed Projects" />
            </div>
          </div>
        </div>
        {/* Title */}
        <h2 className="text-white text-[28px] sm:text-[34px] md:text-[42px] font-semibold mb-8 md:mb-11 tracking-wide">
          Pat on the Back
        </h2>

        {loading ? (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-white text-lg">No testimonials found.</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-6 md:gap-12 items-center">
              {/* Image Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentTestimonial.id}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.45 }}
                  className="relative mx-auto md:mx-0 w-full max-w-[275px] h-[185px] rounded-[20px] border border-white/75 bg-white/15 flex items-center justify-center overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
                >
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Text Slider */}
              <div className="text-white overflow-hidden text-center md:text-left">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <p className="text-[16px] md:text-[21px] leading-[1.45] max-w-[820px] font-normal">
                      {currentTestimonial.description}
                    </p>

                    <h4 className="mt-9 text-[18px] md:text-[21px] font-semibold">
                      {currentTestimonial.name}
                    </h4>

                    {currentTestimonial.designation && (
                      <p className="mt-1 text-white/80 text-sm md:text-base">
                        {currentTestimonial.designation}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === testIndex
                        ? "w-7 bg-white"
                        : "w-2 bg-white/45 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style jsx>{`
        .counter-gradient-border {
          position: relative;
          border-radius: 9999px;
          background: transparent;
          overflow: visible;
        }

        .counter-gradient-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(255, 255, 255, 0.25) 35%,
            rgba(255, 255, 255, 0.85) 70%,
            rgba(255, 255, 255, 0.35) 100%
          );

          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;

          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 767px) {
          .counter-gradient-border {
            border-radius: 32px;
          }
        }
      `}</style>
    </section>
  );
}
