"use client";

import { Phone, Mail, Send, RotateCcw } from "lucide-react";

const servicesLeft = [
    "Branding & Advertising",
    "Logo & Stationary",
    "Packing Design",
    "Ambaience Design",
    "Creative Content Writing",
];

const servicesRight = [
    "Brochure Design",
    "Event & Exabition Stall Design",
    "Social Media Marketing",
    "Video Marketing",
    "Website Design",
];

export default function ContactPage() {
    return (
        <section className="bg-white font-body text-gray-600">
            <div className="border-t border-gray-100" />

            <div className="mx-auto max-w-full px-6 py-12 md:px-10 lg:px-16 lg:py-16">
                <div className="mb-14 text-center">
                    <h2 className="font-heading text-[34px] font-semibold uppercase tracking-[0.15em] text-gray-900 md:text-[40px]">
                        Contact <span className="text-primary">Us</span>
                    </h2>
                    <div className="mx-auto mt-2 h-1 w-20 bg-secondary" />
                </div>

                <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
                    <div className="group flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h3 className="font-heading mb-1 text-[16px] font-bold uppercase tracking-wider text-gray-800">
                                Call Us
                            </h3>
                            <p className="text-[15px]">
                                <span className="font-medium text-gray-900">Prerak Shah:</span>
                                <br />
                                <a
                                    href="tel:+919327009400"
                                    className="transition-colors hover:text-secondary"
                                >
                                    +91 9327009400
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h3 className="font-heading mb-1 text-[16px] font-bold uppercase tracking-wider text-gray-800">
                                Email Id
                            </h3>
                            <p className="break-all text-[15px] transition-colors hover:text-secondary">
                                <a href="mailto:info.purplephase@gmail.com">
                                    info.purplephase@gmail.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="group flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-transform group-hover:scale-110">
                            <Send size={20} />
                        </div>
                        <div>
                            <h3 className="font-heading mb-1 text-[16px] font-bold uppercase tracking-wider text-gray-800">
                                Address
                            </h3>
                            <p className="text-[15px] leading-relaxed">
                                First Floor, Bungalow No.2, Opera Society, Part-2,
                                Paldi, Ahmedabad - 380 007, Gujarat.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-8 md:p-12">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Name*"
                                className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                            />
                            <input
                                type="email"
                                placeholder="Email*"
                                className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Contact No*"
                                className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                            />
                            <input
                                type="text"
                                placeholder="Company*"
                                className="h-14 w-full border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none transition-colors focus:border-primary"
                            />
                        </div>

                        <div className="pt-6">
                            <h3 className="font-heading mb-6 text-[18px] font-semibold text-gray-800">
                                Interested Services
                            </h3>
                            <div className="grid grid-cols-1 gap-x-12 gap-y-4 md:grid-cols-2">
                                {[servicesLeft, servicesRight].map((list, idx) => (
                                    <div key={idx} className="space-y-4">
                                        {list.map((service) => (
                                            <label
                                                key={service}
                                                className="group flex cursor-pointer items-center gap-3 text-[15px] transition-colors hover:text-primary"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="h-5 w-5 rounded border-gray-300 accent-primary"
                                                />
                                                <span>{service}</span>
                                            </label>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <textarea
                                rows={4}
                                placeholder="Tell us about your project..."
                                className="w-full border-b-2 border-gray-200 bg-transparent px-2 py-4 text-gray-900 outline-none transition-colors focus:border-primary"
                            />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="flex h-12 items-center bg-gray-200 px-6 font-heading text-xl font-bold tracking-[0.3em] text-gray-700">
                                    8227
                                </div>
                                <button
                                    type="button"
                                    className="flex h-12 w-12 items-center justify-center bg-secondary text-white transition-opacity hover:opacity-90"
                                >
                                    <RotateCcw size={20} />
                                </button>
                            </div>
                            <input
                                type="text"
                                placeholder="Enter Captcha"
                                className="h-12 w-full max-w-50 border-b-2 border-gray-200 bg-transparent px-2 text-gray-900 outline-none focus:border-primary"
                            />
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                className="bg-primary font-heading px-12 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:shadow-lg active:scale-95"
                            >
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>

                <div className="mt-14 overflow-hidden rounded-xl border border-gray-200">
                    <iframe
                        src="https://www.google.com/maps?q=23.009938,72.553248&z=14&output=embed"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Purple Phase Communications Location"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
}