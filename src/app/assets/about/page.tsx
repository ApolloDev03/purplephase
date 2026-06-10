"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { apiUrl } from "@/app/config";

type ServiceItem = {
    id: number;
    service_name: string;
    image: string | null;
};

const ITEM_HEIGHT = 72;
const VISIBLE_COUNT = 5;
const SLIDE_INTERVAL = 2000;

export default function AboutExpertiseTextSection() {
    const [expertiseData, setExpertiseData] = useState<ServiceItem[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
        if (expertiseData.length === 0) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % expertiseData.length);
        }, SLIDE_INTERVAL);

        return () => clearInterval(interval);
    }, [expertiseData.length]);

    const getVisibleItems = () => {
        if (expertiseData.length === 0) return [];

        return [0, 1, 2, 3, 4].map((offset) => {
            const index = (activeIndex + offset) % expertiseData.length;
            return { ...expertiseData[index], offset };
        });
    };

    return (
        <section className="relative overflow-hidden bg-[#e5e5e5] py-20 md:py-28 xl:py-32">
            <div className="mx-auto w-full max-w-7xl px-6 md:px-10 xl:px-16">
                <div className="mx-auto flex min-h-[420px] max-w-5xl flex-col items-center justify-center text-center">
                    <h2 className="mb-12 text-4xl font-medium text-[#4a4a4a] md:text-6xl xl:text-7xl">
                        Our Expertise
                    </h2>

                    <div
                        className="relative w-full overflow-hidden"
                        style={{
                            height: `${ITEM_HEIGHT * VISIBLE_COUNT}px`,
                        }}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            {getVisibleItems().map(({ id, service_name, offset }) => (
                                <motion.div
                                    key={`${id}-${offset}`}
                                    initial={{ y: ITEM_HEIGHT, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -ITEM_HEIGHT, opacity: 0 }}
                                    transition={{
                                        duration: 0.45,
                                        ease: "easeInOut",
                                    }}
                                    style={{
                                        height: `${ITEM_HEIGHT}px`,
                                    }}
                                    className="flex items-center justify-center"
                                >
                                    <span
                                        className={`block w-full text-center leading-tight transition-all duration-300
                                            ${
                                                offset === 0
                                                    ? "text-[34px] font-medium text-primary md:text-[48px] xl:text-[60px]"
                                                    : "text-[28px] font-medium text-[#b8b8b8] md:text-[40px] xl:text-[50px]"
                                            }`}
                                    >
                                        {service_name}
                                    </span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}