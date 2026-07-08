  "use client";

  import { useEffect, useState, ChangeEvent, FormEvent } from "react";
  import { motion, AnimatePresence } from "framer-motion";
  import axios from "axios";
  import { toast } from "react-toastify";
  import { apiUrl } from "../config";
  import { useRouter } from "next/navigation";
  import { ChevronLeft, ChevronRight, X } from "lucide-react";
  import logo from "../assets/career/apply-people.png"


  type CareerItem = {
    id: number;
    title: string;
    description: string;
    created_at: string;
  };

  type CareerListResponse = {
    success: boolean;
    message: string;
    data: CareerItem[];
  };

  type CareerFormResponse = {
    success: boolean;
    message: string;
  };

  type FormDataType = {
    first_name: string;
     career_id: string;
    email: string;
    contact_no: string;
    qualification: string;
    resume: File | null;
    captcha: string;
  };

  export default function CareerPage() {
    const [careers, setCareers] = useState<CareerItem[]>([]);
    const [loadingCareers, setLoadingCareers] = useState<boolean>(false);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [openCareerId, setOpenCareerId] = useState<number | null>(null);

  const [captchaAnswer, setCaptchaAnswer] = useState("");

const captchaQuestion = "5 + 3";
const correctCaptcha = "8";
  const careerImages = [
    "/assets/career/life-1.png",
    "/assets/career/life-2.png",
    "/assets/career/life-3.jpg",
    "/assets/career/life-4.png",
    "/assets/career/life-5.jpg",
  ];

  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [formData, setFormData] = useState<FormDataType>({
      first_name: "",
    career_id: "",
      email: "",
      contact_no: "",
      qualification: "",
      resume: null,
      captcha: "",
    });
    const router = useRouter();

    useEffect(() => {
      fetchCareers();
    }, []);

    const fetchCareers = async (): Promise<void> => {
      try {
        setLoadingCareers(true);

        const res = await axios.post<CareerListResponse>(
          `${apiUrl}/careerlist`,
          {},
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (res.data?.success) {
          setCareers(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Career list not found.");
        }
      } catch (error) {
        console.error("Career list error:", error);
        toast.error("Failed to load career list.");
      } finally {
        setLoadingCareers(false);
      }
    };

   

  
    const handleChange = (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ): void => {
      const { name, value } = e.target;
    
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
      const file = e.target.files?.[0] || null;

      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();

      if (!formData.first_name.trim()) {
        toast.error("Please enter first name.");
        return;
      }
if (!formData.career_id) {
  toast.error("Please select applied for.");
  return;
}

      if (!formData.email.trim()) {
        toast.error("Please enter email.");
        return;
      }

      if (!formData.contact_no.trim()) {
        toast.error("Please enter contact number.");
        return;
      }

      if (!formData.qualification.trim()) {
        toast.error("Please enter qualification.");
        return;
      }

      if (!formData.resume) {
        toast.error("Please upload resume.");
        return;
      }
if (captchaAnswer.trim() !== correctCaptcha) {
  toast.error("Please enter correct captcha answer.");
  return;
}
      try {
        setSubmitLoading(true);

        const payload = new FormData();
        payload.append("first_name", formData.first_name);
        payload.append("career_id", formData.career_id);
        payload.append("email", formData.email);
        payload.append("contact_no", formData.contact_no);
        payload.append("qualification", formData.qualification);
        payload.append("resume", formData.resume);

        const res = await axios.post<CareerFormResponse>(
          `${apiUrl}/careerFormStore`,
          payload,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.data?.success) {
          toast.success(
            res.data.message ||
              "Your application has been submitted successfully."
          );

          setFormData({
            first_name: "",
            career_id: "",
            email: "",
            contact_no: "",
            qualification: "",
            resume: null,
            captcha: "",
          });

          const fileInput = document.getElementById(
            "resume"
          ) as HTMLInputElement | null;

          if (fileInput) {
            fileInput.value = "";
          }

      setCaptchaAnswer("");

          setTimeout(() => {
            router.push("/career-thank-you");
          }, 1500);
        } else {
          toast.error(
            res.data?.message || "Something went wrong. Please try again."
          );
        }
      } catch (error: unknown) {
        console.error("Career form submit error:", error);

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

    const openGallery = (index: number) => {
    setActiveImageIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) =>
      prev === 0 ? careerImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setActiveImageIndex((prev) =>
      prev === careerImages.length - 1 ? 0 : prev + 1
    );
  };
    return (
      <>

        <section className="bg-[#eeeeee] font-body text-[#3d3d3d]">
       
          <div className="relative w-full overflow-hidden bg-[#f7f5f6]">
            <img
              src="/assets/career/career-hero.jpg"
              alt="Great Work Needs Great People"
              className="block h-auto w-full"
            />

            <div className="absolute  inset-0 mx-auto max-w-full flex  items-center px-4 sm:px-6 lg:px-20 2xl:px-32">
              <h2 className=" leading-[130%] text-[#a20d69] ">
                Great Work Needs <br />
                Great People
              </h2>
            </div>
          </div>
          </section>
          <section className="bg-white max-w-full   py-16 xl:py-[85px] sm:px-6 lg:px-20 2xl:px-32">
                        <div className="">
              <h2 className="leading-[120%] font-semibold [font-variant-caps:all-small-caps]! text-primary">
                We Believe Great Brands Are Built By People{" "}
                <br  />
                Who Never Stop Learning.
              </h2>

              <div className="mt-7  space-y-6  text-[#424242] ">
                <p>
                  Some of us started when billboards were painted by hand. Some of
                  us work with AI every day. <br/> Together, we combine legacy with new
                  thinking.
                </p>

                <p>
                  Here, curiosity matters more than hierarchy. Ideas matter more
                  than titles. Creative freedom,<br/> meaningful growth, exciting
                  assignments, and a culture where a thousand no&apos;s shape a
                  single<br/> yes are all part of the journey.
                </p>

                <h3 className="font-bold [font-variant-caps:all-small-caps]!  text-secondary text-[20px]">
                  We Are Ambitious, Opinionated, <br />
                  And Hungry To Do The Best Work... Every Time.
                </h3>

                <p>
                  If that sounds like your kind of team, we would love to hear
                  from you.
                  <br />
                  Bring your curiosity, your point of view, and your hunger to
                  create exceptional work.
                </p>
              </div>
            </div>

          {/* LIFE SECTION + OPENINGS */}
        
            <div className="my-10">
              <h2 className="mb-8 font-heading text-[26px] font-bold [font-variant-caps:all-small-caps]! text-[#a20d69] md:text-[32px]">
                Life @ Purple Phase
              </h2>

              {/*COLLAGE */}
<div
  className="
    relative
    hidden
    h-[570px]
    w-full
    grid-cols-[16.5fr_13.1fr_15fr_20.5fr_30.5fr]
    grid-rows-[279px_279px]
    gap-3
    overflow-hidden
    md:grid
  "
>
  {/* Top Left */}
  <div
    onClick={() => openGallery(0)}
    className="group col-span-2 cursor-pointer overflow-hidden rounded-md"
  >
    <img
      src="/assets/career/life-1.png"
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* Top Middle */}
  <div
    onClick={() => openGallery(1)}
    className="group cursor-pointer overflow-hidden rounded-md"
  >
    <img
      src="/assets/career/life-2.png"
      alt=""
      className="h-full w-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* Center Image */}
  <div
    onClick={() => openGallery(3)}
    className="group row-span-2 cursor-pointer overflow-hidden rounded-md"
  >
    <img
      src="/assets/career/life-3.jpg"
      alt=""
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* Top Right Grey */}
  <div className="rounded-md bg-[#d7d7d7]" />

  {/* Bottom Left Grey */}
  <div className="rounded-md bg-[#d7d7d7]" />

  {/* Bottom Middle */}
  <div
    onClick={() => openGallery(2)}
    className="group col-span-2 cursor-pointer overflow-hidden rounded-md"
  >
    <img
      src="/assets/career/life-5.jpg"
      alt=""
      className="h-full w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-110"
    />
  </div>

  {/* Bottom Right */}
  <div
    onClick={() => openGallery(4)}
    className="group cursor-pointer overflow-hidden rounded-md"
  >
    <img
      src="/assets/career/life-4.png"
      alt=""
      className="h-full w-full object-cover object-[center_85%] transition-transform duration-500 group-hover:scale-110"
    />
  </div>
</div>

              {/* MOBILE COLLAGE */}
              <div className="grid grid-cols-1 gap-3 md:hidden">
                <img
                  src="/assets/career/life-1.png"
                  alt="Life at Purple Phase"
                  className="h-[180px] w-full rounded-md object-cover"
                />

                <img
                  src="/assets/career/life-2.png"
                  alt="Life at Purple Phase"
                  className="h-[180px] w-full rounded-md object-cover"
                />

                <img
                  src="/assets/career/life-3.jpg"
                  alt="Life at Purple Phase"
                  className="h-[260px] w-full rounded-md object-cover"
                />

                <img
                  src="/assets/career/life-4.png"
                  alt="Life at Purple Phase"
                  className="h-[180px] w-full rounded-md object-cover"
                />
              </div>

              {/* Career opening accordion */}
              <div className="mt-8 space-y-[14px]">
                {loadingCareers ? (
                  <div className="rounded-md bg-[#dedede] px-7 py-4 text-center text-[15px] font-semibold text-[#333]">
                    Loading openings...
                  </div>
                ) : careers.length > 0 ? (
                  careers.map((career) => {
                    const isOpen = openCareerId === career.id;

                    return (
                      <div key={career.id} className="overflow-hidden rounded-md">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenCareerId(isOpen ? null : career.id)
                          }
                          className={`grid w-full grid-cols-[1fr_120px_120px_30px] items-center rounded-md px-8 py-[15px] text-left transition ${
                            isOpen
                              ? "bg-gradient-to-r from-[#c22c86] to-[#780040] text-white"
                              : "bg-[#dedede] text-[#111]"
                          }`}
                        >
                          <span className="text-[18px] font-bold leading-none">
                            {career.title}
                          </span>

                          <span className="hidden text-[15px] font-normal leading-none md:block">
                            Full Time
                          </span>

                          <span className="hidden text-[15px] font-normal leading-none md:block">
                            On site
                          </span>

                          <motion.span
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex items-center justify-end text-[26px] font-light leading-none"
                          >
                            {isOpen ? "−" : "+"}
                          </motion.span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden rounded-b-md bg-white"
                            >
                              <div className="px-8 py-5">
                                <p className="whitespace-pre-line text-[15px] leading-7 text-[#444]">
                                  {career.description}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })
                ) : (
                  <div className="rounded-md bg-[#dedede] px-7 py-4 text-center text-[15px] font-semibold text-[#333]">
                    No openings found.
                  </div>
                )}
              </div>
            </div>
            </section>

          {/* APPLY FORM */}
           <section className="relative overflow-hidden bg-[linear-gradient(110deg,#c7358f_0%,#a31562_45%,#52002d_100%)] py-16 xl:py-[85px]">
                <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
                  {/* Heading */}
                    <h4 className="mb-4 text-[28px] font-semibold leading-tight tracking-wide text-white md:text-[38px] lg:text-[40px] 2xl:text-[50px]">
                     Ready to Build Brands with Us?
                    </h4>
          
                    <span className=" text-[22px] font-normal leading-tight text-white md:text-[28px] 2xl:text-[36px]">
                      We would love to hear from you.
                    </span>
          
                  <div className=" grid grid-cols-1 items-center  lg:grid-cols-12">
                    {/* Form */}
                    <div className="lg:col-span-8">
                      <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-3 md:grid-cols-2"
                      >
                       <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Full Name"
              className="h-[61px] w-full rounded-md border border-white/20 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8b8b8b]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="h-[61px] w-full rounded-md border border-white/20 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8b8b8b]"
            />

            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              className="h-[61px] w-full rounded-md border border-white/20 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8b8b8b]"
            />

            <input
              type="text"
              name="contact_no"
              value={formData.contact_no}
              onChange={handleChange}
              placeholder="Phone Number"
              className="h-[61px] w-full rounded-md border border-white/20 bg-white px-4 text-[18px] text-[#333] outline-none placeholder:text-[#8b8b8b]"
            />

            {/* Applied For */}
        
<div className="relative w-full">
  <select
    name="career_id"
    value={formData.career_id}
    onChange={handleChange}
    className="h-[61px] w-full appearance-none rounded-md border border-white/20 bg-white px-4 pr-12 text-[18px] text-[#333] outline-none"
  >
    <option value="">Applied for</option>

    {careers.map((career) => (
      <option key={career.id} value={career.id}>
        {career.title}
      </option>
    ))}
  </select>

  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666]"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.24 4.5a.75.75 0 01-1.08 0l-4.24-4.5a.75.75 0 01.02-1.06z"
      clipRule="evenodd"
    />
  </svg>
</div>


            {/* Resume */}
            <div className="flex h-[61px] items-center  overflow-hidden rounded-md border border-white/20 bg-white px-3">
              <input
                id="resume"
                type="file"
                name="resume"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx"
                className="w-full text-[18px] text-[#555] file:mr-3 file:rounded file:border-0 file:bg-[#ececec] file:px-3 file:py-1.5 file:text-[12px]"
              />
            </div>
          
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
    disabled={submitLoading}
    className="motion-shine !text-[18px] contact-gradient-btn h-[61px] w-full rounded-full font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
  >
    {submitLoading ? "Submitting..." : "Let's Connect"}
  </button> */}
    <button
    type="submit"
    disabled={submitLoading}
    className="animated-btn h-[61px] w-full"
  >
    {submitLoading ? "Submitting..." : "Let's Connect"}
  </button>
</div>
</div>
 
                      </form>
                    </div>
          
                    {/* Coffee Image */}
                     <div className="flex justify-center lg:col-span-4 lg:justify-end">
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
           
      <AnimatePresence>
    {galleryOpen && (
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={closeGallery}
      >
        {/* Close Button */}
        <button
          onClick={closeGallery}
          className="absolute right-8 top-8 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-primary"
        >
          <X size={22} />
        </button>

        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevImage();
          }}
          className="absolute left-8 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
        >
          <ChevronLeft size={30} className="text-[#A61D67]" />
        </button>

        {/* Image */}
        <AnimatePresence mode="wait">
          <motion.img
            key={careerImages[activeImageIndex]}
            src={careerImages[activeImageIndex]}
            alt=""
            className="max-h-[90vh] max-w-[90vw] object-contain"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
        </AnimatePresence>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNextImage();
          }}
          className="absolute right-8 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-lg transition hover:bg-white"
        >
          <ChevronRight size={30} className="text-[#A61D67]" />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
      </>
    );
  }
