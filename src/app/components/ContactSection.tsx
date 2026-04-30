import logo from "../assets/coffee cups.png";

export function ContactSection() {
    return (
        <section className="bg-primary py-16 md:py-24">
            <div className="mx-auto max-w-full px-5 md:px-10 lg:px-16">
                <h2 className="mb-10 text-3xl font-medium text-white md:text-5xl">
                    Let’s catch up over a cup of coffee!
                </h2>

                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                    {/* Left Side: Form */}
                    <div className="lg:col-span-7 ">
                        <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="h-[60px] rounded-lg bg-white p-5 text-base outline-none"
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="h-[60px] rounded-lg bg-white p-5 text-base outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Company Name"
                                className="h-[60px] rounded-lg bg-white p-5 text-base outline-none"
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="h-[60px] rounded-lg bg-white p-5 text-base outline-none"
                            />

                            <textarea
                                placeholder="What solution are you looking for?"
                                className="h-[170px] rounded-lg bg-white p-5 text-base outline-none md:col-span-2"
                            />

                            <button className="h-[60px] rounded-lg border border-white bg-white/20 font-medium text-white transition hover:bg-white hover:text-primary md:col-span-2">
                                Let’s connect
                            </button>
                        </form>
                    </div>

                    {/* Right Side: Coffee Illustration */}
                    <div className="flex justify-center lg:col-span-5  lg:justify-end">
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