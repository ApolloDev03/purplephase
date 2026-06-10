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
    } catch (error) {
      console.error("Blog API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f3f6] text-[#1f1f1f]">
      <section className="relative overflow-hidden bg-[#e5e5e5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-6xl text-center">
          <span className="mb-4 inline-flex rounded-full border border-primary/20 bg-white px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Knowledge Corner
          </span>

          <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-[#2b1230] sm:text-5xl lg:text-7xl">
            Ideas, Insights & Brand Stories
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
            Explore branding, creative design, marketing, and business growth
            insights crafted for modern brands.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-full">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-primary/15 pb-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Latest Articles
              </p>

              <h2 className="mt-2 text-3xl font-bold text-[#2b1230]">
                Stories Behind Brand Building
              </h2>
            </div>

            <Link
              href="/"
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6f214d]"
            >
              Back To Home
            </Link>
          </div>

          {loading ? (
            <div className="flex min-h-75 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <article
                  key={`${blog.blogId}-${index}`}
                  className="group overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <Link href={`/knowlegecornerDetail?slug=${blog.slugname}`}>
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={blog.blogImage}
                        alt={blog.blogTitle}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

                      <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary">
                        Blog
                      </span>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                        <span>
                          {new Date(blog.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>

                        <span className="h-1 w-1 rounded-full bg-secondary" />

                        <span>5 Min Read</span>
                      </div>

                      <h3 className="text-2xl font-bold leading-snug text-[#2b1230] transition group-hover:text-primary">
                        {blog.blogTitle}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-gray-600">
                        {blog.blogDescription}
                      </p>

                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary">
                        Read More
                        <span className="transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] bg-white px-6 py-16 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-[#2b1230]">
                No Blogs Found
              </h3>

              <p className="mt-3 text-gray-600">
                Blog data is not available right now.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}