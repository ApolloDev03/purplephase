// "use client";

// import {  useState } from "react";
// import { AnimatePresence, motion, type Variants } from "framer-motion";
// import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
// import { BsArrowUpRightCircleFill } from "react-icons/bs";

// import logo from "../assets/ppc-combined-logo.png";
// import { useSidebar } from "./SidebarContext";

// import ContactPopup from "./ContactPopup";

// const navItems = [
//     { label: "Home", href: "/" },
//     { label: "About Us", href: "about-us" },
//     { label: "Case Studies", href: "CaseStudies" },
//     { label: "Portfolio", href: "Portfolio" },
//     { label: "Career", href: "career" },
//     { label: "Knowledge Corner", href: "KnowledgeCorner" },
//     { label: "Contact", href: "contact" },
// ];

// const sidebarVariants: Variants = {
//     hidden: {
//         x: "100%",
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
//     visible: {
//         x: 0,
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
//     exit: {
//         x: "100%",
//         transition: { type: "spring", stiffness: 260, damping: 28 },
//     },
// };

// const linkVariants: Variants = {
//     hidden: {
//         x: 30,
//         opacity: 0,
//     },
//     visible: (i: number = 0) => ({
//         x: 0,
//         opacity: 1,
//         transition: {
//             delay: 0.12 + i * 0.08,
//             duration: 0.45,
//             ease: "easeOut",
//         },
//     }),
// };


// export default function Header() {
//     const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
//     const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

//     const handleContactPopupOpen = () => {
//         setIsSidebarOpen(false);
//         setIsContactPopupOpen(true);
//     };

//     return (
//         <>
//             <div className="sticky top-0 z-99 w-full  bg-white font-sans backdrop-blur-md">
//                 <div className="mx-auto flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-20 2xl:px-32">
//                     <a href="/" className="flex items-center gap-3">
//                         <img
//                             src={logo.src}
//                             alt="Purple Phase"
//                             className="w-[198px] h-[95px] object-contain "
//                         />
//                     </a>

//                     <div className="flex items-center gap-3">
//                         <button
//                            type="button"
//                             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//                             className="flex cursor-pointer h-14 w-14 items-center justify-center rounded-full transition-all duration-300 lg:h-16 lg:w-16"
//                         >
//                             <IoMenuOutline className="text-4xl text-gray-800 lg:text-5xl" />
//                         </button>

//                         <button
//                             type="button"
//                             onClick={handleContactPopupOpen}
//                             className="group cursor-pointer flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300 lg:h-16 lg:w-16"
//                         >
//                             <BsArrowUpRightCircleFill className="text-4xl text-primary transition-transform duration-300 group-hover:rotate-45 lg:text-5xl" />
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Sidebar Menu */}
//             <AnimatePresence>
//                 {isSidebarOpen && (
//                     <>
//                         <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             exit={{ opacity: 0 }}
//                             onClick={() => setIsSidebarOpen(false)}
//                             className="fixed inset-0 z-[60] bg-black/55 backdrop-blur-sm"
//                         />

//                         <motion.aside
//                             variants={sidebarVariants}
//                             initial="hidden"
//                             animate="visible"
//                             exit="exit"
//                             className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl"
//                         >
//                             <div className="flex items-center justify-end border-b border-gray-100 px-5 py-5 sm:px-8 sm:py-6">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsSidebarOpen(false)}
//                                     className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
//                                 >
//                                     <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="flex-1 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10">
//                                 <nav className="flex flex-col gap-3">
//                                     {navItems.map((item, i) => (
//                                         <motion.a
//                                             key={item.label}
//                                             custom={i}
//                                             variants={linkVariants}
//                                             initial="hidden"
//                                             animate="visible"
//                                             href={item.href}
//                                             onClick={() => setIsSidebarOpen(false)}
//                                             className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-primary/20 hover:bg-primary/5"
//                                         >
//                                             <span className="text-2xl font-medium tracking-wide text-gray-900">
//                                                 {item.label}
//                                             </span>
//                                         </motion.a>
//                                     ))}
//                                 </nav>
//                             </div>
//                         </motion.aside>
//                     </>
//                 )}
//             </AnimatePresence>

//             <ContactPopup
//                 isOpen={isContactPopupOpen}
//                 onClose={() => setIsContactPopupOpen(false)}
//             />
//         </>
//     );
// }

"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { IoCloseOutline, IoMenuOutline } from "react-icons/io5";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

import logo from "../assets/ppc-combined-logo.png";
import { useSidebar } from "./SidebarContext";
import ContactPopup from "./ContactPopup";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Case Studies", href: "/CaseStudies" },
  { label: "Portfolio", href: "/Portfolio" },
  { label: "Career", href: "/career" },
  { label: "Knowledge Corner", href: "/KnowledgeCorner" },
  { label: "Contact", href: "/contact" },
];

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

export default function Header() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebar();
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

  const handleContactPopupOpen = () => {
    setIsSidebarOpen(false);
    setIsContactPopupOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-[99] w-full bg-[#f6f6f6] font-sans shadow-sm backdrop-blur-md">
        <div className=" flex w-full items-center justify-between mx-auto max-w-full py-2 lg:py-4 px-4 sm:px-6 lg:px-20 2xl:px-32">
          <a href="/" className="flex items-center">
            <img
              src={logo.src}
              alt="Purple Phase"
              className="
                h-[58px] w-[125px] object-contain
                sm:h-[70px] sm:w-[155px]
                md:h-[78px] md:w-[170px]
                lg:h-[90px] lg:w-[198px]
              "
            />
          </a>

          <div className="flex items-center gap-1.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label="Open menu"
              className="
                flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                transition-all duration-300
                sm:h-12 sm:w-12
                lg:h-16 lg:w-16
              "
            >
              <IoMenuOutline className="text-3xl text-gray-800 sm:text-4xl lg:text-5xl" />
            </button>

            <button
              type="button"
              onClick={handleContactPopupOpen}
              aria-label="Open contact popup"
              className="
                group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
                transition-all duration-300
                sm:h-12 sm:w-12
                lg:h-16 lg:w-16
              "
            >
              <BsArrowUpRightCircleFill className="text-3xl text-primary transition-transform duration-300 group-hover:rotate-45 sm:text-4xl lg:text-5xl" />
            </button>
          </div>
        </div>
      </header>

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
              className="
                fixed right-0 top-0 z-[70] flex h-full w-[88%] max-w-md flex-col
                overflow-hidden bg-white shadow-2xl
                sm:w-full
              "
            >
              <div className="flex items-center justify-end border-b border-gray-100 px-4 py-4 sm:px-8 sm:py-6">
                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                  className="
                    group rounded-full border border-gray-200 bg-gray-50 p-2
                    transition-all duration-300 hover:border-primary hover:bg-primary
                    sm:p-2.5
                  "
                >
                  <IoCloseOutline className="text-2xl text-gray-700 transition-colors duration-300 group-hover:text-white sm:text-3xl" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-10">
                <nav className="flex flex-col gap-2 sm:gap-3">
                  {navItems.map((item, i) => (
                    <motion.a
                      key={item.label}
                      custom={i}
                      variants={linkVariants}
                      initial="hidden"
                      animate="visible"
                      href={item.href}
                      onClick={() => setIsSidebarOpen(false)}
                      className="
                        group flex items-center justify-between rounded-xl border border-transparent
                        px-3 py-3 transition-all duration-300
                        hover:border-primary/20 hover:bg-primary/5
                        sm:rounded-2xl sm:px-4 sm:py-4
                      "
                    >
                      <span className="text-lg font-medium tracking-wide text-gray-900 sm:text-2xl">
                        {item.label}
                      </span>
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
    </>
  );
}