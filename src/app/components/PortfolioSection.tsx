"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { apiUrl } from "../config";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

type PortfolioImage = {
  id: number;
  image_url: string;
  sort_order?: number;
};

type PortfolioItem = {
  id: number;
  title: string;
  description?: string;
  service?: {
    id: number;
    service_name: string;
  };
  images?: PortfolioImage[];
};

const filters = [
  "Brand Identity",
  "Packaging",
  "Branding & Advertising",
  "Digital & Social",
  "Digital Film",
];

const PortfolioSection = () => {
  const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const router=useRouter()
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
            "Content-Type": "application/json",
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
    fetchPortfolioList();
  }, []);

  const filteredItems = portfolioList.slice(0, 3);

  return (
    <section className="w-full bg-white ">
      <div className="mx-auto max-w-full px-4 py-16  sm:px-6 lg:px-20 2xl:px-32">
        {/* Section Heading */}
        <div className="mb-8 text-left">
          <h2 className="mb-10

leading-none
 tracking-tight text-primary">
            Work That Works
          </h2>
        </div>

        {loading && (
          <p className="text-sm text-slate-400">Loading portfolio...</p>
        )}

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* Portfolio Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const firstImage = item.images?.[0]?.image_url;

              return (
                <div
  key={item.id}
  className="group relative h-[360px] overflow-hidden rounded-xl bg-white shadow-sm"
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

  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 py-5">
    <h4 className="text-lg  text-white">
      {item.title}
    </h4>
  </div>
</div>
              );
            })}
          </div>
        )}

        {/* Filter Navigation Bar */}
        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        onClick={()=>router.push("/about-us")}
                        className=" flex justify-center lg:justify-start"
                    >
                        <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                             Browse Projects

                            <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <HiArrowUpRight className="h-5 w-5" />
                            </span>
                        </button>
                    </motion.div>
      

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-y-3 text-primary">  
            {filters.map((filter, index) => (
              <React.Fragment key={filter}>
                <span className="px-2 sm:px-3 text-[14px] sm:text-[16px] md:text-[18px] 2xl:text-[28px] font-normal leading-none text-primary cursor-default">
                  {filter}
                </span>

                {index !== filters.length - 1 && (
                  <span className="text-[22px] font-light text-slate-400">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
