"use client";

import { motion } from "framer-motion";
import Breadcrumb from "../components/breadcrumb";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";

type SectionImage = {
    id: number;
    mu_title: string;
    image_1: string;
    image_2: string;
    image_3: string;
    description: string;
    sort_order: number;
};

type MoreImage = {
    id: number;
    image_url: string;
    sort_order: number;
};

type CaseStudyItem = {
    id: number;
    slug: string;
    title: string;
    description: string;
    hero_image: string;
    meta_title: string;
    meta_keyword: string;
    meta_description: string;
    head: string;
    body: string;
    award_title: string;
    award_image: string;
    section_images: SectionImage[];
    more_images: MoreImage[];
    created_at: string;
};



function CaseStudyDetailContent() {
    const searchParams = useSearchParams();
    const slug = searchParams.get("slug");

    const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCaseStudyDetail = async () => {
        if (!slug) {
            setError("Case study slug not found.");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");
            const res = await axios.post(
                `${apiUrl}/get_id_based_case_studay`,
                { slug: slug },
                { headers: { Accept: "application/json" } }
            );

            if (res.data?.success && res.data?.data?.length > 0) {
                setCaseStudy(res.data.data[0]);
            } else {
                setError(res.data?.message || "Case study not found.");
            }
        } catch (err) {
            console.error("Case Study Detail API Error:", err);
            setError("Something went wrong while loading case study detail.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudyDetail();
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
                <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !caseStudy) {
        return (
            <main className="bg-[#fdfdfd] px-6 py-20 text-center font-sans text-red-500">
                {error || "Case study not found."}
            </main>
        );
    }

    const sortedSections = [...(caseStudy.section_images || [])].sort(
        (a, b) => a.sort_order - b.sort_order
    );

    const sortedMoreImages = [...(caseStudy.more_images || [])].sort(
        (a, b) => a.sort_order - b.sort_order
    );

    return (
        <main className="bg-[#fdfdfd] font-sans antialiased text-[#333]">
            <Breadcrumb />

            <div className="mx-auto  px-5 py-12 md:px-12 md:py-20 lg:px-20">
                <motion.div
                    key={caseStudy.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="overflow-hidden rounded-3xl bg-white shadow-sm md:rounded-[30px]"
                >
                    <div className="relative h-65 sm:h-85 md:h-105 lg:h-125">
                        <img
                            src={caseStudy.hero_image}
                            alt={caseStudy.award_title || caseStudy.title}
                            className="h-full w-full object-cover object-center"
                        />

                        <div className="absolute -bottom-4 right-4 z-10 md:-bottom-20 md:right-6">
                            <div className="rounded-xl p-3 md:p-4">
                                <img
                                    src={caseStudy.award_image}
                                    alt={caseStudy.title}
                                    className="h-13 w-auto object-contain md:h-50"
                                />
                            </div>

                            <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-center  md:gap-5">
                                <span className="text-[11px] font-medium uppercase tracking-wide text-[#8a8a8a] md:text-sm">
                                    {caseStudy.award_title}
                                </span>

                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:gap-8 md:p-10">
                        <div className="max-w-2xl">
                            <h3
                                className="mb-2 text-2xl font-semibold tracking-tighter md:mb-3 md:text-[42px]"
                                style={{ color: "#A62666" }}
                            >
                                {caseStudy.title}
                            </h3>

                            <p className="text-sm font-medium leading-snug text-[#626262] md:text-xl md:leading-relaxed">
                                {caseStudy.description}
                            </p>
                        </div>

                    </div>
                </motion.div>
            </div>
            {/* 3. DYNAMIC SECTIONS - Redesigned Image Cards */}
            <section className="rounded-none bg-[#e5e5e5]  py-10 px-5 lg:px-16 ">
                {sortedSections.map((section, index) => {
                    const images = [
                        section.image_1,
                        section.image_2,
                        section.image_3,
                    ].filter(Boolean);

                    return (
                        <motion.section
                            key={section.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.1 }}
                            className="relative mb-16 px-0 py-8 last:mb-0 md:px-0 md:py-10"
                        >
                            <h2
                                className="mb-6 text-3xl font-semibold tracking-tighter md:text-4xl lg:text-5xl"
                                style={{ color: "#A62666" }}
                            >
                                {section.mu_title}
                            </h2>

                            <div className="mb-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {images.map((img, imgIndex) => (
                                    <motion.div
                                        key={imgIndex}
                                        whileHover={{ y: -10, rotate: imgIndex % 2 === 0 ? 1 : -1 }}
                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        className="group relative aspect-5/4 rounded-3xl border border-gray-100/80 bg-white p-3 shadow-xl transition-all duration-300 hover:shadow-[#A62666]/10"
                                    >
                                        <img
                                            src={img}
                                            alt={`${section.mu_title} ${imgIndex + 1}`}
                                            className="h-full w-full rounded-2xl object-cover"
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {section.description && (
                                <div className=" rounded-r-2xl border-l-4 border-[#A62666] bg-white/90 p-8 shadow-sm">
                                    <p className="text-lg leading-relaxed text-[#626262]">
                                        {section.description}
                                    </p>
                                </div>
                            )}
                        </motion.section>
                    );
                })}
            </section>

            {/* 4. MORE IMAGES - Interactive Stack */}
            <section className="rounded-none   py-10 px-5 lg:px-16">
                {sortedMoreImages.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        className="pb-5 bg-[#fafafa] rounded-[50px] border border-gray-100"
                    >
                        <div className="text-center mb-16 px-6">
                            <span className="text-xs font-black uppercase tracking-widest text-[#A62666] mb-2 block">PROJECT GALLERY</span>
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tighter" style={{ color: "#333" }}>
                                More Project Moments
                            </h2>
                        </div>

                        <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {sortedMoreImages.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="relative group aspect-square rounded-2xl overflow-hidden shadow-md"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                >
                                    <img
                                        src={item.image_url}
                                        alt={`More image ${index + 1}`}
                                        className="h-full w-full object-cover"
                                    />
                                    {/* Accent curtain */}
                                    <div className="absolute inset-0 bg-[#A62666]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                                        <div className="p-3 border-2 border-white rounded-full">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </section>

        </main>
    );
}

export default function CaseStudyDetailPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
                    <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
                </div>
            }
        >
            <CaseStudyDetailContent />
        </Suspense>
    );
}