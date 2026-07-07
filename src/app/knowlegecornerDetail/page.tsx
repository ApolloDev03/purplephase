"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { apiUrl } from "../config";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";

import {
  FaBehance,
  FaPinterestP,
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

import { FaArrowDownLong, FaArrowUpLong, FaXTwitter } from "react-icons/fa6";
import { LuMoveUpRight } from "react-icons/lu";

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
  const [showFullText, setShowFullText] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const socials = [
    {
      name: "Behance",
      icon: <FaBehance />,
      href: "https://www.behance.net/purple_phase",
    },
    {
      name: "Pinterest",
      icon: <FaPinterestP />,
      href: "https://in.pinterest.com/purple_phase_communications",
    },
    {
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/purple_phase_communications/",
    },
    {
      name: "Linkedin",
      icon: <FaLinkedinIn />,
      href: "https://www.linkedin.com/company/purple-phase-communications",
    },
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      href: "https://www.facebook.com/PurplePhaseCommunications/",
    },
    {
      name: "Twitter",
      icon: <FaXTwitter />,
      href: "#",
    },
    {
      name: "Youtube",
      icon: <FaYoutube />,
      href: "https://www.youtube.com/@purplephasecommunications",
    },
  ];

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
          <h1 className="text-3xl font-bold text-[#2b1230]">Blog Not Found</h1>

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
    <main className="min-h-screen bg-[#ECECEC]">
      {/* TOP AREA */}
      <section className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32 py-16">
        <h2 className=" text-[#A62666]">
          {blog.blogTitle}
        </h2>

        <div className="mt-8">
          <img
            src={getImageUrl(blog.blogImage)}
            alt={blog.blogTitle}
            className="w-full object-cover h-[836px]"
          />
        </div>

        <div className="mt-8">
          <p className=" leading-[10px] text-[#424242] whitespace-pre-line">
            {showFullText
              ? blog.blogDescription
              : `${blog.blogDescription.slice(0, 500)}...`}
          </p>
        </div>

    {blog.blogDescription.length > 500 && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.45 }}
    className="mt-10 flex justify-center"
  >
    <button
      onClick={() => setShowFullText(!showFullText)}
      className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:text-[20px] 2xl:text-[24px]"
    >
      {showFullText ? "Read Less" : "Read More"}

      <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        {showFullText ? (
          <FaArrowUpLong className="h-4 w-4" />
        ) : (
          <FaArrowDownLong className="h-4 w-4" />
        )}
      </span>
    </button>
  </motion.div>
)}
      </section>

      {/* CTA */}
          <section className="bg-gradient-to-r from-[#bf2f86] to-[#730041]">
                <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center px-6 py-9 text-center md:px-20 lg:px-[115px]">
                  <h3 className="font-bold uppercase tracking-wide text-white text-3xl md:text-5xl lg:text-3xl">
                   Curious About Brand Strategy ?
                  </h3>
         <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.45 }}
                                           onClick={() => setIsPopupOpen(true)}
                                            className="mt-5 flex justify-center lg:justify-start"
                                        >
                                            <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-[#720048] px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                                               Stay Connected
                    
                                                <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                                    <LuMoveUpRight className="h-5 w-5" />
                                                </span>
                                            </button>
                                        </motion.div>
               
                </div>
              </section>
   
      <AnimatePresence>
        {isPopupOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-999 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-999 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
            >
              <button
                onClick={() => setIsPopupOpen(false)}
                className="absolute right-5 top-5"
              >
                <IoCloseOutline size={30} />
              </button>

              <h3 className="mb-8 text-center text-2xl font-bold text-primary">
                Stay Connected
              </h3>

              <div className="grid grid-cols-2 gap-y-6">
                {socials.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    className="flex items-center gap-4 rounded-xl p-3 transition hover:bg-[#f6f6f6]"
                  >
                    <div className="text-2xl text-primary">{item.icon}</div>

                    <span className="font-medium">{item.name}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
