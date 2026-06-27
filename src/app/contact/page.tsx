"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Phone, Mail, Send, RotateCcw, MapPin } from "lucide-react";
import { toast } from "react-toastify";
import { apiUrl } from "../config";
import Breadcrumb from "../components/breadcrumb";
import { useRouter } from "next/navigation";

type ServiceItem = {
  id: number;
  service_name: string;
};

type FormDataType = {
  name: string;
  email: string;
  contact_no: string;
  company: string;
  services: number[];
  message: string;
  captcha: string;
};

type ServiceListResponse = {
  success: boolean;
  message: string;
  data: ServiceItem[];
};

type ContactResponse = {
  success: boolean;
  message: string;
};

export default function ContactPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loadingServices, setLoadingServices] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);

  const [captchaCode, setCaptchaCode] = useState<string>("8227");

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    contact_no: "",
    company: "",
    services: [],
    message: "",
    captcha: "",
  });

  useEffect(() => {
    fetchServices();
    generateCaptcha();
  }, []);

  const router = useRouter();

  const fetchServices = async (): Promise<void> => {
    try {
      setLoadingServices(true);

      const res = await axios.post<ServiceListResponse>(
        `${apiUrl}/serviceList`,
        {}
      );

      if (res.data?.success) {
        setServices(res.data.data || []);
      } else {
        toast.error(res.data?.message || "Service list not found.");
      }
    } catch (error) {
      console.error("Service list error:", error);
      toast.error("Failed to load services.");
    } finally {
      setLoadingServices(false);
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
        name: formData.name,
        email: formData.email,
        contact_no: formData.contact_no,
        company: formData.company,
        services: formData.services,
        message: formData.message,
      };

      console.log(`${apiUrl}/contact`);
      console.log(payload);

      const res = await axios.post<ContactResponse>(
        `${apiUrl}/contact`,
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
          message: "",
          captcha: "",
        });

        generateCaptcha();

        setTimeout(() => {
          router.push("/inquiry-thank-you");
        }, 1500);
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
          className="relative h-[360px] w-full overflow-hidden bg-[#f8f6f7] bg-cover bg-center bg-no-repeat md:h-[420px] lg:h-[470px]"
          style={{
            backgroundImage: "url('/assets/contact/contact-hero.jpg')",
          }}
        >
          <div className="mx-auto flex h-full max-w-[1440px] items-center px-6 md:px-20 lg:px-[30px]">
            <h1 className="relative z-10 max-w-[560px] font-heading text-[30px] font-bold leading-[1.15] text-[#a20d69] md:text-[40px] lg:text-[46px]">
              Let’s Talk About Your <br />
              Brand’s Next Phase
            </h1>
          </div>
        </div>

        {/* CONTACT DETAILS */}
        <div className="bg-[#f4f4f4]">
          <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-20 lg:px-[26px]">
            <div className="grid grid-cols-1 gap-x-20 gap-y-8 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
                  <Phone size={18} />
                </div>

                <div>
                  <h3 className="mb-2 font-heading text-[19px] font-bold uppercase tracking-wide text-[#ff7a00]">
                    Call Us
                  </h3>

                  <p className="text-[15px] leading-relaxed text-[#4a4a4a]">
                    <span className="font-semibold text-[#2f2f2f]">
                      Mr. Prerak Shah
                    </span>{" "}
                    <span className="text-[13px]">- Founder</span>
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
                  <h3 className="mb-2 font-heading text-[19px] font-bold uppercase tracking-wide text-[#ff7a00]">
                    Email Id
                  </h3>

                  <a
                    href="mailto:info.purplephase@gmail.com"
                    className="break-all text-[15px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
                  >
                    info.purplephase@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-12 gap-y-12 md:grid-cols-3">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#a20d69] text-[#a20d69]">
                  <MapPin size={18} />
                </div>

                <div>
                  <h3 className="mb-2 font-heading text-[19px] font-bold uppercase tracking-wide text-[#ff7a00]">
                    Ahmedabad
                  </h3>

                  <p className="text-[15px] leading-[1.55] text-[#4a4a4a]">
                    1st Floor, 2 Opera Society, Part 2, Beside Aangi Flats, Opp.
                    Annapurna Hall, New Vikasgruh Road, Paldi, Ahmedabad,
                    Gujarat - 380007.
                  </p>

                  <a
                    href="tel:+919999610505"
                    className="mt-3 inline-block text-[15px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
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
                  <h3 className="mb-2 font-heading text-[19px] font-bold uppercase tracking-wide text-[#ff7a00]">
                    Mumbai
                  </h3>

                  <p className="text-[15px] leading-[1.55] text-[#4a4a4a]">
                    Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem
                    Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.
                  </p>

                  <a
                    href="tel:+919999610505"
                    className="mt-3 inline-block text-[15px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
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
                  <h3 className="mb-2 font-heading text-[19px] font-bold uppercase tracking-wide text-[#ff7a00]">
                    U.K.
                  </h3>

                  <p className="text-[15px] leading-[1.55] text-[#4a4a4a]">
                    Lorem Ipsum, Lorem Ipsum, Lorem Ipsum, Lorem Ipsum.
                  </p>

                  <a
                    href="tel:+919999610505"
                    className="mt-3 inline-block text-[15px] text-[#4a4a4a] underline decoration-[#4a4a4a]/60 underline-offset-2 transition-colors hover:text-[#a20d69]"
                  >
                    +91 99986 10505
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="bg-[#dedede]">
          <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-20 lg:px-[26px]">
            <div className="mb-7">
              <h2 className="font-heading text-[27px] font-bold leading-tight text-[#a20d69] md:text-[34px]">
                No decks. No jargon. Just an Honest Conversation.
              </h2>

              <p className="mt-3 text-[19px] font-medium text-[#454545]">
                Let’s catch up over a cup of coffee !
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <input
                  type="text"
                  name="contact_no"
                  value={formData.contact_no}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                  type="text"
                  placeholder="Country"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <input
                  type="text"
                  placeholder="State"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <input
                  type="text"
                  placeholder="District"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />
              </div>

              <div className="mt-5">
                <h3 className="mb-4 text-[14px] font-semibold text-[#4c4c4c]">
                  Interested Services
                </h3>

                {loadingServices ? (
                  <p className="text-[14px] text-[#555]">Loading services...</p>
                ) : services.length > 0 ? (
                  <div className="grid grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="flex cursor-pointer items-center gap-3 text-[13px] text-[#606060]"
                      >
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service.id)}
                          onChange={() => handleServiceChange(service.id)}
                          className="h-[18px] w-[18px] rounded border border-[#b72a82] bg-transparent accent-[#b72a82]"
                        />

                        <span>{service.service_name}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-[14px] text-[#555]">No services found.</p>
                )}
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us about your project..."
                className="mt-5 w-full resize-none rounded-md border-0 bg-white px-4 py-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
              />

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-[190px_240px_1fr]">
                <div className="flex h-[38px] overflow-hidden rounded-md bg-white">
                  <div className="flex flex-1 items-center justify-center font-heading text-[15px] font-bold tracking-[0.28em] text-[#555]">
                    {captchaCode}
                  </div>

                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="flex h-full w-[42px] items-center justify-center text-[#a20d69] transition-opacity hover:opacity-80"
                    aria-label="Refresh captcha"
                  >
                    <RotateCcw size={17} />
                  </button>
                </div>

                <input
                  type="text"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  placeholder="Enter Captcha"
                  className="h-[38px] w-full rounded-md border-0 bg-white px-4 text-[13px] text-[#333] outline-none placeholder:text-[#8f8f8f]"
                />

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="h-[38px] w-full rounded-full bg-gradient-to-r from-[#c22c86] to-[#780040] text-[13px] font-bold text-white transition-all hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLoading ? "Sending..." : "Let’s Connect"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* MAP */}
        <div className="h-[335px] w-full overflow-hidden">
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
