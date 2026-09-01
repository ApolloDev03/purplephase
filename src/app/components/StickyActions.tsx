

"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  ChevronUp,
  Search,
  X,
} from "lucide-react";

import { FaWhatsapp } from "react-icons/fa";

import { useSidebar } from "./SidebarContext";

import faqsicon from "../assets/faqs.png";

import { apiUrl } from "../config";

/* =====================================================
   TYPES
===================================================== */

type FAQItem = {
  id: number;
  question: string;
  answer: string;
};

type FAQResponse = {
  success: boolean;
  message: string;
  data: FAQItem[];
};

/* =====================================================
   COMPONENT
===================================================== */

export default function StickyActions() {
  const { isSidebarOpen } = useSidebar();

  /* =====================================================
     STATES
  ===================================================== */

  const [showTop, setShowTop] =
    useState(false);

  const [faqOpen, setFaqOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [faqs, setFaqs] =
    useState<FAQItem[]>([]);

  const [faqLoading, setFaqLoading] =
    useState(true);

  const [faqError, setFaqError] =
    useState("");

  /* =====================================================
     SCROLL TO TOP BUTTON
  ===================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(
        window.scrollY > 200
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =====================================================
     FAQ API CALL
     POST METHOD
  ===================================================== */

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setFaqLoading(true);
        setFaqError("");

        const response =
          await axios.post<FAQResponse>(
            `${apiUrl}/faqlist`,
            {},
            {
              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        console.log(
          "FAQ API Response:",
          response.data
        );

        if (
          response.data?.success
        ) {
          setFaqs(
            response.data.data ?? []
          );
        } else {
          setFaqs([]);

          setFaqError(
            response.data?.message ||
              "Failed to fetch FAQs."
          );
        }
      } catch (error) {
        console.error(
          "FAQ list API error:",
          error
        );

        setFaqs([]);

        setFaqError(
          "Something went wrong while loading FAQs."
        );
      } finally {
        setFaqLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  /* =====================================================
     SCROLL TOP
  ===================================================== */

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     SEARCH FAQ
     QUESTION + ANSWER
  ===================================================== */

  const filteredFaqs =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      if (!searchValue) {
        return faqs;
      }

      return faqs.filter(
        (faq) => {
          const question =
            faq.question
              ?.toLowerCase() ||
            "";

          const answer =
            faq.answer
              ?.toLowerCase() ||
            "";

          return (
            question.includes(
              searchValue
            ) ||
            answer.includes(
              searchValue
            )
          );
        }
      );
    }, [faqs, search]);

  /* =====================================================
     CLOSE FAQ
  ===================================================== */

  const closeFaqSidebar = () => {
    setFaqOpen(false);
    setSearch("");
  };

  /* =====================================================
     ESC KEY CLOSE
  ===================================================== */

  useEffect(() => {
    if (!faqOpen) return;

    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (
        event.key === "Escape"
      ) {
        closeFaqSidebar();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [faqOpen]);

  /* =====================================================
     BODY SCROLL LOCK
  ===================================================== */

  useEffect(() => {
    if (!faqOpen) return;

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [faqOpen]);

  /* =====================================================
     RETURN
  ===================================================== */

  return (
    <>
      {/* =================================================
          STICKY BUTTONS
      ================================================= */}

      <div
        className={`
          fixed
          bottom-6
          z-[999]

          flex
          flex-col
          items-center
          gap-3

          transition-all
          duration-500
          ease-in-out

          ${
            isSidebarOpen
              ? `
                right-[calc(min(15rem,100vw)+16px)]

                lg:right-[calc(min(17rem,100vw)+16px)]

                xl:right-[calc(min(28rem,100vw)+16px)]
              `
              : `
                right-4

                md:right-6
              `
          }
        `}
      >
        {/* =============================================
            WHATSAPP
        ============================================= */}

        <a
          href="https://wa.me/919327009400"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="
            flex

            h-8
            w-8

            items-center
            justify-center

            rounded-md

            bg-[#25D366]

            shadow-lg

            transition

            hover:scale-105

            lg:h-9
            lg:w-9

            xl:h-11
            xl:w-11
          "
        >
          <FaWhatsapp
            className="
              text-[25px]
              text-white

              xl:text-[30px]
            "
          />
        </a>

        {/* =============================================
            FAQ BUTTON
        ============================================= */}

        <button
          type="button"
          onClick={() =>
            setFaqOpen(true)
          }
          aria-label="FAQs"
          className="
            flex

            h-8
            w-8

            items-center
            justify-center

            rounded-md

            bg-[#F58220]

            shadow-lg

            transition

            hover:scale-105

            lg:h-9
            lg:w-9

            xl:h-11
            xl:w-11
          "
        >
          <img
            src={faqsicon.src}
            alt="FAQ"
            className="
              h-8
              w-8

              object-contain

              lg:h-9
              lg:w-9

              xl:h-10
              xl:w-10
            "
          />
        </button>

        {/* =============================================
            SCROLL TO TOP
        ============================================= */}

        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Go to top"
          className={`
            flex

            h-8
            w-8

            items-center
            justify-center

            rounded-md

            bg-white

            shadow-lg

            transition-all
            duration-300

            hover:scale-105

            lg:h-9
            lg:w-9

            xl:h-11
            xl:w-11

            ${
              showTop
                ? `
                  visible
                  translate-y-0
                  opacity-100
                `
                : `
                  invisible
                  pointer-events-none
                  translate-y-2
                  opacity-0
                `
            }
          `}
        >
          <ChevronUp
            strokeWidth={3}
            className="
              h-8
              w-8

              text-gray-600

              lg:h-9
              lg:w-9

              xl:h-10
              xl:w-10
            "
          />
        </button>
      </div>

      {/* =================================================
          FAQ BACKDROP
      ================================================= */}

      <div
        onClick={closeFaqSidebar}
        className={`
          fixed
          inset-0

          z-[999]

          bg-black/40

          backdrop-blur-[2px]

          transition-all
          duration-500

          ${
            faqOpen
              ? `
                visible
                opacity-100
              `
              : `
                invisible
                pointer-events-none
                opacity-0
              `
          }
        `}
      />

      {/* =================================================
          FAQ SIDEBAR
      ================================================= */}

      <div
        className={`
          fixed

          right-0
          top-0

          z-[1000]

          flex

          h-[100dvh]
          w-full

          flex-col

          bg-white

          shadow-2xl

          transition-transform
          duration-500
          ease-in-out

          sm:w-[430px]

          lg:w-[460px]

          xl:w-[500px]

          ${
            faqOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* =============================================
            HEADER
        ============================================= */}

        <div
          className="
            flex
            shrink-0

            items-center
            justify-between

            border-b
            border-primary

            px-5
            py-4
          "
        >
          <div>
            <h4
              className="
                !m-0

                text-xl
                font-bold

                text-primary

                lg:text-3xl
              "
            >
              FAQs
            </h4>

            {!faqLoading &&
              !faqError &&
              faqs.length > 0 && (
                <p
                  className="
                    mt-1

                    !text-[12px]

                    text-gray-500
                  "
                >
                  {faqs.length} FAQs
                  available
                </p>
              )}
          </div>

          <button
            type="button"
            onClick={
              closeFaqSidebar
            }
            aria-label="Close FAQs"
            className="
              flex

              h-9
              w-9

              items-center
              justify-center

              rounded-full

              bg-gray-100

              transition

              hover:bg-primary
              hover:text-white
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* =============================================
            SEARCH
        ============================================= */}

        <div
          className="
            shrink-0

            border-b
            border-primary/20

            p-4
          "
        >
          <div
            className="
              flex

              items-center

              gap-2

              rounded-lg

              border
              border-primary

              px-3
              py-2.5

              transition

              focus-within:ring-2
              focus-within:ring-primary/15
            "
          >
            <Search
              className="
                h-5
                w-5

                shrink-0

                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Search FAQs..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full

                border-none

                bg-transparent

                !text-sm

                text-gray-700

                outline-none

                placeholder:text-gray-400
              "
            />

            {search && (
              <button
                type="button"
                onClick={() =>
                  setSearch("")
                }
                aria-label="Clear search"
                className="
                  flex

                  h-6
                  w-6

                  shrink-0

                  items-center
                  justify-center

                  rounded-full

                  bg-gray-100

                  transition

                  hover:bg-gray-200
                "
              >
                <X
                  className="
                    h-3.5
                    w-3.5
                  "
                />
              </button>
            )}
          </div>

          {/* SEARCH COUNT */}

          {search &&
            !faqLoading && (
              <p
                className="
                  mt-2

                  !text-[12px]

                  text-gray-500
                "
              >
                {
                  filteredFaqs.length
                }{" "}
                result
                {filteredFaqs.length !==
                1
                  ? "s"
                  : ""}{" "}
                found
              </p>
            )}
        </div>

        {/* =============================================
            FAQ CONTENT
        ============================================= */}

        <div
          className="
            min-h-0

            flex-1

            overflow-y-auto

            p-4
          "
        >
          {/* ===========================================
              LOADING
          =========================================== */}

          {faqLoading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="
                      animate-pulse

                      rounded-xl

                      border
                      border-gray-200

                      p-4
                    "
                  >
                    <div
                      className="
                        h-4
                        w-[85%]

                        rounded

                        bg-gray-200
                      "
                    />

                    <div
                      className="
                        mt-3

                        h-3
                        w-full

                        rounded

                        bg-gray-100
                      "
                    />

                    <div
                      className="
                        mt-2

                        h-3
                        w-[75%]

                        rounded

                        bg-gray-100
                      "
                    />
                  </div>
                )
              )}
            </div>
          )}

          {/* ===========================================
              ERROR
          =========================================== */}

          {!faqLoading &&
            faqError && (
              <div
                className="
                  rounded-xl

                  border
                  border-red-200

                  bg-red-50

                  p-5

                  text-center
                "
              >
                <p
                  className="
                    !text-sm

                    font-medium

                    text-red-600
                  "
                >
                  {faqError}
                </p>
              </div>
            )}

          {/* ===========================================
              FAQ LIST
          =========================================== */}

          {!faqLoading &&
            !faqError &&
            filteredFaqs.length >
              0 && (
              <div className="space-y-3">
                {filteredFaqs.map(
                  (faq) => (
                    <div
                      key={faq.id}
                      className="
                        rounded-xl

                        border
                        border-primary/40

                        bg-white

                        p-4

                        transition-all
                        duration-300

                        hover:border-primary

                        hover:shadow-md
                        hover:shadow-primary/5
                      "
                    >
                      {/* QUESTION */}

                      <h4
                        className="
                          !m-0

                          !text-[15px]
                          !font-bold
                          !leading-[1.5]

                          !text-black

                          lg:!text-[16px]
                        "
                      >
                        {
                          faq.question
                        }
                      </h4>

                      {/* ANSWER */}

                      <p
                        className="
                          !mb-0
                          !mt-2

                          !text-[13px]

                          !leading-[1.7]

                          !text-gray-600

                          lg:!text-[14px]
                        "
                      >
                        {
                          faq.answer
                        }
                      </p>
                    </div>
                  )
                )}
              </div>
            )}

          {/* ===========================================
              NO RESULT
          =========================================== */}

          {!faqLoading &&
            !faqError &&
            filteredFaqs.length ===
              0 && (
              <div
                className="
                  flex

                  min-h-[250px]

                  flex-col

                  items-center
                  justify-center

                  px-5

                  text-center
                "
              >
                <Search
                  className="
                    mb-3

                    h-10
                    w-10

                    text-gray-300
                  "
                />

                <h5
                  className="
                    text-base

                    font-semibold

                    text-gray-700
                  "
                >
                  No FAQs found
                </h5>

                <p
                  className="
                    mt-1

                    !text-[13px]

                    text-gray-500
                  "
                >
                  Try searching with
                  another keyword.
                </p>

                {search && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearch("")
                    }
                    className="
                      mt-4

                      rounded-md

                      bg-primary

                      px-4
                      py-2

                      !text-[13px]

                      text-white

                      transition

                      hover:opacity-90
                    "
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
        </div>
      </div>
    </>
  );
}