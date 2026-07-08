"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Phone, Mail, Send, RotateCcw, MapPin, Check } from "lucide-react";
import { toast } from "react-toastify";
import { apiUrl } from "../config";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
type ExpertiseItem = {
  id: number;
  expertise_name: string;
  short_description: string;
  image: string;
  sequence_number: number;
  show_home_page: number;
  status: number;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
  head: string;
  body: string;
  created_at: string;
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

export default function ContactPage() {
const [expertiseList, setExpertiseList] = useState<ExpertiseItem[]>([]);
const [loadingExpertise, setLoadingExpertise] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [captchaCode, setCaptchaCode] = useState<string>("8227");

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
   fetchExpertiseList();
    generateCaptcha();
  }, []);

  const router = useRouter();

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
        .sort((a, b) => a.sequence_number - b.sequence_number);

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

const handleServiceChange = (serviceId: number): void => {
  setFormData((prev) => {
    const alreadySelected = prev.services.includes(serviceId);

    return {
      ...prev,
      services: alreadySelected
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
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

  if (formData.services.length === 0) {
    toast.error("Please select at least one interested service.");
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
    <>
      {/* <Breadcrumb /> */}

      <section className="font-body text-[#4d4d4d]">
        {/* HERO */}
        <div
          className="relative h-[360px] w-full overflow-hidden bg-[#f8f6f7] bg-cover bg-center bg-no-repeat md:h-[420px] lg:h-[470px] xl:h-[720px]"
          style={{
            backgroundImage: "url('/assets/contact/contact-hero.jpg')",
          }}
        >
          <div className="mx-auto flex h-full max-w-full items-center px-4 sm:px-6 lg:px-20 2xl:px-32">
            <h2 className="relative z-10  leading-[130%] text-[#a20d69] ">
              Let’s Talk About Your <br />
              Brand’s Next Phase
            </h2>
          </div>
        </div>

    {/* CONTACT DETAILS */}
<div className="bg-[#f4f4f4]">
  <div className="mx-auto max-w-full px-6 py-16 sm:px-8 lg:px-20 2xl:px-32">
    {/* FIRST ROW */}
    <div className="grid grid-cols-1 gap-x-2 gap-y-12 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
          <Phone size={18} />
        </div>

        <div>
          <h3 style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}   className="mb-3 font-heading text-[24px] font-bold uppercase tracking-wide text-[#ff7a00] md:text-[28px]">
            Call Us
          </h3>

          <p className="text-[16px] leading-relaxed text-[#4a4a4a] md:text-[18px] lg:text-[20px]">
            <span className="font-semibold text-[#2f2f2f]">
              Mr. Prerak Shah
            </span>{" "}
            <span className="">- Founder</span>
            <br />
            <a
              href="tel:+919999610505"
              className="underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
            >
              +91 99986 10505
            </a>
            {"  "}
            <a
              href="tel:+919327009400"
              className="underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
            >
              +91 93270 09400
            </a>
          </p>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
          <Mail size={18} />
        </div>

        <div>
          <h3 style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}   className="mb-3 font-heading text-[24px] font-bold uppercase tracking-wide text-[#ff7a00] md:text-[28px]">
            Email Id
          </h3>

          <a
            href="mailto:info.purplephase@gmail.com"
            className="break-all text-[16px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69] md:text-[18px] lg:text-[20px]"
          >
            info.purplephase@gmail.com
          </a>
        </div>
      </div>
    </div>

    {/* SECOND ROW */}
    <div className="mt-16 grid grid-cols-1 gap-x-2 gap-y-12 md:grid-cols-3">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
          <MapPin size={18} />
        </div>

        <div>
          <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}   className="mb-3 font-heading text-[24px] font-bold uppercase tracking-wide text-[#ff7a00] md:text-[28px]">
            Ahmedabad
          </h3>

          <p className="text-[16px] leading-[1.6] text-[#4a4a4a]">
            1st Floor, 2 Opera Society, Part 2, Beside Aangi Flats, Opp.
            Annapurna Hall, New Vikasgruh Road, Paldi, Ahmedabad, Gujarat -
            380007.
          </p>

          <a
            href="tel:+919999610505"
            className="mt-4 inline-block text-[24px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
          >
            +91 99986 10505
          </a>
        </div>
      </div>

      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
          <MapPin size={18} />
        </div>

        <div>
          <h3 style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}   className="mb-3 font-heading text-[24px] font-bold uppercase tracking-wide text-[#ff7a00] md:text-[28px]">
            Mumbai
          </h3>

          <p className="text-[16px] leading-[1.6] text-[#4a4a4a]">
            Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum,
            Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.
          </p>

          <a
            href="tel:+919999610505"
            className="mt-4 inline-block text-[24px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
          >
            +91 99986 10505
          </a>
        </div>
      </div>

      {/* <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
          <MapPin size={18} />
        </div>

        <div>
          <h3 className="mb-3 font-heading text-[24px] font-bold uppercase tracking-wide text-[#ff7a00] md:text-[28px]">
            U.K.
          </h3>

          <p className="text-[16px] leading-[1.6] text-[#4a4a4a]">
            Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.
          </p>

          <a
            href="tel:+919999610505"
            className="mt-4 inline-block text-[15px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
          >
            +91 99986 10505
          </a>
        </div>
      </div> */}
    </div>
  </div>
</div>

{/* FORM */}
<div className="bg-[#dedede]">
  <div className="mx-auto max-w-full px-6 py-16 sm:px-8 lg:px-20 2xl:px-32">
  
  <h1 className="text-[28px] mb-1 font-semibold leading-tight text-[#a20d69] md:text-[34px] lg:text-[50px]">
  No decks. No jargon. Just an Honest Conversation.
</h1>

<span className=" font-medium text-[28px] text-[#424242] xl:text-[32px] 2xl:text-[36px]">
  Let’s catch up over a cup of coffee !
</span>

    <form onSubmit={handleSubmit}>
      <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
        />

        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
        />

        <input
          type="text"
          name="contact_no"
          value={formData.contact_no}
          onChange={handleChange}
          placeholder="Contact Number"
          className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
        />
      </div>

    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Country"
    className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
  />

  <input
    type="text"
    name="state"
    value={formData.state}
    onChange={handleChange}
    placeholder="State"
    className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
  />

  <input
    type="text"
    name="district"
    value={formData.district}
    onChange={handleChange}
    placeholder="District"
    className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
  />
</div>
   <div className="mt-7">
  <h1 className="mb-5 text-[20px] font-bold text-[#555] ">
    Interested Services
  </h1>

  {loadingExpertise ? (
    <p className=" text-[#555]">Loading services...</p>
  ) : expertiseList.length > 0 ? (
    <div className="grid mt-2 grid-cols-1 gap-3 md:grid-cols-3">
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
              onChange={() => handleServiceChange(expertise.id)}
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

            <span className="text-[20px] text-[#666] ">
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
        rows={5}
        placeholder="Tell us about your project..."
        className="mt-7 w-full resize-none rounded-md border-0 bg-white px-4 py-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
      />

      <div className="mt-3 grid grid-cols-1 gap-7 md:grid-cols-[264px_340px_1fr]">
       <div className="flex h-[61px] w-full overflow-hidden rounded-md border border-[#e8d5e1] bg-white shadow-[0_8px_22px_rgba(150,25,101,0.10)]">
  {/* Captcha Text Box */}
  <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#ffffff_0%,#fdf1f8_100%)]">
    <span className="relative z-10 select-none font-heading text-[22px] font-bold tracking-[0.32em] text-[#555] drop-shadow-sm">
      {captchaCode}
    </span>
  </div>

  {/* Refresh Button */}
  <button
    type="button"
    onClick={generateCaptcha}
    className="group flex h-full w-[60px] items-center justify-center border-l border-[#ead8e3] bg-[#fff7fb] text-[#961965] transition-all duration-300 hover:bg-[#961965] hover:text-white"
    aria-label="Refresh captcha"
  >
    <RotateCcw
      size={18}
      className="transition-transform duration-500 group-hover:rotate-180"
    />
  </button>
</div>
        <input
          type="text"
          name="captcha"
          value={formData.captcha}
          onChange={handleChange}
          placeholder="Enter Captcha"
          className="h-[61px] w-full rounded-md border-0 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
        />
<motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                             
                        className=""
                    >
                        <button   type="submit" disabled={submitLoading} className="motion-shine w-full h-[61px]  rounded-md  bg-gradient-to-r from-[#c22c86] to-[#780040] px-6 py-3 text-[18px]  font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                           {submitLoading ? "Sending..." : "Let’s Connect"}

                           
                        </button>
                    </motion.div>
     
      </div>
    </form>
  </div>
</div>
        {/* MAP */}
        <div className="h-[606px] w-full overflow-hidden">
          <iframe
            src="https://www.google.com/maps?q=23.009938,72.553248&z=16&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Purple Phase Communications Location"
            className="h-full w-full"
          />
        </div>
      </section>
    </>
  );
}
