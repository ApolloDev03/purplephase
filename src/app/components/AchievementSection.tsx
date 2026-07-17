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
    <div className="flex flex-col items-center justify-between text-center">
      <h4 className="text-white text-[30px]  md:text-[54px] lg:text-[75px]  font-semibold leading-none">
        {displayValue}
        {suffix}
      </h4>

      <span className="mt-2 text-white text-[13px]  md:text-[20px] 2xl:text-[28px] font-normal leading-none">
        {label}
      </span>
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
    <section className="relative overflow-hidden py-10 xl:py-[85px] font-sans bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
      <div className="max-w-full mx-auto px-4  lg:px-20 2xl:px-32">
      

<div className="counter-border-pill mb-16">
  <div className="grid w-full grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-10">
    <CounterItem value="15+" label="Successful Years" />
    <CounterItem value="20+" label="Industries Served" />
    <CounterItem value="500+" label="Satisfied Clients" />
    <CounterItem value="3000+" label="Completed Projects" />
  </div>
</div>

        {/* Title */}
        {/* <h2 className="text-white  mb-8 md:mb-11 tracking-wide">
          Pat on the Back
        </h2> */}

        {loading ? (
          <div className="min-h-[220px] flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-white text-lg">No testimonials found.</div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] xl:grid-cols-[385px_1fr] gap-6 md:gap-12 items-start">
              {/* Image Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`image-${currentTestimonial.id}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -25 }}
                  transition={{ duration: 0.45 }}
                  className="relative mx-auto md:mx-0 w-full max-w-[385px] h-[257px] rounded-[20px] border border-white/75 bg-white/15 flex items-center justify-center overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.22)]"
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
                    <p className="text-white! text-[18px] lg:text-[21px]!">
                      {currentTestimonial.description}
                    </p>

                    <h4 className="mt-4 lg:mt-9 text-[18px] md:text-[21px] font-semibold">
                      {currentTestimonial.name}
                    </h4>

                    {currentTestimonial.designation && (
                      <span className="mt-1 text-white! text-sm md:text-base">
                        {currentTestimonial.designation}
                      </span>
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

      
    </section>
  );
}
