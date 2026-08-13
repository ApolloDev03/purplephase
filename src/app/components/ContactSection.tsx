// "use client";

// import { useState } from "react";
// import axios from "axios";
// import logo from "../assets/coffee cups.png";
// import { toast } from "react-toastify";
// import { apiUrl } from "../config";
// import {
//   motion
// } from "framer-motion";
// import { useRouter } from "next/navigation";
// export function ContactSection() {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     email: "",
//     company_name: "",
//     phone_number: "",
//     solution: "",
//   });
// const router = useRouter();
//   const [captchaAnswer, setCaptchaAnswer] = useState("");
//   const [loading, setLoading] = useState(false);

//   const captchaQuestion = "5 + 3";
//   const correctCaptcha = "8";

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (captchaAnswer !== correctCaptcha) {
//       toast.error("Please enter correct captcha answer.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(`${apiUrl}/Homeinquery`, formData, {
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       });

//       if (res.data?.success) {
//         toast.success(res.data?.message || "Inquiry submitted successfully.");

//         setFormData({
//           full_name: "",
//           email: "",
//           company_name: "",
//           phone_number: "",
//           solution: "",
//         });

//         setCaptchaAnswer("");

//          router.push("/inquiry-thank-you");
//       } else {
//         toast.error(res.data?.message || "Failed to submit inquiry.");
//       }
//     } catch (err: any) {
//       console.error("Home Inquiry API Error:", err);

//       const errorMessage =
//         err?.response?.data?.message ||
//         err?.response?.data?.error ||
//         "Something went wrong. Please try again.";

//       toast.error(errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="relative overflow-hidden bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)] py-10 lg:py-[30px] xl:py-[85px]">
//       <div className="mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
//         {/* Heading */}
//           <h4 className="mb-2 md:mb-4 font-semibold leading-tight tracking-wide text-white text-[25px] lg:text-[35px]  2xl:text-[48px]">
//             No decks. No jargon. Just an honest conversation.
//           </h4>

//           <span className=" text-[14px]   font-medium leading-tight text-white md:text-[28px] 2xl:text-[34px]">
//             Let’s catch up over a cup of coffee !
//           </span>

//         <div className=" mt-4! lg:mt-0 grid grid-cols-1  items-center lg:grid-cols-12">
//           {/* Form */}
//           <div className="lg:col-span-7 ">
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 gap-3 md:grid-cols-2"
//             >
//               <input
//                 type="text"
//                 name="full_name"
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 placeholder="Full Name"
//                 required
//                 className="h-[50px] md:h-[61px] rounded-[6px] bg-white px-3.5 text-[14px] xl:text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
//               />

//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="Email"
//                 required
//                 className="h-[50px] md:h-[61px] rounded-[6px] bg-white px-3.5 text-[14px] xl:text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
//               />

//               <input
//                 type="text"
//                 name="company_name"
//                 value={formData.company_name}
//                 onChange={handleChange}
//                 placeholder="Company Name"
//                 required
//                 className="h-[50px] md:h-[61px] rounded-[6px] bg-white px-3.5 text-[14px] xl:text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
//               />

//               <input
//                 type="tel"
//                 name="phone_number"
//                 value={formData.phone_number}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 required
//                 className="h-[50px] md:h-[61px] rounded-[6px] bg-white px-3.5 text-[14px] xl:text-[18px] py-3 text-black outline-none placeholder:text-[#8f8f8f]"
//               />

//               <textarea
//                 name="solution"
//                 value={formData.solution}
//                 onChange={handleChange}
//                 placeholder="What solution are you looking for?"
//                 required
//                 className="h-[141px] resize-none rounded-[6px] bg-white px-4 py-3 text-[14px] xl:text-[18px] text-black outline-none placeholder:text-[#8f8f8f] md:col-span-2"
//               />

//               {/* Captcha same as it is */}
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:col-span-2">
//   {/* Captcha */}
//   <div className="flex h-[50px] md:h-[61px] items-center rounded-[6px] text-[14px] border border-white/70 bg-white/10 px-4 xl:text-[18px] text-white">
//     <span className="font-medium">Captcha:</span>
//     <span className="ml-1 ">
//       {captchaQuestion} = ?
//     </span>
//   </div>

//   {/* Answer */}
//   <input
//     type="text"
//     value={captchaAnswer}
//     onChange={(e) => setCaptchaAnswer(e.target.value)}
//     placeholder="Enter answer"
//     required
//     className="h-[50px] md:h-[61px] w-full rounded-[6px] bg-white px-4 text-[14px] xl:text-[18px] text-black outline-none placeholder:text-[#8f8f8f]"
//   />

//   {/* Button */}
// <div className="animated-btn-wrapper">
//  {/* <button
//   type="submit"
//   disabled={loading}
//   className="motion-shine contact-gradient-btn h-[61px] w-full font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
// >
//   {loading ? "Submitting..." : "Let's Connect"}
// </button> */}
//   <button
//     type="submit"
//     disabled={loading}
//     className="animated-btn h-[50px] md:h-[61px] text-[16px]! xl:text-[18px]! w-full"
//   >
//     {loading ? "Submitting..." : "Let's Connect"}
//   </button>
// </div>
// </div>
//             </form>
//           </div>

//           {/* Coffee Image */}
//           <div className="flex mt-4 xl:mt-0 justify-center lg:col-span-5 xl:justify-end">
//             <div className="relative w-full max-w-[500px] lg:max-w-[600px] 2xl:max-w-[700px]">
//               <img
//                 src={logo.src}
//                 alt="Coffee Illustration"
//                 className="h-auto w-full drop-shadow-2xl"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

      
//     </section>
//   );
// }


"use client";

import {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import logo from "../assets/coffee cups.png";
import { apiUrl } from "../config";

type ContactFormData = {
  full_name: string;
  email: string;
  company_name: string;
  phone_number: string;
  solution: string;
};

const initialFormData: ContactFormData = {
  full_name: "",
  email: "",
  company_name: "",
  phone_number: "",
  solution: "",
};

export function ContactSection() {
  const router = useRouter();

  const [formData, setFormData] =
    useState<ContactFormData>(initialFormData);

  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const captchaQuestion = "5 + 3";
  const correctCaptcha = "8";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/;

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    // Phone number accepts digits only.
    if (name === "phone_number") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);

      setFormData((previousData) => ({
        ...previousData,
        phone_number: digitsOnly,
      }));

      return;
    }

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleCaptchaChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const digitsOnly = event.target.value
      .replace(/\D/g, "")
      .slice(0, 2);

    setCaptchaAnswer(digitsOnly);
  };

  const validateForm = (): boolean => {
    if (!formData.full_name.trim()) {
      toast.error("Full name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      toast.error("Email address is required.");
      return false;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!formData.company_name.trim()) {
      toast.error("Company name is required.");
      return false;
    }

    if (!formData.phone_number.trim()) {
      toast.error("Phone number is required.");
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      toast.error(
        "Phone number must contain exactly 10 digits.",
      );
      return false;
    }

    if (!formData.solution.trim()) {
      toast.error(
        "Please enter the solution you are looking for.",
      );
      return false;
    }

    if (!captchaAnswer.trim()) {
      toast.error("Captcha answer is required.");
      return false;
    }

    if (captchaAnswer.trim() !== correctCaptcha) {
      toast.error("Incorrect captcha answer.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const payload = {
        full_name: formData.full_name.trim(),
        email: formData.email.trim().toLowerCase(),
        company_name: formData.company_name.trim(),
        phone_number: formData.phone_number,
        solution: formData.solution.trim(),
      };

      const response = await axios.post(
        `${apiUrl}/Homeinquery`,
        payload,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data?.success) {
        toast.success(
          response.data?.message ||
            "Inquiry submitted successfully.",
        );

        setFormData(initialFormData);
        setCaptchaAnswer("");

        router.push("/inquiry-thank-you");
      } else {
        toast.error(
          response.data?.message ||
            "Failed to submit inquiry.",
        );
      }
    } catch (error: unknown) {
      console.error("Home Inquiry API Error:", error);

      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors) {
          const firstError = Object.values(backendErrors)[0];

          const errorMessage = Array.isArray(firstError)
            ? firstError[0]
            : String(firstError);

          toast.error(errorMessage);
          return;
        }

        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Something went wrong. Please try again.",
        );

        return;
      }

      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputClassName = `
    h-[50px]
    w-full
    rounded-[6px]
    bg-white
    px-3.5
    py-3
    text-[14px]
    text-black
    outline-none
    placeholder:text-[#8f8f8f]
    xl:h-[61px]
    xl:text-[18px]
  `;

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)] py-10 lg:py-[30px] xl:py-[85px]">
      <div className="mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
        <h4 className="mb-2 text-[25px] font-semibold leading-tight tracking-wide text-white md:mb-4 lg:text-[35px] 2xl:text-[48px]">
          No decks. No jargon. Just an honest conversation.
        </h4>

        <span className="text-[14px] font-medium leading-tight text-white md:text-[28px] 2xl:text-[34px]">
          Let&apos;s catch up over a cup of coffee!
        </span>

        <div className="mt-4 grid grid-cols-1 items-center 2xl:mt-0 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid grid-cols-1 gap-3 md:grid-cols-2"
            >
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                autoComplete="name"
                required
                className={inputClassName}
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                autoComplete="email"
                inputMode="email"
                required
                className={inputClassName}
              />

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                autoComplete="organization"
                required
                className={inputClassName}
              />

              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                autoComplete="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                required
                className={inputClassName}
              />

              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="What solution are you looking for?"
                required
                className="
                  h-[141px]
                  resize-none
                  rounded-[6px]
                  bg-white
                  px-4
                  py-3
                  text-[14px]
                  text-black
                  outline-none
                  placeholder:text-[#8f8f8f]
                  md:col-span-2
                  xl:text-[18px]
                "
              />

              <div className="grid grid-cols-1 gap-3 md:col-span-2 md:grid-cols-3">
                <div className="flex h-[50px] items-center rounded-[6px] border border-white/70 bg-white/10 px-4 text-[14px] text-white md:h-[61px] xl:text-[18px]">
                  <span className="font-medium">
                    Captcha:
                  </span>

                  <span className="ml-1">
                    {captchaQuestion} = ?
                  </span>
                </div>

                <input
                  type="text"
                  value={captchaAnswer}
                  onChange={handleCaptchaChange}
                  placeholder="Enter answer"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={2}
                  required
                  className={inputClassName}
                />

                <div className="animated-btn-wrapper">
                  <button
                    type="submit"
                    disabled={loading}
                    className="
                      animated-btn
                      h-[50px]
                      w-full
                      text-[16px]!
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                      md:h-[61px]
                      xl:text-[18px]!
                    "
                  >
                    {loading
                      ? "Submitting..."
                      : "Let's Connect"}
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="mt-4 flex justify-center lg:col-span-5 xl:mt-0 xl:justify-end">
            <div className="relative w-full max-w-[500px] lg:max-w-[600px] 2xl:max-w-[700px]">
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