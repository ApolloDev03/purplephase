// "use client";

// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import axios from "axios";
// import { apiUrl } from "../config";
// import { motion } from "framer-motion";
// import { HiArrowUpRight } from "react-icons/hi2";
// import { useRouter } from "next/navigation";

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
//   const [portfolioList, setPortfolioList] = useState<PortfolioItem[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
// const router=useRouter()
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

//   const filteredItems = portfolioList.slice(0, 3);

//   return (
//     <section className="w-full bg-white ">
//       <div className="mx-auto max-w-full px-4 py-16  sm:px-6 lg:px-20 2xl:px-32">
//         {/* Section Heading */}
//         <div className="mb-8 text-left">
//           <h2 className="mb-10

// leading-none
//  tracking-tight text-primary">
//             Work That Works
//           </h2>
//         </div>

//         {loading && (
//           <p className="text-sm text-slate-400">Loading portfolio...</p>
//         )}

//         {error && <p className="text-sm text-red-500">{error}</p>}

//         {/* Portfolio Grid */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
//             {filteredItems.map((item) => {
//               const firstImage = item.images?.[0]?.image_url;

//               return (
//                 <div
//   key={item.id}
//   className="group relative h-[360px] overflow-hidden rounded-xl bg-white shadow-sm"
// >
//   {firstImage && (
//     <Image
//       src={firstImage}
//       alt={item.title}
//       fill
//       sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//       className="object-cover transition-transform duration-500 group-hover:scale-105"
//       priority
//     />
//   )}

//   <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent px-5 py-5">
//     <h4 className="text-lg  text-white">
//       {item.title}
//     </h4>
//   </div>
// </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Filter Navigation Bar */}
//         <div className="mt-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
//           <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5, delay: 0.45 }}
//                         onClick={()=>router.push("/about-us")}
//                         className=" flex justify-center lg:justify-start"
//                     >
//                         <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
//                              Browse Projects

//                             <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                                 <HiArrowUpRight className="h-5 w-5" />
//                             </span>
//                         </button>
//                     </motion.div>
      

//           <div className="flex flex-wrap justify-center lg:justify-end items-center gap-y-3 text-primary">  
//             {filters.map((filter, index) => (
//               <React.Fragment key={filter}>
//                 <span className="px-2 sm:px-3 text-[14px] sm:text-[16px] md:text-[18px] 2xl:text-[28px] font-normal leading-none text-primary cursor-default">
//                   {filter}
//                 </span>

//                 {index !== filters.length - 1 && (
//                   <span className="text-[22px] font-light text-slate-400">
//                     |
//                   </span>
//                 )}
//               </React.Fragment>
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
    <section className="w-full overflow-hidden bg-white">
      <div className="mx-auto max-w-[1680px] px-4 py-10 sm:px-6 sm:py-12 md:px-10 lg:px-20 lg:py-16 2xl:px-32">
        {/* Section Heading */}
        <div className="mb-6 text-center sm:mb-8 lg:text-left">
          <h2 className="mb-0 text-[34px] leading-[1.05] tracking-tight text-primary sm:text-[46px] md:text-[58px] lg:text-[72px] xl:text-[84px] 2xl:text-[96px]">
            Work That Works
          </h2>
        </div>

        {loading && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="text-sm text-slate-400">Loading portfolio...</p>
          </div>
        )}

        {error && (
          <div className="flex min-h-[220px] items-center justify-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Portfolio Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3 lg:gap-3 xl:gap-5">
            {filteredItems.map((item, index) => {
              const firstImage = item.images?.[0]?.image_url;

              return (
                <div
                  key={item.id}
                  className="group relative h-[245px] overflow-hidden rounded-xl bg-slate-100 shadow-sm sm:h-[300px] md:h-[340px] lg:h-[360px] xl:h-[420px] 2xl:h-[520px]"
                >
                  {firstImage ? (
                    <Image
                      src={firstImage}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-slate-400">
                      No Image
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6">
                    <h4 className="line-clamp-2 text-[17px] font-medium leading-tight text-white sm:text-[19px] md:text-[22px] xl:text-[26px] 2xl:text-[32px]">
                      {item.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Button + Filter Navigation */}
        <div className="mt-7 flex flex-col gap-6 sm:mt-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            onClick={() => router.push("/about-us")}
            className="flex justify-center lg:justify-start"
          >
            <button className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 sm:gap-3 sm:px-6 sm:text-[16px] lg:text-[20px] 2xl:text-[24px]">
              Browse Projects

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <HiArrowUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-2 text-primary lg:max-w-[70%] lg:justify-end">
            {filters.map((filter, index) => (
              <React.Fragment key={filter}>
                <span className="rounded-full border border-primary/20 px-3 py-2 text-[13px] font-normal leading-none text-primary sm:border-0 sm:px-2 sm:py-0 sm:text-[15px] md:text-[17px] lg:text-[18px] xl:text-[20px] 2xl:text-[28px]">
                  {filter}
                </span>

                {index !== filters.length - 1 && (
                  <span className="hidden text-[22px] font-light text-slate-400 sm:inline-block">
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