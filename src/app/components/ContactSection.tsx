// "use client";

// import { useState } from "react";
// import axios from "axios";
// import logo from "../assets/coffee cups.png";
// import { toast } from "react-toastify";
// import { apiUrl } from "../config";

// export function ContactSection() {
//     const [formData, setFormData] = useState({
//         full_name: "",
//         email: "",
//         company_name: "",
//         phone_number: "",
//         solution: "",
//     });

//     const [captchaAnswer, setCaptchaAnswer] = useState("");
//     const [loading, setLoading] = useState(false);

//     const captchaQuestion = "5 + 3";
//     const correctCaptcha = "8";

//     const handleChange = (
//         e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         if (captchaAnswer !== correctCaptcha) {
//             toast.error("Please enter correct captcha answer.");
//             return;
//         }

//         try {
//             setLoading(true);

//             const res = await axios.post(`${apiUrl}/Homeinquery`, formData, {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (res.data?.success) {
//                 toast.success(res.data?.message || "Inquiry submitted successfully.");

//                 setFormData({
//                     full_name: "",
//                     email: "",
//                     company_name: "",
//                     phone_number: "",
//                     solution: "",
//                 });

//                 setCaptchaAnswer("");
//             } else {
//                 toast.error(res.data?.message || "Failed to submit inquiry.");
//             }
//         } catch (err: any) {
//             console.error("Home Inquiry API Error:", err);

//             const errorMessage =
//                 err?.response?.data?.message ||
//                 err?.response?.data?.error ||
//                 "Something went wrong. Please try again.";

//             toast.error(errorMessage);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <section className="bg-primary py-16 md:py-24">
//             <div className="mx-auto max-w-full px-5 md:px-10 lg:px-16">
//                 <h2 className="mb-10 text-3xl font-medium text-white md:text-5xl">
//                     Let’s catch up over a cup of coffee!
//                 </h2>

//                 <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
//                     <div className="lg:col-span-7">
//                         <form
//                             onSubmit={handleSubmit}
//                             className="grid grid-cols-1 gap-5 md:grid-cols-2"
//                         >
//                             <input
//                                 type="text"
//                                 name="full_name"
//                                 value={formData.full_name}
//                                 onChange={handleChange}
//                                 placeholder="Full Name"
//                                 required
//                                 className="h-15 rounded-lg bg-white p-5 text-base outline-none"
//                             />

//                             <input
//                                 type="email"
//                                 name="email"
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 placeholder="Email"
//                                 required
//                                 className="h-15 rounded-lg bg-white p-5 text-base outline-none"
//                             />

//                             <input
//                                 type="text"
//                                 name="company_name"
//                                 value={formData.company_name}
//                                 onChange={handleChange}
//                                 placeholder="Company Name"
//                                 required
//                                 className="h-15 rounded-lg bg-white p-5 text-base outline-none"
//                             />

//                             <input
//                                 type="tel"
//                                 name="phone_number"
//                                 value={formData.phone_number}
//                                 onChange={handleChange}
//                                 placeholder="Phone Number"
//                                 required
//                                 className="h-15 rounded-lg bg-white p-5 text-base outline-none"
//                             />

//                             <textarea
//                                 name="solution"
//                                 value={formData.solution}
//                                 onChange={handleChange}
//                                 placeholder="What solution are you looking for?"
//                                 required
//                                 className="h-42.5 rounded-lg bg-white p-5 text-base outline-none md:col-span-2"
//                             />

//                             <div className="md:col-span-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
//                                 <div className="flex h-15 items-center rounded-lg border border-white bg-white/20 px-5 text-white">
//                                     Captcha:{" "}
//                                     <span className="ml-1 font-semibold">
//                                         {captchaQuestion} = ?
//                                     </span>
//                                 </div>

//                                 <input
//                                     type="text"
//                                     value={captchaAnswer}
//                                     onChange={(e) => setCaptchaAnswer(e.target.value)}
//                                     placeholder="Enter answer"
//                                     required
//                                     className="h-15 rounded-lg bg-white p-5 text-base outline-none"
//                                 />

//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="h-15 rounded-lg border border-white bg-white/20 font-medium text-white transition hover:bg-white hover:text-primary disabled:cursor-not-allowed disabled:opacity-60"
//                                 >
//                                     {loading ? "Submitting..." : "Let’s connect"}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>

//                     <div className="flex justify-center lg:col-span-5 lg:justify-end">
//                         <div className="relative w-full max-w-[320px] xl:max-w-[600px] 2xl:max-w-[700px]">
//                             <img
//                                 src={logo.src}
//                                 alt="Coffee Illustration"
//                                 className="h-auto w-full drop-shadow-2xl"
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import logo from "../assets/coffee cups.png";
import { toast } from "react-toastify";
import { apiUrl } from "../config";

export function ContactSection() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company_name: "",
    phone_number: "",
    solution: "",
  });

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
    <section className="relative overflow-hidden bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)] pt-16 ">
      <div className="mx-auto max-w-full px-5 md:px-8 lg:px-16">
        {/* Heading */}
        <div className="mb-8 md:mb-9">
          <h2 className="text-[28px] font-semibold leading-tight tracking-wide text-white md:text-[38px] lg:text-[40px]">
            No decks. No jargon. Just an Honest Conversation.
          </h2>

          <p className="mt-4 text-[22px] font-normal leading-tight text-white md:text-[28px]">
            Let’s catch up over a cup of coffee !
          </p>
        </div>

        <div className="grid grid-cols-1 items-center lg:grid-cols-12">
          {/* Form */}
          <div className="lg:col-span-7">
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
                className="h-[44px] rounded-[6px] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="h-[44px] rounded-[6px] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                required
                className="h-[44px] rounded-[6px] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                placeholder="Phone Number"
                required
                className="h-[44px] rounded-[6px] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#8f8f8f]"
              />

              <textarea
                name="solution"
                value={formData.solution}
                onChange={handleChange}
                placeholder="What solution are you looking for?"
                required
                className="h-[100px] resize-none rounded-[6px] bg-white px-4 py-3 text-[14px] text-black outline-none placeholder:text-[#8f8f8f] md:col-span-2"
              />

              {/* Captcha same as it is */}
              <div className="grid grid-cols-1 gap-3 md:col-span-2 md:grid-cols-[0.9fr_0.7fr_200px]">
                {/* Captcha */}
                <div className="flex h-[44px] items-center rounded-[6px] border border-white/70 bg-white/10 px-4 text-[14px] text-white">
                  <span className="font-medium">Captcha:</span>

                  <span className="ml-1 font-semibold">
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
                  className="h-[44px] rounded-[6px] bg-white px-4 text-[14px] text-black outline-none placeholder:text-[#8f8f8f]"
                />

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="contact-gradient-btn h-[44px] w-[200px] whitespace-nowrap rounded-full font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Let's Connect"}
                </button>
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

      <style jsx global>{`
        .contact-gradient-btn {
          position: relative;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.14);
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
        }

        .contact-gradient-btn::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 9999px;
          padding: 1px;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.75) 0%,
            rgba(255, 255, 255, 0.75) 25%,
            rgba(255, 255, 255, 0) 50%,
            rgba(255, 255, 255, 0.75) 75%,
            rgba(255, 255, 255, 0.75) 100%
          );
          pointer-events: none;

          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .contact-gradient-btn:hover {
          background: rgba(255, 255, 255, 0.22);
        }
      `}</style>
    </section>
  );
}
