"use client";

import Image from "next/image";
import { MoveLeft, MoveRight, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactSection } from "../components/ContactSection";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config";
import { LuMoveUpRight } from "react-icons/lu";
import { useRouter } from "next/navigation";
import ContactPopup from "../components/ContactPopup";

export default function AboutPage() {
  interface Member {
    id: number;
    name: string;
    designation: string;
    description: string;
    photo: string;
    sequence_no: number;
    created_at: string;
  }
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);

    const handleContactPopupOpen = () => {
        setIsContactPopupOpen(true);
    };

  const [members, setMembers] = useState<Member[]>([]);
  const [current, setCurrent] = useState(0);
  const router =useRouter();

  const insights = [
    {
      title: "CUSTOMER INSIGHT",
      desc: "A message that is relevant to the customer",
    },
    {
      title: "CATEGORY INSIGHT",
      desc: "A well informed strategy within industry perspective",
    },
    {
      title: "COMPETITION INSIGHT",
      desc: "A strategy that differentiates brand from competition",
    },
    {
      title: "CLIENT INSIGHT",
      desc: "A strategy that is true and sustainable",
    },
  ];

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % insights.length);
    }, 2500);

    return () => clearInterval(id);
  }, []);

  const items = [
    "BRAND BUILDERS",
    "TRUTH SEEKERS",
    "STORYTELLERS",
    "SOLUTION PROVIDERS",
    "DOMAIN EXPERTS",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 2500);

    return () => clearInterval(id);
  }, []);

 useEffect(() => {
  const fetchMembers = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/teamMembersList`,
        {}, // request body
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      if (response.data.success) {
        setMembers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  fetchMembers();
}, []);

  const member = members[current];

  const nextMember = () => {
    setCurrent((prev) => (prev === members.length - 1 ? 0 : prev + 1));
  };

  const prevMember = () => {
    setCurrent((prev) => (prev === 0 ? members.length - 1 : prev - 1));
  };
  return (
    <>
      {/* ================= HERO ================= */}

      <section className="relative h-[420px] sm:h-[500px] lg:h-[550px] 2xl:h-[720px] overflow-hidden bg-[#dedede]">
        {/* GIF */}
        <div className="absolute right-0 top-0 h-full w-[100%]">
          <img
            src="/assets/about/about-main.gif"
            alt="About Banner"
            className="h-full w-full object-cover object-[center_20%]"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full items-center">
          <div className="px-5 sm:px-8 lg:ml-[50px]">
            <div className="h-[300px] overflow-hidden">
              <motion.div
                animate={{
                  y: -(index * 56),
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                {[...items, ...items].map((text, i) => {
                  const center =
                    (i - index + items.length) % items.length === 2;

                  return (
                    <h1
                      key={i}
                      className={`h-[44px] sm:h-[56px] text-[26px] sm:text-[32px] lg:text-[38px]  font-bold leading-[1.09]
                transition-all duration-500

                ${center
                          ? "text-[#9C1367] opacity-100 2xl:text-[60px]"
                          : "text-white opacity-0 2xl:text-[64px]"
                        }
                `}
                    >
                      {text}
                    </h1>
                  );
                })}
              </motion.div>
            </div>

          
       <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.45 }}
  onClick={() => {
    document.getElementById("team")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
  className="flex mt-10 justify-center lg:justify-start"
>
  <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
    Meet The Team

    <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <LuMoveUpRight className="h-5 w-5" />
    </span>
  </button>
</motion.div>
          </div>
        </div>
      </section>

    

      {/* ================= PURPLE POTENTIAL ================= */}

    <section className="w-full bg-white py-[85px]">
  <div className="mx-auto max-w-full px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24">
    <div className="grid items-center gap-10 lg:grid-cols-[52%_48%] lg:gap-0">
      
      {/* Image */}
      <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[330px] md:h-[380px] lg:h-[420px]">
        <Image
          src="/assets/about/chess.png"
          alt="Unlock Brand Potential"
          width={560}
          height={420}
          className="h-auto w-full max-w-[360px] object-contain sm:max-w-[450px] lg:max-w-[520px]"
          priority
        />
      </div>

      {/* Content */}
      <div className=" lg:pl-4 xl:pl-8">
        <h2
          className="mb-6 text-[34px] font-semibold !leading-none tracking-[0.03em] text-[#9c1367] sm:text-[42px] md:text-[48px] lg:text-[58px]"
          style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}
        >
          Unlock Your Brand&apos;s <br />
          Greatest Potential
        </h2>

        <p className="mb-7  text-[16px] font-normal leading-[1.55] tracking-[0.01em] text-[#555555] sm:text-[18px] lg:text-[20px]">
          In alchemy, before raw gold turns into gleaming gold,
          <br  />
          there is a phase when it turns Purple. This phase of
          <br  />
          transformation is Purple Phase.
        </p>

        <h3
          className="max-w-[680px] text-[18px] font-bold leading-[1.45] tracking-[0.04em] text-[#f28c00] sm:text-[21px] lg:text-[26px]"
          style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}
        >
          We are your branding partner in this
          <br className="hidden lg:block" />
          journey of transformation from a raw
          <br className="hidden lg:block" />
          gold brand into gleaming gold brand.
        </h3>
      </div>
    </div>
  </div>
</section>

      {/* ================= WE ARE PURPLE PHASE ================= */}

      <section className=" bg-[#f4f4f4]">
        <div className="py-16 2xl:py-[85px] mx-auto max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          <h2 className="mb-10  leading-[1.05] text-[#9c1367]">
            We are Purple Phase
          </h2>

          <div className=" space-y-8 text-[20px] 2xl:text-[28px] leading-[1.5] text-[#5A5A5A]">
            <p >
              A Strategic Branding & AI Native Digital Marketing Agency with a
              global vision and deep local resonance.
            </p>

            <p >
              Born in 2010, we have a legacy spanning <b>70 years</b> in
              branding & advertising. We started with a belief that a well-built
              brand is the single greatest competitive advantage any business
              can have. Not the biggest budget. Not the flashiest product. The
              brand.
            </p>

            <p >
              The world has changed. The media, the consumer, the technology,
              the speed. We have evolved with it. But our belief has stood the
              test of time. With that belief, we have built brands across
              industries, categories, and markets.
            </p>

            <p >
              Every time we start with the same question.
            </p>

            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="pt-4 text-[20px] 2xl:text-[36px] font-bold uppercase text-[#F28C00]">
              WHAT IS YOUR BRAND STORY?
            </h3>
 <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.45 }}
                        onClick={()=>handleContactPopupOpen()}
                        className=" flex justify-center lg:justify-start"
                    >
                        <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                              Tell Your Story
                            <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <LuMoveUpRight className="h-5 w-5" />
                            </span>
                        </button>
                    </motion.div>
          
          </div>
        </div>
      </section>

      {/* ================= LEGACY ================= */}
      <section className="bg-white ">
        <div className="py-16 2xl:py-[85px] mx-auto max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          <h2 className="mb-8  leading-[1.05] text-[#9c1367]">
            Your brand isn't a project to us
            <br />
            It's a story we help write
          </h2>

          <p className=" 2xl:w-[926px] leading-[1.6] text-[#424242]">
            Stories that intrigue, excite, shock, dare, inspire, bring a smile,
            compel to think & act, and more than anything touch consumers in a
            way which elevates their lives.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F6F6] pb-16">
        <div className=" mx-auto max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
          {/* Years */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* 70 Years */}
            <div className="relative flex justify-center">
              <Image
                src="/assets/about/70years.jpg"
                alt="70 Years"
                width={560}
                height={420}
                className="w-[734px] h-[620px] object-contain"
                priority
              />
            </div>

            {/* 25 Years */}
            <div className="relative flex justify-center">
              <Image
                src="/assets/about/25years.jpg"
                alt="25 Years"
                width={560}
                height={420}
                className="w-[734px] h-[620px] object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 ">
            <p className=" leading-[1.75] ">
              When there was no AI, no social media, no design tools, no internet…in
              fact no computer and mobile phone… when even rotary dial phones (what’s
              that? Look up in Google) were a luxury…our story began back then in
              1953.
            </p>

            <p className="mt-7 ">
              At that time, we used to hand-paint advertisements, posters and billboards for some of India’s biggest brands. Even 60 feet billboards were painstakingly hand painted. Of course there was no CTRL+Z. One mistake and you have to redo the entire thing.
            </p>

            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="mt-8   tracking-[0.4px] text-[#F28C00] leading-[1.45]">
              SO FOR US, PRECISION HAS NEVER BEEN ABOUT SKILL, BUT A BASIC INSTINCT.
            </h3>
                   <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.45 }}
  onClick={()=>handleContactPopupOpen()}
  className="flex mt-6 justify-center lg:justify-start"
>
  <button className="motion-shine  group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
   Leverage Legacy
    <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <LuMoveUpRight className="h-5 w-5" />
    </span>
  </button>
</motion.div>
          
          </div>
        </div>
      </section>
      {/* ================= AI EDGE ================= */}


      <section className="relative overflow-hidden bg-white">
        <div className="relative min-h-[638px]">

          {/* Right Side Background Image */}
          <div className="absolute top-0 right-0 h-full w-full lg:w-[50%]">
            <Image
              src="/assets/about/menvsrobochess.png"
              alt="Human Thinking AI Edge"
              fill
              priority
              className="object-cover object-right"
            />
          </div>

          {/* White Overlay Content */}
          <div className="relative z-10 flex  items-center">
            <div className="max-w-full lg:w-[60%] bg-white px-4 sm:px-6 lg:px-20 2xl:px-32 py-16">

              <div className="">
                <h2 className="mb-6   text-[#9C1367]">
                  Human Thinking,
                
                  AI Edge
                </h2>

                <p className="mb-8  leading-[1.6] text-[#424242]">
                  We thoughtfully deploy AI capabilities where it adds <br/> real value
                  across research, strategy, content, design,<br/> media planning and
                  digital marketing.
                </p>

                <p className="mb-8  leading-[1.6] text-[#424242]">
                  Human thinking and judgement is absolutely <br/> irreplaceable. What AI
                  does is helps our team to <br/> sharpen insights, explore possibilities,
                  and move brands <br/> with greater speed and precision.
                </p>
                   <motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.45 }}
 onClick={()=>handleContactPopupOpen()}
  className="flex justify-center lg:justify-start"
>
  <button className="motion-shine mt-5 group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
   Get AI Edge
    <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <LuMoveUpRight className="h-5 w-5" />
    </span>
  </button>
</motion.div>
              
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* ================= EVIDENCE ================= */}

     
      <section className="relative overflow-hidden bg-[#f4f4f4] py-20">
        {/* Watermark */}
        <div className="hidden text-[140px] 2xl:text-[200px] font-bold leading-[0.85] text-[#ECECEC] lg:block absolute right-0 bottom-0 pointer-events-none z-0">
          <h1 className=" text-right">
            4C
          </h1>

          <h1 className=" -mt-2">
            THINKING
          </h1>
        </div>

        {/* Content */}
        <div className="relative  ">
          <div className="max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32 ">
            <h2 className="mb-10 text-[36px] md:text-[48px]   font-semibold leading-[1.05] text-[#9c1367]">
              We don't position brands on instinct
              <br />
              We position them on evidence
            </h2>

            <div className="space-y-2">
              {insights.map((item, i) => {
                const isActive = active === i;

                return (
                <div className="group">
 <motion.div
  key={i}
  layout
  transition={{ duration: 0.45 }}
  className="
    group relative w-fit overflow-hidden rounded-full px-7 py-5
    bg-transparent
    transition-all duration-500 ease-in-out
    hover:bg-gradient-to-r
    hover:from-[#A11772]
    hover:to-[#6C0A4D]
    hover:min-w-[300px]
    hover:sm:min-w-[420px]
    hover:lg:min-w-[520px]
    cursor-pointer
  "
>
  <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="font-semibold uppercase text-[#9C1367] transition-colors duration-500 group-hover:text-white">
    {item.title}
  </h3>

  <span className="mt-2 block text-[18px] 2xl:text-[28px] text-[#424242] transition-colors duration-500 group-hover:text-white">
    {item.desc}
  </span>
</motion.div>
</div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= TEAM ================= */}

     

        <section id="team" className="overflow-hidden bg-white ">
  <div className="max-w-full px-4 sm:px-6 lg:px-20 2xl:px-32">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
      {/* Left Content */}
<div className="w-full flex flex-col justify-center">
    <h2 className=" font-semibold leading-[1.08] text-primary">
      We Are The Team Behind Your Team Dedicated To Build Your Brand
    </h2>

    {/* Fixed Height */}
    <div className="relative mt-24 min-h-[230px] ">

      <AnimatePresence mode="wait">
        {member && (
          <motion.div
            key={member.id}
            className="absolute inset-0"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className=" text-primary">
              {member.name}
            </h3>

            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="mt-5 tracking-[1px] text-primary">
              {member.designation}
            </h3>

            <p className="mt-2 w-[500px] ">
              {member.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

    {/* Navigation */}
    <div className="mt-8 flex items-center gap-12">

      <button
        onClick={prevMember}
        className="group"
      >
        <MoveLeft className="h-14 w-14  text-[#9B9B9B] transition group-hover:-translate-x-1" />
      </button>

      <button
        onClick={nextMember}
        className="group"
      >
        <MoveRight className="h-14 w-14 text-[#9B9B9B] transition group-hover:translate-x-1" />
      </button>

    </div>

</div>

      {/* Right Image */}
      <div className="w-full lg:w-[42%] flex justify-center lg:justify-end">

        <div className="relative h-[680px] w-full max-w-[560px] overflow-hidden">

          <AnimatePresence mode="wait">
            {member && (
              <motion.div
                key={member.id}
                className="absolute inset-0 flex items-end justify-center"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  priority
                  unoptimized
                  className="object-contain object-bottom"
                />
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  </div>
</section>

      {/* ================= CONTACT ================= */}

      <ContactSection />
      <ContactPopup
                      isOpen={isContactPopupOpen}
                      onClose={() => setIsContactPopupOpen(!isContactPopupOpen)}
                  />
    </>
  );
}
