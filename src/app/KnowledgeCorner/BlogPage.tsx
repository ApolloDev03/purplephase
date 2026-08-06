// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { apiUrl } from "../config";
// import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
// import { ContactSection } from "../components/ContactSection";

// type BlogItem = {
//   blogId: number;
//   blogTitle: string;
//   slugname: string;
//   blogDescription: string;
//   date: string;
//   blogImage: string;
// };

// type BlogResponse = {
//   message: string;
//   success: boolean;
//   data: BlogItem[];
// };

// export default function BlogPage() {
//   const [blogs, setBlogs] = useState<BlogItem[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const containerClass =
//     "mx-auto max-w-full my-16 px-4 sm:px-6 lg:px-20 2xl:px-32";

//   const featuredBlog = blogs[currentIndex];

//   const sideBlogs =
//     blogs.length > 1
//       ? Array.from(
//           { length: Math.min(3, blogs.length - 1) },
//           (_, index) => blogs[(currentIndex + index + 1) % blogs.length]
//         )
//       : [];

//   const fetchBlogs = async () => {
//     try {
//       setLoading(true);

//       const res = await axios.post<BlogResponse>(
//         `${apiUrl}/blogs`,
//         {},
//         {
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );

//       if (res.data?.success) {
//         setBlogs(res.data.data || []);
//       }
//     } catch (error) {
//       console.error("Blog API Error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   const handleNext = () => {
//     if (blogs.length === 0) return;
//     setCurrentIndex((prev) => (prev + 1) % blogs.length);
//   };

//   const handlePrev = () => {
//     if (blogs.length === 0) return;
//     setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
//   };

//   return (
//     <main className="bg-[#efefef]">
//       {/* HERO */}
//       <section className="relative w-full overflow-hidden bg-[#f7f5f6]">
//         <img
//           src="/assets/knowledgecorner/book.png"
//           alt="Playbook To Build Your Brand"
//           className="block w-full"
//         />

//         <div className="absolute inset-0 flex items-center">
//           <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
//             <div className="max-w-[600px]">
//               <h1 className="text-[32px] font-bold leading-[1.1] text-[#a20d69] md:text-[50px] lg:text-[64px]">
//                 Playbook To Build Your Brand
//               </h1>

//               <p className="mt-8 text-[16px] leading-relaxed text-[#4d4d4d] md:text-[20px]">
//                 Your Go-To Corner For Everything That Makes Brands Sharper,
//                 Stronger, And Smarter.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CATEGORY CARDS */}
//       <section>
//         <div className={containerClass}>
//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//             {[
//               {
//                 title: "BRAND STRATEGY",
//                 desc: "Build brands on impactful ideas, insight, and strategy.",
//                 active: true,
//               },
//               {
//                 title: "CONSUMER BEHAVIOUR",
//                 desc: "Decode how consumers think, choose, connect, and stay loyal.",
//               },
//               {
//                 title: "DESIGN THINKING",
//                 desc: "See how thoughtful design influences brand perception and value.",
//               },
//               {
//                 title: "DIGITAL & AI EDGE",
//                 desc: "Harness digital and AI to keep your brand relevant and ready for tomorrow.",
//               },
//               {
//                 title: "BRAND STORIES",
//                 desc: "Draw inspiration from remarkable stories of branding.",
//               },
//               {
//                 title: "BRAND CONSULTING",
//                 desc: "Solve branding challenges with insights for founders and marketing leaders.",
//               },
//             ].map((item, index) => (
//               <Link
//                 href="#"
//                 key={index}
//                 className={`group relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
//                   item.active
//                     ? "border-transparent bg-gradient-to-r from-[#c92f8d] to-[#730042] text-white"
//                     : "border-[#c92f8d] bg-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-[#c92f8d] hover:to-[#730042] hover:text-white"
//                 }`}
//               >
//                 <h3
//                   className={`text-lg font-bold tracking-wide transition-colors duration-300 ${
//                     item.active
//                       ? "text-white"
//                       : "text-black group-hover:text-white"
//                   }`}
//                 >
//                   {item.title}
//                 </h3>

//                 <p
//                   className={`mt-4 text-sm leading-7 transition-colors duration-300 ${
//                     item.active
//                       ? "text-white/90"
//                       : "text-[#5b5b5b] group-hover:text-white/90"
//                   }`}
//                 >
//                   {item.desc}
//                 </p>

//                 <div className="absolute bottom-5 right-5">
//                   <ArrowUpRight
//                     size={18}
//                     className={`transition-colors duration-300 ${
//                       item.active
//                         ? "text-white"
//                         : "text-[#555] group-hover:text-white"
//                     }`}
//                   />
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* BLOG SECTION */}
//       <section className="overflow-hidden">
//         <div className="py-16">
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
//             </div>
//           ) : blogs.length > 0 ? (
//             <div className="grid items-start gap-8 lg:grid-cols-[52%_48%] xl:gap-10">
//               {/* LEFT BIG IMAGE */}
//               <div className="relative z-10 w-full overflow-hidden rounded-[10px]">
//                 <div className="relative aspect-[700/600] w-full overflow-hidden rounded-[10px]">
//                   <img
//                     src={
//                       featuredBlog?.blogImage ||
//                       "/assets/knowledgecorner/blog-main.png"
//                     }
//                     alt={featuredBlog?.blogTitle}
//                     className="h-full w-full object-cover"
//                   />

//                   <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  

//                   <div className="absolute bottom-6 right-7 z-20 flex gap-8">
//                     <button
//                       onClick={handlePrev}
//                       className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-primary"
//                     >
//                       <ArrowLeft size={17} />
//                     </button>

//                     <button
//                       onClick={handleNext}
//                       className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-primary"
//                     >
//                       <ArrowRight size={17} />
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT CONTENT */}
//               <div className="relative z-20 pt-2 lg:pt-3 ">
//                 <h3 className="text-[18px] font-bold uppercase text-secondary md:text-[20px] pr-32">
//                   {featuredBlog?.blogTitle}
//                 </h3>

//                 <p className="mt-4  leading-7 text-[#666] line-clamp-4 pr-32 ">
//                   {featuredBlog?.blogDescription}
//                 </p>

//                 <Link
//                   href={`/knowlegecornerDetail?slug=${featuredBlog?.slugname}`}
//                   className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-[14px] font-semibold text-white transition hover:bg-secondary"
//                 >
//                   Read More
//                   <ArrowUpRight size={16} />
//                 </Link>

//                 {/* SMALL BLOG CARDS */}
//                 {sideBlogs.length > 0 && (
//                   <div
//                     className="
//                       mt-10
//                       grid
//                       grid-cols-1
//                       gap-4
//                       sm:grid-cols-3
//                       lg:-ml-[110px]
//                       lg:w-[calc(100%+110px)]
//                       xl:-ml-[200px]
//                       xl:w-[calc(100%+150px)]
//                       2xl:-ml-[250px]
//                       2xl:w-[calc(100%+190px)]
//                     "
//                   >
//                     {sideBlogs.map((blog, index) => (
//                       <Link
//                         href={`/knowlegecornerDetail?slug=${blog.slugname}`}
//                         key={`${blog.blogId}-${index}`}
//                         className="group overflow-hidden rounded-[10px] border-2 border-white shadow-md"
//                       >
//                         <div className="relative aspect-[600/500] w-full ">
//                           <img
//                             src={blog.blogImage}
//                             alt={blog.blogTitle}
//                             className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
//                           />                          
                         
//                         </div>
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-3xl bg-white py-20 text-center">
//               <h3 className="text-3xl font-bold">No Blogs Found</h3>
//             </div>
//           )}
//         </div>
//       </section>

//       <ContactSection />
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactSection } from "../components/ContactSection";
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

type BlogItem = {
  blogId: number;
  blogTitle: string;
  slugname: string;
  blogDescription: string;
  date: string;
  blogImage: string;
};

type BlogResponse = {
  message: string;
  success: boolean;
  data: BlogItem[];
};

const categoryCards = [
  {
    title: "BRAND STRATEGY",
    desc: "Build brands on impactful ideas, insight, and strategy.",
  },
  {
    title: "CONSUMER BEHAVIOUR",
    desc: "Decode how consumers think, choose, connect, and stay loyal.",
  },
  {
    title: "DESIGN THINKING",
    desc: "See how thoughtful design influences brand perception and value.",
  },
  {
    title: "DIGITAL & AI EDGE",
    desc: "Harness digital and AI to keep your brand relevant and ready for tomorrow.",
  },
  {
    title: "BRAND STORIES",
    desc: "Draw inspiration from remarkable stories of branding.",
  },
  {
    title: "BRAND CONSULTING",
    desc: "Solve branding challenges with insights for founders and marketing leaders.",
  },
];

export default function BlogPage() {
  const router=useRouter();
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(categoryCards[0].title);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const containerClass =
    "mx-auto max-w-full my-16 px-4 sm:px-6 lg:px-20 2xl:px-32";

  const featuredBlog = blogs[currentIndex];

  const sideBlogs =
    blogs.length > 1
      ? Array.from(
          { length: Math.min(3, blogs.length - 1) },
          (_, index) => blogs[(currentIndex + index + 1) % blogs.length]
        )
      : [];

  const fetchBlogs = async (categoryName: string) => {
    try {
      setLoading(true);
      setCurrentIndex(0);

      const res = await axios.post<BlogResponse>(
        `${apiUrl}/blogs`,
        {
          expertise_id: categoryName, // name as it is pass thase
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success) {
        setBlogs(res.data.data || []);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      console.error("Blog API Error:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(categoryCards[0].title);
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    fetchBlogs(categoryName);
  };

  const handleNext = () => {
    if (blogs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    if (blogs.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  return (
    <>
      {/* HERO */}
   <section className="relative w-full overflow-hidden bg-[#f7f5f6]">
  <div className="relative h-[200px] lg:h-[600px] 2xl:h-[720px] w-full  overflow-hidden">
    {/* Background Image */}
    <img
      src="/assets/knowledgecorner/book.png"
      alt="Playbook To Build Your Brand"
      className="absolute inset-0 h-full w-full   object-cover
      object-[55%_center]
      xl:object-center"
    />

    {/* Left Text */}
    <div className="absolute inset-0 z-10 flex items-center">
      <div className="w-[250px] lg:w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
     
          <h1 className="font-heading text-[22px] font-bold leading-tight text-[#a20d69] lg:text-[40px] xl:text-[48px] 2xl:text-[56px]">
            Playbook To Build Your Brand
          </h1>

          <p className="mt-6  text-[15px] leading-[150%] text-[#4d4d4d] md:text-[18px] lg:text-[20px]">
            Your go-to corner for everything that makes <br/> brands sharper,
            stronger, and smarter.
          </p>
      </div>
    </div>
  </div>
</section>

      <section className="bg-white max-w-full overflow-hidden py-[20px] lg:py-[30px] 2xl:py-[85px] max-auto  px-4 lg:px-6 xl:px-10 2xl:px-32 ">
    <div className="grid gap-5  md:grid-cols-2 lg:grid-cols-3">
      {categoryCards.map((item, index) => {
        const isActive = hoveredCategory
          ? hoveredCategory === item.title
          : selectedCategory === item.title;

        return (
          <button
            type="button"
            key={index}
            onClick={() => handleCategoryClick(item.title)}
            onMouseEnter={() => setHoveredCategory(item.title)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`group relative h-[200px] lg:h-[250px] 2xl:h-[309px] w-full rounded-[23px] border p-8 text-left transition-all duration-300   ${
              isActive
                ? "border-transparent bg-gradient-to-r from-[#c92f8d] to-[#730042] text-white"
                : "border-[#c92f8d] bg-[#EEEEEE]"
            }`}
          >
            <div className="flex h-full flex-col">
              <h4
                className={`text-[18px] leading-[130%] font-semibold lowercase [font-variant-caps:small-caps]!   md:text-[20px] lg:text-[22px] xl:text-[32px] ${
                  isActive ? "text-white" : "text-[#333333]"
                }`}
              >
                {item.title}
              </h4>

              <p
                className={`mt-5 max-w-[390px] text-[14px] leading-7 md:text-[15px] lg:text-[28px] ${
                  isActive ? "text-white/90!" : "text-[#5b5b5b]"
                }`}
              >
                {item.desc}
              </p>
            </div>

            <div
              className={`absolute bottom-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border  ${
                isActive
                  ? "border-white text-white"
                  : "border-[#555555] text-[#555555]"
              }`}
            >
              <ArrowUpRight size={18} />
            </div>
          </button>
        );
      })}
    </div>
</section>

      {/* BLOG SECTION */}
      {/* <section className="overflow-hidden">
        <div className="py-16 pr-32">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid items-start gap-8 lg:grid-cols-[45%_55%]">
          
<div className="relative z-10 flex w-full justify-center overflow-hidden lg:justify-start">
  <div
    className="
      relative
      w-full
      max-w-[750px]
      overflow-hidden
      rounded-[10px]
      aspect-[600/627]
      lg:h-[750px]
      lg:w-[750px]
      lg:aspect-auto
    "
  >
    <img
      src={
        featuredBlog?.blogImage ||
        "/assets/knowledgecorner/blog-main.png"
      }
      alt={featuredBlog?.blogTitle || "Knowledge Corner Blog"}
      className="h-full w-full object-cover"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

    <div className="absolute bottom-10 right-7 z-20 flex gap-8">
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous blog"
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-primary"
      >
        <ArrowLeft size={17} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next blog"
        className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-primary"
      >
        <ArrowRight size={17} />
      </button>
    </div>
  </div>
</div>

              <div className="relative z-20 pt-2 lg:pt-3">
                <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="  text-secondary text-[40px]!">
                  {featuredBlog?.blogTitle}
                </h3>

            <div
  className="
    mt-4
    pr-34
    line-clamp-4
    text-[24px]
    leading-7
    !text-[#424242]

    [&_p]:inline
    [&_h1]:inline
    [&_h2]:inline
    [&_h3]:inline
    [&_h4]:inline

    [&_h1]:font-bold
    [&_h2]:font-bold
    [&_h3]:font-bold
    [&_strong]:font-bold
    [&_em]:italic

    [&_br]:hidden
  "
  dangerouslySetInnerHTML={{
    __html: featuredBlog?.blogDescription ?? "",
  }}
/>
   <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => router.push(`/knowlegecornerDetail?slug=${featuredBlog?.slugname}`)}
              className="motion-shine group inline-flex items-center gap-3 sm:gap-[25px] rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:text-[20px] 2xl:text-[24px]"
            >
            Read More

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <LuMoveUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>
              

                {sideBlogs.length > 0 && (
                  <div
                    className="
                      mt-10
                      2xl:mt-[5%]
                      grid
                      grid-cols-1
                      gap-4
                      sm:grid-cols-3
                      lg:-ml-[110px]
                      lg:w-[calc(100%+110px)]
                      xl:-ml-[200px]
                      xl:w-[calc(100%+150px)]
                      2xl:-ml-[300px]
                      2xl:w-[calc(100%+200px)]
                    "
                  >
                    {sideBlogs.map((blog, index) => (
                      <Link
                        href={`/knowlegecornerDetail?slug=${blog.slugname}`}
                        key={`${blog.blogId}-${index}`}
                        className="group block h-[200px] w-[350px] 2xl:h-[236px] 2xl:w-[450px] overflow-hidden rounded-[10px] border-2 border-white shadow-md"
                      >
                        <div className="relative  w-full">
                          <img
                            src={blog.blogImage}
                            alt={blog.blogTitle}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white py-20 text-center">
              <h3 className="text-3xl font-bold">No Blogs Found</h3>
            </div>
          )}
        </div>
      </section> */}
{/* BLOG SECTION */}
<section className="overflow-hidden">
  <div
    className="
      px-4
      py-8
      sm:py-10
    
      md:py-12

      lg:py-16

      lg:pl-0
         lg:pr-6
        xl:pr-10
      2xl:pr-32
    "
  >
    {loading ? (
      <div className="flex justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
    ) : blogs.length > 0 ? (
      <div
        className="
          grid
          grid-cols-1
          items-start
          gap-6

          md:gap-8

          lg:grid-cols-[45%_55%]
          lg:gap-8
        "
      >
        {/* LEFT ACTIVE BLOG IMAGE */}
        <div className="relative z-10 flex w-full justify-center overflow-hidden lg:justify-start">
          <div
            className="
              relative
              h-[180px]
              w-full
              overflow-hidden
              rounded-[10px]
              md:h-[430px]

              lg:h-[750px]
              lg:w-[750px]
              lg:max-w-[750px]
            "
          >
            <img
              src={
                featuredBlog?.blogImage ||
                "/assets/knowledgecorner/blog-main.png"
              }
              alt={
                featuredBlog?.blogTitle ||
                "Knowledge Corner Blog"
              }
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            {/* Slider arrows */}
            <div
              className="
                absolute
                bottom-4
                right-4
                z-20
                flex
                gap-4

                md:bottom-6
                md:right-6
                md:gap-6

                lg:bottom-10
                lg:right-7
                lg:gap-8
              "
            >
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous blog"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  text-white
                  transition
                  hover:bg-white
                  hover:text-primary
                "
              >
                <ArrowLeft size={17} />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next blog"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  text-white
                  transition
                  hover:bg-white
                  hover:text-primary
                "
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative z-20 pt-1 md:pt-2 lg:pt-3">
          <h3
            style={{
              fontVariantCaps: "all-small-caps",
              fontFeatureSettings: '"smcp", "c2sc"',
            }}
            className="
              text-[25px]!
              font-semibold
              leading-[120%]
              text-secondary
              md:text-[34px]!

              lg:text-[40px]!
            "
          >
            {featuredBlog?.blogTitle}
          </h3>

          <div
            className="
              mt-3
              line-clamp-4
              pr-0
              text-[14px]
              leading-6
              !text-[#424242]

              md:mt-4
              md:text-[18px]
              md:leading-7

              lg:pr-34
              lg:text-[24px]
              lg:leading-7

              [&_p]:inline
              [&_h1]:inline
              [&_h2]:inline
              [&_h3]:inline
              [&_h4]:inline

              [&_h1]:font-bold
              [&_h2]:font-bold
              [&_h3]:font-bold
              [&_strong]:font-bold
              [&_em]:italic
              [&_br]:hidden
            "
            dangerouslySetInnerHTML={{
              __html: featuredBlog?.blogDescription ?? "",
            }}
          />

          {/* READ MORE BUTTON */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.45,
            }}
            className="
              mt-6
              flex
              md:mt-8
              lg:mt-9
              justify-start
            "
          >
            <button
              type="button"
              onClick={() =>
                router.push(
                  `/knowlegecornerDetail?slug=${featuredBlog?.slugname}`
                )
              }
              className="
                motion-shine
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                bg-primary
                px-6
                py-3
                text-[15px]
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

                sm:gap-[25px]

                lg:text-[20px]
                2xl:text-[24px]
              "
            >
              Read More

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <LuMoveUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>

          {/* 
            MOBILE + TABLET: Horizontal swipe slider
            LAPTOP + DESKTOP: Original 3-column design
          */}
          {sideBlogs.length > 0 && (
            <div
              className="
              
                hidden 
                w-full
                snap-x
                snap-mandatory
                gap-4
                overflow-x-auto
                pb-3

                [-ms-overflow-style:none]
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden

               mt-32
                md:gap-5

                lg:-ml-[200px]
                lg:grid
                lg:w-[calc(100%+110px)]
                lg:grid-cols-3
                lg:gap-4
                lg:overflow-visible
                lg:pb-0

                xl:-ml-[200px]
                xl:w-[calc(100%+150px)]

                2xl:-ml-[300px]
                2xl:mt-[5%]
                2xl:w-[calc(100%+200px)]
              "
            >
              {sideBlogs.map((blog, index) => (
                <Link
                  href={`/knowlegecornerDetail?slug=${blog.slugname}`}
                  key={`${blog.blogId}-${index}`}
                  className="
                    group
                    block
                    h-[180px]
                    w-[82vw]
                    max-w-[320px]
                    shrink-0
                    snap-start
                    overflow-hidden
                    rounded-[10px]
                    border-2
                    border-white
                    shadow-md

                    sm:w-[320px]

                    md:h-[220px]
                    md:w-[360px]
                    md:max-w-[360px]

                    lg:h-[190px]
                    lg:w-[350px]
                    lg:max-w-none
                    lg:shrink
                    lg:snap-none

                    2xl:h-[236px]
                    2xl:w-[450px]
                  "
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <img
                      src={blog.blogImage}
                      alt={blog.blogTitle}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition
                        duration-500
                        group-hover:scale-105
                      "
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="rounded-3xl bg-white py-20 text-center">
        <h3 className="text-3xl font-bold">
          No Blogs Found
        </h3>
      </div>
    )}
  </div>
</section>
      <ContactSection />
    </>
  );
}