"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type ServiceItem = {
  id: number;
  service_name: string;
  image: string | null;
};
const ITEMS_PER_PAGE = 6;

export default function PortfolioPage() {
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
const [serviceList, setServiceList] = useState<ServiceItem[]>([]);
const [activeServiceId, setActiveServiceId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(
    null
  );
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);
const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
const serviceDropdownRef = useRef<HTMLDivElement>(null);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };
    const fetchServiceList = async () => {
  try {
    const res = await axios.post(
      `${apiUrl}/serviceList`,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (res.data?.success) {
      setServiceList(res.data?.data || []);
    }
  } catch (err) {
    console.error("Service API Error:", err);
  }
};
const fetchPortfolioList = async () => {
  try {
    setLoading(true);
    setError("");

    const res = await axios.post(
      `${apiUrl}/portfolioList`,
      { service_id: null },
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
  } catch (err) {
    console.error("Portfolio API Error:", err);
    setError("Something went wrong while loading portfolio.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
      fetchServiceList();
    fetchPortfolioList();
  }, []);

 const handleFilterChange = (serviceId: number | null) => {
  setActiveServiceId(serviceId);
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


const filteredProjects = useMemo(() => {
  if (activeServiceId === null) {
    return portfolioList;
  }

  return portfolioList.filter(
    (project) => Number(project?.service?.id) === Number(activeServiceId)
  );
}, [portfolioList, activeServiceId]);

const visibleProjects = useMemo(() => {
  return filteredProjects.slice(0, visibleCount);
}, [filteredProjects, visibleCount]);
useEffect(() => {
  if (!selectedProject) return;

  const imagesLength = selectedProject?.images?.length || 0;
  if (imagesLength === 0) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();

      setActiveImageIndex((prev) =>
        prev === 0 ? imagesLength - 1 : prev - 1
      );
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();

      setActiveImageIndex((prev) =>
        prev === imagesLength - 1 ? 0 : prev + 1
      );
    }

    if (event.key === "Escape") {
      event.preventDefault();
      setSelectedProject(null);
      setActiveImageIndex(0);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [selectedProject]);

const selectedService = serviceList.find(
  (service) => service.id === activeServiceId
);

useEffect(() => {
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      serviceDropdownRef.current &&
      !serviceDropdownRef.current.contains(event.target as Node)
    ) {
      setIsServiceDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleOutsideClick);

  return () => {
    document.removeEventListener("mousedown", handleOutsideClick);
  };
}, []);
  return (
    <>

      <section className="w-full bg-[#f3f3f3] ">
        <div className="mx-auto max-w-full px-4 py-[20px] lg:py-[30px] 2xl:py-[85px] lg:px-6 xl:px-10 2xl:px-32">
          <div className="mb-10">
                    <h2 className=" leading-[130%]

text-primary ">
               Ideas That Moved People <br/> Work That Moved Markets
              </h2>

            <p className=" leading-7 mt-5 text-[#6d6d6d] ">
             A brand is ultimately what a customer experiences.
             <br/>
The work in this portfolio aims to make that experience purposeful, powerful, and impossible to forget.
            </p>

{/* {serviceList.length > 0 && (
  <div className=" my-7 lg:my-16 flex flex-wrap justify-start gap-3">


    {serviceList.map((service) => {
      const isActive = activeServiceId === service.id;

      return (
        <button
          key={service.id}
          onClick={() => handleFilterChange(service.id)}
          className={`rounded-lg p-3 text-[19px]! font-semibold! text-gray-600 hover:text-white transition-all duration-300 ${
            isActive ? "bg-primary text-white" : "bg-[#cccccc] hover:bg-primary"
          }`}
        >
          {service.service_name}
        </button>
      );
    })}
        <button
      onClick={() => handleFilterChange(null)}
      className={`rounded-lg p-3 text-[19px]! font-semibold! text-white transition-all duration-300 ${
        activeServiceId === null
          ? "bg-primary"
          : "bg-secondary hover:bg-primary"
      }`}
    >
      Show All
    </button>
  </div>
)} */}

{serviceList.length > 0 && (
  <div
    className="
      my-7 flex flex-nowrap justify-start gap-3
      overflow-x-auto pb-2 scroll-smooth
      snap-x snap-mandatory
      [scrollbar-width:none]
      [&::-webkit-scrollbar]:hidden

      lg:my-16 lg:flex-wrap lg:overflow-visible lg:pb-0 lg:snap-none
    "
  >
    {serviceList.map((service) => {
      const isActive = activeServiceId === service.id;

      return (
        <button
          type="button"
          key={service.id}
          onClick={() => handleFilterChange(service.id)}
          className={`
            shrink-0 snap-start whitespace-nowrap
            rounded-lg p-2 md:p-3
            text-[14px] lg:!text-[19px] !font-semibold
            text-gray-600 hover:text-white
            transition-all duration-300

            ${
              isActive
                ? "bg-primary text-white"
                : "bg-[#cccccc] hover:bg-primary"
            }
          `}
        >
          {service.service_name}
        </button>
      );
    })}

    <button
      type="button"
      onClick={() => handleFilterChange(null)}
      className={`
        shrink-0 snap-start whitespace-nowrap
        rounded-lg p-2 md:p-3
        text-[14px] lg:!text-[19px] !font-semibold
        text-white
        transition-all duration-300

        ${
          activeServiceId === null
            ? "bg-primary"
            : "bg-secondary hover:bg-primary"
        }
      `}
    >
      Show All
    </button>
  </div>
)}

{serviceList.length > 0 && (
  <>
    {/* Mobile Custom Dropdown */}
    <div
      ref={serviceDropdownRef}
      className="relative z-50 my-7 lg:hidden"
    >
      <button
        type="button"
        onClick={() => setIsServiceDropdownOpen((prev) => !prev)}
        className={`
          flex w-full items-center justify-between
          rounded-lg border bg-white
          px-4 py-3
          text-left !text-[16px] !font-semibold
          shadow-sm
          transition-all duration-300

          ${
            isServiceDropdownOpen
              ? "border-primary ring-2 ring-primary/15"
              : "border-gray-300"
          }
        `}
      >
        <span className="min-w-0 truncate text-gray-700">
          {selectedService?.service_name || "Show All"}
        </span>

        <svg
          className={`ml-3 h-5 w-5 shrink-0 text-gray-700 transition-transform duration-300 ${
            isServiceDropdownOpen ? "rotate-180" : ""
          }`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isServiceDropdownOpen && (
        <div
          className="
            absolute left-0 right-0 top-[calc(100%+8px)]
            z-[100]
            max-h-[280px]
            overflow-y-auto
            rounded-lg border border-gray-200
            bg-white p-2
            shadow-[0_15px_45px_rgba(0,0,0,0.18)]
          "
        >
          {/* Show All */}
          <button
            type="button"
            onClick={() => {
              handleFilterChange(null);
              setIsServiceDropdownOpen(false);
            }}
            className={`
              flex w-full items-center
              rounded-md px-3 py-3
              text-left !text-[15px] !font-semibold
              transition-colors duration-200

              ${
                activeServiceId === null
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            Show All
          </button>

          {serviceList.map((service) => {
            const isActive = activeServiceId === service.id;

            return (
              <button
                type="button"
                key={service.id}
                onClick={() => {
                  handleFilterChange(service.id);
                  setIsServiceDropdownOpen(false);
                }}
                className={`
                  mt-1 flex w-full items-center
                  rounded-md px-3 py-3
                  text-left !text-[15px] !font-semibold
                  transition-colors duration-200

                  ${
                    isActive
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                {service.service_name}
              </button>
            );
          })}
        </div>
      )}
    </div>

   
  </>
)}

            {loading && (
              <div className="grid justify-center gap-5 grid-cols-2 xl:grid-cols-3">
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
  
            {!loading && !error && (
  <div className="grid  grid-cols-1  gap-5 lg:grid-cols-3">
    {visibleProjects.map((item, index) => {
      const firstImage = item.images?.[0]?.image_url;

      return (
        <div
          key={item.id}
          onClick={() => openGallery(item)}
          className="group relative h-[200px] lg:h-[250px] xl:h-[354px] w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md"
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
            {!loading && visibleCount < portfolioList.length && (
              <motion.div
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: 0.45 }}
                                                     onClick={handleViewMore}
                                                    className="mt-10 flex justify-center"
                                                >
                                                    <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-[#720048] px-3 py-2 lg:px-6 lg:py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                                        View More
                            
                                                        <span className="flex lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                            <LuMoveUpRight className="lg:h-5 lg:w-5" />
                                                        </span>
                                                    </button>
                                                </motion.div>
              
            )}
          </div>
        </div>
      </section>
  <section className="bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)]">
          <div className="mx-auto flex max-w-full flex-col items-center justify-center px-6 py-9 lg:py-16 xl:py-[85px] text-center md:px-20 lg:px-[115px]">
            <h1   className="uppercase  text-[24px] xl:text-[42px] font-bold leading-[130%]  tracking-wide text-white ">
              Need impactful branding solutions ?
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

                                                    <button className="animated-btn  inline-flex items-center gap-3 rounded-full! bg-[#720048] px-3 py-2 lg:px-6 lg:py-3 text-[15px] lg:text-[20px] 2xl:text-[24px]! font-bold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                                        Get A Quote
                            
                                                        <span className="flex w-4 h-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                            <LuMoveUpRight className="w-4 h-4 lg:h-5 lg:w-5" />
                                                        </span>
                                                    </button>
                                                  </div>
                                                </motion.div>
         
          </div>
        </section>
      {/* <AnimatePresence>
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
      </AnimatePresence> */}
      <AnimatePresence>
  {selectedProject && (
    <motion.div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/80
        p-2
        backdrop-blur-sm

        sm:p-4
        lg:px-4
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={closeGallery}
    >
      <motion.div
        className="
          relative
          my-auto
          w-full
          max-w-4xl
          overflow-hidden
          rounded-[14px]
          bg-white
          p-3
          shadow-2xl

          sm:rounded-[18px]
          sm:p-4

          md:rounded-[24px]
          md:p-6
        "
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92,
          y: 30,
        }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={closeGallery}
          aria-label="Close portfolio gallery"
          className="
            absolute
            right-2
            top-2
            z-30
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            bg-[#A61D67]
            text-white
            shadow-lg
            transition
            hover:bg-[#8d1557]

            sm:right-3
            sm:top-3
            sm:h-10
            sm:w-10

            md:right-4
            md:top-4
          "
        >
          <X className="h-5 w-5" />
        </button>

        {/* Project details */}
        <div className="mb-3 min-h-[55px] pr-12 sm:mb-4">
          <p
            className="
              text-[10px]
              font-semibold
              uppercase
              leading-4
              tracking-[0.12em]
              text-[#A61D67]

              sm:text-xs
              sm:tracking-widest
            "
          >
            {selectedProject?.service?.service_name || "Portfolio"}
          </p>

          <h3
            className="
              mt-1
              line-clamp-2
              text-[18px]
              font-bold
              leading-[120%]
              text-[#626262]
              capitalize!
              sm:text-xl
              md:text-3xl
            "
          >
            {selectedProject.title}
          </h3>
        </div>

        {/* Image slider */}
        <div
          className="
            relative
            flex
            h-[calc(100dvh-155px)]
            min-h-[200px]
            max-h-[200px]
            w-full
            items-center
            justify-center
            overflow-hidden
            rounded-[12px]
            bg-[#f3f3f3] 

            lg:h-[500px]
            lg:max-h-none
            lg:rounded-[18px]
          "
        >
          {selectedImages.length > 0 ? (
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={
                  selectedImages[activeImageIndex]?.id ||
                  selectedImages[activeImageIndex]?.image_url
                }
                src={selectedImages[activeImageIndex]?.image_url}
                alt={selectedProject.title}
                className="
                  block
                  h-full
                  w-full
                  select-none
                  object-contain

                  lg:object-cover
                "
                initial={{
                  opacity: 0,
                  x: 40,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -40,
                }}
                transition={{ duration: 0.25 }}
                draggable={false}
              />
            </AnimatePresence>
          ) : (
            <p className="text-sm font-medium text-gray-400">
              No Image
            </p>
          )}

          {selectedImages.length > 1 && (
            <>
              {/* Previous image */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                aria-label="Previous image"
                className="
                  absolute
                  left-2
                  top-1/2
                  z-20
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-[#A61D67]
                  shadow-lg
                  transition
                  hover:bg-[#A61D67]
                  hover:text-white

                  sm:left-3
                  sm:h-10
                  sm:w-10

                  md:left-5
                  md:h-12
                  md:w-12
                "
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Next image */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                aria-label="Next image"
                className="
                  absolute
                  right-2
                  top-1/2
                  z-20
                  flex
                  h-9
                  w-9
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  bg-white/95
                  text-[#A61D67]
                  shadow-lg
                  transition
                  hover:bg-[#A61D67]
                  hover:text-white

                  sm:right-3
                  sm:h-10
                  sm:w-10

                  md:right-5
                  md:h-12
                  md:w-12
                "
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              {/* Mobile image counter */}
              <div
                className="
                  absolute
                  bottom-3
                  left-1/2
                  z-20
                  -translate-x-1/2
                  rounded-full
                  bg-black/60
                  px-3
                  py-1
                  text-[11px]
                  font-medium
                  text-white

                  sm:text-xs
                "
              >
                {activeImageIndex + 1} / {selectedImages.length}
              </div>
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
