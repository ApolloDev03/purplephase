"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import casestudy from "../assets/Case study-1.jpeg";
import caseicon from "../assets/caseicon.png";
import Breadcrumb from "../components/breadcrumb";

const brandStories = [
    {
        id: 1,
        brandName: "WHISKERS",
        tagline: "One of the pioneering brands in India’s male grooming segment",
        award: "Winner - Foxglove Award",
        heroImage: caseicon.src,
        productImage: casestudy.src,
        accentColor: "#A62666",
    },
    {
        id: 2,
        brandName: "SALEXO",
        tagline: "Building the future of AI-driven customer engagement.",
        award: "Innovation Excellence 2026",
        heroImage: caseicon.src,
        productImage: casestudy.src,
        accentColor: "#A62666",
    },
];

export default function BrandPage() {
    return (
        <>
            <Breadcrumb />
            <main className="bg-[#e5e5e5] font-sans">
                <section className="mx-auto max-w-full px-6 py-16 md:px-10 lg:px-16">
                    <div className="mb-8 md:mb-12">
                        <h2 className="text-3xl font-medium text-[#626262] md:text-5xl">
                            Story Behind Brand Building
                        </h2>
                        <p className="mt-2 text-sm text-[#7b7b7b] md:text-base">
                            Explore the process behind crafting memorable brand experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:gap-10">
                        {brandStories.map((story, idx) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: idx * 0.08 }}
                                className="overflow-hidden rounded-3xl bg-white shadow-sm md:rounded-[30px]"
                            >
                                {/* IMAGE AREA */}
                                <div className="relative h-65 sm:h-85 md:h-105 lg:h-125">
                                    <img
                                        src={story.productImage}
                                        alt={story.brandName}
                                        className="h-full w-full object-cover object-center"
                                    />

                                    <div className="absolute -bottom-4 right-4 z-10 md:-bottom-20 md:right-6">
                                        <div className="rounded-xl  p-3  md:p-4">
                                            <img
                                                src={story.heroImage}
                                                alt={story.brandName}
                                                className="h-13 w-auto object-contain md:h-50"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CONTENT AREA */}
                                <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:gap-8 md:p-10">
                                    <div className="max-w-2xl">
                                        <h3
                                            className="mb-2 text-2xl font-black tracking-tighter md:mb-3 md:text-[42px]"
                                            style={{ color: story.accentColor }}
                                        >
                                            {story.brandName}
                                        </h3>

                                        <p className="text-sm font-medium leading-snug text-[#626262] md:text-xl md:leading-relaxed">
                                            {story.tagline}
                                        </p>
                                    </div>

                                    <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-end md:gap-5">
                                        <span className="text-[11px] font-medium uppercase tracking-wide text-[#8a8a8a] md:text-sm">
                                            {story.award}
                                        </span>

                                        <button className="flex items-center gap-2 rounded-lg bg-[#A62666] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:opacity-95 md:px-6 md:text-sm">
                                            Case Study <ArrowUpRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-10 flex items-center justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#A62666] px-6 py-3 text-xs font-bold text-white shadow-lg md:px-8 md:py-3.5 md:text-sm"
                        >
                            View All Case Studies <ArrowUpRight size={16} />
                        </motion.button>
                    </div>
                </section>
            </main>
        </>
    );
}