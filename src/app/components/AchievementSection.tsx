// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//     motion,
//     AnimatePresence,
//     useInView,
//     useMotionValue,
//     useTransform,
//     animate,
// } from "framer-motion";
// import { FaQuoteRight } from "react-icons/fa";
// import axios from "axios";
// import { apiUrl } from "../config";

// const CounterItem = ({ value, label, color }: { value: string; label: string; color: string }) => {
//     const ref = useRef(null);
//     const isInView = useInView(ref, { once: true, margin: "-100px" });

//     const numericTarget = parseInt(value.replace(/[^0-9]/g, ""));
//     const suffix = value.replace(/[0-9]/g, "");

//     const count = useMotionValue(0);
//     const rounded = useTransform(count, (latest) => Math.round(latest));
//     const [displayValue, setDisplayValue] = useState(0);

//     useEffect(() => {
//         if (isInView) {
//             const controls = animate(count, numericTarget, {
//                 duration: 2,
//                 ease: "easeOut",
//             });

//             const unsubscribe = rounded.on("change", (latest) => setDisplayValue(latest));

//             return () => {
//                 controls.stop();
//                 unsubscribe();
//             };
//         }
//     }, [isInView, numericTarget, count, rounded]);

//     return (
//         <div ref={ref} className="flex flex-col items-center justify-center text-center">
//             <p
//                 className="font-heading text-5xl md:text-6xl lg:text-8xl font-semibold not-italic mb-1 scale-y-110"
//                 style={{ color }}
//             >
//                 {displayValue}
//                 {suffix}
//             </p>
//             <p className="text-[#666666] text-[10px] 2xl:text-2xl md:text-xs uppercase tracking-[2px] leading-tight not-italic">
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
//                 const res = await axios.post(
//                     `${apiUrl}/testimoniallist`
//                 );

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

//     const currentTestimonial = testimonials[testIndex];

//     return (
//         <section className="py-20 bg-[#e5e5e5] font-sans">
//             <div className="max-w-full mx-auto px-6 md:px-10">
//                 <div className="mb-16 flex flex-col items-center justify-between gap-y-5 rounded-[20px] bg-white py-10 shadow-sm sm:flex-row md:mb-24 md:rounded-[40px] md:px-10">
//                     <CounterItem value="15+" label="Successful Years" color="#A62666" />
//                     <CounterItem value="20+" label="Industries Served" color="#999999" />
//                     <CounterItem value="500+" label="Satisfied Clients" color="#F58220" />
//                     <CounterItem value="3000+" label="Completed Projects" color="#999999" />
//                 </div>

//                 <div className="relative">
//                     <h2 className="text-[40px] font-medium text-[#666666] mb-10 tracking-tight">
//                         Pat on the Back
//                     </h2>

//                     {loading ? (
//                         <div className="bg-white rounded-[30px] p-10 min-h-[260px] flex items-center justify-center">
//                             <div className="h-12 w-12 rounded-full border-4 border-[#e5e5e5] border-t-[#A62666] animate-spin"></div>
//                         </div>
//                     ) : testimonials.length === 0 ? (
//                         <div className="bg-white rounded-[30px] p-8 text-[#666666]">
//                             No testimonials found.
//                         </div>
//                     ) : (
//                         <div className="relative">
//                             <div className="relative">
//                                 <div className="bg-white rounded-[30px] rounded-bl-[50px] rounded-br-none p-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start">
//                                     <div className="flex justify-center md:justify-start">
//                                         <img
//                                             src={currentTestimonial.image}
//                                             alt={currentTestimonial.name}
//                                             className="grayscale opacity-70 max-w-[160px] object-contain"
//                                         />
//                                     </div>

//                                     <div className="relative overflow-hidden min-h-35">
//                                         <AnimatePresence mode="wait">
//                                             <motion.p
//                                                 key={currentTestimonial.id}
//                                                 initial={{ opacity: 0, x: 40 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 exit={{ opacity: 0, x: -40 }}
//                                                 transition={{ duration: 0.4 }}
//                                                 className="text-[#666666] leading-8 text-lg"
//                                             >
//                                                 {currentTestimonial.description}
//                                             </motion.p>
//                                         </AnimatePresence>
//                                     </div>
//                                 </div>

//                                 <div className="flex justify-center md:justify-start items-start">
//                                     <div className="relative bg-white w-24 h-20 md:w-32 md:h-24 flex items-center justify-center">
//                                         <div className="absolute inset-0 bg-[#e5e5e5] rounded-tr-[20px]"></div>
//                                         <FaQuoteRight className="relative text-[#F58220] text-6xl font-bold" />
//                                     </div>

//                                     <div className="flex-1 bg-white h-20 flex items-center px-6 md:px-28 rounded-bl-[20px] rounded-br-[30px] overflow-hidden">
//                                         <AnimatePresence mode="wait">
//                                             <motion.h4
//                                                 key={`client-${currentTestimonial.id}`}
//                                                 initial={{ opacity: 0, x: 40 }}
//                                                 animate={{ opacity: 1, x: 0 }}
//                                                 exit={{ opacity: 0, x: -40 }}
//                                                 transition={{ duration: 0.4 }}
//                                                 className="text-[#A62666] text-3xl leading-none"
//                                             >
//                                                 {currentTestimonial.name}
//                                                 {currentTestimonial.designation && (
//                                                     <span className="block text-[#666666] text-sm mt-2">
//                                                         {currentTestimonial.designation}
//                                                     </span>
//                                                 )}
//                                             </motion.h4>
//                                         </AnimatePresence>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className="flex justify-center gap-2 mt-4">
//                                 {testimonials.map((_, i) => (
//                                     <button
//                                         key={i}
//                                         onClick={() => setTestIndex(i)}
//                                         className={`h-2 w-2 rounded-full transition-all ${i === testIndex ? "bg-[#A62666] w-4" : "bg-gray-300"
//                                             }`}
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }

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
//             <h3 className="text-white text-[42px] md:text-[52px] font-semibold leading-none">
//                 {displayValue}
//                 {suffix}
//             </h3>
//             <p className="mt-3 text-white text-[15px] md:text-[17px] font-normal leading-none">
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

//     const currentTestimonial = testimonials[testIndex];

//     return (
//         <section className="relative overflow-hidden py-14 md:py-16 lg:py-20 font-sans bg-[linear-gradient(110deg,#c5358d_0%,#9f1760_45%,#52002d_100%)]">
//             <div className="max-w-[1140px] mx-auto px-5 md:px-6">

//                 {/* Counter Box */}
//                 <div className="mb-14 md:mb-16 lg:mb-20 rounded-full border border-white/90 bg-white/10 shadow-[0_18px_35px_rgba(0,0,0,0.18)] px-8 md:px-14 py-8 md:py-10 backdrop-blur-sm">
//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
//                         <CounterItem value="15+" label="Successful Years" />
//                         <CounterItem value="20+" label="Industries Served" />
//                         <CounterItem value="500+" label="Satisfied Clients" />
//                         <CounterItem value="3000+" label="Completed Projects" />
//                     </div>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-white text-[34px] md:text-[42px] font-semibold mb-10 md:mb-12 tracking-wide">
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
//                         <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-8 md:gap-12 items-center">

//                             {/* Logo/Image Card */}
//                             <motion.div
//                                 key={`image-${currentTestimonial.id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.4 }}
//                                 className="w-full max-w-[275px] h-[185px] rounded-[18px] border border-white/70 bg-white/15 shadow-[0_15px_30px_rgba(0,0,0,0.22)] flex items-center justify-center overflow-hidden"
//                             >
//                                 <img
//                                     src={currentTestimonial.image}
//                                     alt={currentTestimonial.name}
//                                     className="max-w-[75%] max-h-[75%] object-contain brightness-0 invert"
//                                 />
//                             </motion.div>

//                             {/* Text */}
//                             <div className="text-white">
//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={currentTestimonial.id}
//                                         initial={{ opacity: 0, x: 35 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: -35 }}
//                                         transition={{ duration: 0.4 }}
//                                     >
//                                         <p className="text-[16px] md:text-[18px] leading-[1.8] max-w-[800px]">
//                                             {currentTestimonial.description}
//                                         </p>

//                                         <h4 className="mt-8 text-[18px] md:text-[20px] font-semibold">
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
//                         <div className="flex justify-center gap-2 mt-10">
//                             {testimonials.map((_, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => setTestIndex(i)}
//                                     aria-label={`Go to testimonial ${i + 1}`}
//                                     className={`h-2 rounded-full transition-all duration-300 ${
//                                         i === testIndex
//                                             ? "w-6 bg-white"
//                                             : "w-2 bg-white/40"
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }

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
//             <h3 className="text-white text-[42px] md:text-[52px] font-semibold leading-none">
//                 {displayValue}
//                 {suffix}
//             </h3>

//             <p className="mt-3 text-white text-[15px] md:text-[17px] font-normal leading-none">
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

//     const currentTestimonial = testimonials[testIndex];

//     return (
//         <section className="relative overflow-hidden py-14 md:py-16 lg:py-20 font-sans bg-[linear-gradient(110deg,#c5358d_0%,#9f1760_45%,#52002d_100%)]">
//             <div className="max-w-[1140px] mx-auto px-5 md:px-6">

//                 {/* Counter Box */}
//                 <div className="group relative mb-14 md:mb-16 lg:mb-20 rounded-full p-[1px] overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,0.18)]">

//                     {/* Animated Circle Border */}
//                     <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                         <div className="absolute inset-[-45%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#FFFFFFBF_75deg,transparent_150deg,transparent_210deg,#FFFFFFBF_285deg,transparent_360deg)]"></div>
//                     </div>

//                     {/* Inner Content */}
//                     <div className="relative rounded-full bg-white/10 px-8 md:px-14 py-8 md:py-10 backdrop-blur-sm">
//                         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
//                             <CounterItem value="15+" label="Successful Years" />
//                             <CounterItem value="20+" label="Industries Served" />
//                             <CounterItem value="500+" label="Satisfied Clients" />
//                             <CounterItem value="3000+" label="Completed Projects" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Title */}
//                 <h2 className="text-white text-[34px] md:text-[42px] font-semibold mb-10 md:mb-12 tracking-wide">
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
//                         <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-8 md:gap-12 items-center">

//                             {/* Logo/Image Card */}
//                             <motion.div
//                                 key={`image-${currentTestimonial.id}`}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.4 }}
//                                 className="group relative w-full max-w-[275px] h-[185px] rounded-[18px] p-[1px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
//                             >
//                                 {/* Animated Circle Border */}
//                                 <div className="absolute inset-0 rounded-[18px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
//                                     <div className="absolute inset-[-50%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,#FFFFFFBF_75deg,transparent_150deg,transparent_210deg,#FFFFFFBF_285deg,transparent_360deg)]"></div>
//                                 </div>

//                                 {/* Inner Content */}
//                                 <div className="relative w-full h-full rounded-[17px] bg-white/15 flex items-center justify-center overflow-hidden">
//                                     <img
//                                         src={currentTestimonial.image}
//                                         alt={currentTestimonial.name}
//                                         className="max-w-[75%] max-h-[75%] object-contain brightness-0 invert"
//                                     />
//                                 </div>
//                             </motion.div>

//                             {/* Text */}
//                             <div className="text-white">
//                                 <AnimatePresence mode="wait">
//                                     <motion.div
//                                         key={currentTestimonial.id}
//                                         initial={{ opacity: 0, x: 35 }}
//                                         animate={{ opacity: 1, x: 0 }}
//                                         exit={{ opacity: 0, x: -35 }}
//                                         transition={{ duration: 0.4 }}
//                                     >
//                                         <p className="text-[16px] md:text-[18px] leading-[1.8] max-w-[800px]">
//                                             {currentTestimonial.description}
//                                         </p>

//                                         <h4 className="mt-8 text-[18px] md:text-[20px] font-semibold">
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
//                         <div className="flex justify-center gap-2 mt-10">
//                             {testimonials.map((_, i) => (
//                                 <button
//                                     key={i}
//                                     onClick={() => setTestIndex(i)}
//                                     aria-label={`Go to testimonial ${i + 1}`}
//                                     className={`h-2 rounded-full transition-all duration-300 ${
//                                         i === testIndex
//                                             ? "w-6 bg-white"
//                                             : "w-2 bg-white/40"
//                                     }`}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>

//             <style jsx global>{`
//                 @keyframes spin-slow {
//                     from {
//                         transform: rotate(0deg);
//                     }
//                     to {
//                         transform: rotate(360deg);
//                     }
//                 }

//                 .animate-spin-slow {
//                     animation: spin-slow 3s linear infinite;
//                 }
//             `}</style>
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
        const controls = animate(count, numericTarget, {
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
            <h3 className="text-white text-[42px] md:text-[52px] font-semibold leading-none">
                {displayValue}
                {suffix}
            </h3>

            <p className="mt-3 text-white text-[15px] md:text-[17px] font-normal leading-none">
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

    const currentTestimonial = testimonials[testIndex];

    return (
        <section className="relative overflow-hidden py-14 md:py-16 lg:py-20 font-sans bg-[linear-gradient(110deg,#c5358d_0%,#9f1760_45%,#52002d_100%)]">
            <div className="max-w-[1140px] mx-auto px-5 md:px-6">

                {/* Counter Box */}
                <div className="animated-border-full relative mb-14 md:mb-16 lg:mb-20 rounded-full p-[1px] overflow-hidden shadow-[0_18px_35px_rgba(0,0,0,0.18)]">
                    <div className="relative rounded-full border border-white/75 bg-white/10 px-8 md:px-14 py-8 md:py-10 backdrop-blur-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
                            <CounterItem value="15+" label="Successful Years" />
                            <CounterItem value="20+" label="Industries Served" />
                            <CounterItem value="500+" label="Satisfied Clients" />
                            <CounterItem value="3000+" label="Completed Projects" />
                        </div>
                    </div>
                </div>

                {/* Title */}
                <h2 className="text-white text-[34px] md:text-[42px] font-semibold mb-10 md:mb-12 tracking-wide">
                    Pat on the Back
                </h2>

                {loading ? (
                    <div className="min-h-[220px] flex items-center justify-center">
                        <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
                    </div>
                ) : testimonials.length === 0 ? (
                    <div className="text-white text-lg">
                        No testimonials found.
                    </div>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-[275px_1fr] gap-8 md:gap-12 items-center">

                            {/* Logo/Image Card */}
                            <motion.div
                                key={`image-${currentTestimonial.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                                className="animated-border-card relative w-full max-w-[275px] h-[185px] rounded-[18px] p-[1px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
                            >
                                <div className="relative w-full h-full rounded-[17px] border border-white/75 bg-white/15 flex items-center justify-center overflow-hidden">
                                    <img
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="max-w-[75%] max-h-[75%] object-contain brightness-0 invert"
                                    />
                                </div>
                            </motion.div>

                            {/* Text */}
                            <div className="text-white">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentTestimonial.id}
                                        initial={{ opacity: 0, x: 35 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -35 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <p className="text-[16px] md:text-[18px] leading-[1.8] max-w-[800px]">
                                            {currentTestimonial.description}
                                        </p>

                                        <h4 className="mt-8 text-[18px] md:text-[20px] font-semibold">
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
                        <div className="flex justify-center gap-2 mt-10">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setTestIndex(i)}
                                    aria-label={`Go to testimonial ${i + 1}`}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        i === testIndex
                                            ? "w-6 bg-white"
                                            : "w-2 bg-white/40"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                @keyframes borderRotate {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }

                .animated-border-full::before,
                .animated-border-card::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    padding: 1px;
                    opacity: 0;
                    background: conic-gradient(
                        from 0deg,
                        transparent 0deg,
                        #ffffffbf 75deg,
                        transparent 150deg,
                        transparent 210deg,
                        #ffffffbf 285deg,
                        transparent 360deg
                    );
                    transition: opacity 0.4s ease;
                    animation: borderRotate 3s linear infinite;
                    pointer-events: none;
                    z-index: 0;

                    -webkit-mask:
                        linear-gradient(#fff 0 0) content-box,
                        linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }

                .animated-border-full::before {
                    border-radius: 9999px;
                }

                .animated-border-card::before {
                    border-radius: 18px;
                }

                .animated-border-full:hover::before,
                .animated-border-card:hover::before {
                    opacity: 1;
                }
            `}</style>
        </section>
    );
}