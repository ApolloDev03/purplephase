// "use client";

// import { motion ,AnimatePresence} from "framer-motion";
// import { useEffect, useState, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import { apiUrl } from "../config";
// import { LuMoveUpRight } from "react-icons/lu";
// import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
// import ContactPopup from "../components/ContactPopup";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// type SectionImage = {
//   id: number;
//   mu_title: string;
//   image_1: string;
//   image_2: string;
//   image_3: string;
//   description: string;
//   sort_order: number;
// };

// type MoreImage = {
//   id: number;
//   image_url: string;
//   sort_order: number;
// };

// type CaseStudyItem = {
//   id: number;
//   slug: string;
//   title: string;
//   description: string;
//   hero_image: string;
//   meta_title: string;
//   meta_keyword: string;
//   meta_description: string;
//   head: string;
//   body: string;
//   award_title: string;
//   award_image: string;
//   previous_slug: string | null;
//   next_slug: string | null;
//   section_images: SectionImage[];
//   more_images: MoreImage[];
//   created_at: string;
// };

// function CaseStudyDetailContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const slug = searchParams.get("slug");
//   const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

//     const handleContactPopupOpen = () => {
//         setIsContactPopupOpen(true);
//     };

//   const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
// const [activeMoreImageIndex, setActiveMoreImageIndex] = useState<number | null>(null);
//   const fetchCaseStudyDetail = async () => {
//     if (!slug) {
//       setError("Case study slug not found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post(
//         `${apiUrl}/get_id_based_case_studay`,
//         { slug },
//         { headers: { Accept: "application/json" } }
//       );

//       if (res.data?.success && res.data?.data?.length > 0) {
//         setCaseStudy(res.data.data[0]);
//       } else {
//         setError(res.data?.message || "Case study not found.");
//       }
//     } catch (err) {
//       console.error("Case Study Detail API Error:", err);
//       setError("Something went wrong while loading case study detail.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCaseStudyDetail();
//   }, [slug]);
// useEffect(() => {
//   if (activeMoreImageIndex === null) return;

//   const moreImagesLength = caseStudy?.more_images?.length || 0;
//   if (moreImagesLength === 0) return;

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === "ArrowLeft") {
//       event.preventDefault();

//       setActiveMoreImageIndex((prev) => {
//         if (prev === null) return 0;
//         return prev === 0 ? moreImagesLength - 1 : prev - 1;
//       });
//     }

//     if (event.key === "ArrowRight") {
//       event.preventDefault();

//       setActiveMoreImageIndex((prev) => {
//         if (prev === null) return 0;
//         return prev === moreImagesLength - 1 ? 0 : prev + 1;
//       });
//     }

//     if (event.key === "Escape") {
//       event.preventDefault();
//       setActiveMoreImageIndex(null);
//     }
//   };

//   window.addEventListener("keydown", handleKeyDown);

//   return () => {
//     window.removeEventListener("keydown", handleKeyDown);
//   };
// }, [activeMoreImageIndex, caseStudy?.more_images?.length]);
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
//         <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (error || !caseStudy) {
//     return (
//       <main className="bg-[#f3f3f3] px-6 py-24 text-center font-sans text-red-500">
//         {error || "Case study not found."}
//       </main>
//     );
//   }

//   const sortedSections = [...(caseStudy.section_images || [])].sort(
//     (a, b) => a.sort_order - b.sort_order
//   );

//   const sortedMoreImages = [...(caseStudy.more_images || [])].sort(
//     (a, b) => a.sort_order - b.sort_order
//   );
//   const mobileMoreImageGroups: MoreImage[][] = [];

// for (let index = 0; index < sortedMoreImages.length; index += 4) {
//   mobileMoreImageGroups.push(sortedMoreImages.slice(index, index + 4));
// }
//   const moreImageRows: MoreImage[][] = [];

//   let moreStart = 0;
//   let rowNumber = 1;

//   while (moreStart < sortedMoreImages.length) {
//     const count = rowNumber % 2 === 1 ? 3 : 2;

//     moreImageRows.push(sortedMoreImages.slice(moreStart, moreStart + count));

//     moreStart += count;
//     rowNumber++;
//   }
//   const handleProjectChange = (projectSlug: string | null) => {
//   if (!projectSlug) return;

//   router.push(`/case-study-detail?slug=${projectSlug}`);

//   setTimeout(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, 100);
// };

// const openMoreImageSlider = (imageId: number) => {
//   const imageIndex = sortedMoreImages.findIndex((img) => img.id === imageId);
//   setActiveMoreImageIndex(imageIndex >= 0 ? imageIndex : 0);
// };

// const closeMoreImageSlider = () => {
//   setActiveMoreImageIndex(null);
// };

// const handlePrevMoreImage = () => {
//   if (!sortedMoreImages.length) return;

//   setActiveMoreImageIndex((prev) => {
//     if (prev === null) return 0;
//     return prev === 0 ? sortedMoreImages.length - 1 : prev - 1;
//   });
// };

// const handleNextMoreImage = () => {
//   if (!sortedMoreImages.length) return;

//   setActiveMoreImageIndex((prev) => {
//     if (prev === null) return 0;
//     return prev === sortedMoreImages.length - 1 ? 0 : prev + 1;
//   });
// };

// const activeMoreImage =
//   activeMoreImageIndex !== null ? sortedMoreImages[activeMoreImageIndex] : null;


//   return (
//     <>
//     <main className="py-[20px] lg:py-[30px] xl:py-16 bg-[#f6f6f6] font-sans text-[#242424] ">
//       {/* HERO */}
//       <section className="mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
//         <motion.div
//           key={caseStudy.id}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className=""
//         >
//           <div className="overflow-hidden rounded-[14px] ">
//             <div className="relative">
//               <img
//                 src={caseStudy.hero_image}
//                 alt={caseStudy.title}
//                 className="h-auto w-full object-cover"
//               />

//               {caseStudy.award_image && (
//                 <div className="absolute bottom-5 right-5 hidden text-center sm:block">
//                   <img
//                     src={caseStudy.award_image}
//                     alt={caseStudy.award_title}
//                     className="mx-auto w-24 md:w-36 lg:w-44"
//                   />

//                   {caseStudy.award_title && (
//                     <p className="mt-2 text-xs text-white md:text-sm">
//                       {caseStudy.award_title}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="py-4 lg:py-6 ">
//               <h1 className="text-[25px] font-semibold text-[#242424] md:text-4xl">
//                 {caseStudy.title}
//               </h1>

//               {caseStudy.description && (
//                 <p className="mt-3  leading-[1.7] text-[#666] md:text-base">
//                   {caseStudy.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </section>



//       {/* SECTION IMAGES */}
//       {sortedSections.length > 0 && (
//         <section className=" mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
//           {sortedSections.map((section, index) => {
//             const images = [
//               section.image_1,
//               section.image_2,
//               section.image_3,
//             ].filter(Boolean);

//             return (
//               <motion.div
//                 key={section.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="w-full my-1 lg:my-4"
//               >
//                 <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
//                   {images.map((img, i) => (
//                     <div
//                       key={i}
//                       className="h-[328px] w-full overflow-hidden rounded-[12px] bg-white"
//                     >
//                       <img
//                         src={img}
//                         alt={`${section.mu_title || "Case study image"} ${i + 1}`}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 {(section.mu_title || section.description) && (
//                   <p className="mt-5 ">
//                     <span className=" font-bold text-[#242424]">
//                       {section.mu_title}</span> : <span className="text-[#424242]">{section.description}</span>


//                   </p>
//                 )}
//               </motion.div>
//             );
//           })}
//         </section>
//       )}

//       {/* MORE IMAGES */}
//       {/* {sortedMoreImages.length > 0 && (
//         <section className="py-5 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
//           {moreImageRows.map((row, rowIndex) => (
//             <div
//               key={rowIndex}
//               className={
//                 row.length === 3
//                   ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                   : "grid grid-cols-1 gap-5 sm:grid-cols-2"
//               }
//             >
//               {row.map((img, index) => (
//                 <motion.div
//                   key={img.id}
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.45, delay: index * 0.06 }}
//                   className="overflow-hidden rounded-[12px] bg-white"
//                 >
//                   <img
//                     src={img.image_url}
//                     alt={`More image ${rowIndex + 1}-${index + 1}`}
//                     className="block h-[372px] w-full object-cover"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           ))}
//         </section>
//       )} */}
//       {/* MORE IMAGES */}
// {/* MORE IMAGES */}
// {sortedMoreImages.length > 0 && (
//   <section className="mx-auto w-full max-w-full px-4 py-5 lg:px-6 xl:px-10 2xl:px-32">

//     {/* Mobile: 4 images, space, next 4 images */}
//     <div className="lg:hidden">
//       {mobileMoreImageGroups.map((group, groupIndex) => (
//         <div
//           key={`mobile-group-${groupIndex}`}
//           className="
//             mb-10 grid grid-cols-2 gap-3
//             last:mb-0
//           "
//         >
//           {group.map((img, imageIndex) => (
//             <motion.button
//               type="button"
//               key={img.id}
//               initial={{ opacity: 0, y: 22 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.15 }}
//               transition={{
//                 duration: 0.45,
//                 delay: imageIndex * 0.07,
//               }}
//               onClick={() => openMoreImageSlider(img.id)}
//               className="
//                 group aspect-[1/0.70] w-full
//                 overflow-hidden rounded-[12px]
//                 bg-white
//               "
//             >
//               <img
//                 src={img.image_url}
//                 alt={`More image ${groupIndex * 4 + imageIndex + 1}`}
//                 className="
//                   block h-full w-full object-cover
//                   transition-transform duration-700
//                   group-hover:scale-105
//                 "
//               />
//             </motion.button>
//           ))}
//         </div>
//       ))}
//     </div>

//     {/* Desktop: Existing layout unchanged */}
//     <div className="hidden lg:block">
//       {moreImageRows.map((row, rowIndex) => {
//         const isThreeGrid = row.length === 3;

//         return (
//           <div
//             key={`desktop-row-${rowIndex}`}
//             className={`mb-5 grid gap-5 ${
//               isThreeGrid ? "grid-cols-3" : "grid-cols-2"
//             }`}
//           >
//             {row.map((img, index) => (
//               <motion.div
//                 key={img.id}
//                 initial={{ opacity: 0, y: 25 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.45,
//                   delay: index * 0.06,
//                 }}
//                 onClick={() => openMoreImageSlider(img.id)}
//                 className={`group cursor-pointer overflow-hidden rounded-[12px] bg-white ${
//                   isThreeGrid ? "lg:aspect-[536/335]" : "aspect-[815/509]"
//                 }`}
//               >
//                 <img
//                   src={img.image_url}
//                   alt={`More image ${rowIndex + 1}-${index + 1}`}
//                   className="
//                     block h-full w-full object-cover
//                     transition-transform duration-700
//                     group-hover:scale-105
//                   "
//                 />
//               </motion.div>
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   </section>
// )}
// {/* PREV NEXT */}
// {/* PREVIOUS / EXPLORE / NEXT */}
// <section className="mx-auto w-full max-w-full px-4 py-6 lg:px-6 xl:px-10 lg:py-10 2xl:px-32">
//   <div
//     className="
//       grid grid-cols-[46px_minmax(0,1fr)_46px]
//       items-center gap-3

//       lg:flex lg:justify-between lg:gap-5 lg:pt-5
//     "
//   >
//     {/* Previous */}
//     <button
//       type="button"
//       onClick={() => handleProjectChange(caseStudy.previous_slug)}
//       disabled={!caseStudy.previous_slug}
//       aria-label="Previous Project"
//       className={`
//         flex h-11 w-11 items-center justify-center
//         rounded-full border
//         transition-all duration-300

//         lg:h-auto lg:w-auto lg:gap-2
//         lg:rounded-none lg:border-0
//         lg:text-base lg:font-medium

//         ${
//           caseStudy.previous_slug
//             ? `
//               cursor-pointer
//               border-[#A62666]/25
//               bg-white text-[#A62666]
//               shadow-sm
//               hover:border-[#A62666]
//               hover:bg-[#A62666]
//               hover:text-white

//               lg:bg-transparent
//               lg:text-[#666]
//               lg:shadow-none
//               lg:hover:bg-transparent
//               lg:hover:text-[#A62666]
//             `
//             : `
//               cursor-not-allowed
//               border-gray-200
//               bg-gray-100
//               text-gray-300

//               lg:bg-transparent
//             `
//         }
//       `}
//     >
//       <FaAnglesLeft className="text-[15px] lg:text-[13px]" />

//       <span className="hidden lg:inline">
//         Previous Project
//       </span>
//     </button>

//     {/* Explore More */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: 0.25 }}
//       className="flex min-w-0 justify-center"
//     >
//       <button
//         type="button"
//         onClick={() => router.push("/case-study")}
//         className="
//           motion-shine group
//           inline-flex max-w-full items-center justify-center
//           gap-2 whitespace-nowrap rounded-full
//           bg-primary px-4 py-3
//           text-[13px] font-bold text-white
//           shadow-lg shadow-primary/20
//           transition-all duration-300

//           hover:-translate-y-1
//           hover:bg-[#7a1f50]
//           hover:shadow-xl
//           hover:shadow-primary/30

//           sm:px-6 sm:text-[15px]
//           lg:gap-3 lg:text-[20px]
//           2xl:text-[24px]
//         "
//       >
//         Explore More

//         <span
//           className="
//             flex h-4 w-4 items-center justify-center
//             transition-transform duration-300
//             group-hover:translate-x-1
//             group-hover:-translate-y-1
//             lg:h-5 lg:w-5
//           "
//         >
//           <LuMoveUpRight className="h-full w-full" />
//         </span>
//       </button>
//     </motion.div>

//     {/* Next */}
//     <button
//       type="button"
//       onClick={() => handleProjectChange(caseStudy.next_slug)}
//       disabled={!caseStudy.next_slug}
//       aria-label="Next Project"
//       className={`
//         flex h-11 w-11 items-center justify-center
//         rounded-full border
//         transition-all duration-300

//         lg:h-auto lg:w-auto lg:gap-2
//         lg:rounded-none lg:border-0
//         lg:text-base lg:font-medium

//         ${
//           caseStudy.next_slug
//             ? `
//               cursor-pointer
//               border-[#A62666]/25
//               bg-white text-[#A62666]
//               shadow-sm
//               hover:border-[#A62666]
//               hover:bg-[#A62666]
//               hover:text-white

//               lg:bg-transparent
//               lg:text-[#666]
//               lg:shadow-none
//               lg:hover:bg-transparent
//               lg:hover:text-[#A62666]
//             `
//             : `
//               cursor-not-allowed
//               border-gray-200
//               bg-gray-100
//               text-gray-300

//               lg:bg-transparent
//             `
//         }
//       `}
//     >
//       <span className="hidden lg:inline">
//         Next Project
//       </span>

//       <FaAnglesRight className="text-[15px] lg:text-[13px]" />
//     </button>
//   </div>
// </section>
//       {/* CTA */}
//           <section className="bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
//           <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 lg:py-16 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
//             <h1  className="uppercase text-[28px] xl:text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
//             WANT TO EXPAND YOUR BUSINESS ?
//             </h1>

//       <motion.div
//                                                                 initial={{ opacity: 0, y: 20 }}
//                                                                 whileInView={{ opacity: 1, y: 0 }}
//                                                                 viewport={{ once: true }}
//                                                                 transition={{ duration: 0.5, delay: 0.45 }}
//                                                                   onClick={()=>handleContactPopupOpen()}
//                                                                 className="mt-5   justify-center!"
//                                                             >
//                                                               <div className="animated-btn-wrapper rounded-full! ">
            
//                                                                 <button className="animated-btn  inline-flex items-center gap-3 rounded-full! bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px]! font-bold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
//                                                                      Lets Discuss
                                        
//                                                                     <span className="flex w-4 h-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                                                                         <LuMoveUpRight className="w-4 h-4 lg:h-5 lg:w-5" />
//                                                                     </span>
//                                                                 </button>
//                                                               </div>
//                                                             </motion.div>
         
//           </div>
//         </section>
//         </main>
//       <ContactPopup
//                           isOpen={isContactPopupOpen}
//                           onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
//                       />
//                       <AnimatePresence>
//   {activeMoreImage && (
//     <motion.div
//       className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={closeMoreImageSlider}
//     >
//       <button
//         type="button"
//         onClick={closeMoreImageSlider}
//         className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white"
//       >
//         <X size={24} />
//       </button>

//       {sortedMoreImages.length > 1 && (
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             handlePrevMoreImage();
//           }}
//           className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:left-10"
//         >
//           <ChevronLeft size={30} />
//         </button>
//       )}

//       <motion.div
//         key={activeMoreImage.id}
//         className="relative flex max-h-[82vh] w-full max-w-[1100px] items-center justify-center"
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.96 }}
//         transition={{ duration: 0.25 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={activeMoreImage.image_url}
//           alt="Gallery preview"
//           className="max-h-[82vh] w-auto max-w-full rounded-[10px] object-contain"
//         />
//       </motion.div>

//       {sortedMoreImages.length > 1 && (
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleNextMoreImage();
//           }}
//           className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:right-10"
//         >
//           <ChevronRight size={30} />
//         </button>
//       )}
//     </motion.div>
//   )}
// </AnimatePresence>
//     </>
//   );
// }

// export default function CaseStudyDetailPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
//           <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
//         </div>
//       }
//     >
//       <CaseStudyDetailContent />
//     </Suspense>
//   );
// }

// "use client";

// import { AnimatePresence, motion } from "framer-motion";
// import { Suspense, useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import axios from "axios";
// import { apiUrl } from "../config";
// import { LuMoveUpRight } from "react-icons/lu";
// import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
// import ContactPopup from "../components/ContactPopup";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";
// import {
//   {applyCaseStudySeo},
// } from "./seo";
// type SectionImage = {
//   id: number;
//   mu_title: string | null;
//   image_1: string | null;
//   image_2: string | null;
//   image_3: string | null;
//   description: string | null;
//   sort_order: number;
// };

// type MoreImage = {
//   id: number;
//   image_url: string;
//   sort_order: number;
// };

// type CaseStudyItem = {
//   id: number;
//   slug: string;
//   title: string;
//   description: string | null;
//   hero_image: string;
//   meta_title: string | null;
//   meta_keyword: string | null;
//   meta_description: string | null;
//   head: string | null;
//   body: string | null;
//   award_title: string | null;
//   award_image: string | null;
//   previous_slug: string | null;
//   next_slug: string | null;
//   section_images: SectionImage[];
//   more_images: MoreImage[];
//   created_at: string;
// };


// type MetaAttribute = "name" | "property";

// function findMetaTag(
//   attribute: MetaAttribute,
//   key: string,
// ): HTMLMetaElement | null {
//   return (
//     Array.from(document.head.querySelectorAll<HTMLMetaElement>("meta")).find(
//       (meta) => meta.getAttribute(attribute) === key,
//     ) ?? null
//   );
// }

// function updateMetaTag(
//   attribute: MetaAttribute,
//   key: string,
//   content: string | null | undefined,
//   cleanupCallbacks: Array<() => void>,
// ): void {
//   const normalizedContent = content?.trim();

//   if (!normalizedContent) {
//     return;
//   }

//   const existingMeta = findMetaTag(attribute, key);

//   if (existingMeta) {
//     const previousContent = existingMeta.getAttribute("content");

//     existingMeta.setAttribute("content", normalizedContent);

//     cleanupCallbacks.push(() => {
//       if (previousContent === null) {
//         existingMeta.removeAttribute("content");
//       } else {
//         existingMeta.setAttribute("content", previousContent);
//       }
//     });

//     return;
//   }

//   const meta = document.createElement("meta");

//   meta.setAttribute(attribute, key);
//   meta.setAttribute("content", normalizedContent);
//   meta.setAttribute("data-case-study-seo", "true");

//   document.head.appendChild(meta);

//   cleanupCallbacks.push(() => {
//     meta.remove();
//   });
// }

// function updateCanonicalTag(
//   href: string | null | undefined,
//   cleanupCallbacks: Array<() => void>,
// ): void {
//   const normalizedHref = href?.trim();

//   if (!normalizedHref) {
//     return;
//   }

//   const existingCanonical =
//     document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

//   if (existingCanonical) {
//     const previousHref = existingCanonical.getAttribute("href");

//     existingCanonical.setAttribute("href", normalizedHref);

//     cleanupCallbacks.push(() => {
//       if (previousHref === null) {
//         existingCanonical.removeAttribute("href");
//       } else {
//         existingCanonical.setAttribute("href", previousHref);
//       }
//     });

//     return;
//   }

//   const canonical = document.createElement("link");

//   canonical.setAttribute("rel", "canonical");
//   canonical.setAttribute("href", normalizedHref);
//   canonical.setAttribute("data-case-study-seo", "true");

//   document.head.appendChild(canonical);

//   cleanupCallbacks.push(() => {
//     canonical.remove();
//   });
// }

// function appendApiJsonLdSchemas(
//   head: string | null,
//   body: string | null,
//   cleanupCallbacks: Array<() => void>,
// ): void {
//   const sources = [head, body].filter(
//     (source): source is string => Boolean(source?.trim()),
//   );

//   const schemaPattern =
//     /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;

//   sources.forEach((source) => {
//     schemaPattern.lastIndex = 0;

//     let match: RegExpExecArray | null;

//     while ((match = schemaPattern.exec(source)) !== null) {
//       const schemaText = match[1]?.trim();

//       if (!schemaText) {
//         continue;
//       }

//       try {
//         const parsedSchema: unknown = JSON.parse(schemaText);
//         const script = document.createElement("script");

//         script.type = "application/ld+json";
//         script.setAttribute("data-case-study-seo", "true");
//         script.textContent = JSON.stringify(parsedSchema).replace(
//           /</g,
//           "\\u003c",
//         );

//         document.head.appendChild(script);

//         cleanupCallbacks.push(() => {
//           script.remove();
//         });
//       } catch (schemaError) {
//         console.error("Invalid API JSON-LD schema:", schemaError);
//       }
//     }
//   });
// }

// function applyCaseStudySeo(caseStudy: CaseStudyItem): () => void {
//   const cleanupCallbacks: Array<() => void> = [];
//   const previousTitle = document.title;

//   const title =
//     caseStudy.meta_title?.trim() ||
//     caseStudy.title?.trim() ||
//     "Case Study | Purple Phase";

//   const description =
//     caseStudy.meta_description?.trim() ||
//     caseStudy.description?.trim() ||
//     "";

//   document.title = title;

//   cleanupCallbacks.push(() => {
//     document.title = previousTitle;
//   });

//   updateMetaTag(
//     "name",
//     "description",
//     description,
//     cleanupCallbacks,
//   );

//   updateMetaTag(
//     "name",
//     "keywords",
//     caseStudy.meta_keyword,
//     cleanupCallbacks,
//   );

//   let canonicalUrl = `https://purplephase.in/case-study-detail?slug=${encodeURIComponent(
//     caseStudy.slug,
//   )}`;

//   if (caseStudy.head?.trim()) {
//     const parser = new DOMParser();
//     const parsedDocument = parser.parseFromString(
//       caseStudy.head,
//       "text/html",
//     );

//     parsedDocument.querySelectorAll("meta").forEach((apiMeta) => {
//       const property = apiMeta.getAttribute("property")?.trim();
//       const name = apiMeta.getAttribute("name")?.trim();
//       const content = apiMeta.getAttribute("content")?.trim();

//       if (property && content) {
//         updateMetaTag(
//           "property",
//           property,
//           content,
//           cleanupCallbacks,
//         );
//       }

//       if (name && content) {
//         updateMetaTag(
//           "name",
//           name,
//           content,
//           cleanupCallbacks,
//         );
//       }
//     });

//     const apiCanonical =
//       parsedDocument.querySelector<HTMLLinkElement>('link[rel="canonical"]');

//     const apiCanonicalHref = apiCanonical?.getAttribute("href")?.trim();

//     if (apiCanonicalHref) {
//       canonicalUrl = apiCanonicalHref;
//     }
//   }

//   updateCanonicalTag(
//     canonicalUrl,
//     cleanupCallbacks,
//   );

//   appendApiJsonLdSchemas(
//     caseStudy.head,
//     caseStudy.body,
//     cleanupCallbacks,
//   );

//   return () => {
//     [...cleanupCallbacks].reverse().forEach((cleanup) => {
//       cleanup();
//     });
//   };
// }

// function CaseStudyDetailContent() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const slug = searchParams.get("slug");
//   const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

//     const handleContactPopupOpen = () => {
//         setIsContactPopupOpen(true);
//     };

//   const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
// const [activeMoreImageIndex, setActiveMoreImageIndex] = useState<number | null>(null);
//   const fetchCaseStudyDetail = async () => {
//     if (!slug) {
//       setError("Case study slug not found.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");
//       setCaseStudy(null);
//       setActiveMoreImageIndex(null);

//       const res = await axios.post(
//         `${apiUrl}/get_id_based_case_studay`,
//         { slug },
//         { headers: { Accept: "application/json" } }
//       );

//       if (res.data?.success && res.data?.data?.length > 0) {
//         setCaseStudy(res.data.data[0]);
//       } else {
//         setError(res.data?.message || "Case study not found.");
//       }
//     } catch (err) {
//       console.error("Case Study Detail API Error:", err);
//       setError("Something went wrong while loading case study detail.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     void fetchCaseStudyDetail();
//   }, [slug]);

//   useEffect(() => {
//     if (!caseStudy) {
//       return;
//     }

//     return applyCaseStudySeo(caseStudy);
//   }, [caseStudy]);

// useEffect(() => {
//   if (activeMoreImageIndex === null) return;

//   const moreImagesLength = caseStudy?.more_images?.length || 0;
//   if (moreImagesLength === 0) return;

//   const handleKeyDown = (event: KeyboardEvent) => {
//     if (event.key === "ArrowLeft") {
//       event.preventDefault();

//       setActiveMoreImageIndex((prev) => {
//         if (prev === null) return 0;
//         return prev === 0 ? moreImagesLength - 1 : prev - 1;
//       });
//     }

//     if (event.key === "ArrowRight") {
//       event.preventDefault();

//       setActiveMoreImageIndex((prev) => {
//         if (prev === null) return 0;
//         return prev === moreImagesLength - 1 ? 0 : prev + 1;
//       });
//     }

//     if (event.key === "Escape") {
//       event.preventDefault();
//       setActiveMoreImageIndex(null);
//     }
//   };

//   window.addEventListener("keydown", handleKeyDown);

//   return () => {
//     window.removeEventListener("keydown", handleKeyDown);
//   };
// }, [activeMoreImageIndex, caseStudy?.more_images?.length]);
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
//         <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (error || !caseStudy) {
//     return (
//       <main className="bg-[#f3f3f3] px-6 py-24 text-center font-sans text-red-500">
//         {error || "Case study not found."}
//       </main>
//     );
//   }

//   const sortedSections = [...(caseStudy.section_images || [])].sort(
//     (a, b) => a.sort_order - b.sort_order
//   );

//   const sortedMoreImages = [...(caseStudy.more_images || [])].sort(
//     (a, b) => a.sort_order - b.sort_order
//   );
//   const mobileMoreImageGroups: MoreImage[][] = [];

// for (let index = 0; index < sortedMoreImages.length; index += 4) {
//   mobileMoreImageGroups.push(sortedMoreImages.slice(index, index + 4));
// }
//   const moreImageRows: MoreImage[][] = [];

//   let moreStart = 0;
//   let rowNumber = 1;

//   while (moreStart < sortedMoreImages.length) {
//     const count = rowNumber % 2 === 1 ? 3 : 2;

//     moreImageRows.push(sortedMoreImages.slice(moreStart, moreStart + count));

//     moreStart += count;
//     rowNumber++;
//   }
//   const handleProjectChange = (projectSlug: string | null) => {
//   if (!projectSlug) return;

//   router.push(`/case-study-detail?slug=${encodeURIComponent(projectSlug)}`);

//   setTimeout(() => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   }, 100);
// };

// const openMoreImageSlider = (imageId: number) => {
//   const imageIndex = sortedMoreImages.findIndex((img) => img.id === imageId);
//   setActiveMoreImageIndex(imageIndex >= 0 ? imageIndex : 0);
// };

// const closeMoreImageSlider = () => {
//   setActiveMoreImageIndex(null);
// };

// const handlePrevMoreImage = () => {
//   if (!sortedMoreImages.length) return;

//   setActiveMoreImageIndex((prev) => {
//     if (prev === null) return 0;
//     return prev === 0 ? sortedMoreImages.length - 1 : prev - 1;
//   });
// };

// const handleNextMoreImage = () => {
//   if (!sortedMoreImages.length) return;

//   setActiveMoreImageIndex((prev) => {
//     if (prev === null) return 0;
//     return prev === sortedMoreImages.length - 1 ? 0 : prev + 1;
//   });
// };

// const activeMoreImage =
//   activeMoreImageIndex !== null ? sortedMoreImages[activeMoreImageIndex] : null;


//   return (
//     <>
//     <main className="py-[20px] lg:py-[30px] xl:py-16 bg-[#f6f6f6] font-sans text-[#242424] ">
//       {/* HERO */}
//       <section className="mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
//         <motion.div
//           key={caseStudy.id}
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className=""
//         >
//           <div className="overflow-hidden rounded-[14px] ">
//             <div className="relative">
//               <img
//                 src={caseStudy.hero_image}
//                 alt={caseStudy.title}
//                 className="h-auto w-full object-cover"
//               />

//               {caseStudy.award_image && (
//                 <div className="absolute bottom-5 right-5 hidden text-center sm:block">
//                   <img
//                     src={caseStudy.award_image}
//                     alt={caseStudy.award_title || caseStudy.title}
//                     className="mx-auto w-24 md:w-36 lg:w-44"
//                   />

//                   {caseStudy.award_title && (
//                     <p className="mt-2 text-xs text-white md:text-sm">
//                       {caseStudy.award_title}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>

//             <div className="py-4 lg:py-6 ">
//               <h1 className="text-[25px] font-semibold text-[#242424] md:text-4xl">
//                 {caseStudy.title}
//               </h1>

//               {caseStudy.description && (
//                 <p className="mt-3  leading-[1.7] text-[#666] md:text-base">
//                   {caseStudy.description}
//                 </p>
//               )}
//             </div>
//           </div>
//         </motion.div>
//       </section>



//       {/* SECTION IMAGES */}
//       {sortedSections.length > 0 && (
//         <section className=" mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
//           {sortedSections.map((section, index) => {
//             const images = [
//               section.image_1,
//               section.image_2,
//               section.image_3,
//             ].filter((image): image is string => Boolean(image));

//             return (
//               <motion.div
//                 key={section.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.2 }}
//                 transition={{ duration: 0.5, delay: index * 0.1 }}
//                 className="w-full my-1 lg:my-4"
//               >
//                 <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
//                   {images.map((img, i) => (
//                     <div
//                       key={i}
//                       className="h-[328px] w-full overflow-hidden rounded-[12px] bg-white"
//                     >
//                       <img
//                         src={img}
//                         alt={`${section.mu_title || "Case study image"} ${i + 1}`}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 {(section.mu_title || section.description) && (
//                   <p className="mt-5 ">
//                     <span className=" font-bold text-[#242424]">
//                       {section.mu_title}</span> : <span className="text-[#424242]">{section.description}</span>


//                   </p>
//                 )}
//               </motion.div>
//             );
//           })}
//         </section>
//       )}

//       {/* MORE IMAGES */}
//       {/* {sortedMoreImages.length > 0 && (
//         <section className="py-5 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
//           {moreImageRows.map((row, rowIndex) => (
//             <div
//               key={rowIndex}
//               className={
//                 row.length === 3
//                   ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
//                   : "grid grid-cols-1 gap-5 sm:grid-cols-2"
//               }
//             >
//               {row.map((img, index) => (
//                 <motion.div
//                   key={img.id}
//                   initial={{ opacity: 0, y: 25 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   viewport={{ once: true }}
//                   transition={{ duration: 0.45, delay: index * 0.06 }}
//                   className="overflow-hidden rounded-[12px] bg-white"
//                 >
//                   <img
//                     src={img.image_url}
//                     alt={`More image ${rowIndex + 1}-${index + 1}`}
//                     className="block h-[372px] w-full object-cover"
//                   />
//                 </motion.div>
//               ))}
//             </div>
//           ))}
//         </section>
//       )} */}
//       {/* MORE IMAGES */}
// {/* MORE IMAGES */}
// {sortedMoreImages.length > 0 && (
//   <section className="mx-auto w-full max-w-full px-4 py-5 lg:px-6 xl:px-10 2xl:px-32">

//     {/* Mobile: 4 images, space, next 4 images */}
//     <div className="lg:hidden">
//       {mobileMoreImageGroups.map((group, groupIndex) => (
//         <div
//           key={`mobile-group-${groupIndex}`}
//           className="
//             mb-10 grid grid-cols-2 gap-3
//             last:mb-0
//           "
//         >
//           {group.map((img, imageIndex) => (
//             <motion.button
//               type="button"
//               key={img.id}
//               initial={{ opacity: 0, y: 22 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.15 }}
//               transition={{
//                 duration: 0.45,
//                 delay: imageIndex * 0.07,
//               }}
//               onClick={() => openMoreImageSlider(img.id)}
//               className="
//                 group aspect-[1/0.70] w-full
//                 overflow-hidden rounded-[12px]
//                 bg-white
//               "
//             >
//               <img
//                 src={img.image_url}
//                 alt={`More image ${groupIndex * 4 + imageIndex + 1}`}
//                 className="
//                   block h-full w-full object-cover
//                   transition-transform duration-700
//                   group-hover:scale-105
//                 "
//               />
//             </motion.button>
//           ))}
//         </div>
//       ))}
//     </div>

//     {/* Desktop: Existing layout unchanged */}
//     <div className="hidden lg:block">
//       {moreImageRows.map((row, rowIndex) => {
//         const isThreeGrid = row.length === 3;

//         return (
//           <div
//             key={`desktop-row-${rowIndex}`}
//             className={`mb-5 grid gap-5 ${
//               isThreeGrid ? "grid-cols-3" : "grid-cols-2"
//             }`}
//           >
//             {row.map((img, index) => (
//               <motion.div
//                 key={img.id}
//                 initial={{ opacity: 0, y: 25 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{
//                   duration: 0.45,
//                   delay: index * 0.06,
//                 }}
//                 onClick={() => openMoreImageSlider(img.id)}
//                 className={`group cursor-pointer overflow-hidden rounded-[12px] bg-white ${
//                   isThreeGrid ? "lg:aspect-[536/335]" : "aspect-[815/509]"
//                 }`}
//               >
//                 <img
//                   src={img.image_url}
//                   alt={`More image ${rowIndex + 1}-${index + 1}`}
//                   className="
//                     block h-full w-full object-cover
//                     transition-transform duration-700
//                     group-hover:scale-105
//                   "
//                 />
//               </motion.div>
//             ))}
//           </div>
//         );
//       })}
//     </div>
//   </section>
// )}
// {/* PREV NEXT */}
// {/* PREVIOUS / EXPLORE / NEXT */}
// <section className="mx-auto w-full max-w-full px-4 py-6 lg:px-6 xl:px-10 lg:py-10 2xl:px-32">
//   <div
//     className="
//       grid grid-cols-[46px_minmax(0,1fr)_46px]
//       items-center gap-3

//       lg:flex lg:justify-between lg:gap-5 lg:pt-5
//     "
//   >
//     {/* Previous */}
//     <button
//       type="button"
//       onClick={() => handleProjectChange(caseStudy.previous_slug)}
//       disabled={!caseStudy.previous_slug}
//       aria-label="Previous Project"
//       className={`
//         flex h-11 w-11 items-center justify-center
//         rounded-full border
//         transition-all duration-300

//         lg:h-auto lg:w-auto lg:gap-2
//         lg:rounded-none lg:border-0
//         lg:text-base lg:font-medium

//         ${
//           caseStudy.previous_slug
//             ? `
//               cursor-pointer
//               border-[#A62666]/25
//               bg-white text-[#A62666]
//               shadow-sm
//               hover:border-[#A62666]
//               hover:bg-[#A62666]
//               hover:text-white

//               lg:bg-transparent
//               lg:text-[#666]
//               lg:shadow-none
//               lg:hover:bg-transparent
//               lg:hover:text-[#A62666]
//             `
//             : `
//               cursor-not-allowed
//               border-gray-200
//               bg-gray-100
//               text-gray-300

//               lg:bg-transparent
//             `
//         }
//       `}
//     >
//       <FaAnglesLeft className="text-[15px] lg:text-[13px]" />

//       <span className="hidden lg:inline">
//         Previous Project
//       </span>
//     </button>

//     {/* Explore More */}
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.5, delay: 0.25 }}
//       className="flex min-w-0 justify-center"
//     >
//       <button
//         type="button"
//         onClick={() => router.push("/case-study")}
//         className="
//           motion-shine group
//           inline-flex max-w-full items-center justify-center
//           gap-2 whitespace-nowrap rounded-full
//           bg-primary px-4 py-3
//           text-[13px] font-bold text-white
//           shadow-lg shadow-primary/20
//           transition-all duration-300

//           hover:-translate-y-1
//           hover:bg-[#7a1f50]
//           hover:shadow-xl
//           hover:shadow-primary/30

//           sm:px-6 sm:text-[15px]
//           lg:gap-3 lg:text-[20px]
//           2xl:text-[24px]
//         "
//       >
//         Explore More

//         <span
//           className="
//             flex h-4 w-4 items-center justify-center
//             transition-transform duration-300
//             group-hover:translate-x-1
//             group-hover:-translate-y-1
//             lg:h-5 lg:w-5
//           "
//         >
//           <LuMoveUpRight className="h-full w-full" />
//         </span>
//       </button>
//     </motion.div>

//     {/* Next */}
//     <button
//       type="button"
//       onClick={() => handleProjectChange(caseStudy.next_slug)}
//       disabled={!caseStudy.next_slug}
//       aria-label="Next Project"
//       className={`
//         flex h-11 w-11 items-center justify-center
//         rounded-full border
//         transition-all duration-300

//         lg:h-auto lg:w-auto lg:gap-2
//         lg:rounded-none lg:border-0
//         lg:text-base lg:font-medium

//         ${
//           caseStudy.next_slug
//             ? `
//               cursor-pointer
//               border-[#A62666]/25
//               bg-white text-[#A62666]
//               shadow-sm
//               hover:border-[#A62666]
//               hover:bg-[#A62666]
//               hover:text-white

//               lg:bg-transparent
//               lg:text-[#666]
//               lg:shadow-none
//               lg:hover:bg-transparent
//               lg:hover:text-[#A62666]
//             `
//             : `
//               cursor-not-allowed
//               border-gray-200
//               bg-gray-100
//               text-gray-300

//               lg:bg-transparent
//             `
//         }
//       `}
//     >
//       <span className="hidden lg:inline">
//         Next Project
//       </span>

//       <FaAnglesRight className="text-[15px] lg:text-[13px]" />
//     </button>
//   </div>
// </section>
//       {/* CTA */}
//           <section className="bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
//           <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 lg:py-16 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
//             <h1  className="uppercase text-[28px] xl:text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
//             WANT TO EXPAND YOUR BUSINESS ?
//             </h1>

//       <motion.div
//                                                                 initial={{ opacity: 0, y: 20 }}
//                                                                 whileInView={{ opacity: 1, y: 0 }}
//                                                                 viewport={{ once: true }}
//                                                                 transition={{ duration: 0.5, delay: 0.45 }}
//                                                                   onClick={()=>handleContactPopupOpen()}
//                                                                 className="mt-5   justify-center!"
//                                                             >
//                                                               <div className="animated-btn-wrapper rounded-full! ">
            
//                                                                 <button className="animated-btn  inline-flex items-center gap-3 rounded-full! bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px]! font-bold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
//                                                                      Lets Discuss
                                        
//                                                                     <span className="flex w-4 h-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                                                                         <LuMoveUpRight className="w-4 h-4 lg:h-5 lg:w-5" />
//                                                                     </span>
//                                                                 </button>
//                                                               </div>
//                                                             </motion.div>
         
//           </div>
//         </section>
//         </main>
//       <ContactPopup
//                           isOpen={isContactPopupOpen}
//                           onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
//                       />
//                       <AnimatePresence>
//   {activeMoreImage && (
//     <motion.div
//       className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={closeMoreImageSlider}
//     >
//       <button
//         type="button"
//         onClick={closeMoreImageSlider}
//         className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white"
//       >
//         <X size={24} />
//       </button>

//       {sortedMoreImages.length > 1 && (
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             handlePrevMoreImage();
//           }}
//           className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:left-10"
//         >
//           <ChevronLeft size={30} />
//         </button>
//       )}

//       <motion.div
//         key={activeMoreImage.id}
//         className="relative flex max-h-[82vh] w-full max-w-[1100px] items-center justify-center"
//         initial={{ opacity: 0, scale: 0.96 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.96 }}
//         transition={{ duration: 0.25 }}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <img
//           src={activeMoreImage.image_url}
//           alt="Gallery preview"
//           className="max-h-[82vh] w-auto max-w-full rounded-[10px] object-contain"
//         />
//       </motion.div>

//       {sortedMoreImages.length > 1 && (
//         <button
//           type="button"
//           onClick={(e) => {
//             e.stopPropagation();
//             handleNextMoreImage();
//           }}
//           className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:right-10"
//         >
//           <ChevronRight size={30} />
//         </button>
//       )}
//     </motion.div>
//   )}
// </AnimatePresence>
//     </>
//   );
// }

// export default function CaseStudyDetailPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
//           <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
//         </div>
//       }
//     >
//       <CaseStudyDetailContent />
//     </Suspense>
//   );
// }



"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";
import { LuMoveUpRight } from "react-icons/lu";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import ContactPopup from "../components/ContactPopup";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { applyCaseStudySeo } from "./seo";
type SectionImage = {
  id: number;
  mu_title: string | null;
  image_1: string | null;
  image_2: string | null;
  image_3: string | null;
  description: string | null;
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
  description: string | null;
  hero_image: string;
  meta_title: string | null;
  meta_keyword: string | null;
  meta_description: string | null;
  head: string | null;
  body: string | null;
  award_title: string | null;
  award_image: string | null;
  previous_slug: string | null;
  next_slug: string | null;
  section_images: SectionImage[];
  more_images: MoreImage[];
  created_at: string;
};


function CaseStudyDetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = searchParams.get("slug");
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };

  const [caseStudy, setCaseStudy] = useState<CaseStudyItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
const [activeMoreImageIndex, setActiveMoreImageIndex] = useState<number | null>(null);
  const fetchCaseStudyDetail = async () => {
    if (!slug) {
      setError("Case study slug not found.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setCaseStudy(null);
      setActiveMoreImageIndex(null);

      const res = await axios.post(
        `${apiUrl}/get_id_based_case_studay`,
        { slug },
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
    void fetchCaseStudyDetail();
  }, [slug]);

  useEffect(() => {
    if (!caseStudy) {
      return;
    }

    return applyCaseStudySeo(caseStudy);
  }, [caseStudy]);

useEffect(() => {
  if (activeMoreImageIndex === null) return;

  const moreImagesLength = caseStudy?.more_images?.length || 0;
  if (moreImagesLength === 0) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setActiveMoreImageIndex((prev) => {
        if (prev === null) return 0;
        return prev === 0 ? moreImagesLength - 1 : prev - 1;
      });
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setActiveMoreImageIndex((prev) => {
        if (prev === null) return 0;
        return prev === moreImagesLength - 1 ? 0 : prev + 1;
      });
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setActiveMoreImageIndex(null);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [activeMoreImageIndex, caseStudy?.more_images?.length]);
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
        <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !caseStudy) {
    return (
      <main className="bg-[#f3f3f3] px-6 py-24 text-center font-sans text-red-500">
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
  const mobileMoreImageGroups: MoreImage[][] = [];

for (let index = 0; index < sortedMoreImages.length; index += 4) {
  mobileMoreImageGroups.push(sortedMoreImages.slice(index, index + 4));
}
  const moreImageRows: MoreImage[][] = [];

  let moreStart = 0;
  let rowNumber = 1;

  while (moreStart < sortedMoreImages.length) {
    const count = rowNumber % 2 === 1 ? 3 : 2;

    moreImageRows.push(sortedMoreImages.slice(moreStart, moreStart + count));

    moreStart += count;
    rowNumber++;
  }
  const handleProjectChange = (projectSlug: string | null) => {
  if (!projectSlug) return;

  router.push(`/case-study-detail?slug=${encodeURIComponent(projectSlug)}`);

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, 100);
};

const openMoreImageSlider = (imageId: number) => {
  const imageIndex = sortedMoreImages.findIndex((img) => img.id === imageId);
  setActiveMoreImageIndex(imageIndex >= 0 ? imageIndex : 0);
};

const closeMoreImageSlider = () => {
  setActiveMoreImageIndex(null);
};

const handlePrevMoreImage = () => {
  if (!sortedMoreImages.length) return;

  setActiveMoreImageIndex((prev) => {
    if (prev === null) return 0;
    return prev === 0 ? sortedMoreImages.length - 1 : prev - 1;
  });
};

const handleNextMoreImage = () => {
  if (!sortedMoreImages.length) return;

  setActiveMoreImageIndex((prev) => {
    if (prev === null) return 0;
    return prev === sortedMoreImages.length - 1 ? 0 : prev + 1;
  });
};

const activeMoreImage =
  activeMoreImageIndex !== null ? sortedMoreImages[activeMoreImageIndex] : null;


  return (
    <>
    <main className="py-[20px] lg:py-[30px] xl:py-16 bg-[#f6f6f6] font-sans text-[#242424] ">
      {/* HERO */}
      <section className="mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
        <motion.div
          key={caseStudy.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=""
        >
          <div className="overflow-hidden rounded-[14px] ">
            <div className="relative">
              <img
                src={caseStudy.hero_image}
                alt={caseStudy.title}
                className="h-auto w-full object-cover"
              />

              {caseStudy.award_image && (
                <div className="absolute bottom-5 right-5 hidden text-center sm:block">
                  <img
                    src={caseStudy.award_image}
                    alt={caseStudy.award_title || caseStudy.title}
                    className="mx-auto w-24 md:w-36 lg:w-44"
                  />

                  {caseStudy.award_title && (
                    <p className="mt-2 text-xs text-white md:text-sm">
                      {caseStudy.award_title}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="py-4 lg:py-6 ">
              <h1 className="text-[25px] font-semibold text-[#242424] md:text-4xl">
                {caseStudy.title}
              </h1>

              {caseStudy.description && (
                <p className="mt-3  leading-[1.7] text-[#666] md:text-base">
                  {caseStudy.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </section>



      {/* SECTION IMAGES */}
      {sortedSections.length > 0 && (
        <section className=" mx-auto w-full max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
          {sortedSections.map((section, index) => {
            const images = [
              section.image_1,
              section.image_2,
              section.image_3,
            ].filter((image): image is string => Boolean(image));

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full my-1 lg:my-4"
              >
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className="h-[328px] w-full overflow-hidden rounded-[12px] bg-white"
                    >
                      <img
                        src={img}
                        alt={`${section.mu_title || "Case study image"} ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                {(section.mu_title || section.description) && (
                  <p className="mt-5 ">
                    <span className=" font-bold text-[#242424]">
                      {section.mu_title}</span> : <span className="text-[#424242]">{section.description}</span>


                  </p>
                )}
              </motion.div>
            );
          })}
        </section>
      )}

      {/* MORE IMAGES */}
      {/* {sortedMoreImages.length > 0 && (
        <section className="py-5 mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          {moreImageRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={
                row.length === 3
                  ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid grid-cols-1 gap-5 sm:grid-cols-2"
              }
            >
              {row.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="overflow-hidden rounded-[12px] bg-white"
                >
                  <img
                    src={img.image_url}
                    alt={`More image ${rowIndex + 1}-${index + 1}`}
                    className="block h-[372px] w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          ))}
        </section>
      )} */}
      {/* MORE IMAGES */}
{/* MORE IMAGES */}
{sortedMoreImages.length > 0 && (
  <section className="mx-auto w-full max-w-full px-4 py-5 lg:px-6 xl:px-10 2xl:px-32">

    {/* Mobile: 4 images, space, next 4 images */}
    <div className="lg:hidden">
      {mobileMoreImageGroups.map((group, groupIndex) => (
        <div
          key={`mobile-group-${groupIndex}`}
          className="
            mb-10 grid grid-cols-2 gap-3
            last:mb-0
          "
        >
          {group.map((img, imageIndex) => (
            <motion.button
              type="button"
              key={img.id}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.45,
                delay: imageIndex * 0.07,
              }}
              onClick={() => openMoreImageSlider(img.id)}
              className="
                group aspect-[1/0.70] w-full
                overflow-hidden rounded-[12px]
                bg-white
              "
            >
              <img
                src={img.image_url}
                alt={`More image ${groupIndex * 4 + imageIndex + 1}`}
                className="
                  block h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-105
                "
              />
            </motion.button>
          ))}
        </div>
      ))}
    </div>

    {/* Desktop: Existing layout unchanged */}
    <div className="hidden lg:block">
      {moreImageRows.map((row, rowIndex) => {
        const isThreeGrid = row.length === 3;

        return (
          <div
            key={`desktop-row-${rowIndex}`}
            className={`mb-5 grid gap-5 ${
              isThreeGrid ? "grid-cols-3" : "grid-cols-2"
            }`}
          >
            {row.map((img, index) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.06,
                }}
                onClick={() => openMoreImageSlider(img.id)}
                className={`group cursor-pointer overflow-hidden rounded-[12px] bg-white ${
                  isThreeGrid ? "lg:aspect-[536/335]" : "aspect-[815/509]"
                }`}
              >
                <img
                  src={img.image_url}
                  alt={`More image ${rowIndex + 1}-${index + 1}`}
                  className="
                    block h-full w-full object-cover
                    transition-transform duration-700
                    group-hover:scale-105
                  "
                />
              </motion.div>
            ))}
          </div>
        );
      })}
    </div>
  </section>
)}
{/* PREV NEXT */}
{/* PREVIOUS / EXPLORE / NEXT */}
<section className="mx-auto w-full max-w-full px-4 py-6 lg:px-6 xl:px-10 lg:py-10 2xl:px-32">
  <div
    className="
      grid grid-cols-[46px_minmax(0,1fr)_46px]
      items-center gap-3

      lg:flex lg:justify-between lg:gap-5 lg:pt-5
    "
  >
    {/* Previous */}
    <button
      type="button"
      onClick={() => handleProjectChange(caseStudy.previous_slug)}
      disabled={!caseStudy.previous_slug}
      aria-label="Previous Project"
      className={`
        flex h-11 w-11 items-center justify-center
        rounded-full border
        transition-all duration-300

        lg:h-auto lg:w-auto lg:gap-2
        lg:rounded-none lg:border-0
        lg:text-base lg:font-medium

        ${
          caseStudy.previous_slug
            ? `
              cursor-pointer
              border-[#A62666]/25
              bg-white text-[#A62666]
              shadow-sm
              hover:border-[#A62666]
              hover:bg-[#A62666]
              hover:text-white

              lg:bg-transparent
              lg:text-[#666]
              lg:shadow-none
              lg:hover:bg-transparent
              lg:hover:text-[#A62666]
            `
            : `
              cursor-not-allowed
              border-gray-200
              bg-gray-100
              text-gray-300

              lg:bg-transparent
            `
        }
      `}
    >
      <FaAnglesLeft className="text-[15px] lg:text-[13px]" />

      <span className="hidden lg:inline">
        Previous Project
      </span>
    </button>

    {/* Explore More */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="flex min-w-0 justify-center"
    >
      <button
        type="button"
        onClick={() => router.push("/case-study")}
        className="
          motion-shine group
          inline-flex max-w-full items-center justify-center
          gap-2 whitespace-nowrap rounded-full
          bg-primary px-4 py-3
          text-[13px] font-bold text-white
          shadow-lg shadow-primary/20
          transition-all duration-300

          hover:-translate-y-1
          hover:bg-[#7a1f50]
          hover:shadow-xl
          hover:shadow-primary/30

          sm:px-6 sm:text-[15px]
          lg:gap-3 lg:text-[20px]
          2xl:text-[24px]
        "
      >
        Explore More

        <span
          className="
            flex h-4 w-4 items-center justify-center
            transition-transform duration-300
            group-hover:translate-x-1
            group-hover:-translate-y-1
            lg:h-5 lg:w-5
          "
        >
          <LuMoveUpRight className="h-full w-full" />
        </span>
      </button>
    </motion.div>

    {/* Next */}
    <button
      type="button"
      onClick={() => handleProjectChange(caseStudy.next_slug)}
      disabled={!caseStudy.next_slug}
      aria-label="Next Project"
      className={`
        flex h-11 w-11 items-center justify-center
        rounded-full border
        transition-all duration-300

        lg:h-auto lg:w-auto lg:gap-2
        lg:rounded-none lg:border-0
        lg:text-base lg:font-medium

        ${
          caseStudy.next_slug
            ? `
              cursor-pointer
              border-[#A62666]/25
              bg-white text-[#A62666]
              shadow-sm
              hover:border-[#A62666]
              hover:bg-[#A62666]
              hover:text-white

              lg:bg-transparent
              lg:text-[#666]
              lg:shadow-none
              lg:hover:bg-transparent
              lg:hover:text-[#A62666]
            `
            : `
              cursor-not-allowed
              border-gray-200
              bg-gray-100
              text-gray-300

              lg:bg-transparent
            `
        }
      `}
    >
      <span className="hidden lg:inline">
        Next Project
      </span>

      <FaAnglesRight className="text-[15px] lg:text-[13px]" />
    </button>
  </div>
</section>
      {/* CTA */}
          <section className="bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
          <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 lg:py-16 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
            <h1  className="uppercase text-[28px] xl:text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
            WANT TO EXPAND YOUR BUSINESS ?
            </h1>

      <motion.div
                                                                initial={{ opacity: 0, y: 20 }}
                                                                whileInView={{ opacity: 1, y: 0 }}
                                                                viewport={{ once: true }}
                                                                transition={{ duration: 0.5, delay: 0.45 }}
                                                                  onClick={()=>handleContactPopupOpen()}
                                                                className="mt-5   justify-center!"
                                                            >
                                                              <div className="animated-btn-wrapper rounded-full! ">
            
                                                                <button className="animated-btn  inline-flex items-center gap-3 rounded-full! bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px]! font-bold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                                                     Lets Discuss
                                        
                                                                    <span className="flex w-4 h-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                                        <LuMoveUpRight className="w-4 h-4 lg:h-5 lg:w-5" />
                                                                    </span>
                                                                </button>
                                                              </div>
                                                            </motion.div>
         
          </div>
        </section>
        </main>
      <ContactPopup
                          isOpen={isContactPopupOpen}
                          onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
                      />
                      <AnimatePresence>
  {activeMoreImage && (
    <motion.div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/85 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeMoreImageSlider}
    >
      <button
        type="button"
        onClick={closeMoreImageSlider}
        className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white"
      >
        <X size={24} />
      </button>

      {sortedMoreImages.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handlePrevMoreImage();
          }}
          className="absolute left-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:left-10"
        >
          <ChevronLeft size={30} />
        </button>
      )}

      <motion.div
        key={activeMoreImage.id}
        className="relative flex max-h-[82vh] w-full max-w-[1100px] items-center justify-center"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={activeMoreImage.image_url}
          alt="Gallery preview"
          className="max-h-[82vh] w-auto max-w-full rounded-[10px] object-contain"
        />
      </motion.div>

      {sortedMoreImages.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleNextMoreImage();
          }}
          className="absolute right-4 top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition hover:bg-primary hover:text-white md:right-10"
        >
          <ChevronRight size={30} />
        </button>
      )}
    </motion.div>
  )}
</AnimatePresence>
    </>
  );
}

export default function CaseStudyDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#f3f3f3]">
          <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
        </div>
      }
    >
      <CaseStudyDetailContent />
    </Suspense>
  );
}