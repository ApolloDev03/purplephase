"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RotateCcw, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import Breadcrumb from "../components/breadcrumb";
import { apiUrl } from "../config";

type CareerItem = {
    id: number;
    title: string;
    description: string;
    created_at: string;
};

type CareerListResponse = {
    success: boolean;
    message: string;
    data: CareerItem[];
};

type CareerFormResponse = {
    success: boolean;
    message: string;
};

type FormDataType = {
    first_name: string;
    last_name: string;
    email: string;
    contact_no: string;
    qualification: string;
    resume: File | null;
    captcha: string;
};

export default function CareerPage() {
    const [careers, setCareers] = useState<CareerItem[]>([]);
    const [loadingCareers, setLoadingCareers] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [openCareerId, setOpenCareerId] = useState<number | null>(null);

    const [captchaCode, setCaptchaCode] = useState<string>("8227");

    const [formData, setFormData] = useState<FormDataType>({
        first_name: "",
        last_name: "",
        email: "",
        contact_no: "",
        qualification: "",
        resume: null,
        captcha: "",
    });


    useEffect(() => {
        fetchCareers();
        generateCaptcha();
    }, []);

    const fetchCareers = async (): Promise<void> => {
        try {
            setLoadingCareers(true);

            const res = await axios.post<CareerListResponse>(`${apiUrl}/careerlist`, {}, {
                headers: {
                    Accept: "application/json",
                },
            });

            if (res.data?.success) {
                setCareers(res.data.data || []);
            } else {
                toast.error(res.data?.message || "Career list not found.");
            }
        } catch (error) {
            console.error("Career list error:", error);
            toast.error("Failed to load career list.");
        } finally {
            setLoadingCareers(false);
        }
    };

    const generateCaptcha = (): void => {
        const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
        setCaptchaCode(randomCode);

        setFormData((prev) => ({
            ...prev,
            captcha: "",
        }));
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0] || null;

        setFormData((prev) => ({
            ...prev,
            resume: file,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if (!formData.first_name.trim()) {
            toast.error("Please enter first name.");
            return;
        }

        if (!formData.last_name.trim()) {
            toast.error("Please enter last name.");
            return;
        }

        if (!formData.email.trim()) {
            toast.error("Please enter email.");
            return;
        }

        if (!formData.contact_no.trim()) {
            toast.error("Please enter contact number.");
            return;
        }

        if (!formData.qualification.trim()) {
            toast.error("Please enter qualification.");
            return;
        }

        if (!formData.resume) {
            toast.error("Please upload resume.");
            return;
        }

        if (formData.captcha.trim() !== captchaCode) {
            toast.error("Invalid captcha. Please try again.");
            return;
        }

        try {
            setSubmitLoading(true);

            const payload = new FormData();
            payload.append("first_name", formData.first_name);
            payload.append("last_name", formData.last_name);
            payload.append("email", formData.email);
            payload.append("contact_no", formData.contact_no);
            payload.append("qualification", formData.qualification);
            payload.append("resume", formData.resume);

            const res = await axios.post<CareerFormResponse>(
                `${apiUrl}/careerform`,
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data?.success) {
                toast.success(
                    res.data.message || "Your application has been submitted successfully."
                );

                setFormData({
                    first_name: "",
                    last_name: "",
                    email: "",
                    contact_no: "",
                    qualification: "",
                    resume: null,
                    captcha: "",
                });

                const fileInput = document.getElementById(
                    "resume"
                ) as HTMLInputElement | null;

                if (fileInput) {
                    fileInput.value = "";
                }

                generateCaptcha();
            } else {
                toast.error(res.data?.message || "Something went wrong. Please try again.");
            }
        } catch (error: unknown) {
            console.error("Career form submit error:", error);

            if (axios.isAxiosError(error)) {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <>
            <Breadcrumb />
            <section className="bg-white font-body text-gray-600">

                <div className="mx-auto max-w-full px-6 py-12 md:px-10 lg:px-16 lg:py-16">
                    {/* Page Heading */}
                    <div className="mx-auto mb-14 max-w-5xl rounded-[34px] bg-white px-6 py-12 text-center shadow-sm md:px-12">
                        <span className="mb-4 inline-flex rounded-full bg-[#A62666]/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.25em] text-[#A62666]">
                            Join Our Team
                        </span>

                        <h1 className="font-heading text-[38px] font-black uppercase tracking-[0.12em] text-[#A62666] md:text-[56px]">
                            Career
                        </h1>

                        <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-secondary" />

                        <p className="mx-auto mt-7 max-w-4xl text-[16px] leading-8 text-[#1f1f1f]">
                            We build bonds not just with our clients, but also with our people. Hence, we think as individuals but work as a team. One criterion that we look in our people is ambition to create one-of-a-kind branding solutions that support our clients’ growth like never before. Alongside exciting growth opportunities and remuneration, we also offer to our team mates a rich learning experience to grow – both in their professional and personal lives. If you desire to work at Purplephase, post your Curriculum Vitae with a cover letter at career.purplephase@gmail.in.
                        </p>
                    </div>

                    {/* Openings */}
                    <div className="mx-auto mb-16 max-w-6xl rounded-[34px] bg-white p-6 shadow-sm md:p-10">
                        <div className="mb-10 text-center">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
                                Current Vacancies
                            </span>

                            <h2 className="mt-3 font-heading text-[28px] font-black uppercase tracking-[0.12em] text-[#A62666] md:text-[38px]">
                                Openings
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {loadingCareers ? (
                                <div className="rounded-2xl bg-[#e5e5e5] px-5 py-6 text-center font-semibold text-[#1f1f1f]">
                                    Loading openings...
                                </div>
                            ) : careers.length > 0 ? (
                                careers.map((career) => {
                                    const isOpen = openCareerId === career.id;

                                    return (
                                        <div
                                            key={career.id}
                                            className="overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white"
                                        >
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenCareerId(isOpen ? null : career.id)
                                                }
                                                className="group flex w-full items-center justify-between bg-[#e5e5e5] px-6 py-3 text-left transition "
                                            >
                                                <span className="font-heading text-[15px] font-bold uppercase tracking-[0.16em] text-[#1f1f1f] transition ">
                                                    {career.title}
                                                </span>

                                                <motion.span
                                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#A62666]"
                                                >
                                                    {isOpen ? <Minus size={22} /> : <Plus size={22} />}
                                                </motion.span>
                                            </button>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{
                                                            duration: 0.35,
                                                            ease: [0.4, 0, 0.2, 1],
                                                        }}
                                                        className="overflow-hidden border-t border-[#e5e5e5] bg-white"
                                                    >
                                                        <motion.div
                                                            initial={{ y: -10 }}
                                                            animate={{ y: 0 }}
                                                            exit={{ y: -10 }}
                                                            transition={{
                                                                duration: 0.3,
                                                                ease: [0.4, 0, 0.2, 1],
                                                            }}
                                                            className="px-6 py-5"
                                                        >
                                                            <p className="whitespace-pre-line text-[15px] leading-8 text-[#1f1f1f]">
                                                                {career.description}
                                                            </p>
                                                        </motion.div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="rounded-2xl bg-[#e5e5e5] px-5 py-6 text-center font-semibold text-[#1f1f1f]">
                                    No openings found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Fill Details Form */}
                    <div className="mx-auto max-w-6xl rounded-[34px] bg-white p-6 shadow-sm md:p-10">
                        <div className="mb-10 text-center">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
                                Apply Now
                            </span>

                            <h2 className="mt-3 font-heading text-[28px] font-black uppercase tracking-[0.12em] text-[#A62666] md:text-[38px]">
                                Fill Your Details
                            </h2>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input
                                    type="text"
                                    name="first_name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    placeholder="First Name*"
                                    className="h-14 w-full rounded-2xl border border-[#e5e5e5] bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                />

                                <input
                                    type="text"
                                    name="last_name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    placeholder="Last Name*"
                                    className="h-14 w-full rounded-2xl border border-[#e5e5e5] bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email*"
                                    className="h-14 w-full rounded-2xl border border-[#e5e5e5] bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                />

                                <input
                                    type="text"
                                    name="contact_no"
                                    value={formData.contact_no}
                                    onChange={handleChange}
                                    placeholder="Contact No*"
                                    className="h-14 w-full rounded-2xl border border-[#e5e5e5] bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <input
                                    type="text"
                                    name="qualification"
                                    value={formData.qualification}
                                    onChange={handleChange}
                                    placeholder="Qualification*"
                                    className="h-14 w-full rounded-2xl border border-[#e5e5e5] bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                />

                                <div className="flex h-14 items-center rounded-2xl border border-[#e5e5e5] bg-white px-4">
                                    <input
                                        id="resume"
                                        type="file"
                                        name="resume"
                                        onChange={handleFileChange}
                                        accept=".pdf,.doc,.docx"
                                        className="w-full text-sm text-[#1f1f1f] file:mr-4 file:rounded-full file:border-0 file:bg-[#A62666] file:px-5 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-secondary hover:file:text-white focus:outline-none focus:ring-2 focus:ring-[#A62666] focus:ring-offset-2 transition cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="rounded-[28px] bg-[#e5e5e5] p-5">
                                <div className="flex flex-wrap items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-14 items-center rounded-2xl bg-white px-7 font-heading text-xl font-black tracking-[0.3em] text-[#A62666]">
                                            {captchaCode}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={generateCaptcha}
                                            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary text-white transition hover:bg-[#A62666]"
                                        >
                                            <RotateCcw size={20} />
                                        </button>
                                    </div>

                                    <input
                                        type="text"
                                        name="captcha"
                                        value={formData.captcha}
                                        onChange={handleChange}
                                        placeholder="Enter Captcha"
                                        className="h-14 w-full flex-1 rounded-2xl border border-white bg-white px-5 text-[#1f1f1f] outline-none transition focus:border-[#A62666]"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-center pt-4">
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="rounded-full bg-[#A62666] px-10 py-4 font-heading text-sm font-bold uppercase tracking-[0.2em] text-white transition hover:bg-secondary active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitLoading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="mx-auto mt-12 max-w-4xl rounded-[28px] bg-white px-6 py-6 text-center text-[15px] font-semibold text-[#1f1f1f] shadow-sm">
                        Stay updated for vacancies at Purplephase. Like our page on social media.
                    </div>
                </div>
            </section>
        </>
    );
}