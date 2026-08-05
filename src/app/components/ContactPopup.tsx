// "use client";

// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import { Check, RotateCcw } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { apiUrl } from "../config";
// import { AnimatePresence, motion } from "framer-motion";
// import { IoCloseOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// import { LuMoveUpRight } from "react-icons/lu";

// type ExpertiseItem = {
//   id: number;
//   expertise_name: string;
//   short_description?: string;
//   image?: string;
//   sequence_number?: number;
//   show_home_page?: number;
//   status?: number;
//   meta_title?: string;
//   meta_keyword?: string;
//   meta_description?: string;
//   head?: string;
//   body?: string;
//   created_at?: string;
// };

// type FormDataType = {
//   name: string;
//   email: string;
//   contact_no: string;
//   company: string;
//   services: number[];
//   country: string;
//   state: string;
//   district: string;
//   message: string;
//   captcha: string;
// };
// type ExpertiseListResponse = {
//   success: boolean;
//   message: string;
//   data: ExpertiseItem[];
// };

// type ContactResponse = {
//   success: boolean;
//   message: string;
// };

// export default function ContactPopup({
//   isOpen,
//   onClose,
// }: {
//   isOpen: boolean;
//   onClose: () => void;
// }) {
//   const router = useRouter();

//   const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>([]);
//   const [loadingExpertise, setLoadingExpertise] = useState(false);
//   const [submitLoading, setSubmitLoading] = useState(false);
//   const [captchaCode, setCaptchaCode] = useState("8227");

//  const [formData, setFormData] = useState<FormDataType>({
//   name: "",
//   email: "",
//   contact_no: "",
//   company: "",
//   services: [],
//   country: "",
//   state: "",
//   district: "",
//   message: "",
//   captcha: "",
// });
//   useEffect(() => {
//     if (isOpen) {
//       fetchExpertiseList();
//       generateCaptcha();
//     }
//   }, [isOpen]);

//   const fetchExpertiseList = async (): Promise<void> => {
//     try {
//       setLoadingExpertise(true);

//       const res = await axios.post<ExpertiseListResponse>(
//         `${apiUrl}/expertiseList`,
//         {}
//       );

//       if (res.data?.success) {
//         const activeExpertise = (res.data.data || [])
//           .filter((item) => item.status === 1)
//           .sort(
//             (a, b) =>
//               (a.sequence_number || 0) - (b.sequence_number || 0)
//           );

//         setExpertiseList(activeExpertise);
//       } else {
//         toast.error(res.data?.message || "Expertise list not found.");
//       }
//     } catch (error) {
//       console.error("Expertise list error:", error);
//       toast.error("Failed to load expertise list.");
//     } finally {
//       setLoadingExpertise(false);
//     }
//   };

//   const generateCaptcha = (): void => {
//     const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
//     setCaptchaCode(randomCode);

//     setFormData((prev) => ({
//       ...prev,
//       captcha: "",
//     }));
//   };

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ): void => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleExpertiseChange = (expertiseId: number): void => {
//     setFormData((prev) => {
//       const alreadySelected = prev.services.includes(expertiseId);

//       return {
//         ...prev,
//         services: alreadySelected
//           ? prev.services.filter((id) => id !== expertiseId)
//           : [...prev.services, expertiseId],
//       };
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//     e.preventDefault();

//     if (!formData.name.trim()) {
//       toast.error("Please enter your name.");
//       return;
//     }

//     if (!formData.email.trim()) {
//       toast.error("Please enter your email.");
//       return;
//     }

//     if (!formData.contact_no.trim()) {
//       toast.error("Please enter your contact number.");
//       return;
//     }

//     if (!formData.company.trim()) {
//       toast.error("Please enter your company name.");
//       return;
//     }

//     if (formData.services.length === 0) {
//       toast.error("Please select at least one interested expertise.");
//       return;
//     }
// if (!formData.country.trim()) {
//   toast.error("Please enter your country.");
//   return;
// }

// if (!formData.state.trim()) {
//   toast.error("Please enter your state.");
//   return;
// }

// if (!formData.district.trim()) {
//   toast.error("Please enter your district.");
//   return;
// }
//     if (!formData.message.trim()) {
//       toast.error("Please enter your message.");
//       return;
//     }

//     if (formData.captcha.trim() !== captchaCode) {
//       toast.error("Invalid captcha. Please try again.");
//       return;
//     }

//     try {
//       setSubmitLoading(true);

//    const payload = {
//   name: formData.name.trim(),
//   email: formData.email.trim(),
//   contact_no: formData.contact_no.trim(),
//   company: formData.company.trim(),
//   services: formData.services,
//   country: formData.country.trim(),
//   state: formData.state.trim(),
//   district: formData.district.trim(),
//   message: formData.message.trim(),
// };

// const res = await axios.post<ContactResponse>(
//   `${apiUrl}/contactUsStore`,
//   payload
// );
     

//       if (res.data?.success) {
//         toast.success(
//         //   res.data.message || "Your inquiry has been submitted successfully."
//          res.data.message || "Your inquiry has been submitted successfully."
//         );

//       setFormData({
//   name: "",
//   email: "",
//   contact_no: "",
//   company: "",
//   services: [],
//   country: "",
//   state: "",
//   district: "",
//   message: "",
//   captcha: "",
// });

//         generateCaptcha();
//         onClose();
//         router.push("/inquiry-thank-you");
//       } else {
//         toast.error(
//           res.data?.message || "Something went wrong. Please try again."
//         );
//       }
//     } catch (error: unknown) {
//       console.error("Contact submit error:", error);

//       if (axios.isAxiosError(error)) {
//         toast.error(
//           error.response?.data?.message ||
//             "Something went wrong. Please try again."
//         );
//       } else {
//         toast.error("Something went wrong. Please try again.");
//       }
//     } finally {
//       setSubmitLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
//           />

//           <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4 py-6">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.92, y: 30 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.92, y: 30 }}
//               transition={{ type: "spring", stiffness: 240, damping: 28 }}
//               className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//             >
//               <div className="flex items-center justify-between">
//                 <div>
//                   <h4  className=" font-bold uppercase tracking-[0.12em] text-gray-900 text-2xl lg:text-4xl">
//                     Contact <span className="text-primary">Us</span>
//                   </h4>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
//                 >
//                   <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
//                 </button>
//               </div>

//               <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50  lg:p-8">
//                 <form onSubmit={handleSubmit} className="space-y-6">
//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       placeholder="Name*"
//                       className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px] border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                     />

//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder="Email*"
//                       className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                     <input
//                       type="text"
//                       name="contact_no"
//                       value={formData.contact_no}
//                       onChange={handleChange}
//                       placeholder="Contact No*"
//                       className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                     />

//                     <input
//                       type="text"
//                       name="company"
//                       value={formData.company}
//                       onChange={handleChange}
//                       placeholder="Company*"
//                       className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                     />
//                   </div>

// <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
//   <input
//     type="text"
//     name="country"
//     value={formData.country}
//     onChange={handleChange}
//     placeholder="Country*"
//     className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//   />

//   <input
//     type="text"
//     name="state"
//     value={formData.state}
//     onChange={handleChange}
//     placeholder="State*"
//     className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//   />

//   <input
//     type="text"
//     name="district"
//     value={formData.district}
//     onChange={handleChange}
//     placeholder="District*"
//     className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//   />
// </div>
//                   <div className="pt-2">
//                     <h1 className="font-heading mb-5  text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800">
//                       Interested Expertise
//                     </h1>

//                    {loadingExpertise ? (
//     <p className="text-[16px] text-[#555]">Loading services...</p>
//   ) : expertiseList.length > 0 ? (
//     <div className="grid grid-cols-1 gap-2  gap-y-7 md:grid-cols-3">
//       {expertiseList.map((expertise) => {
//         const isSelected = formData.services.includes(expertise.id);

//         return (
//           <label
//             key={expertise.id}
//             className="flex cursor-pointer items-center gap-3 text-[#666]"
//           >
//             <input
//               type="checkbox"
//               checked={isSelected}
//               onChange={() => handleExpertiseChange(expertise.id)}
//               className="hidden"
//             />

//             <span
//               className={`flex h-[20px] w-[20px] lg:h-[30px] lg:w-[30px] shrink-0 items-center justify-center rounded-[5px] lg:rounded-[10px] border-2 transition-all duration-300 ${
//                 isSelected
//                   ? "border-[#a20d69] bg-[#a20d69]"
//                   : "border-[#a20d69] bg-transparent"
//               }`}
//             >
//               {isSelected && <Check size={22} className="text-white" />}
//             </span>

//             <span className="font-normal  text-[14px] lg:text-[16px] 2xl:text-[18px]leading-[1.3] text-[#666] ">
//               {expertise.expertise_name}
//             </span>
//           </label>
//         );
//       })}
//     </div>
//   ) : (
//     <p className="text-[16px] text-[#555]">No services found.</p>
//   )}
//                   </div>

//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={4}
//                     placeholder="Tell us about your project..."
//                     className="w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
//                   />

// <div className=" lg:mt-5 flex w-full flex-col gap-4 lg:flex-row lg:items-center">
//   {/* Captcha Box */}
//   <div className="flex shrink-0 items-center gap-2">
//     <div className="flex h-10 lg:h-12 text-[14px] lg:text-[16px] 2xl:text-[18px]min-w-[170px] items-center justify-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
//       {captchaCode}
//     </div>

//     <button
//       type="button"
//       onClick={generateCaptcha}
//       className="flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
//     >
//       <RotateCcw size={20} />
//     </button>
//   </div>

//   {/* Captcha Input */}
//   <input
//     type="text"
//     name="captcha"
//     value={formData.captcha}
//     onChange={handleChange}
//     placeholder="Enter Captcha"
//     className="h-12 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary lg:max-w-[220px]"
//   />

//   {/* Submit Button */}
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true }}
//     transition={{ duration: 0.5, delay: 0.45 }}
//     className="shrink-0"
//   >
//     <button
//       type="submit"
//       disabled={submitLoading}
//       className="motion-shine group inline-flex text-[14px] lg:text-[18px]! h-12 items-center justify-center gap-1 lg:gap-3 rounded-full bg-primary px-4 lg:text-[21px]! font-semibold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 "
//     >
//       {submitLoading ? "Sending..." : "Send Message"}

//       <span className="flex lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//         <LuMoveUpRight className="lg:h-5 lg:w-5" />
//       </span>
//     </button>
//   </motion.div>
// </div>
                
//                 </form>
//               </div>
//             </motion.div>
//           </div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Check, RotateCcw } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../config";
import { AnimatePresence, motion } from "framer-motion";
import { IoCloseOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LuMoveUpRight } from "react-icons/lu";

type ExpertiseItem = {
  id: number;
  expertise_name: string;
  short_description?: string;
  image?: string;
  sequence_number?: number;
  show_home_page?: number;
  status?: number;
  meta_title?: string;
  meta_keyword?: string;
  meta_description?: string;
  head?: string;
  body?: string;
  created_at?: string;
};

type FormDataType = {
  name: string;
  email: string;
  contact_no: string;
  company: string;
  services: number[];
  country: string;
  state: string;
  district: string;
  message: string;
  captcha: string;
};
type ExpertiseListResponse = {
  success: boolean;
  message: string;
  data: ExpertiseItem[];
};

type ContactResponse = {
  success: boolean;
  message: string;
};

export default function ContactPopup({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();

  const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>([]);
  const [loadingExpertise, setLoadingExpertise] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("8227");

 const [formData, setFormData] = useState<FormDataType>({
  name: "",
  email: "",
  contact_no: "",
  company: "",
  services: [],
  country: "",
  state: "",
  district: "",
  message: "",
  captcha: "",
});
  useEffect(() => {
    if (isOpen) {
      fetchExpertiseList();
      generateCaptcha();
    }
  }, [isOpen]);

  const fetchExpertiseList = async (): Promise<void> => {
    try {
      setLoadingExpertise(true);

      const res = await axios.post<ExpertiseListResponse>(
        `${apiUrl}/expertiseList`,
        {}
      );

      if (res.data?.success) {
        const activeExpertise = (res.data.data || [])
          .filter((item) => item.status === 1)
          .sort(
            (a, b) =>
              (a.sequence_number || 0) - (b.sequence_number || 0)
          );

        setExpertiseList(activeExpertise);
      } else {
        toast.error(res.data?.message || "Expertise list not found.");
      }
    } catch (error) {
      console.error("Expertise list error:", error);
      toast.error("Failed to load expertise list.");
    } finally {
      setLoadingExpertise(false);
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;

    // Contact number accepts digits only and is limited to 10 digits.
    if (name === "contact_no") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);

      setFormData((prev) => ({
        ...prev,
        contact_no: digitsOnly,
      }));

      return;
    }

    // Captcha accepts digits only and is limited to 4 digits.
    if (name === "captcha") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 4);

      setFormData((prev) => ({
        ...prev,
        captcha: digitsOnly,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExpertiseChange = (expertiseId: number): void => {
    setFormData((prev) => {
      const alreadySelected = prev.services.includes(expertiseId);

      return {
        ...prev,
        services: alreadySelected
          ? prev.services.filter((id) => id !== expertiseId)
          : [...prev.services, expertiseId],
      };
    });
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (submitLoading) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Email address is required.");
      return;
    }

    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!formData.contact_no.trim()) {
      toast.error("Contact number is required.");
      return;
    }

    if (!phoneRegex.test(formData.contact_no)) {
      toast.error("Contact number must contain exactly 10 digits.");
      return;
    }

    if (!formData.company.trim()) {
      toast.error("Company name is required.");
      return;
    }

    if (!formData.country.trim()) {
      toast.error("Country is required.");
      return;
    }

    if (!formData.state.trim()) {
      toast.error("State is required.");
      return;
    }

    if (!formData.district.trim()) {
      toast.error("District is required.");
      return;
    }

    if (formData.services.length === 0) {
      toast.error("Please select at least one interested expertise.");
      return;
    }

    if (!formData.message.trim()) {
      toast.error("Message is required.");
      return;
    }

    if (!formData.captcha.trim()) {
      toast.error("Captcha is required.");
      return;
    }

    if (formData.captcha.trim() !== captchaCode) {
      toast.error("Invalid captcha. Please try again.");
      return;
    }

    try {
      setSubmitLoading(true);

      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        contact_no: formData.contact_no,
        company: formData.company.trim(),
        services: formData.services,
        country: formData.country.trim(),
        state: formData.state.trim(),
        district: formData.district.trim(),
        message: formData.message.trim(),
      };

      const res = await axios.post<ContactResponse>(
        `${apiUrl}/contactUsStore`,
        payload
      );

      if (res.data?.success) {
        toast.success(
          res.data.message ||
            "Your inquiry has been submitted successfully."
        );

        setFormData({
          name: "",
          email: "",
          contact_no: "",
          company: "",
          services: [],
          country: "",
          state: "",
          district: "",
          message: "",
          captcha: "",
        });

        generateCaptcha();
        onClose();
        router.push("/inquiry-thank-you");
      } else {
        toast.error(
          res.data?.message || "Something went wrong. Please try again."
        );
      }
    } catch (error: unknown) {
      console.error("Contact submit error:", error);

      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data?.errors;

        if (backendErrors && typeof backendErrors === "object") {
          const firstError = Object.values(backendErrors)[0];

          const errorMessage = Array.isArray(firstError)
            ? String(firstError[0])
            : String(firstError);

          toast.error(errorMessage);
          return;
        }

        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
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
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden px-4 py-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
              className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4  className=" font-bold uppercase tracking-[0.12em] text-gray-900 text-2xl lg:text-4xl">
                    Contact <span className="text-primary">Us</span>
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
                >
                  <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50  2xl:p-8">
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name*"
                      autoComplete="name"
                      required
                      className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]   border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      autoComplete="email"
                      inputMode="email"
                      required
                      className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px] border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      type="tel"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      placeholder="Contact No*"
                      autoComplete="tel"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={10}
                      required
                      className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company*"
                      autoComplete="organization"
                      required
                      className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />
                  </div>

<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Country*"
    autoComplete="country-name"
    required
    className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />

  <input
    type="text"
    name="state"
    value={formData.state}
    onChange={handleChange}
    placeholder="State*"
    autoComplete="address-level1"
    required
    className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />

  <input
    type="text"
    name="district"
    value={formData.district}
    onChange={handleChange}
    placeholder="District*"
    autoComplete="address-level2"
    required
    className="h-10 lg:h-14 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />
</div>
                  <div className="pt-2">
                    <h1 className="font-heading mb-5  text-[14px] lg:text-[16px] 2xl:text-[18px] font-semibold text-gray-800">
                      Interested Expertise
                    </h1>

                   {loadingExpertise ? (
    <p className="text-[16px] text-[#555]">Loading services...</p>
  ) : expertiseList.length > 0 ? (
    <div className="grid grid-cols-1 gap-2  gap-y-7 md:grid-cols-3">
      {expertiseList.map((expertise) => {
        const isSelected = formData.services.includes(expertise.id);

        return (
          <label
            key={expertise.id}
            className="flex cursor-pointer items-center gap-3 text-[#666]"
          >
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => handleExpertiseChange(expertise.id)}
              className="hidden"
            />

            <span
              className={`flex h-[20px] w-[20px] lg:h-[30px] lg:w-[30px] shrink-0 items-center justify-center rounded-[5px] lg:rounded-[10px] border-2 transition-all duration-300 ${
                isSelected
                  ? "border-[#a20d69] bg-[#a20d69]"
                  : "border-[#a20d69] bg-transparent"
              }`}
            >
              {isSelected && <Check size={22} className="text-white" />}
            </span>

            <span className="font-normal  text-[14px] lg:text-[16px] 2xl:text-[18px]leading-[1.3] text-[#666] ">
              {expertise.expertise_name}
            </span>
          </label>
        );
      })}
    </div>
  ) : (
    <p className="text-[16px] text-[#555]">No services found.</p>
  )}
                  </div>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tell us about your project..."
                    required
                    className="w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
                  />

<div className=" lg:mt-5 flex w-full flex-col gap-4 lg:flex-row lg:items-center">
  {/* Captcha Box */}
  <div className="flex shrink-0 items-center gap-2">
    <div className="flex h-10 lg:h-12 text-[14px] lg:text-[16px] 2xl:text-[18px]min-w-[170px] items-center justify-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
      {captchaCode}
    </div>

    <button
      type="button"
      onClick={generateCaptcha}
      className="flex h-10 w-10 lg:h-12 lg:w-12 shrink-0 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
    >
      <RotateCcw size={20} />
    </button>
  </div>

  {/* Captcha Input */}
  <input
    type="text"
    name="captcha"
    value={formData.captcha}
    onChange={handleChange}
    placeholder="Enter Captcha"
    inputMode="numeric"
    pattern="[0-9]*"
    maxLength={4}
    required
    className="h-12 w-full text-[14px] lg:text-[16px] 2xl:text-[18px]border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary lg:max-w-[220px]"
  />

  {/* Submit Button */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: 0.45 }}
    className="shrink-0"
  >
    <button
      type="submit"
      disabled={submitLoading}
      className="motion-shine group inline-flex text-[14px] lg:text-[16px]! 2xl:text-[18px]! h-12 items-center justify-center gap-1 lg:gap-3 rounded-full bg-primary px-4 lg:text-[21px]! font-semibold! text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 "
    >
      {submitLoading ? "Sending..." : "Send Message"}

      <span className="flex lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
        <LuMoveUpRight className="lg:h-5 lg:w-5" />
      </span>
    </button>
  </motion.div>
</div>
                
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}