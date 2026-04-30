"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import logo1 from "../assets/companylogo/1.jpg";
import logo2 from "../assets/companylogo/2.jpg";
import logo3 from "../assets/companylogo/3.jpg";
import logo4 from "../assets/companylogo/4.jpg";
import logo5 from "../assets/companylogo/5.jpg";
import logo6 from "../assets/companylogo/6.jpg";
import logo7 from "../assets/companylogo/BHARTJI-DESIGNER-JWELLERY-PVT.-LTD.png";
import logo8 from "../assets/companylogo/IIM-UDAIPUR-.png";
import logo9 from "../assets/companylogo/PACIFICA-.png";
import logo10 from "../assets/companylogo/SHOTT-AMUSEMENT-LLP.png";

const topRow = [
    { id: 1, src: logo1.src },
    { id: 2, src: logo2.src },
    { id: 3, src: logo3.src },
    { id: 4, src: logo4.src },
    { id: 5, src: logo5.src },
];

const bottomRow = [
    { id: 6, src: logo6.src },
    { id: 7, src: logo7.src },
    { id: 8, src: logo8.src },
    { id: 9, src: logo9.src },
    { id: 10, src: logo10.src },
];

function LogoRow({
    items,
    reverse = false,
    trigger,
}: {
    items: { id: number; src: string }[];
    reverse?: boolean;
    trigger: boolean;
}) {
    const marqueeItems = [...items, ...items, ...items, ...items];

    return (
        <div className="relative w-full overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: reverse ? -80 : 80 }}
                animate={trigger ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex w-max gap-4 md:gap-6"
            >
                <motion.div
                    className="flex w-max gap-4 md:gap-6"
                    animate={{
                        x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeItems.map((logo, index) => (
                        <div
                            key={`${logo.id}-${index}`}
                            className="flex h-[100px] w-[170px] shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:h-[150px] md:w-[250px]"
                        >
                            <img
                                src={logo.src}
                                alt={`Logo ${logo.id}`}
                                className="max-h-[100px] max-w-full object-contain grayscale transition duration-300 hover:grayscale-0 md:max-h-[100px]"
                            />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export function LogoSlider() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section
            ref={sectionRef}
            className="w-full overflow-hidden bg-[#e5e5e5] py-12 md:py-16"
        >
            <div className="space-y-6">
                <LogoRow items={topRow} reverse={false} trigger={isInView} />
                <LogoRow items={bottomRow} reverse={true} trigger={isInView} />
            </div>
        </section>
    );
}