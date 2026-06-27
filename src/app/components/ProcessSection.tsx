"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import listen from "../assets/listen-before-advise.png";

const ProcessSection = () => {
    return (
<<<<<<< HEAD
        <section className="relative max-w-full overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-20 2xl:px-32">
            <div className="mx-auto grid  grid-cols-1 items-center gap-12  lg:grid-cols-[35%_65%]">
=======
        <section className="relative w-full overflow-hidden bg-white px-6 py-20 sm:px-8 lg:px-12 xl:px-20">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[43%_57%]">
>>>>>>> origin/main
                {/* Left Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative flex justify-center lg:justify-start"
                >
<<<<<<< HEAD
                    <div className="relative">
=======
                    <div className="relative w-full max-w-[520px]">
>>>>>>> origin/main
                        <Image
                            src={listen.src}
                            alt="We listen before we advise"
                            width={750}
                            height={650}
<<<<<<< HEAD
                            className="h-[538px] w-[610px] object-contain"
=======
                            className="h-auto w-full object-contain"
>>>>>>> origin/main
                            priority
                        />
                    </div>
                </motion.div>

                {/* Right Content */}
<<<<<<< HEAD
                <div className="text-center lg:text-left ">
                    <h2
                        className=" uppercase leading-tight tracking-wide text-primary sm:text-[36px] lg:text-[40px] 2xl:text-[58px]"
                    >
                        We Listen, Before We Advise.
                    </h2>
=======
                <div className="text-center lg:text-left">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="font-heading text-[30px] font-bold uppercase leading-tight tracking-wide text-primary sm:text-[36px]"
                    >
                        We Listen, Before We Advise.
                    </motion.h2>
>>>>>>> origin/main

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.15 }}
<<<<<<< HEAD
                        className="mt-5 space-y-4 font-body text-[17px] font-light leading-[1.65] text-[#555] sm:text-[20px] lg:text-2xl 2xl:text-[28px]"
=======
                        className="mt-5 space-y-4 font-body text-[17px] font-light leading-[1.65] text-[#555] sm:text-[20px] "
>>>>>>> origin/main
                    >
                        <p>
                            We understand your business, your pain points and your consumers.
                        </p>

                        <p>
                            We believe in creativity anchored in clarity led by strategic storytelling
                            <br className="hidden xl:block" /> and powered by impactful innovation...
                        </p>

                        <p>We say thousand No&apos;s to a single Yes!</p>
                    </motion.div>

<<<<<<< HEAD
                    <h3
                                        className="mt-8 font-heading text-[20px] font-bold uppercase leading-[1.45] tracking-wide text-secondary sm:text-[22px] lg:text-2xl 2xl:text-[36px]"
=======
                    <motion.h3
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-8 font-heading text-[20px] font-bold uppercase leading-[1.45] tracking-wide text-secondary sm:text-[22px] "
>>>>>>> origin/main
                    >
                        That&apos;s How We Build Your Brand...
                        <br />
                        From Idea To Execution...
<<<<<<< HEAD
                    </h3>
=======
                    </motion.h3>
>>>>>>> origin/main

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        className="mt-9 flex justify-center lg:justify-start"
                    >
<<<<<<< HEAD
                        <button className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
=======
                        <button className="group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
>>>>>>> origin/main
                            Decode Our DNA

                            <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <HiArrowUpRight className="h-5 w-5" />
                            </span>
                        </button>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Purple Strip */}
            {/* <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full bg-primary shadow-[0_-4px_16px_rgba(142,42,93,0.35)] sm:h-5" /> */}
        </section>
    );
};

export default ProcessSection;