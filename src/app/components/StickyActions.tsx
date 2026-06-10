// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { ChevronUp } from "lucide-react";
// import { FaQuora, FaWhatsapp } from "react-icons/fa";
// import { useSidebar } from "./SidebarContext";

// export default function StickyActions() {
//     const [showTop, setShowTop] = useState(false);
//     const { isSidebarOpen } = useSidebar();

//     useEffect(() => {
//         const handleScroll = () => setShowTop(window.scrollY > 200);

//         window.addEventListener("scroll", handleScroll);
//         handleScroll();

//         return () => window.removeEventListener("scroll", handleScroll);
//     }, []);

//     const scrollToTop = () => {
//         window.scrollTo({ top: 0, behavior: "smooth" });
//     };

//     return (
//         <div
//             className={`
//         fixed bottom-6 z-[999] flex flex-col items-center gap-3
//         transition-all duration-500 ease-in-out
//         ${isSidebarOpen ? "right-[calc(min(28rem,100vw)+16px)]" : "right-4 md:right-6"}
//       `}
//         >
//             <Link
//                 href="https://wa.me/919999999999"
//                 target="_blank"
//                 aria-label="WhatsApp"
//                 className="group flex h-12 w-12 items-center justify-center rounded-md bg-[#25D366] shadow-lg transition hover:scale-105"
//             >
//                 <FaWhatsapp className="text-white text-[38px]" />
//             </Link>

//             <Link
//                 href="/faqs"
//                 aria-label="FAQs"
//                 className="group flex h-12 w-12 items-center justify-center rounded-md bg-[#F58220] shadow-lg transition hover:scale-105"
//             >
//                 <FaQuora className="text-white text-[34px]" />
//             </Link>

//             <button
//                 onClick={scrollToTop}
//                 aria-label="Go to top"
//                 className={`flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-lg transition duration-300 hover:scale-105 ${showTop ? "opacity-100 visible" : "opacity-100 visible"
//                     }`}
//             >
//                 <ChevronUp className="h-10 w-10 text-gray-600" strokeWidth={3} />
//             </button>
//         </div>
//     );
// }

"use client";

import { useEffect, useState } from "react";
import { ChevronUp, Search, X } from "lucide-react";
import { FaQuora, FaWhatsapp } from "react-icons/fa";
import { useSidebar } from "./SidebarContext";
import faqsicon from "../assets/faqs.png";

export default function StickyActions() {
    const [showTop, setShowTop] = useState(false);
    const [faqOpen, setFaqOpen] = useState(false);
    const [search, setSearch] = useState("");
    const { isSidebarOpen } = useSidebar();

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 200);

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const faqs = [
        {
            question: "How can I contact Purple Phase?",
            answer: "You can contact us by email at info.purplephase@gmail.com or call us at +91 99986 10505.",
        },
        {
            question: "What services do you provide?",
            answer: "We provide branding, graphic design, digital marketing, social media, website design, and creative communication services.",
        },
        {
            question: "Do you build websites?",
            answer: "Yes, we design and develop responsive websites for businesses, brands, and portfolios.",
        },
        {
            question: "How long does branding take?",
            answer: "Branding timelines depend on the project scope, but most branding projects take around 2 to 6 weeks.",
        },
        {
            question: "Do you provide SEO services?",
            answer: "Yes, we provide basic SEO setup, on-page SEO, keyword planning, and content support.",
        },
        {
            question: "How can I request a quote?",
            answer: "You can request a quote by contacting us through email, phone, WhatsApp, or the contact form.",
        },
    ];

    const filteredFaqs = faqs.filter((item) =>
        item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <div
                className={`
          fixed bottom-6 z-[999] flex flex-col items-center gap-3
          transition-all duration-500 ease-in-out
          ${isSidebarOpen ? "right-[calc(min(28rem,100vw)+16px)]" : "right-4 md:right-6"}
        `}
            >
                {/* WhatsApp */}
                <a
                    href="https://wa.me/+919327009400"
                    target="_blank"
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-[#25D366] shadow-lg hover:scale-105 transition"
                >
                    <FaWhatsapp className="text-white text-[38px]" />
                </a>

                {/* FAQ */}
                <button
                    onClick={() => setFaqOpen(true)}
                    className="flex h-12 w-12 items-center justify-center rounded-md bg-[#F58220] shadow-lg hover:scale-105 transition"
                >
                    <img
                        src={faqsicon.src}
                        alt="FAQ"
                        className="h-10 w-10 object-contain"
                    />
                </button>

                {/* Top */}
                <button
                    onClick={scrollToTop}
                    className={`flex h-12 w-12 items-center justify-center rounded-md bg-white shadow-lg hover:scale-105 transition ${showTop ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                >
                    <ChevronUp className="h-10 w-10 text-gray-600" strokeWidth={3} />
                </button>
            </div>

            {/* FAQ Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[1000] transition-transform duration-500 ${faqOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b">
                    <h2 className="text-xl font-bold">FAQs</h2>
                    <button onClick={() => setFaqOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Search */}
                <div className="p-4 border-b">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
                        <Search className="w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search FAQs..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full outline-none text-sm"
                        />
                    </div>
                </div>

                {/* FAQ List */}
                <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-130px)]">
                    {filteredFaqs.length > 0 ? (
                        filteredFaqs.map((faq, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-xl border hover:border-[#F58220] transition"
                            >
                                <h3 className="text-[16px] font-bold text-black mb-2">
                                    {faq.question}
                                </h3>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {faq.answer}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm">No FAQs found.</p>
                    )}
                </div>
            </div>
        </>
    );
}