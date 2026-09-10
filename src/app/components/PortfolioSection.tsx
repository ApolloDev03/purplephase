"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { apiUrl } from "../config";
import { motion } from "framer-motion";
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

type PortfolioItem = {
  id: number;
  show_home_page?: number | string;
  title: string;
  description?: string;

  service?: {
    id: number;
    service_name: string;
  } | null;

  images?: {
    id: number;
    image_url: string;
    sort_order?: number;
  }[];

  // Reference page jevu direct video_link
  video_link?: string | null;
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

  const router = useRouter();

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
        const homePagePortfolio = (res.data?.data || []).filter(
          (item: PortfolioItem) =>
            Number(item.show_home_page) === 1
        );

        setPortfolioList(homePagePortfolio);
      } else {
        setPortfolioList([]);
        setError(
          res.data?.message || "Failed to fetch portfolio list."
        );
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

  const filteredItems = portfolioList
    .filter((item) => Number(item.show_home_page) === 1)
    .slice(0, 3);

  /*
  |--------------------------------------------------------------------------
  | YouTube Video ID
  |--------------------------------------------------------------------------
  |
  | Support:
  | youtube.com/watch?v=
  | youtu.be/
  | youtube.com/shorts/
  | youtube.com/embed/
  |
  */

  const getYouTubeVideoId = (url: string) => {
    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.replace("/", "").split("?")[0];
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
        if (parsedUrl.pathname.includes("/shorts/")) {
          return parsedUrl.pathname
            .split("/shorts/")[1]
            ?.split("?")[0];
        }

        if (parsedUrl.pathname.includes("/embed/")) {
          return parsedUrl.pathname
            .split("/embed/")[1]
            ?.split("?")[0];
        }

        return parsedUrl.searchParams.get("v");
      }
    } catch {
      return null;
    }

    return null;
  };

  return (
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-full px-4 py-10 lg:px-6 lg:py-[30px] xl:px-10 xl:py-[50px] 2xl:px-32 2xl:py-[85px]">

        {/* Section Heading */}
        <div className="mb-6 text-left md:mb-8">
          <h2 className="mb-0 leading-[1.05] tracking-tight text-primary">
            Work That Works
          </h2>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="text-sm text-slate-400">
              Loading portfolio...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="text-sm text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* =========================================================
            PORTFOLIO GRID
        ========================================================== */}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredItems.map((item, index) => {

              /*
              |--------------------------------------------------------------------------
              | Image
              |--------------------------------------------------------------------------
              */

              const firstImage = item.images?.[0]?.image_url;

              /*
              |--------------------------------------------------------------------------
              | Video
              |--------------------------------------------------------------------------
              */

              const videoUrl = item.video_link?.trim() || null;

              /*
              |--------------------------------------------------------------------------
              | YouTube
              |--------------------------------------------------------------------------
              */

              const youtubeVideoId = videoUrl
                ? getYouTubeVideoId(videoUrl)
                : null;

              return (
                <div
                  key={item.id}
                  className="
                    group
                    relative
                    h-[200px]
                    w-full
                    overflow-hidden
                    rounded-xl
                    bg-[#eeeeee]
                    shadow-md
                    lg:h-[270px]
                    xl:h-[354px]
                  "
                >

                  {/* =====================================================
                      VIDEO
                  ====================================================== */}

                  {videoUrl ? (
                    <>
                      {/* =====================
                          YOUTUBE VIDEO
                      ====================== */}

                      {youtubeVideoId ? (
                        <img
                          src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`}
                          alt={item.title}
                          className="
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
                          "
                          onError={(e) => {
                            const image =
                              e.currentTarget as HTMLImageElement;

                            image.onerror = null;

                            image.src = `https://img.youtube.com/vi/${youtubeVideoId}/hqdefault.jpg`;
                          }}
                        />
                      ) : (
                        /* =====================
                           MP4 / DIRECT VIDEO
                        ====================== */

                        <video
                          src={videoUrl}
                          muted
                          playsInline
                          preload="metadata"
                          className="
                            pointer-events-none
                            absolute
                            inset-0
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-out
                            group-hover:scale-105
                          "
                          onLoadedMetadata={(e) => {
                            const video = e.currentTarget;

                            try {
                              /*
                              First proper frame show karva mate.
                              Video play nahi thay.
                              */
                              video.currentTime = 0.1;
                              video.pause();
                            } catch (error) {
                              console.log(error);
                            }
                          }}
                        />
                      )}

                      {/* =====================
                          PLAY INDICATOR
                          Only visual
                          Video play nahi kare
                      ====================== */}

                      <div
                        className="
                          pointer-events-none
                          absolute
                          left-1/2
                          top-1/2
                          z-20
                          flex
                          h-14
                          w-14
                          -translate-x-1/2
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-white/90
                          text-primary
                          shadow-lg
                          backdrop-blur-sm
                          transition-all
                          duration-300
                          group-hover:scale-110
                          group-hover:bg-primary
                          group-hover:text-white
                          lg:h-16
                          lg:w-16
                        "
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="ml-1 h-6 w-6 lg:h-7 lg:w-7"
                        >
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </>
                  ) : firstImage ? (

                    /* =====================================================
                        IMAGE
                    ====================================================== */

                    <div className="absolute inset-0">
                      <Image
                        src={firstImage}
                        alt={item.title}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          33vw
                        "
                        className="
                          object-cover
                          transition-transform
                          duration-700
                          ease-out
                          group-hover:scale-105
                        "
                        priority={index === 0}
                      />
                    </div>

                  ) : (

                    /* =====================================================
                        NO MEDIA
                    ====================================================== */

                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                      No Media
                    </div>
                  )}

                  {/* Light Overlay */}
                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-[5]
                      bg-black/5
                    "
                  />

                  {/* =====================================================
                      BOTTOM TITLE
                  ====================================================== */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-x-0
                      bottom-0
                      z-30
                      bg-gradient-to-t
                      from-black/90
                      via-black/50
                      to-transparent
                      px-4
                      pb-4
                      pt-16
                    "
                  >
                    <p className="text-[16px] font-medium leading-[1.3] !text-white">
                      {item.title}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* =========================================================
            BOTTOM BUTTON + FILTERS
        ========================================================== */}

        <div className="mt-7 flex flex-col items-start gap-6 sm:mt-8 lg:flex-row lg:items-center lg:justify-between">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.5,
              delay: 0.25,
            }}
            onClick={() => router.push("/Portfolio")}
            className="flex justify-center lg:justify-start"
          >
            <button
              className="
                motion-shine
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-primary
                px-3
                py-2
                text-[14px]
                font-bold
                text-white
                shadow-lg
                shadow-primary/20
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-[#7a1f50]
                hover:shadow-xl
                hover:shadow-primary/30
                sm:text-[16px]
                2xl:text-[24px]
              "
            >
              Browse Projects

              <span className="flex h-4 w-4 items-center justify-center text-white transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 lg:h-5 lg:w-5">
                <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </span>
            </button>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-start text-primary lg:justify-end xl:gap-2">

            {filters.map((filter, index) => (
              <React.Fragment key={filter}>

                <span
                  className="
                    rounded-full
                    border
                    border-primary/20
                    px-3
                    py-2
                    text-[13px]
                    leading-none
                    text-primary
                    sm:border-0
                    sm:px-2
                    sm:py-1
                    sm:text-[15px]
                    md:text-[17px]
                    xl:text-[20px]
                    2xl:text-[26px]
                  "
                >
                  {filter}
                </span>

                {index !== filters.length - 1 && (
                  <span className="hidden text-[14px] font-light text-[#424242] sm:inline-block xl:text-[22px]">
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