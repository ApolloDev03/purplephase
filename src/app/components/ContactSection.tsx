"use client";

import { useState } from "react";
import axios from "axios";
import logo from "../assets/coffee cups.png";
import { toast } from "react-toastify";
import { apiUrl } from "../config";
import {
  motion
} from "framer-motion";
import { useRouter } from "next/navigation";
export function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    phone_number: "",
    solution: "",
  });
const router = useRouter();
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const captchaQuestion = "5 + 3";
  const correctCaptcha = "8";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (captchaAnswer !== correctCaptcha) {
      toast.error("Please enter correct captcha answer.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${apiUrl}/Homeinquery`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data?.success) {
        toast.success(res.data?.message || "Inquiry submitted successfully.");

        setFormData({
          full_name: "",
          email: "",
          company_name: "",
          phone_number: "",
          solution: "",
        });

        setCaptchaAnswer("");

         router.push("/inquiry-thank-you");
      } else {
        toast.error(res.data?.message || "Failed to submit inquiry.");
      }
    } catch (err: any) {
      console.error("Home Inquiry API Error:", err);

      const errorMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Something went wrong. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)] py-16 xl:py-[85px]">
      <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
        {/* Heading */}
          <h4 className="text-[28px] mb-4 font-semibold leading-tight tracking-wide text-white md:text-[38px] lg:text-[40px] 2xl:text-[50px]">
            No decks. No jargon. Just an Honest Conversation.
          </h4>

          <span className=" text-[22px]  font-medium leading-tight text-white md:text-[28px] 2xl:text-[36px]">
            Let’s catch up over a cup of coffee !
          </span>

        <div className="grid grid-cols-1  items-center   lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7 ">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="h-[61px] rounded-[6px] bg-white px-3.5 text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="h-[61px] rounded-[6px] bg-white px-3.5 text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="h-[61px] rounded-[6px] bg-white px-3.5 text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="h-[61px] rounded-[6px] bg-white px-3.5 text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="What solution are you looking for?"
                required
                className="h-[141px] resize-none rounded-[6px] bg-white px-4 py-3 text-[18px] text-black outline-none placeholder:text-[#8f8f8f] md:col-span-2"
              />

              {/* Captcha same as it is */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:col-span-2">
  {/* Captcha */}
  <div className="flex h-[61px] items-center rounded-[6px] border border-white/70 bg-white/10 px-4 text-[18px] text-white">
    <span className="font-medium">Captcha:</span>
    <span className="ml-1 ">
      {captchaQuestion} = ?
    </span>
  </div>

  {/* Answer */}
  <input
    type="text"
    value={captchaAnswer}
    onChange={(e) => setCaptchaAnswer(e.target.value)}
    placeholder="Enter answer"
    required
    className="h-[61px] w-full rounded-[6px] bg-white px-4 text-[18px] text-black outline-none placeholder:text-[#8f8f8f]"
  />

  {/* Button */}
<div className="animated-btn-wrapper">
 {/* <button
  type="submit"
  disabled={loading}
  className="motion-shine contact-gradient-btn h-[61px] w-full font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
>
  {loading ? "Submitting..." : "Let's Connect"}
</button> */}
  <button
    type="submit"
    disabled={loading}
    className="animated-btn h-[61px] w-full"
  >
    {loading ? "Submitting..." : "Let's Connect"}
  </button>
</div>
</div>
            </form>
          </div>

          {/* Coffee Image */}
          <div className="flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[320px] xl:max-w-[600px] 2xl:max-w-[700px]">
              <img
                src={logo.src}
                alt="Coffee Illustration"
                className="h-auto w-full drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
}
