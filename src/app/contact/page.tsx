"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Phone, Mail, Send, RotateCcw } from "lucide-react";
import { toast } from "react-toastify";
import { apiUrl } from "../config";
import Breadcrumb from "../components/breadcrumb";

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

    const fetchServices = async (): Promise<void> => {
        try {
            setLoadingServices(true);

            const res = await axios.post<ServiceListResponse>(`${apiUrl}/serviceList`, {});

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

            const res = await axios.post<ContactResponse>(`${apiUrl}/contact`, payload);

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
            } else {
                toast.error(res.data?.message || "Something went wrong. Please try again.");
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
            <Breadcrumb />
            <section className="bg-white font-body text-gray-600">
                <div className="border-t border-gray-100" />

                <div className="mx-auto max-w-full px-6 py-12 md:px-10 lg:px-16 lg:py-16">
                    <div className="mb-14 text-center">
                        <h2 className="font-heading text-[34px] font-semibold uppercase tracking-[0.15em] text-gray-900 md:text-[40px]">
                            Contact <span className="text-primary">Us</span>
                        </h2>
                        <div className="mx-auto mt-2 h-1 w-20 bg-secondary" />
                    </div>

<div className="mb-16 grid grid-cols-1 gap-10 lg:grid-cols-2">
    {/* Left Side: Contact Details */}
    <div className="space-y-8">
        <div className="group flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                <Phone size={22} />
            </div>

            <div>
                <h3 className="font-heading mb-1 text-[18px] font-bold uppercase tracking-wider text-gray-800">
                    Call Us
                </h3>
                <p className="text-[17px]">
                    <span className="font-medium text-gray-900">Prerak Shah:</span>
                    <br />
                    <a
                        href="tel:+919327009400"
                        className="transition-colors hover:text-secondary"
                    >
                        +91 9327009400
                    </a>
                    <br />
                       <a
                        href="tel:+9193270 09400"
                        className="transition-colors hover:text-secondary"
                    >
                        +91 93270 09400
                    </a>
                    
                </p>
            </div>
        </div>

        <div className="group flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                <Mail size={22} />
            </div>

            <div>
                <h3 className="font-heading mb-1 text-[18px] font-bold uppercase tracking-wider text-gray-800">
                    Email Id
                </h3>
                <p className="break-all text-[17px] transition-colors hover:text-secondary">
                    <a href="mailto:info.purplephase@gmail.com">
                        info.purplephase@gmail.com
                    </a>
                </p>
            </div>
        </div>

        <div className="group flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                <Send size={22} />
            </div>

            <div>
                <h3 className="font-heading mb-1 text-[18px] font-bold uppercase tracking-wider text-gray-800">
                    Address
                </h3>
                <p className="text-[17px] leading-relaxed">
                    First Floor, Bungalow No.2, Opera Society, Part-2,
                    Paldi, Ahmedabad - 380 007, Gujarat.
                </p>
            </div>
        </div>
    </div>

    {/* Right Side: Map */}
    <div className="overflow-hidden rounded-xl border border-gray-200">
        <iframe
            src="https://www.google.com/maps?q=23.009938,72.553248&z=14&output=embed"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Purple Phase Communications Location"
            className="h-[350px] w-full "
        />
    </div>
</div>
                    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-8 md:p-12">
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

                            <div className="pt-6">
                                <h3 className="font-heading mb-6 text-[18px] font-semibold text-gray-800">
                                    Interested Services
                                </h3>

                                {loadingServices ? (
                                    <p className="text-[15px] text-gray-500">
                                        Loading services...
                                    </p>
                                ) : services.length > 0 ? (
                                    <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
                                        {services.map((service) => (
                                            <label
                                                key={service.id}
                                                className="group flex cursor-pointer items-center gap-3 text-[15px] transition-colors hover:text-primary"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.services.includes(service.id)}
                                                    onChange={() => handleServiceChange(service.id)}
                                                    className="h-5 w-5 rounded border-gray-300 accent-primary"
                                                />
                                                <span>{service.service_name}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-[15px] text-gray-500">
                                        No services found.
                                    </p>
                                )}
                            </div>

                            <div className="pt-4">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Tell us about your project..."
                                    className="w-full border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
                                />
                            </div>

                            <div className="flex flex-wrap items-center gap-4 pt-4">
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

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={submitLoading}
                                    className="bg-primary font-heading px-12 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitLoading ? "Sending..." : "Send Message"}
                                </button>
                            </div>
                        </form>
                    </div>

             
                </div>
            </section>
        </>
    );
}