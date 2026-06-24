"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { RotateCcw, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import Breadcrumb from "../components/breadcrumb";
import { apiUrl } from "../config";
import { useRouter } from "next/navigation";

type CareerItem = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

type CareerListResponse = {
  success: boolean;
  message: string;
  data: CareerItem[];
};

type CareerFormResponse = {
  success: boolean;
  message: string;
};

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  qualification: string;
  resume: File | null;
  captcha: string;
};

export default function CareerPage() {
  const [careers, setCareers] = useState<CareerItem[]>([]);
  const [loadingCareers, setLoadingCareers] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [openCareerId, setOpenCareerId] = useState<number | null>(null);

  const [captchaCode, setCaptchaCode] = useState<string>("8227");

  const [formData, setFormData] = useState<FormDataType>({
    first_name: "",
    last_name: "",
    email: "",
    contact_no: "",
    qualification: "",
    resume: null,
    captcha: "",
  });
  const router = useRouter();

  useEffect(() => {
    fetchCareers();
    generateCaptcha();
  }, []);

  const fetchCareers = async (): Promise<void> => {
    try {
      setLoadingCareers(true);

      const res = await axios.post<CareerListResponse>(
        `${apiUrl}/careerlist`,
        {},
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (res.data?.success) {
        setCareers(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Career list not found.");
      }
    } catch (error) {
      console.error("Career list error:", error);
      toast.error("Failed to load career list.");
    } finally {
      setLoadingCareers(false);
    }
  };

  const generateCaptcha = (): void => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setCaptchaCode(randomCode);

    setFormData((prev) => ({
      ...prev,
      captcha: "",
    }));
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0] || null;

    setFormData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.first_name.trim()) {
      toast.error("Please enter first name.");
      return;
    }

    if (!formData.last_name.trim()) {
      toast.error("Please enter last name.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter email.");
      return;
    }

    if (!formData.contact_no.trim()) {
      toast.error("Please enter contact number.");
      return;
    }

    if (!formData.qualification.trim()) {
      toast.error("Please enter qualification.");
      return;
    }

    if (!formData.resume) {
      toast.error("Please upload resume.");
      return;
    }

    if (formData.captcha.trim() !== captchaCode) {
      toast.error("Invalid captcha. Please try again.");
      return;
    }

    try {
      setSubmitLoading(true);

      const payload = new FormData();
      payload.append("first_name", formData.first_name);
      payload.append("last_name", formData.last_name);
      payload.append("email", formData.email);
      payload.append("contact_no", formData.contact_no);
      payload.append("qualification", formData.qualification);
      payload.append("resume", formData.resume);

      const res = await axios.post<CareerFormResponse>(
        `${apiUrl}/careerform`,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "Your application has been submitted successfully."
        );

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          contact_no: "",
          qualification: "",
          resume: null,
          captcha: "",
        });

        const fileInput = document.getElementById(
          "resume"
        ) as HTMLInputElement | null;

        if (fileInput) {
          fileInput.value = "";
        }

        generateCaptcha();

        setTimeout(() => {
          router.push("/career-thank-you");
        }, 1500);
      } else {
        toast.error(
          res.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error: unknown) {
      console.error("Career form submit error:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      {/* <Breadcrumb /> */}

      <section className="bg-[#eeeeee] font-body text-[#3d3d3d]">
        {/* HERO */}
        <div className="relative w-full overflow-hidden bg-[#f7f5f6]">
          <img
            src="/assets/career/career-hero.jpg"
            alt="Great Work Needs Great People"
            className="block h-auto w-full"
          />

          <div className="absolute inset-0 mx-auto flex max-w-[1440px] items-center px-6 md:px-20 lg:px-[30px]">
            <h1 className="font-heading text-[26px] font-bold leading-[1.18] text-[#a20d69] md:text-[34px] lg:text-[42px]">
              Great Work Needs <br />
              Great People
            </h1>
          </div>
        </div>

        {/* INTRO CONTENT */}
        <div className="bg-[#eeeeee]">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-20 lg:px-[25px]">
            <h1 className="max-w-[1050px] font-heading text-[25px] font-bold uppercase leading-[1.25] tracking-[0.02em] text-[#a20d69] md:text-[32px] lg:text-[36px]">
              We Believe Great Brands Are Built By People{" "}
              <br className="hidden md:block" />
              Who Never Stop Learning.
            </h1>

            <div className="mt-7 max-w-[1080px] space-y-6 text-[18px] leading-[1.75] text-[#555] md:text-[17px]">
              <p>
                Some of us started when billboards were painted by hand. Some of
                us work with AI every day. Together, we combine legacy with new
                thinking.
              </p>

              <p>
                Here, curiosity matters more than hierarchy. Ideas matter more
                than titles. Creative freedom, meaningful growth, exciting
                assignments, and a culture where a thousand no&apos;s shape a
                single yes are all part of the journey.
              </p>

              <p className="font-bold uppercase leading-[1.55] text-[#ff7900] text-[20px]">
                We Are Ambitious, Opinionated, <br />
                And Hungry To Do The Best Work... Every Time.
              </p>

              <p>
                If that sounds like your kind of team, we would love to hear
                from you.
                <br />
                Bring your curiosity, your point of view, and your hunger to
                create exceptional work.
              </p>
            </div>
          </div>
        </div>

        {/* LIFE SECTION + OPENINGS */}
        <div className="bg-[#eeeeee]">
          <div className="mx-auto max-w-[1440px] px-6 pb-14 md:px-20 lg:px-[25px]">
            <h2 className="mb-8 font-heading text-[26px] font-bold uppercase tracking-[0.03em] text-[#a20d69] md:text-[32px]">
              Life @ Purple Phase
            </h2>

            {/*COLLAGE */}
            <div className="relative hidden h-[400px] w-full overflow-hidden md:block">
              {/* Top left big image */}
              <img
                src="/assets/career/life-1.png"
                alt="Life at Purple Phase"
                className="absolute left-0 top-0 h-[200px] w-[31%] rounded-md object-cover object-[center_35%]"
              />

              {/* Top small image */}
              <img
                src="/assets/career/life-2.png"
                alt="Life at Purple Phase"
                className="absolute left-[32%] top-0 h-[200px] w-[15%] rounded-md object-cover object-[center_35%]"
              />

              {/* Bottom left grey box */}
              <div className="absolute left-0 top-[205px] h-[190px] w-[16.5%] rounded-md bg-[#d7d7d7]" />

              {/* Bottom middle group image */}
              <img
                src="/assets/career/life-5.jpg"
                alt="Life at Purple Phase"
                className="absolute left-[17.4%] top-[205px] h-[190px] w-[29.6%] rounded-md object-cover object-[center_20%]"
              />

              {/* Center cartoon */}
              <img
                src="/assets/career/life-3.jpg"
                alt="Life at Purple Phase"
                className="absolute left-[48%] top-0 h-[400px] w-[20.5%] rounded-md object-cover object-center"
              />

              {/* Top right grey box */}
              <div className="absolute left-[69.5%] top-0 h-[200px] w-[30.5%] rounded-md bg-[#d7d7d7]" />

              {/* Bottom right image */}
              <img
                src="/assets/career/life-4.png"
                alt="Life at Purple Phase"
                className="absolute left-[69.5%] top-[205px] h-[190px] w-[30.5%] rounded-md object-cover object-[center_85%]"
              />
            </div>

            {/* MOBILE COLLAGE */}
            <div className="grid grid-cols-1 gap-3 md:hidden">
              <img
                src="/assets/career/life-1.png"
                alt="Life at Purple Phase"
                className="h-[180px] w-full rounded-md object-cover"
              />

              <img
                src="/assets/career/life-2.png"
                alt="Life at Purple Phase"
                className="h-[180px] w-full rounded-md object-cover"
              />

              <img
                src="/assets/career/life-3.jpg"
                alt="Life at Purple Phase"
                className="h-[260px] w-full rounded-md object-cover"
              />

              <img
                src="/assets/career/life-4.png"
                alt="Life at Purple Phase"
                className="h-[180px] w-full rounded-md object-cover"
              />
            </div>

            {/* Career opening accordion */}
            <div className="mt-8 space-y-[14px]">
              {loadingCareers ? (
                <div className="rounded-md bg-[#dedede] px-7 py-4 text-center text-[15px] font-semibold text-[#333]">
                  Loading openings...
                </div>
              ) : careers.length > 0 ? (
                careers.map((career) => {
                  const isOpen = openCareerId === career.id;

                  return (
                    <div key={career.id} className="overflow-hidden rounded-md">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenCareerId(isOpen ? null : career.id)
                        }
                        className={`grid w-full grid-cols-[1fr_120px_120px_30px] items-center rounded-md px-8 py-[15px] text-left transition ${
                          isOpen
                            ? "bg-gradient-to-r from-[#c22c86] to-[#780040] text-white"
                            : "bg-[#dedede] text-[#111]"
                        }`}
                      >
                        <span className="text-[18px] font-bold leading-none">
                          {career.title}
                        </span>

                        <span className="hidden text-[15px] font-normal leading-none md:block">
                          Full Time
                        </span>

                        <span className="hidden text-[15px] font-normal leading-none md:block">
                          On site
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          className="flex items-center justify-end text-[26px] font-light leading-none"
                        >
                          {isOpen ? "−" : "+"}
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden rounded-b-md bg-white"
                          >
                            <div className="px-8 py-5">
                              <p className="whitespace-pre-line text-[15px] leading-7 text-[#444]">
                                {career.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })
              ) : (
                <div className="rounded-md bg-[#dedede] px-7 py-4 text-center text-[15px] font-semibold text-[#333]">
                  No openings found.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* APPLY FORM */}
        <div className="bg-gradient-to-r from-[#bf2f86] to-[#720040]">
          <div
            className="mx-auto grid max-w-[1440px]
    grid-cols-1
    items-center
    gap-4
    px-6 py-10
    md:grid-cols-[1.15fr_0.85fr]
    md:px-20"
          >
            <div>
              <h2 className="font-heading text-[28px] font-bold text-white md:text-[40px]">
                Ready to Build Brands with Us?
              </h2>

              <p className="mt-3 text-[18px] text-white/90">
                We would love to hear from you.
              </p>

              <form onSubmit={handleSubmit} className="mt-7 max-w-[700px]">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />

                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />

                  <input
                    type="text"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />

                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="Qualification"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />

                  <div className="flex h-[40px] items-center overflow-hidden rounded-md bg-white px-3">
                    <input
                      id="resume"
                      type="file"
                      name="resume"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="w-full text-[12px] text-[#333] file:mr-3 file:rounded-sm file:border-0 file:bg-[#efefef] file:px-3 file:py-1 file:text-[11px] file:text-[#333]"
                    />
                  </div>

                  <div className="flex h-[40px] overflow-hidden rounded-md bg-white">
                    <div className="flex flex-1 items-center justify-center text-[14px] font-bold tracking-[0.25em] text-[#a20d69]">
                      {captchaCode}
                    </div>

                    <button
                      type="button"
                      onClick={generateCaptcha}
                      className="flex w-[38px] items-center justify-center text-[#a20d69]"
                      aria-label="Refresh captcha"
                    >
                      <RotateCcw size={15} />
                    </button>
                  </div>

                  <input
                    type="text"
                    name="captcha"
                    value={formData.captcha}
                    onChange={handleChange}
                    placeholder="Enter Captcha"
                    className="h-[40px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#858585]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="mt-3 h-[42px] w-full rounded-full border border-white/30 bg-white/25 text-[14px] font-semibold text-white transition hover:bg-white/35"
                >
                  {submitLoading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>

            <div className="hidden md:flex items-center justify-center">
              <img
                src="/assets/career/apply-people.png"
                alt="Ready to Build Brands"
                className="w-[600px] object-contain"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
