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
"use client";

import { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    useInView,
    useMotionValue,
    useTransform,
    animate,
} from "framer-motion";
import { FaQuoteRight } from "react-icons/fa";
import axios from "axios";
import { apiUrl } from "../config";

const CounterItem = ({
    value,
    label,
    color,
}: {
    value: string;
    label: string;
    color: string;
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const numericTarget = parseInt(value.replace(/[^0-9]/g, ""));
    const suffix = value.replace(/[0-9]/g, "");

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(count, numericTarget, {
                duration: 2,
                ease: "easeOut",
            });

            const unsubscribe = rounded.on("change", (latest) =>
                setDisplayValue(latest)
            );

            return () => {
                controls.stop();
                unsubscribe();
            };
        }
    }, [isInView, numericTarget, count, rounded]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center text-center">
            <p
                className="font-heading text-5xl md:text-6xl lg:text-8xl font-semibold not-italic mb-1 scale-y-110"
                style={{ color }}
            >
                {displayValue}
                {suffix}
            </p>

            <p className="text-[#666666] text-[10px] 2xl:text-2xl md:text-xs uppercase tracking-[2px] leading-tight not-italic">
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
        <section className="py-20 bg-[#e5e5e5] font-sans">
            <div className="max-w-full mx-auto px-6 md:px-10">

                {/* Counter Section With Only Animated Border */}
                <div className="mb-16 md:mb-24 rounded-[20px] md:rounded-[40px] p-[2px] animated-gradient-border">
                    <div className="flex flex-col items-center justify-between gap-y-5 rounded-[18px] md:rounded-[38px] bg-white py-10 shadow-sm sm:flex-row md:px-10">
                        <CounterItem value="15+" label="Successful Years" color="#A62666" />
                        <CounterItem value="20+" label="Industries Served" color="#999999" />
                        <CounterItem value="500+" label="Satisfied Clients" color="#F58220" />
                        <CounterItem value="3000+" label="Completed Projects" color="#999999" />
                    </div>
                </div>

                <div className="relative">
                    <h2 className="text-[40px] font-medium text-[#666666] mb-10 tracking-tight">
                        Pat on the Back
                    </h2>

                    {loading ? (
                        <div className="bg-white rounded-[30px] p-10 min-h-[260px] flex items-center justify-center">
                            <div className="h-12 w-12 rounded-full border-4 border-[#e5e5e5] border-t-[#A62666] animate-spin"></div>
                        </div>
                    ) : testimonials.length === 0 ? (
                        <div className="bg-white rounded-[30px] p-8 text-[#666666]">
                            No testimonials found.
                        </div>
                    ) : (
                        <div className="relative">
                            <div className="relative">
                                <div className="bg-white rounded-[30px] rounded-bl-[50px] rounded-br-none p-6 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start">
                                    <div className="flex justify-center md:justify-start">
                                        <img
                                            src={currentTestimonial.image}
                                            alt={currentTestimonial.name}
                                            className="grayscale opacity-70 max-w-[160px] object-contain"
                                        />
                                    </div>

                                    <div className="relative overflow-hidden min-h-35">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={currentTestimonial.id}
                                                initial={{ opacity: 0, x: 40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -40 }}
                                                transition={{ duration: 0.4 }}
                                                className="text-[#666666] leading-8 text-lg"
                                            >
                                                {currentTestimonial.description}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="flex justify-center md:justify-start items-start">
                                    <div className="relative bg-white w-24 h-20 md:w-32 md:h-24 flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[#e5e5e5] rounded-tr-[20px]"></div>
                                        <FaQuoteRight className="relative text-[#F58220] text-6xl font-bold" />
                                    </div>

                                    <div className="flex-1 bg-white h-20 flex items-center px-6 md:px-28 rounded-bl-[20px] rounded-br-[30px] overflow-hidden">
                                        <AnimatePresence mode="wait">
                                            <motion.h4
                                                key={`client-${currentTestimonial.id}`}
                                                initial={{ opacity: 0, x: 40 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -40 }}
                                                transition={{ duration: 0.4 }}
                                                className="text-[#A62666] text-3xl leading-none"
                                            >
                                                {currentTestimonial.name}

                                                {currentTestimonial.designation && (
                                                    <span className="block text-[#666666] text-sm mt-2">
                                                        {currentTestimonial.designation}
                                                    </span>
                                                )}
                                            </motion.h4>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mt-4">
                                {testimonials.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setTestIndex(i)}
                                        aria-label={`Show testimonial ${i + 1}`}
                                        className={`h-2 w-2 rounded-full transition-all ${
                                            i === testIndex
                                                ? "bg-[#A62666] w-4"
                                                : "bg-gray-300"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .animated-gradient-border {
                    background: linear-gradient(
                        90deg,
                        #a62666,
                        #f58220,
                        #ffffff,
                        #a62666
                    );
                    background-size: 300% 300%;
                    animation: borderMove 4s linear infinite;
                }

                @keyframes borderMove {
                    0% {
                        background-position: 0% 50%;
                    }

                    50% {
                        background-position: 100% 50%;
                    }

                    100% {
                        background-position: 0% 50%;
                    }
                }
            `}</style>
        </section>
    );
}