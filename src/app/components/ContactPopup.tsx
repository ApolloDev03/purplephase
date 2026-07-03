// import { useEffect, useState, ChangeEvent, FormEvent } from "react";
// import { RotateCcw } from "lucide-react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { apiUrl } from "../config";
// import { AnimatePresence, motion } from "framer-motion";
// import { IoCloseOutline } from "react-icons/io5";
// import { useRouter } from "next/navigation";
// type ServiceItem = {
//     id: number;
//     service_name: string;
// };
// type FormDataType = {
//     name: string;
//     email: string;
//     contact_no: string;
//     company: string;
//     services: number[];
//     message: string;
//     captcha: string;
// };
// type ServiceListResponse = {
//     success: boolean;
//     message: string;
//     data: ServiceItem[];
// };

// type ContactResponse = {
//     success: boolean;
//     message: string;
// };
// export default function ContactPopup({
//     isOpen,
//     onClose,
// }: {
//     isOpen: boolean;
//     onClose: () => void;
// }) {
//     const router=useRouter();
//     const [services, setServices] = useState<ServiceItem[]>([]);
//     const [loadingServices, setLoadingServices] = useState(false);
//     const [submitLoading, setSubmitLoading] = useState(false);
//     const [captchaCode, setCaptchaCode] = useState("8227");

//     const [formData, setFormData] = useState<FormDataType>({
//         name: "",
//         email: "",
//         contact_no: "",
//         company: "",
//         services: [],
//         message: "",
//         captcha: "",
//     });

//     useEffect(() => {
//         if (isOpen) {
//             fetchServices();
//             generateCaptcha();
//         }
//     }, [isOpen]);

//     const fetchServices = async (): Promise<void> => {
//         try {
//             setLoadingServices(true);

//             const res = await axios.post<ServiceListResponse>(`${apiUrl}/serviceList`, {});

//             if (res.data?.success) {
//                 setServices(res.data.data || []);
//             } else {
//                 toast.error(res.data?.message || "Service list not found.");
//             }
//         } catch (error) {
//             console.error("Service list error:", error);
//             toast.error("Failed to load services.");
//         } finally {
//             setLoadingServices(false);
//         }
//     };

//     const generateCaptcha = (): void => {
//         const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
//         setCaptchaCode(randomCode);

//         setFormData((prev) => ({
//             ...prev,
//             captcha: "",
//         }));
//     };

//     const handleChange = (
//         e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//     ): void => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleServiceChange = (serviceId: number): void => {
//         setFormData((prev) => {
//             const alreadySelected = prev.services.includes(serviceId);

//             return {
//                 ...prev,
//                 services: alreadySelected
//                     ? prev.services.filter((id) => id !== serviceId)
//                     : [...prev.services, serviceId],
//             };
//         });
//     };

//     const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();

//         if (!formData.name.trim()) {
//             toast.error("Please enter your name.");
//             return;
//         }

//         if (!formData.email.trim()) {
//             toast.error("Please enter your email.");
//             return;
//         }

//         if (!formData.contact_no.trim()) {
//             toast.error("Please enter your contact number.");
//             return;
//         }

//         if (!formData.company.trim()) {
//             toast.error("Please enter your company name.");
//             return;
//         }

//         if (formData.services.length === 0) {
//             toast.error("Please select at least one interested service.");
//             return;
//         }

//         if (!formData.message.trim()) {
//             toast.error("Please enter your message.");
//             return;
//         }

//         if (formData.captcha.trim() !== captchaCode) {
//             toast.error("Invalid captcha. Please try again.");
//             return;
//         }

//         try {
//             setSubmitLoading(true);

//             const payload = {
//                 name: formData.name,
//                 email: formData.email,
//                 contact_no: formData.contact_no,
//                 company: formData.company,
//                 services: formData.services,
//                 message: formData.message,
//             };

//             const res = await axios.post<ContactResponse>(`${apiUrl}/contact`, payload);

//             if (res.data?.success) {
//                 toast.success(
//                     res.data.message || "Your inquiry has been submitted successfully."
//                 );

//                 setFormData({
//                     name: "",
//                     email: "",
//                     contact_no: "",
//                     company: "",
//                     services: [],
//                     message: "",
//                     captcha: "",
//                 });

//                 generateCaptcha();
//                 onClose();
//                  router.push("/inquiry-thank-you");
//             } else {
//                 toast.error(res.data?.message || "Something went wrong. Please try again.");
//             }
//         } catch (error: unknown) {
//             console.error("Contact submit error:", error);

//             if (axios.isAxiosError(error)) {
//                 toast.error(
//                     error.response?.data?.message ||
//                     "Something went wrong. Please try again."
//                 );
//             } else {
//                 toast.error("Something went wrong. Please try again.");
//             }
//         } finally {
//             setSubmitLoading(false);
//         }
//     };

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <>
//                     <motion.div
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         onClick={onClose}
//                         className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm"
//                     />

//                     <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden px-4 py-6">
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.92, y: 30 }}
//                             animate={{ opacity: 1, scale: 1, y: 0 }}
//                             exit={{ opacity: 0, scale: 0.92, y: 30 }}
//                             transition={{ type: "spring", stiffness: 240, damping: 28 }}
//                             className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
//                         >
//                             <div className="flex items-center justify-between">
//                                 <div>
//                                     <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.12em] text-gray-900 md:text-4xl">
//                                         Contact <span className="text-primary">Us</span>
//                                     </h2>
//                                 </div>

//                                 <button
//                                     type="button"
//                                     onClick={onClose}
//                                     className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
//                                 >
//                                     <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
//                                 </button>
//                             </div>

//                             <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6 md:p-8">
//                                 <form onSubmit={handleSubmit} className="space-y-6">
//                                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                                         <input
//                                             type="text"
//                                             name="name"
//                                             value={formData.name}
//                                             onChange={handleChange}
//                                             placeholder="Name*"
//                                             className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                                         />

//                                         <input
//                                             type="email"
//                                             name="email"
//                                             value={formData.email}
//                                             onChange={handleChange}
//                                             placeholder="Email*"
//                                             className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                                         />
//                                     </div>

//                                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                                         <input
//                                             type="text"
//                                             name="contact_no"
//                                             value={formData.contact_no}
//                                             onChange={handleChange}
//                                             placeholder="Contact No*"
//                                             className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                                         />

//                                         <input
//                                             type="text"
//                                             name="company"
//                                             value={formData.company}
//                                             onChange={handleChange}
//                                             placeholder="Company*"
//                                             className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
//                                         />
//                                     </div>

//                                     <div className="pt-2">
//                                         <h3 className="font-heading mb-5 text-[18px] font-semibold text-gray-800">
//                                             Interested Services
//                                         </h3>

//                                         {loadingServices ? (
//                                             <p className="text-[15px] text-gray-500">
//                                                 Loading services...
//                                             </p>
//                                         ) : services.length > 0 ? (
//                                             <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
//                                                 {services.map((service) => (
//                                                     <label
//                                                         key={service.id}
//                                                         className="group flex cursor-pointer items-center gap-3 text-[15px] text-gray-600 transition-colors hover:text-primary"
//                                                     >
//                                                         <input
//                                                             type="checkbox"
//                                                             checked={formData.services.includes(service.id)}
//                                                             onChange={() => handleServiceChange(service.id)}
//                                                             className="h-5 w-5 rounded border-gray-300 accent-primary"
//                                                         />
//                                                         <span>{service.service_name}</span>
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         ) : (
//                                             <p className="text-[15px] text-gray-500">
//                                                 No services found.
//                                             </p>
//                                         )}
//                                     </div>

//                                     <textarea
//                                         name="message"
//                                         value={formData.message}
//                                         onChange={handleChange}
//                                         rows={4}
//                                         placeholder="Tell us about your project..."
//                                         className="w-full border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
//                                     />

//                                     <div className="flex flex-wrap items-center gap-4">
//                                         <div className="flex items-center gap-2">
//                                             <div className="flex h-12 items-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
//                                                 {captchaCode}
//                                             </div>

//                                             <button
//                                                 type="button"
//                                                 onClick={generateCaptcha}
//                                                 className="flex h-12 w-12 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
//                                             >
//                                                 <RotateCcw size={20} />
//                                             </button>
//                                         </div>

//                                         <input
//                                             type="text"
//                                             name="captcha"
//                                             value={formData.captcha}
//                                             onChange={handleChange}
//                                             placeholder="Enter Captcha"
//                                             className="h-12 w-full max-w-50 border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary"
//                                         />
//                                     </div>

//                                     <button
//                                         type="submit"
//                                         disabled={submitLoading}
//                                         className="bg-primary px-12 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
//                                     >
//                                         {submitLoading ? "Sending..." : "Send Message"}
//                                     </button>
//                                 </form>
//                             </div>
//                         </motion.div>
//                     </div>
//                 </>
//             )}
//         </AnimatePresence>
//     );
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!formData.contact_no.trim()) {
      toast.error("Please enter your contact number.");
      return;
    }

    if (!formData.company.trim()) {
      toast.error("Please enter your company name.");
      return;
    }

    if (formData.services.length === 0) {
      toast.error("Please select at least one interested expertise.");
      return;
    }
if (!formData.country.trim()) {
  toast.error("Please enter your country.");
  return;
}

if (!formData.state.trim()) {
  toast.error("Please enter your state.");
  return;
}

if (!formData.district.trim()) {
  toast.error("Please enter your district.");
  return;
}
    if (!formData.message.trim()) {
      toast.error("Please enter your message.");
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
  email: formData.email.trim(),
  contact_no: formData.contact_no.trim(),
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
        //   res.data.message || "Your inquiry has been submitted successfully."
         res.data.message || "Your inquiry has been submitted successfully."
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
              className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-heading text-3xl font-semibold uppercase tracking-[0.12em] text-gray-900 md:text-4xl">
                    Contact <span className="text-primary">Us</span>
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="group rounded-full border border-gray-200 bg-gray-50 p-2.5 transition-all duration-300 hover:border-primary hover:bg-primary"
                >
                  <IoCloseOutline className="text-3xl text-gray-700 transition-colors duration-300 group-hover:text-white" />
                </button>
              </div>

              <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50/50 p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name*"
                      className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email*"
                      className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <input
                      type="text"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      placeholder="Contact No*"
                      className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />

                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company*"
                      className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                    />
                  </div>

<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Country*"
    className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />

  <input
    type="text"
    name="state"
    value={formData.state}
    onChange={handleChange}
    placeholder="State*"
    className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />

  <input
    type="text"
    name="district"
    value={formData.district}
    onChange={handleChange}
    placeholder="District*"
    className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
  />
</div>
                  <div className="pt-2">
                    <h1 className="font-heading mb-5  font-semibold text-gray-800">
                      Interested Expertise
                    </h1>

                   {loadingExpertise ? (
    <p className="text-[16px] text-[#555]">Loading services...</p>
  ) : expertiseList.length > 0 ? (
    <div className="grid grid-cols-1 gap-x-20 gap-y-7 md:grid-cols-3">
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
              className={`flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[10px] border-2 transition-all duration-300 ${
                isSelected
                  ? "border-[#a20d69] bg-[#a20d69]"
                  : "border-[#a20d69] bg-transparent"
              }`}
            >
              {isSelected && <Check size={22} className="text-white" />}
            </span>

            <span className="font-normal leading-[1.3] text-[#666] ">
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
                    className="w-full border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
                  />

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-12 items-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
                        {captchaCode}
                      </div>

                      <button
                        type="button"
                        onClick={generateCaptcha}
                        className="flex h-12 w-12 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
                      >
                        <RotateCcw size={20} />
                      </button>
                    </div>

                    <input
                      type="text"
                      name="captcha"
                      value={formData.captcha}
                      onChange={handleChange}
                      placeholder="Enter Captcha"
                      className="h-12 w-full max-w-50 border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="bg-primary px-12 py-4 font-heading text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitLoading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}