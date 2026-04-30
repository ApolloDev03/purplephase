"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import logo from "../assets/logo.png";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "#about-us" },
    { label: "Case Studies", href: "CaseStudies" },
    { label: "Portfolio", href: "Portfolio" },
    { label: "Contact", href: "contact" },
];

const sidebarVariants: Variants = {
    hidden: {
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 28,
        },
    },
    visible: {
        x: 0,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 28,
        },
    },
    exit: {
        x: "100%",
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 28,
        },
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

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="sticky font-sans top-0 z-50 w-full border-b border-white/20 bg-[#e5e5e5] backdrop-blur-xl">
                <div className="mx-auto flex max-w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-16">
                    <a href="/" className="flex items-center gap-3">
                        <img
                            src={logo.src}
                            alt="Purple Phase"
                            className="h-11 w-auto object-contain sm:h-12"
                        />
                    </a>

                    <button
                        onClick={() => setIsOpen(true)}
                        className="group inline-flex items-center gap-3 rounded-full border border-gray-200 px-4 py-2.5 shadow-sm transition-all duration-300 hover:border-primary hover:shadow-md"
                    >
                        <span className="flex items-center gap-2">
                            <IoMenuOutline className="text-2xl text-gray-800" />
                            <BsArrowUpRightCircleFill className="text-xl text-primary transition-transform duration-300 group-hover:rotate-45" />
                        </span>
                    </button>
                </div>
            </header>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-60 bg-black/55 backdrop-blur-sm"
                        />

                        <motion.aside
                            variants={sidebarVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="fixed right-0 top-0 z-70 flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">
                                <div className="flex items-center gap-3">
                                    <img
                                        src={logo.src}
                                        alt="Purple Phase"
                                        className="h-10 w-auto object-contain"
                                    />

                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
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
                                            onClick={() => setIsOpen(false)}
                                            className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
                                        >
                                            <div className="flex items-center gap-4">

                                                <span className="text-2xl font-semibold leading-none text-gray-900 ">
                                                    {item.label}
                                                </span>
                                            </div>

                                            <BsArrowUpRightCircleFill className="text-xl text-gray-300 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                                        </motion.a>
                                    ))}
                                </nav>
                            </div>


                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;