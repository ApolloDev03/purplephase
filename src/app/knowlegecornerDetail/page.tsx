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

import { FaXTwitter } from "react-icons/fa6";

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
      <section className="mx-auto max-w-[1440px] px-6 md:px-20 lg:px-[30px] pt-10">
        <h1 className="text-[32px] font-bold text-[#A62666]">
          {blog.blogTitle}
        </h1>

        <div className="mt-8">
          <img
            src={getImageUrl(blog.blogImage)}
            alt={blog.blogTitle}
            className="w-full object-cover h-[500px]"
          />
        </div>

        <div className="mt-8">
          <p className="text-[14px] leading-[15px] text-[#666] whitespace-pre-line">
            {showFullText
              ? blog.blogDescription
              : `${blog.blogDescription.slice(0, 500)}...`}
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          {blog.blogDescription.length > 500 && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="rounded-full bg-[#A62666] px-8 py-2 text-xs font-semibold text-white"
              >
                {showFullText ? "Read Less" : "Read More"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 bg-gradient-to-r from-[#B92D7A] to-[#730046] py-10">
        <div className="text-center">
          <h2 className="text-[28px] font-bold uppercase text-white">
            Curious About Brand Strategy ?
          </h2>

          <button
            onClick={() => setIsPopupOpen(true)}
            className="glass-btn mt-6 inline-flex h-[44px] items-center justify-center gap-2 rounded-full px-8 font-semibold text-white"
          >
            Stay Connected
            <span>↗</span>
          </button>
        </div>
      </section>
      <AnimatePresence>
        {isPopupOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPopupOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed left-1/2 top-1/2 z-[100] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-8 shadow-2xl"
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
