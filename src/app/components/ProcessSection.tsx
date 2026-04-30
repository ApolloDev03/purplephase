"use client";

import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";

const ProcessSection = () => {
    return (
        <section className="relative flex  w-full items-center justify-center bg-white px-6 py-10  ">
            <div className="mx-auto max-w-4xl text-left">
                {/* Main Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-7 font-semibold  text-[clamp(32px,5vw,56px)] leading-tight text-[#8e2a5d]"
                >
                    We listen, before we advise.
                </motion.h2>

                {/* Description Paragraphs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="space-y-6 text-lg md:text-2xl text-gray-600 font-light leading-relaxed"
                >
                    <p>We understand your business, your pain points and your consumers.</p>

                    <p>
                        We believe in creativity anchored in clarity led by strategic storytelling
                        <br className="hidden md:block" /> and powered by impactful innovation.
                    </p>

                    <p>We say thousand No&apos;s to a single Yes!</p>
                </motion.div>

                {/* Secondary Orange Headline */}
                <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="font-body mt-10 text-xl md:text-2xl font-semibold tracking-tight text-secondary"
                >
                    That&apos;s how we build your brand... From Idea to Execution...
                </motion.h3>

                {/* "Show Process" Button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 flex justify-center"
                >
                    <button className="group flex  items-center gap-2 rounded-md bg-[#8e2a5d] px-6 py-3  uppercase tracking-widest text-white transition-all hover:bg-[#70214a] hover:shadow-lg">
                        Show Process
                        <HiArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default ProcessSection;