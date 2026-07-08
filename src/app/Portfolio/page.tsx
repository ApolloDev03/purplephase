"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "../config";
import Image from "next/image";
import { LuMoveUpRight } from "react-icons/lu";
import ContactPopup from "../components/ContactPopup";

type PortfolioImage = {
  id: number;
  image_url: string;
  sort_order: number;
};

type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  service: {
    id: number;
    service_name: string;
  } | null;
  images: PortfolioImage[];
  created_at: string;
};

const ITEMS_PER_PAGE = 6;

export default function PortfolioSection() {
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const [filter, setFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };
  const fetchPortfolioList = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        `${apiUrl}/portfolioList`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

    if (res.data?.success) {
  const data = res.data?.data || [];

  setPortfolioList(data);

  const firstService = data.find(
    (item: PortfolioItem) => item?.service?.service_name
  )?.service?.service_name;

  setFilter(firstService || "Show All");
} else {
  setError(res.data?.message || "Failed to fetch portfolio list.");
}
      console.log(res.data.data[0]);
    } catch (err) {
      console.error("Portfolio API Error:", err);
      setError("Something went wrong while loading portfolio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioList();
  }, []);

const categories = useMemo(() => {
  const serviceNames = portfolioList
    .map((item) => item?.service?.service_name)
    .filter(Boolean) as string[];

  return [...new Set(serviceNames), "Show All"];
}, [portfolioList]);

  const filteredProjects = useMemo(() => {
    if (filter === "Show All") return portfolioList;

    return portfolioList.filter(
      (project) => project?.service?.service_name === filter
    );
  }, [filter, portfolioList]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const getSortedImages = (project: PortfolioItem | null) => {
    return [...(project?.images || [])].sort(
      (a, b) => a.sort_order - b.sort_order
    );
  };

  const openGallery = (project: PortfolioItem) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedProject(null);
    setActiveImageIndex(0);
  };

  const selectedImages = getSortedImages(selectedProject);

  const handlePrevImage = () => {
    if (!selectedImages.length) return;

    setActiveImageIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!selectedImages.length) return;

    setActiveImageIndex((prev) =>
      prev === selectedImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>

      <section className="w-full bg-[#f3f3f3] ">
        <div className="mx-auto max-w-full py-16 px-4 2xl:py-[85px] sm:px-6 lg:px-20 2xl:px-32">
          <div className="mb-10">
                    <h2 className=" leading-[130%]

text-primary ">
               Ideas That Moved People <br/> Work That Moved Markets
              </h2>

            <p className=" leading-7 mt-5 text-[#6d6d6d] ">
             A brand is ultimately what a customer experiences.
             <br/>
The work in this portfolio aims to make that experience purposeful,powerful, and impossible to forget.
            </p>

{!loading && portfolioList.length > 0 && (
  <div className="my-16 flex flex-wrap justify-center gap-3">
    {categories.map((cat) => {
      const isActive = filter === cat;
      const isShowAll = cat === "Show All";

      return (
        <button
          key={cat}
          onClick={() => handleFilterChange(cat)}
          className={`rounded-lg p-3 text-[14px] font-semibold text-white transition-all duration-300 ${
            isActive && !isShowAll
              ? "bg-primary"
              : isShowAll
              ? "bg-secondary hover:bg-primary"
              : "bg-[#6B6B6B] hover:bg-primary"
          }`}
        >
          {cat}
        </button>
      );
    })}
  </div>
)}

            {loading && (
              <div className="grid justify-center gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="aspect-[4/5] animate-pulse rounded-[2rem] bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)]"
                  />
                ))}
              </div>
            )}

            {!loading && error && (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-red-500">{error}</p>
              </div>
            )}

            {!loading && !error && visibleProjects.length === 0 && (
              <div className="rounded-xl bg-white p-8 text-center shadow-sm">
                <p className="text-sm font-medium text-[#666666]">
                  No portfolio found.
                </p>
              </div>
            )}
  {/* {!loading && !error && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((item) => {
              const firstImage = item.images?.[0]?.image_url;

              return (
                <div
  key={item.id}
  onClick={() => openGallery(item)}
  className="group relative cursor-pointer h-[360px] overflow-hidden rounded-xl bg-white shadow-sm"
>
  {firstImage && (
    <Image
      src={firstImage}
      alt={item.title}
      fill
      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
      className="object-cover transition-transform duration-500 group-hover:scale-105"
      priority
    />
  )}
  <div className="absolute left-5 top-5 z-10">
                            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
                              {item?.service?.service_name || "Portfolio"}
                            </span>
                          </div>
  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 py-5">
    <h4 className="text-lg  text-white">
      {item.title}
    </h4>
  </div>
</div>
              );
            })}
          </div>
        )} */}
            {!loading && !error && (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {visibleProjects.map((item, index) => {
      const firstImage = item.images?.[0]?.image_url;

      return (
        <div
          key={item.id}
          onClick={() => openGallery(item)}
          className="group relative h-[354px] w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
        >
          {firstImage ? (
            <div className="absolute inset-0 ">
              <div className="relative h-full w-full">
                <Image
                  src={firstImage}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={index === 0}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
              No Image
            </div>
          )}

          {/* Service Badge */}
          <div className="absolute left-4 top-4 z-10">
            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
              {item?.service?.service_name || "Portfolio"}
            </span>
          </div>

          {/* Bottom Title */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/55 to-transparent px-4 py-4">
            <p className="!text-white text-[16px] font-medium leading-[1.3]">
              {item.title}
            </p>
          </div>
        </div>
      );
    })}
  </div>
)}
            {!loading && visibleCount < filteredProjects.length && (
              <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.45 }}
                                                     onClick={handleViewMore}
                                                    className="mt-5 flex justify-center"
                                                >
                                                    <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                                        View More
                            
                                                        <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                            <LuMoveUpRight className="h-5 w-5" />
                                                        </span>
                                                    </button>
                                                </motion.div>
              
            )}
          </div>
        </div>
      </section>
  <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
          <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
            <h1   className="uppercase text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
              Need impactful branding solutions ?
            </h1>
   <motion.div
                                      initial={{ opacity: 0, y: 20 }}
                                      whileInView={{ opacity: 1, y: 0 }}
                                      viewport={{ once: true }}
                                      transition={{ duration: 0.5, delay: 0.45 }}
                                     onClick={()=>handleContactPopupOpen()}
                                      className="mt-10 flex justify-center lg:justify-start"
                                  >
                                      <button className="motion-shine group inline-flex items-center gap-4 rounded-full bg-[#720048] px-10 py-5 text-[15px] lg:text-[20px] xl:text-[32px]! font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                         Get A Quote
              
                                          <span className="flex h-8 w-8 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                              <LuMoveUpRight className="h-8 w-8" />
                                          </span>
                                      </button>
                                  </motion.div>
         
          </div>
        </section>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4  backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="relative w-full max-w-4xl  rounded-[24px] bg-white p-4 shadow-2xl md:p-6"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                onClick={closeGallery}
                className="absolute cursor-pointer right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#A61D67] text-white shadow-lg transition hover:bg-[#8d1557]"
              >
                <X size={20} />
              </span>

              <div className="mb-4 pr-12">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#A61D67]">
                  {selectedProject?.service?.service_name || "Portfolio"}
                </p>
                <h3 className="mt-1 text-xl font-bold text-[#626262] md:text-3xl">
                  {selectedProject.title}
                </h3>
              </div>

              <div className="relative flex h-[500px]  items-center justify-center overflow-hidden rounded-[18px] bg-[#f3f3f3] ">
                {selectedImages.length > 0 ? (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selectedImages[activeImageIndex]?.id}
                      src={selectedImages[activeImageIndex]?.image_url}
                      alt={selectedProject.title}
                      className="h-full w-full object-cover"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                ) : (
                  <p className="text-sm font-medium text-gray-400">No Image</p>
                )}

                {selectedImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#A61D67] shadow-lg transition hover:bg-[#A61D67] hover:text-white md:left-5 md:h-12 md:w-12"
                    >
                      <ChevronLeft size={24} />
                    </button>

                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[#A61D67] shadow-lg transition hover:bg-[#A61D67] hover:text-white md:right-5 md:h-12 md:w-12"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>

             
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
        <ContactPopup
                                  isOpen={isContactPopupOpen}
                                  onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
                              />
    </>
  );
}
