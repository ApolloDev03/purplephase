"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { apiUrl } from "../config";

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
  const [filter, setFilter] = useState("Show All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
        setPortfolioList(res.data?.data || []);
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

      <section className="w-full bg-[#f3f3f3] px-4 py-16 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-full">
          <div className="mb-10">
            <h2 className="mb-4 text-[34px] font-medium text-[#666666] md:text-[42px]">
              Portfolio
            </h2>

            <p className="max-w-3xl text-sm leading-7 text-[#6d6d6d] md:text-[15px]">
              A brand is ultimately shaped by customer experience. We create
              work to make that experience purposeful, powerful and memorable.
            </p>

            {!loading && portfolioList.length > 0 && (
              <div className="my-10 flex flex-wrap justify-center gap-2">
                {categories.map((cat) => {
                  const isActive = filter === cat;

                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilterChange(cat)}
                      className={`rounded-md px-4 py-2 font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-[#A61D67] text-white"
                          : "bg-[#6B6B6B] text-white hover:bg-[#595959]"
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

            {!loading && !error && visibleProjects.length > 0 && (
              <motion.div
                layout
                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {visibleProjects.map((project, index) => {
                    const sortedImages = getSortedImages(project);
                    const firstImage = sortedImages?.[0]?.image_url || "";

                    return (
                      <motion.div
                        key={project.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="group relative cursor-pointer"
                        onClick={() => openGallery(project)}
                      >
                        <div className="relative  overflow-hidden rounded-[24px] bg-white shadow-[0_10px_35px_-18px_rgba(0,0,0,0.35)] transition-all duration-500 hover:-translate-y-1 group-hover:shadow-[0_24px_60px_-25px_rgba(166,29,103,0.45)] h-[259px]">
                          <div className="flex h-full w-full items-center justify-center">
                            {firstImage ? (
                              <img
                                src={firstImage}
                                alt={project.title}
                                className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>

                          <div className="absolute left-5 top-5 z-10">
                            <span className="rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
                              {project?.service?.service_name || "Portfolio"}
                            </span>
                          </div>

                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-primary via-primary/65 to-transparent p-6 opacity-0 transition-all duration-500 group-hover:opacity-100">
                            <p className="mb-2 translate-y-4 text-xs font-semibold uppercase tracking-widest text-white/80 transition-transform duration-500 group-hover:translate-y-0">
                              {project?.service?.service_name || "Portfolio"}
                            </p>

                            <h3 className="translate-y-4 text-xl font-bold leading-tight text-white transition-transform duration-500 group-hover:translate-y-0 sm:text-2xl">
                              {project.title}
                            </h3>

                            {project.description && (
                              <p className="mt-2 line-clamp-2 translate-y-4 text-sm leading-6 text-white/90 transition-transform duration-500 group-hover:translate-y-0">
                                {project.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}

            {!loading && visibleCount < filteredProjects.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleViewMore}
                  className="rounded-md bg-[#A61D67] px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#8d1557]"
                >
                  View More
                </button>
              </div>
            )}
          </div>
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
              <button
                onClick={closeGallery}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#A61D67] text-white shadow-lg transition hover:bg-[#8d1557]"
              >
                <X size={20} />
              </button>

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

              {/* {selectedImages.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {selectedImages.map((img, index) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIndex(index)}
                      className={`h-16 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 bg-[#f3f3f3] transition md:h-20 md:w-28 ${activeImageIndex === index
                        ? "border-[#A61D67]"
                        : "border-transparent"
                        }`}
                    >
                      <img
                        src={img.image_url}
                        alt={`${selectedProject.title} ${index + 1}`}
                        className="h-full w-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )} */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
