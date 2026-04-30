"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import logo1 from "../assets/companylogo/1.jpg";
import logo2 from "../assets/companylogo/2.jpg";
import logo3 from "../assets/companylogo/3.jpg";
import logo4 from "../assets/companylogo/4.jpg";
import logo5 from "../assets/companylogo/5.jpg";
import logo6 from "../assets/companylogo/6.jpg";
import logo7 from "../assets/companylogo/BHARTJI-DESIGNER-JWELLERY-PVT.-LTD.png";
import logo8 from "../assets/companylogo/IIM-UDAIPUR-.png";
import logo9 from "../assets/companylogo/PACIFICA-.png";
import logo10 from "../assets/companylogo/SHOTT-AMUSEMENT-LLP.png";
import Breadcrumb from "../components/breadcrumb";

const categories = [
  "Logo & Branding",
  "360° Branding",
  "Packaging Design",
  "Marketing Collateral Design",
  "Advertising Campaign Design",
  "Ambience & Exhibition Design",
  "Digital & Social Media",
  "Corporate & Digital Film",
  "Show All",
];

const projects = [
  { id: 1, title: "Project One", category: "Logo & Branding", image: logo1 },
  { id: 2, title: "Project Two", category: "Packaging Design", image: logo2 },
  { id: 3, title: "Project Three", category: "360° Branding", image: logo3 },
  { id: 4, title: "Project Four", category: "Marketing Collateral Design", image: logo4 },
  { id: 5, title: "Project Five", category: "Advertising Campaign Design", image: logo5 },
  { id: 6, title: "Project Six", category: "Digital & Social Media", image: logo6 },
  { id: 7, title: "Project Seven", category: "Corporate & Digital Film", image: logo7 },
  { id: 8, title: "Project Eight", category: "Ambience & Exhibition Design", image: logo8 },
  { id: 9, title: "Project Nine", category: "Logo & Branding", image: logo9 },
  { id: 10, title: "Project Ten", category: "Corporate & Digital Film", image: logo10 },
];

const ITEMS_PER_PAGE = 6;

export default function PortfolioSection() {
  const [filter, setFilter] = useState("Show All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredProjects = useMemo(() => {
    return filter === "Show All"
      ? projects
      : projects.filter((project) => project.category === filter);
  }, [filter]);

  const visibleProjects = filteredProjects.slice(0, visibleCount);

  const handleFilterChange = (category: string) => {
    setFilter(category);
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <>
      <Breadcrumb />

      <section className="w-full bg-[#f3f3f3] px-4 py-16 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-full">
          <div className="mb-10">
            <h2 className="mb-4 text-[34px] font-medium text-[#666666] md:text-[42px]">
              Portfolio
            </h2>

            <p className="max-w-3xl text-sm leading-7 text-[#6d6d6d] md:text-[15px]">
              A brand is ultimately shaped by customer experience. We create work to
              make that experience purposeful, powerful and memorable.
            </p>

            <div className="my-10 flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = filter === cat;
                const isShowAll = cat === "Show All";

                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterChange(cat)}
                    className={`rounded-md px-4 py-2 font-medium transition-all duration-200 ${isActive
                        ? isShowAll
                          ? "bg-[#F58220] text-white"
                          : "bg-[#A61D67] text-white"
                        : isShowAll
                          ? "bg-[#F58220] text-white hover:opacity-90"
                          : "bg-[#6B6B6B] text-white hover:bg-[#595959]"
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <motion.div
              layout
              className="grid justify-center gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {visibleProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="group relative h-92.5 w-full max-w-130 overflow-hidden rounded-[19px] bg-[#d9d9d9] p-4"
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#d9d9d9]">
                      <img
                        src={project.image.src}
                        alt={project.title}
                        className="max-h-[70%] max-w-[70%] object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center rounded-[19px] bg-black/35 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <span className="text-sm font-semibold text-white">
                        {project.title}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {visibleCount < filteredProjects.length && (
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
    </>
  );
}