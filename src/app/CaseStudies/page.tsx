"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Breadcrumb from "../components/breadcrumb";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
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
    slug?: string;
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

export default function CaseStudyPage() {
    const [caseStudies, setCaseStudies] = useState<CaseStudyItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const makeSlug = (text: string) => {
        return text
            ?.toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const fetchCaseStudies = async () => {
        try {
            setLoading(true);
            setError("");

            const res = await axios.post(
                `${apiUrl}/caseStudyList`,
                {},
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (res.data?.success) {
                setCaseStudies(res.data?.data || []);
            } else {
                setError(res.data?.message || "Failed to fetch case studies.");
            }
        } catch (err) {
            console.error("Case Study API Error:", err);
            setError("Something went wrong while loading case studies.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCaseStudies();
    }, []);

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

                    {loading && (
                        <p className="py-10 text-center text-sm font-medium text-[#626262]">
                            Loading case studies...
                        </p>
                    )}

                    {!loading && error && (
                        <p className="py-10 text-center text-sm font-medium text-red-500">
                            {error}
                        </p>
                    )}

                    {!loading && !error && (
                        <div className="grid grid-cols-1 gap-8 lg:gap-10">
                            {caseStudies.map((study, idx) => {
                                const detailSlug = study.slug || makeSlug(study.title);

                                return (
                                    <motion.div
                                        key={study.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                                        className="overflow-hidden rounded-3xl bg-white shadow-sm md:rounded-[30px]"
                                    >
                                        <div className="relative h-65 sm:h-85 md:h-105 lg:h-125">
                                            <img
                                                src={study.hero_image}
                                                alt={study.award_title || study.title}
                                                className="h-full w-full object-cover object-center"
                                            />

                                            <div className="absolute -bottom-4 right-4 z-10 md:-bottom-20 md:right-6">
                                                <div className="rounded-xl p-3 md:p-4">
                                                    <img
                                                        src={study.award_image}
                                                        alt={study.title}
                                                        className="h-13 w-auto object-contain md:h-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-end md:gap-8 md:p-10">
                                            <div className="max-w-2xl">
                                                <h3
                                                    className="mb-2 text-2xl font-semibold tracking-tighter md:mb-3 md:text-[42px]"
                                                    style={{ color: "#A62666" }}
                                                >
                                                    {study.title}
                                                </h3>

                                                <p className="text-sm font-medium leading-snug text-[#626262] md:text-xl md:leading-relaxed">
                                                    {study.description}
                                                </p>
                                            </div>

                                            <div className="flex w-full flex-col items-start gap-3 md:w-auto md:items-center md:gap-5">
                                                <span className="text-[11px] font-medium uppercase tracking-wide text-[#8a8a8a] md:text-sm">
                                                    {study.award_title}
                                                </span>

                                                <Link
                                                    href={`/case-study-detail?slug=${encodeURIComponent(
                                                        detailSlug
                                                    )}`}
                                                    className="flex items-center gap-2 rounded-lg bg-[#A62666] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:opacity-95 md:px-6 md:text-sm"
                                                >
                                                    Case Study <ArrowUpRight size={16} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}

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