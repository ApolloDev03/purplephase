// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import { MoveUpRight } from "lucide-react";

// // Assuming your image paths
// import img1 from "../assets/Work-1.jpeg";
// import img2 from "../assets/Work-2.jpg";
// import img3 from "../assets/Work-3.jpeg";

// const portfolioItems = [
//   { id: 1, title: "VANRAS MASALA", category: "Packaging", image: img1 },
//   { id: 2, title: "GITA SAMOSA CENTER", category: "Brand Identity", image: img2 },
//   { id: 3, title: "DYNE CHEMICALS LLP", category: "Digital & Social", image: img3 },
// ];

// const filters = [
//   "Brand Identity",
//   "Packaging",
//   "Branding & Advertising",
//   "Digital & Social",
//   "Digital Film",
// ];

// const PortfolioSection = () => {
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);

//   const filteredItems = activeFilter
//     ? portfolioItems.filter((item) => item.category === activeFilter)
//     : portfolioItems.slice(0, 3); // Showing first 3 as seen in your Figma screen snippet

//   return (
//     <section className="w-full bg-white px-4 py-16 sm:px-8 lg:px-16">
//       <div className="mx-auto max-w-[1400px]">

//         {/* Section Heading */}
//         <div className="mb-10 text-left">
//           <h2 className="text-3xl font-semibold tracking-tight text-[#626262]  sm:text-5xl">
//             Work That Works
//           </h2>
//         </div>

//         {/* 3-Column Portfolio Grid */}
//         <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {filteredItems.map((item) => (
//             <div
//               key={item.id}
//               className="group relative h-[450px] aspect-[344/300] w-full  overflow-hidden rounded-sm bg-slate-100 shadow-sm"
//             >
//               {/* Portfolio Image */}
//               <Image
//                 src={item.image}
//                 alt={item.title}
//                 fill
//                 sizes="(max-w-7xl) 33vw, 50vw, 100vw"
//                 className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                 priority
//               />

//               {/* Bottom Transparent Overlay Grid Title */}
//               <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
//                 <h3 className="font-body font-semibold tracking-widest text-white">
//                   {item.title}
//                 </h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Filter Navigation Bar (Positioned Below Grid Per Figma) */}
//         <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-6 not-italic">
//           {/* Wow Me / Reset Button */}
//           <div>
//             <button
//               onClick={() => setActiveFilter(null)}
//               className="flex items-center gap-1.5 rounded bg-primary px-4 py-2  font-bold not-italic tracking-wider text-white transition-all hover:bg-[#86198f]"
//             >
//               Wow Me
//               <MoveUpRight className="h-3 w-3" />
//             </button>
//           </div>

//           {/* Filter Buttons */}
//           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-semibold not-italic tracking-wider text-slate-400">
//             {filters.map((filter) => (
//               <div key={filter} className="flex items-center gap-4 not-italic">
//                 <button
//                   onClick={() => setActiveFilter(filter)}
//                   className="text-xl font-body text-primary not-italic transition-colors"
//                 >
//                   {filter}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;

// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { MoveUpRight } from "lucide-react";

// const apiUrl = "https://purplephase.in/ppcadmin/api";

// type PortfolioImage = {
//   id: number;
//   image_url: string;
//   sort_order?: number;
// };

// type PortfolioItem = {
//   id: number;
//   title: string;
//   description?: string;
//   service?: {
//     id: number;
//     service_name: string;
//   };
//   images?: PortfolioImage[];
// };

// const filters = [
//   "Brand Identity",
//   "Packaging",
//   "Branding & Advertising",
//   "Digital & Social",
//   "Digital Film",
// ];

// const PortfolioSection = () => {
//   const [activeFilter, setActiveFilter] = useState<string | null>(null);
//   const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchPortfolioList = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const res = await axios.post(
//         `${apiUrl}/portfolioList`,
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (res.data?.success) {
//         setPortfolioList(res.data?.data || []);
//       } else {
//         setError(res.data?.message || "Failed to fetch portfolio list.");
//       }
//     } catch (err) {
//       console.error("Portfolio API Error:", err);
//       setError("Something went wrong while loading portfolio.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPortfolioList();
//   }, []);

//   const filteredItems = activeFilter
//     ? portfolioList.filter((item) => item.service?.service_name === activeFilter)
//     : portfolioList.slice(0, 3);

//   return (
//     <section className="w-full bg-white px-4 py-16 sm:px-8 lg:px-16">
//       <div className="mx-auto max-w-[1400px]">

//         {/* Section Heading */}
//         <div className="mb-10 text-left">
//           <h2 className="text-3xl font-semibold tracking-tight text-[#626262] sm:text-5xl">
//             Work That Works
//           </h2>
//         </div>

//         {loading && (
//           <p className="text-sm text-slate-400">Loading portfolio...</p>
//         )}

//         {error && (
//           <p className="text-sm text-red-500">{error}</p>
//         )}

//         {/* 3-Column Portfolio Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredItems.map((item) => {
//               const firstImage = item.images?.[0]?.image_url;

//               return (
//                 <div
//                   key={item.id}
//                   className="group relative h-[450px] aspect-[344/300] w-full overflow-hidden rounded-sm bg-slate-100 shadow-sm"
//                 >
//                   {/* Portfolio Image */}
//                   {firstImage && (
//                     <Image
//                       src={firstImage}
//                       alt={item.title}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
//                       priority
//                     />
//                   )}

//                   {/* Bottom Transparent Overlay Grid Title */}
//                   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 pt-12">
//                     <h3 className="font-body font-semibold tracking-widest text-white">
//                       {item.title}
//                     </h3>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Filter Navigation Bar */}
//         <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-6 not-italic">
//           <div>
//             <button
//               onClick={() => setActiveFilter(null)}
//               className="flex items-center gap-1.5 rounded bg-primary px-4 py-2 font-bold not-italic tracking-wider text-white transition-all hover:bg-[#86198f]"
//             >
//               Wow Me
//               <MoveUpRight className="h-3 w-3" />
//             </button>
//           </div>

//           <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-semibold not-italic tracking-wider text-slate-400">
//             {filters.map((filter) => (
//               <div key={filter} className="flex items-center gap-4 not-italic">
//                 <button
//                   onClick={() => setActiveFilter(filter)}
//                   className="text-xl font-body text-primary not-italic transition-colors"
//                 >
//                   {filter}
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// };

// export default PortfolioSection;

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";

const apiUrl = "https://purplephase.in/ppcadmin/api";

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
    <section className="w-full bg-white px-4 py-12 sm:px-6 md:px-8 lg:px-16">
      <div className="mx-auto max-w-full">
        {/* Section Heading */}
        <div className="mb-8 text-left">
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[46px] font-semibold leading-tight tracking-tight text-primary">
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
                  className="group relative h-[220px] sm:h-[245px] md:h-[280px] lg:h-[245px] w-full overflow-hidden rounded-[5px] bg-slate-100 shadow-sm"
                >
                  {firstImage && (
                    <Image
                      src={firstImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      priority
                    />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-5 pb-4 pt-14">
                    <h3 className="text-[14px] sm:text-[16px] md:text-[17px] font-normal tracking-wide text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Filter Navigation Bar */}
        <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <Link
            href="/Portfolio"
            className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[16px] sm:text-[18px] font-bold tracking-wide text-white shadow-sm transition-all duration-300 hover:bg-[#86145e]"
          >
            Browse Projects
            <MoveUpRight className="h-5 w-5" />
          </Link>

          <div className="flex flex-wrap justify-center lg:justify-end items-center gap-y-3 text-primary">  
            {filters.map((filter, index) => (
              <React.Fragment key={filter}>
                <span className="px-2 sm:px-3 text-[14px] sm:text-[16px] lg:text-[20px] font-normal leading-none text-primary cursor-default">
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
