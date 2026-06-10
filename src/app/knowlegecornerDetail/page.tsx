"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";

type BlogDetailResponse = {
  message: string;
  success: boolean;
  data: BlogDetail | null;
};
type RecentBlog = {
  blogId: number;
  blogTitle: string;
  blogImage: string;
  slugname: string;
  date: string;
};

type BlogDetail = {
  blogId: number;
  blogTitle: string;
  slugname: string;
  blogDescription: string;
  date: string;
  metaTitle: string;
  metaKeyword: string;
  metaDescription: string;
  head: string;
  body: string;
  blogImage: string;
  recentBlogs: RecentBlog[];
};
function BlogDetailContent() {
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  const [blog, setBlog] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (url: string) => {
    if (!url) return "";

    return url.replace(
      "http://127.0.0.1:8000",
      "https://purplephase.in/ppcadmin"
    );
  };

  const fetchBlogDetail = async () => {
    if (!slug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post<BlogDetailResponse>(
        `${apiUrl}/blogdetails`,
        {
          slugname: slug,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success && res.data?.data) {
        setBlog(res.data.data);
      } else {
        setBlog(null);
      }
    } catch (error) {
      console.error("Blog detail API error:", error);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3f6] px-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f3f6] px-4">
        <div className="max-w-xl rounded-[30px] bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-bold text-[#2b1230]">
            Blog Not Found
          </h1>

          <p className="mt-4 text-gray-600">
            This blog detail is not available. Please go back to blog page.
          </p>

          <Link
            href="/blog"
            className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-[#6f214d]"
          >
            Back To Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f3f6] text-[#1f1f1f]">
      <section className="relative overflow-hidden bg-[#e5e5e5] px-4 py-16 sm:px-6 lg:px-16">
        <div className="relative mx-auto max-w-full">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-primary transition hover:text-secondary"
          >
            ← Back To Blog
          </Link>

          <div className="rounded-[34px] bg-white p-6 shadow-xl sm:p-10">
            <span className="mb-5 inline-flex rounded-full bg-primary/10 px-5 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary">
              Blog
            </span>

            <h1 className="max-w-full text-4xl font-bold leading-tight text-[#2b1230] sm:text-5xl lg:text-6xl">
              {blog.blogTitle}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-medium uppercase tracking-wider text-gray-500">
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


          </div>
        </div>
      </section>

      <section className="px-4 pt-16 sm:px-6 lg:px-16">
        <div className="mx-auto max-w-full ">
          <div className="overflow-hidden rounded-[36px] shadow-2xl">
            <img
              src={getImageUrl(blog.blogImage)}
              alt={blog.blogTitle}
              className="h-75 w-full object-cover sm:h-120"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px]">
          <article className="rounded-[34px] bg-white p-6 shadow-sm sm:p-10">

            <h2 className="mb-6 text-3xl font-bold leading-tight text-[#2b1230]">
              Description
            </h2>


            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
              {blog.blogDescription}
            </p>

            <div className="mt-10 rounded-[28px] bg-[#2b1230] p-8 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-secondary">
                Brand Note
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Creativity works best when strategy is clear.
              </h2>

              <p className="mt-4 leading-7 text-white/75">
                Every strong brand is built through listening, understanding,
                storytelling, design, and consistent execution.
              </p>
            </div>
          </article>

          <aside className="h-fit rounded-[34px] bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-[#2b1230]">
              Related Blogs
            </h3>

            <div className="mt-6 space-y-5">
              {blog.recentBlogs && blog.recentBlogs.length > 0 ? (
                blog.recentBlogs.map((item) => (
                  <Link
                    key={item.blogId}
                    href={`/knowlegecornerDetail?slug=${item.slugname}`}
                    className="group block overflow-hidden rounded-2xl border border-gray-100 bg-white transition hover:border-primary/30 hover:bg-[#f8f3f6]"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-[#e5e5e5]">
                        <img
                          src={getImageUrl(item.blogImage)}
                          alt={item.blogTitle}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>

                      <div className="flex-1">
                        <h4 className="line-clamp-2 text-sm font-bold leading-snug text-[#2b1230] transition group-hover:text-primary">
                          {item.blogTitle}
                        </h4>

                        <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-secondary">
                          {new Date(item.date).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-500">
                  No related blogs found.
                </div>
              )}
            </div>

            <div className="mt-8 rounded-[26px] bg-primary p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                Need Branding?
              </p>

              <h4 className="mt-3 text-2xl font-bold">
                Let’s build your brand story.
              </h4>

              <Link
                href="/contact"
                className="mt-5 inline-flex rounded-full bg-white px-5 py-3 text-sm font-bold text-primary transition hover:bg-secondary hover:text-white"
              >
                Contact Now
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}


export default function BlogDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
          <div className="w-12 h-12 border-4 border-t-[#A62666] border-[#A62666]/20 rounded-full animate-spin" />
        </div>
      }
    >
      <BlogDetailContent />
    </Suspense>
  );
}