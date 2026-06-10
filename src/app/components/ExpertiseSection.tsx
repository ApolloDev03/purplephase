
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "../config";

type ServiceItem = {
    id: number;
    service_name: string;
    image: string | null;
};

const ITEM_HEIGHT = 70;
const VISIBLE_OFFSETS = [-2, -1, 0, 1, 2];

export default function ExpertiseSection() {
    const [expertiseData, setExpertiseData] = useState<ServiceItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const sectionRef = useRef<HTMLDivElement | null>(null);
    const stickyRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.post(
                    `${apiUrl}/serviceList`,
                    {},
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );

                if (response.data?.success && Array.isArray(response.data.data)) {
                    setExpertiseData(response.data.data);
                }
            } catch (error) {
                console.error("Service list API error:", error);
            }
        };

        fetchServices();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current || expertiseData.length === 0) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();

            const totalScrollHeight = section.offsetHeight - window.innerHeight;

            if (totalScrollHeight <= 0) return;

            const scrollProgress = Math.min(
                Math.max(-rect.top / totalScrollHeight, 0),
                1
            );

            const newIndex = Math.round(
                scrollProgress * (expertiseData.length - 1)
            );

            setActiveIndex(newIndex);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [expertiseData.length]);

    const visibleItems = useMemo(() => {
        if (expertiseData.length === 0) return [];

        return VISIBLE_OFFSETS.map((offset) => {
            const index = activeIndex + offset;

            if (index < 0 || index >= expertiseData.length) {
                return null;
            }

            return {
                ...expertiseData[index],
                offset,
                index,
            };
        }).filter(Boolean) as Array<
            ServiceItem & {
                offset: number;
                index: number;
            }
        >;
    }, [activeIndex, expertiseData]);

    const activeItem = expertiseData[activeIndex];

    return (
        <section
            ref={sectionRef}
            className="relative bg-white"
            style={{
                height: expertiseData.length
                    ? `${expertiseData.length * 100}vh`
                    : "100vh",
            }}
        >
            <div
                ref={stickyRef}
                className="sticky top-0 flex h-screen items-center overflow-hidden bg-white py-10 md:py-14 xl:py-16"
            >
                <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-6 md:px-10 lg:grid-cols-[55%_45%] xl:px-16">
                    {/* Left Content */}
                    <div className="flex w-full flex-col justify-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="mb-10 font-heading text-[38px] font-bold leading-none text-primary sm:text-[44px] md:mb-14 md:text-[52px]"
                        >
                            Expertise
                        </motion.h2>

                        <div className="relative w-full max-w-[620px] overflow-hidden">
                            <div
                                className="relative"
                                style={{
                                    height: `${
                                        ITEM_HEIGHT * VISIBLE_OFFSETS.length
                                    }px`,
                                }}
                            >
                                <AnimatePresence initial={false}>
                                    {visibleItems.map(
                                        ({
                                            id,
                                            service_name,
                                            offset,
                                            index,
                                        }) => {
                                            const isActive = offset === 0;
                                            const distance = Math.abs(offset);

                                            return (
                                                <motion.button
                                                    key={id}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveIndex(index)
                                                    }
                                                    initial={false}
                                                    animate={{
                                                        y:
                                                            offset *
                                                                ITEM_HEIGHT +
                                                            ITEM_HEIGHT * 2,
                                                        opacity:
                                                            distance === 0
                                                                ? 1
                                                                : distance === 1
                                                                ? 0.45
                                                                : 0.08,
                                                        scale: isActive
                                                            ? 1
                                                            : 0.94,
                                                    }}
                                                    transition={{
                                                        duration: 0.45,
                                                        ease: "easeInOut",
                                                    }}
                                                    style={{
                                                        height: ITEM_HEIGHT,
                                                    }}
                                                    className="absolute left-0 top-0 flex w-full items-center"
                                                >
                                                    <span
                                                        className={`block w-full rounded-full px-2 py-4 text-center font-heading text-[18px] font-medium uppercase tracking-wide transition-all duration-300  ${
                                                            isActive
                                                                ? "bg-gradient-to-r from-[#c02a83] to-[#760052] text-white shadow-lg shadow-primary/20"
                                                                : "bg-transparent text-[#8a8a8a]"
                                                        }`}
                                                    >
                                                        {service_name}
                                                    </span>
                                                </motion.button>
                                            );
                                        }
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="pointer-events-none absolute left-0 top-0 h-16 w-full bg-gradient-to-b from-white to-transparent" />
                            <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent" />
                        </div>
                    </div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, rotateY: -20 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex w-full justify-center "
                    >
                        <div className="relative flex w-full items-center justify-center">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={activeItem?.id || "default-image"}
                                    src={
                                        "/assets/Homepage banner/build-your-brand.gif"
                                    }
                                    alt={
                                        activeItem?.service_name ||
                                        "Expertise Animation"
                                    }
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        rotateY: -25,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotateY: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.9,
                                        rotateY: 25,
                                    }}
                                    transition={{
                                        duration: 0.45,
                                        ease: "easeOut",
                                    }}
                                    className="h-auto w-full object-contain  "
                                />
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}