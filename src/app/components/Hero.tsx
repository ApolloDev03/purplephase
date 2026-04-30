"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import logo from "../assets/ppc-combined-logo.png";
import { useSidebar } from "./SidebarContext";
import { RotateCcw } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about-us" },
    { label: "Case Studies", href: "CaseStudies" },
    { label: "Portfolio", href: "Portfolio" },
    { label: "Career", href: "Career" },
    { label: "Knowledge Corner", href: "KnowledgeCorner" },
    { label: "Contact", href: "contact" },
];

const slides = [
    {
        id: 1,
        eyebrow: "From Idea to Execution",
        headline: "We Build Your Brand",
        video: "/assets/Homepage banner/Banner-1.mp4",
    },
    {
        id: 2,
        eyebrow: "Win every\nmoment of truth",
        headline: "We Build Your Brand",
        video: "/assets/Homepage banner/Banner-2.mp4",
    },
    {
        id: 3,
        eyebrow: "Don't chase\nyour customers",
        headline: "We Build Your Brand",
        video: "/assets/Homepage banner/Banner-3.mp4",
    },
    {
        id: 4,
        eyebrow: "Create an\nimpactful moat",
        headline: "We Build Your Brand",
        video: "/assets/Homepage banner/Banner-4.mp4",
    },
];

const TOTAL = slides.length;

const sidebarVariants: Variants = {
    hidden: {
        x: "100%",
        transition: { type: "spring", stiffness: 260, damping: 28 },
    },
    visible: {
        x: 0,
        transition: { type: "spring", stiffness: 260, damping: 28 },
    },
    exit: {
        x: "100%",
        transition: { type: "spring", stiffness: 260, damping: 28 },
    },
};

const linkVariants: Variants = {
    hidden: {
        x: 30,
        opacity: 0,
    },
    visible: (i: number = 0) => ({
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.12 + i * 0.08,
            duration: 0.45,
            ease: "easeOut",
        },
    }),
};

export default function HeaderHero() {
    const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [current, setCurrent] = useState(0);
    const [showCursorButton, setShowCursorButton] = useState(false);
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const resetAuto = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % TOTAL);
        }, 5500);
    }, []);

    useEffect(() => {
        resetAuto();

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetAuto]);

    const activeSlide = slides[current];

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();

        setCursorPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const handleContactPopupOpen = () => {
        setIsSidebarOpen(false);
        setIsContactPopupOpen(true);
    };

    return (
        <div className="bg-[#e5e5e5]">
            <section className="relative flex min-h-screen flex-col overflow-hidden bg-[#e5e5e5] font-heading">
                {/* Header */}
                <div className="relative w-full  bg-[#e5e5e5]/90 font-sans ">
                    <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-16 ">
                        <a href="/" className="flex items-center gap-3">
                            <img
                                src={logo.src}
                                alt="Purple Phase"
                                className="h-16 w-auto object-contain sm:h-24 2xl:h-28"
                            />
                        </a>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsSidebarOpen(true)}
                                className="flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 lg:h-16 lg:w-16"
                            >
                                <IoMenuOutline className="text-4xl text-gray-800 lg:text-5xl" />
                            </button>

                            <button
                                onClick={handleContactPopupOpen}
                                className="group flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 lg:h-16 lg:w-16"
                            >
                                <BsArrowUpRightCircleFill className="text-4xl text-primary transition-transform duration-300 group-hover:rotate-45 lg:text-5xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Hero Section */}
                <div
                    // className="relative z-10 flex flex-1 w-full cursor-none items-center px-6 pb-10 md:px-12 lg:px-16 2xl:pb-16"
                    className={`relative z-10 flex flex-1 w-full items-center px-6 pb-10 md:px-12 lg:px-16 2xl:pb-16 ${isHovered ? "cursor-auto" : "cursor-none"
                        }`}
                    onMouseEnter={() => setShowCursorButton(true)}
                    onMouseLeave={() => setShowCursorButton(false)}
                    onMouseMove={handleMouseMove}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] xl:gap-12"
                        >
                            <div
                                className="relative text-4xl leading-tight sm:text-5xl md:text-6xl 2xl:text-7xl"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div className="flex min-h-[160px] items-center">
                                    {!isHovered ? (
                                        <h1 className="whitespace-pre-line font-body lg:whitespace-nowrap">
                                            {activeSlide.eyebrow}
                                        </h1>
                                    ) : (
                                        <h1 className="font-heading font-bold uppercase text-primary lg:whitespace-nowrap">
                                            {activeSlide.headline}
                                        </h1>
                                    )}
                                </div>
                            </div>

                            <div className="relative flex justify-center lg:justify-end">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="
      relative aspect-square overflow-hidden rounded-full
      w-[230px]
      sm:w-[250px]
      md:w-[300px]
      lg:w-[350px]
      xl:w-[400px]
      2xl:w-[520px]
    "
                                >
                                    <video
                                        key={activeSlide.video}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="h-full w-full rounded-full object-cover mix-blend-multiply"
                                    >
                                        <source src={activeSlide.video} type="video/mp4" />
                                    </video>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Let's Build Cursor */}
                    <AnimatePresence>
                        {showCursorButton && !isHovered && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: cursorPos.x - 48,
                                    y: cursorPos.y - 48,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 160,
                                    damping: 22,
                                    mass: 0.45,
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                                className="pointer-events-none absolute left-0 top-0 z-[55] hidden h-24 w-24 items-center justify-center rounded-full bg-secondary text-center text-[11px] font-bold uppercase tracking-wide text-white shadow-2xl lg:flex"
                            >
                                LET&apos;S BUILD!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                            className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
                        />

                        <motion.aside
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-end border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">

                                <button
                                    onClick={() => setIsSidebarOpen(false)}
                                    className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
                                >
                                    <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
                                <nav className="flex flex-col gap-3">
                                    {navItems.map((item, i) => (
                                        <motion.a
                                            key={item.label}
                                            custom={i}
                                            variants={linkVariants}
                                            initial="hidden"
                                            animate="visible"
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
                                        >
                                            {/* <span className="text-2xl font-semibold leading-none text-gray-900">
                                                {item.label}
                                            </span> */}

                                            <span className="text-2xl font-medium tracking-wide text-gray-900">
                                                {item.label}
                                            </span>

                                            {/* <BsArrowUpRightCircleFill className="text-xl text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" /> */}
                                        </motion.a>
                                    ))}
                                </nav>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
            <ContactPopup
                isOpen={isContactPopupOpen}
                onClose={() => setIsContactPopupOpen(false)}
            />
        </div>
    );
}


const servicesLeft = [
    "Branding & Advertising",
    "Logo & Stationary",
    "Packing Design",
    "Ambaience Design",
    "Creative Content Writing",
];

const servicesRight = [
    "Brochure Design",
    "Event & Exabition Stall Design",
    "Social Media Marketing",
    "Video Marketing",
    "Website Design",
];


function ContactPopup({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
                    />

                    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4 py-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 30 }}
                            transition={{ type: "spring", stiffness: 240, damping: 28 }}
                            className="
      max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10
      [&::-webkit-scrollbar]:hidden
      [-ms-overflow-style:none]
      [scrollbar-width:none]
    "
                        >
                            <div className=" flex items-center justify-between">
                                <div>
                                    <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.12em] text-gray-900 md:text-4xl">
                                        Contact <span className="text-primary">Us</span>
                                    </h2>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
                                >
                                    <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
                                </button>
                            </div>



                            <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-6 md:p-8">
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <input
                                            type="text"
                                            placeholder="Name*"
                                            className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email*"
                                            className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <input
                                            type="text"
                                            placeholder="Contact No*"
                                            className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Company*"
                                            className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <h3 className="font-heading mb-5 text-[18px] font-semibold text-gray-800">
                                            Interested Services
                                        </h3>

                                        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
                                            {[servicesLeft, servicesRight].map((list, idx) => (
                                                <div key={idx} className="space-y-4">
                                                    {list.map((service) => (
                                                        <label
                                                            key={service}
                                                            className="group flex cursor-pointer items-center gap-3 text-[15px] text-gray-600 transition-colors hover:text-primary"
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                className="h-5 w-5 rounded border-gray-300 accent-primary"
                                                            />
                                                            <span>{service}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your project..."
                                        className="w-full border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
                                    />

                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-12 items-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
                                                8227
                                            </div>

                                            <button
                                                type="button"
                                                className="flex h-12 w-12 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
                                            >
                                                <RotateCcw size={20} />
                                            </button>
                                        </div>

                                        <input
                                            type="text"
                                            placeholder="Enter Captcha"
                                            className="h-12 w-full max-w-50 border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="bg-primary px-12 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}