// import Link from "next/link";
// import { blogs } from "../components/blog";

// export default function BlogPage() {
//   return (
//     <main className="min-h-screen bg-[#f8f3f6] text-[#1f1f1f]">
//       <section className="relative overflow-hidden bg-[#e5e5e5] px-4 py-16 sm:px-6 lg:px-8">

//         <div className="relative mx-auto max-w-6xl text-center">
//           <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
//             Knowledge Corner
//           </span>

//           <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-[#2b1230] sm:text-5xl lg:text-7xl">
//             Ideas, Insights & Brand Stories
//           </h1>

//           <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
//             Explore branding, creative design, marketing, and business growth
//             insights crafted for modern brands.
//           </p>
//         </div>
//       </section>

//       <section className="px-4 py-16 sm:px-6 lg:px-16">
//         <div className="mx-auto max-w-full">
//           <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-primary/15 pb-6">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
//                 Latest Articles
//               </p>
//               <h2 className="mt-2 text-3xl font-bold text-[#2b1230]">
//                 Stories Behind Brand Building
//               </h2>
//             </div>

//             <Link
//               href="/"
//               className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6f214d]"
//             >
//               Back To Home
//             </Link>
//           </div>

//           <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {blogs.map((blog) => (
//               <article
//                 key={blog.id}
//                 className="group overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
//               >
//                 <Link href={`/knowlegecornerDetail?slug=${blog.slug}`}>
//                   <div className="relative h-64 overflow-hidden">
//                     <img
//                       src={blog.image}
//                       alt={blog.title}
//                       className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
//                     />

//                     <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

//                     <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
//                       {blog.category}
//                     </span>
//                   </div>

//                   <div className="p-6">
//                     <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-500">
//                       <span>{blog.date}</span>
//                       <span className="h-1 w-1 rounded-full bg-secondary" />
//                       <span>{blog.readTime}</span>
//                     </div>

//                     <h3 className="text-2xl font-bold leading-snug text-[#2b1230] transition group-hover:text-primary">
//                       {blog.title}
//                     </h3>

//                     <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
//                       {blog.shortDescription}
//                     </p>

//                     <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary">
//                       Read More
//                       <span className="transition group-hover:translate-x-1">
//                         →
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               </article>
//             ))}
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// }

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../config";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { ContactSection } from "../components/ContactSection";

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

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredBlog = blogs[currentIndex];
  const sideBlogs = [];

  for (let i = 1; i <= 3; i++) {
    sideBlogs.push(blogs[(currentIndex + i) % blogs.length]);
  }

  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const res = await axios.post<BlogResponse>(
        `${apiUrl}/blogs`,

        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success) {
        setBlogs(res.data.data || []);
      }
      // if (res.data?.success) {
      //   const testBlogs = [
      //     ...res.data.data,
      //     {
      //       blogId: 100,
      //       blogTitle: "Test Blog 4",
      //       slugname: "test-blog-4",
      //       blogDescription: "Test description 4",
      //       date: "2026-01-01",
      //       blogImage: res.data.data[0]?.blogImage,
      //     },
      //     {
      //       blogId: 101,
      //       blogTitle: "Test Blog 5",
      //       slugname: "test-blog-5",
      //       blogDescription: "Test description 5",
      //       date: "2026-01-02",
      //       blogImage: res.data.data[0]?.blogImage,
      //     },
      //     {
      //       blogId: 102,
      //       blogTitle: "Test Blog 6",
      //       slugname: "test-blog-6",
      //       blogDescription: "Test description 6",
      //       date: "2026-01-03",
      //       blogImage: res.data.data[0]?.blogImage,
      //     },
      //   ];

      //   setBlogs(testBlogs);
      // }
    } catch (error) {
      console.error("Blog API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % blogs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? blogs.length - 1 : prev - 1));
  };

  return (
    <main className="bg-[#efefef]">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-[#f7f5f6]">
        <img
          src="/assets/knowledgecorner/book.png"
          alt="Playbook To Build Your Brand"
          className="block w-full"
        />

        <div className="absolute inset-0 mx-auto flex max-w-[1440px] items-center px-6 md:px-20 lg:px-[30px]">
          <div className="max-w-[600px]">
            <h1 className="text-[#a20d69] text-[32px] md:text-[50px] lg:text-[64px] font-bold leading-[1.1]">
              Playbook To Build Your Brand
            </h1>

            <p className="mt-8 text-[#4d4d4d] text-[16px] md:text-[20px] leading-relaxed">
              Your Go-To Corner For Everything That Makes Brands Sharper,
              Stronger, And Smarter.
            </p>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="py-14">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-6">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "BRAND STRATEGY",
                desc: "Build brands on impactful ideas, insight, and strategy.",
                active: true,
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
            ].map((item, index) => (
              <Link
                href="#"
                key={index}
                className={`group relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 ${
                  item.active
                    ? "bg-gradient-to-r from-[#c92f8d] to-[#730042] text-white border-transparent"
                    : "border-[#c92f8d] bg-transparent hover:border-transparent hover:bg-gradient-to-r hover:from-[#c92f8d] hover:to-[#730042] hover:text-white"
                }`}
              >
                <h3
                  className={`text-lg font-bold tracking-wide transition-colors duration-300 ${
                    item.active
                      ? "text-white"
                      : "text-black group-hover:text-white"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`mt-4 text-sm leading-7 transition-colors duration-300 ${
                    item.active
                      ? "text-white/90"
                      : "text-[#5b5b5b] group-hover:text-white/90"
                  }`}
                >
                  {item.desc}
                </p>

                <div className="absolute bottom-5 right-5">
                  <ArrowUpRight
                    size={18}
                    className={`transition-colors duration-300 ${
                      item.active
                        ? "text-white"
                        : "text-[#555] group-hover:text-white"
                    }`}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG SECTION */}
      <section className="pb-20">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
          ) : blogs.length > 0 ? (
            <>
              <div className="grid lg:grid-cols-[520px_1fr] gap-10 items-start">
                {/* LEFT SIDE */}
                <div className="relative">
                  {/* Current blog image */}
                  <img
                    src={
                      featuredBlog?.blogImage ||
                      "/assets/knowledgecorner/blog-main.png"
                    }
                    alt={featuredBlog?.blogTitle}
                    className="h-[550px] w-full rounded-md object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Title inside big image */}
                  <div className="absolute bottom-12 left-8 z-20 max-w-[380px]">
                    <h2 className="line-clamp-2 text-[26px] font-bold leading-[1.15] text-white">
                      {featuredBlog?.blogTitle}
                    </h2>
                  </div>

                  {/* Arrows */}
                  <div className="absolute bottom-3 left-[75%] z-20 flex gap-4">
                    <button
                      onClick={handlePrev}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#0d4f72]"
                    >
                      <ArrowLeft size={18} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition hover:bg-white hover:text-[#0d4f72]"
                    >
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>

                {/* RIGHT SIDE */}
                <div>
                  <h2 className="text-[#ff7a00] text-xl font-bold uppercase">
                    {featuredBlog?.blogTitle}
                  </h2>

                  <p className="mt-4 text-[#666] text-lg line-clamp-4">
                    {featuredBlog?.blogDescription}
                  </p>

                  <Link
                    href={`/knowlegecornerDetail?slug=${featuredBlog?.slugname}`}
                    className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c92f8d] to-[#730042] px-7 py-3 font-semibold text-white"
                  >
                    Read More
                    <ArrowUpRight size={16} />
                  </Link>

                  {/* BLOG CARDS */}
                  <div className="-ml-28 mt-5 grid grid-cols-3 gap-4">
                    {sideBlogs.map((blog, index) => (
                      <Link
                        href={`/knowlegecornerDetail?slug=${blog.slugname}`}
                        key={`${blog.blogId}-${index}`}
                        className="group overflow-hidden rounded-md"
                      >
                        <div className="relative h-[220px]">
                          <img
                            src={blog.blogImage}
                            alt={blog.blogTitle}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-black/35" />

                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="line-clamp-3 text-lg font-semibold leading-snug text-white">
                              {blog.blogTitle}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-3xl bg-white py-20 text-center">
              <h3 className="text-3xl font-bold">No Blogs Found</h3>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-gradient-to-r from-[#c02a85] to-[#6b003d] py-16">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-center">
            <div>
              <h2 className="text-white text-4xl lg:text-5xl font-bold">
                No decks. No jargon. Just an Honest Conversation.
              </h2>

              <p className="mt-4 text-white text-xl">
                Let's catch up over a cup of coffee !
              </p>

              <div className="mt-10 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    className="h-12 rounded-md px-4 bg-white"
                  />

                  <input
                    placeholder="Email"
                    className="h-12 rounded-md px-4 bg-white"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    placeholder="Company Name"
                    className="h-12 rounded-md px-4 bg-white"
                  />

                  <input
                    placeholder="Phone Number"
                    className="h-12 rounded-md px-4 bg-white"
                  />
                </div>

                <textarea
                  placeholder="What solution are you looking for?"
                  rows={4}
                  className="w-full rounded-md p-4 bg-white"
                />

                <button className="w-full rounded-full border border-white/30 bg-white/20 py-3 font-semibold text-white">
                  Let's Connect
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <img
                src="/assets/knowledgecorner/coffee-cups.png"
                alt="Coffee"
                className="max-w-[340px]"
              />
            </div>
          </div>
        </div>
      </section> */}
      <ContactSection />
    </main>
  );
}
