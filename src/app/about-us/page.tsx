"use client";

import Image from "next/image";
import { ArrowRight, ArrowLeft, MoveUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactSection } from "../components/ContactSection";
import { AnimatePresence, motion } from "framer-motion";

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

  const [members, setMembers] = useState<Member[]>([]);
  const [current, setCurrent] = useState(0);

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
        const res = await fetch(
          "https://purplephase.in/ppcadmin/api/teamMembersList",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await res.json();

        console.log(data);

        if (data.success) {
          setMembers(data.data);
        }
      } catch (err) {
        console.log(err);
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
    <main className="">
      {/* ================= HERO ================= */}

      <section className="relative h-[420px] sm:h-[500px] lg:h-[550px] overflow-hidden bg-[#dedede]">
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
          <div className="px-5 sm:px-8 lg:ml-[90px]">
            <div className="h-[250px] overflow-hidden">
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
                    <h2
                      key={i}
                      className={`h-[44px] sm:h-[56px] text-[26px] sm:text-[32px] lg:text-[38px] font-bold leading-[1.08]
                transition-all duration-500

                ${
                  center
                    ? "text-[#9C1367] opacity-100"
                    : "text-white opacity-40"
                }
                `}
                    >
                      {text}
                    </h2>
                  );
                })}
              </motion.div>
            </div>

            <button className="mt-8 rounded-full bg-[#9C1367] px-3 py-2 text-lg font-semibold text-white">
              Meet The Team ↗
            </button>
          </div>
        </div>
      </section>

      {/* Content Layer */}

      {/* ================= PURPLE POTENTIAL ================= */}

      <section className="bg-white py-10">
  <div className="max-w-full mx-auto px-5 md:px-10 ">
    <div className="grid lg:grid-cols-2 items-center gap-12 ">

      {/* Image */}
      <div className="relative w-full h-[250px] sm:h-[320px] md:h-[400px] lg:h-[550px]">
        <Image
          src="/assets/about/chess.png"
          alt="Unlock Brand Potential"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="">
        <h2 className="mb-6 text-[32px] sm:text-[40px]  font-bold uppercase leading-[1.17] text-[#9c1367]">
          Unlock Your Brand&apos;s
          <br />
          Greatest Potential
        </h2>

        <p className="mb-6 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#555555]">
          In alchemy, before raw gold turns into gleaming gold, there is a
          phase when it turns Purple. This phase of transformation is Purple
          Phase.
        </p>

        <p className="text-[18px] sm:text-[22px]  font-bold uppercase leading-[1.7] text-[#f28c00]">
          We are your branding partner in this journey of transformation from
          a raw gold brand into gleaming gold brand.
        </p>
      </div>

    </div>
  </div>
</section>

      {/* ================= WE ARE PURPLE PHASE ================= */}

      <section className="py-24 bg-[#f4f4f4]">
        <div className="px-5 sm:px-8 lg:px-[70px]">
          <h2 className="mb-10 text-[48px] font-bold leading-[1.05] text-[#9c1367]">
            We are Purple Phase
          </h2>

          <div className="max-w-[1200px] space-y-8">
            <p className="text-[20px] leading-[1.5] text-[#5A5A5A]">
              A Strategic Branding & AI Native Digital Marketing Agency with a
              global vision and deep local resonance.
            </p>

            <p className="text-[20px] leading-[1.5] text-[#5A5A5A]">
              Born in 2010, we have a legacy spanning <b>70 years</b> in
              branding & advertising. We started with a belief that a well-built
              brand is the single greatest competitive advantage any business
              can have. Not the biggest budget. Not the flashiest product. The
              brand.
            </p>

            <p className="text-[20px] leading-[1.5] text-[#5A5A5A]">
              The world has changed. The media, the consumer, the technology,
              the speed. We have evolved with it. But our belief has stood the
              test of time. With that belief, we have built brands across
              industries, categories, and markets.
            </p>

            <p className="text-[20px] leading-[1.5] text-[#5A5A5A]">
              Every time we start with the same question.
            </p>

            <h3 className="pt-4 text-[20px] font-bold uppercase text-[#F28C00]">
              WHAT IS YOUR BRAND STORY?
            </h3>

            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#9c1367] px-5 py-2 text-lg font-semibold text-white">
              Tell Your Story
              <MoveUpRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ================= LEGACY ================= */}
 <section className="bg-white py-20">
  <div className="max-w-full mx-auto px-5 md:px-16 ">
     <h2 className="mb-8 text-[45px] font-semibold leading-[1.05] text-[#9c1367]">
            Your brand isn't a project to us
            <br />
            It's a story we help write
          </h2>

          <p className=" max-w-[650px] text-[20px] leading-[1.5] text-[#5A5A5A]">
            Stories that intrigue, excite, shock, dare, inspire, bring a smile,
            compel to think & act, and more than anything touch consumers in a
            way which elevates their lives.
          </p>
  </div>
</section>
      <section className="py-24 bg-[#f4f4f4]">
        <div className="px-5 sm:px-8 lg:px-[70px]">
        

          <div className="grid grid-cols-2 gap-[80px]">
            <div>
              <div className="relative h-[450px]">
                <Image
                  src="/assets/about/70years.jpg"
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>

            <div>
              <div className="relative h-[450px]">
                <Image
                  src="/assets/about/25years.jpg"
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
          </div>

          <p className="text-[22px] leading-[1.5] text-[#5A5A5A] mt-5">
            When there was no AI, no social media, no design tools, no
            internet…in fact no computer and mobile phone… when even rotary dial
            phones (what’s that? Look up in Google) were a luxury…our story
            began back then in 1953.
          </p>
          <p className="text-[22px] leading-[1.5] text-[#5A5A5A] mt-5">
            At that time, we used to hand-paint advertisements, posters and
            billboards for some of India’s biggest brands. Even 60 feet
            billboards were painstakingly hand painted. Of course there was no
            CTRL+Z. One mistake and you have to redo the entire thing.
          </p>
          <h3 className="pt-4 text-[20px] font-bold uppercase text-[#F28C00]">
            So for us, precision has never been about skill, but a basic
            instinct.
          </h3>
          <button className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[#9c1367] px-4 py-2 text-lg font-semibold text-white">
            Leverage Legacy
            <MoveUpRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* ================= AI EDGE ================= */}

     
<section className="relative overflow-hidden bg-white">
  <div className="relative min-h-[638px]">

    {/* Right Side Background Image */}
    <div className="absolute top-0 right-0 h-full w-full lg:w-[55%]">
      <Image
        src="/assets/about/menvsrobochess.png"
        alt="Human Thinking AI Edge"
        fill
        priority
        className="object-cover object-right"
      />
    </div>

    {/* White Overlay Content */}
    <div className="relative z-10 flex min-h-[638px] items-center">
      <div className="w-full lg:w-[50%] bg-white px-5 sm:px-8 lg:pl-[115px] lg:pr-[60px] py-16">

        <div className="max-w-[620px]">
          <h2 className="mb-6 text-[36px] md:text-[46px] lg:text-[58px] font-bold leading-[1.1] text-[#9C1367]">
            Human Thinking,
            <br />
            AI Edge
          </h2>

          <p className="mb-6 text-[18px] lg:text-[20px] leading-[1.6] text-[#5A5A5A]">
            We thoughtfully deploy AI capabilities where it adds real value
            across research, strategy, content, design, media planning and
            digital marketing.
          </p>

          <p className="mb-8 text-[18px] lg:text-[20px] leading-[1.6] text-[#5A5A5A]">
            Human thinking and judgement is absolutely irreplaceable. What AI
            does is helps our team to sharpen insights, explore possibilities,
            and move brands with greater speed and precision.
          </p>

          <button className="inline-flex items-center gap-2 rounded-full bg-[#9C1367] px-6 py-3 text-[18px] font-semibold text-white">
            Get AI Edge
            <MoveUpRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </div>

  </div>
</section>
      {/* ================= EVIDENCE ================= */}

      {/* <section className="relative py-5 overflow-hidden bg-[#f4f4f4]">
        <div className="relative px-5 sm:px-8 lg:px-[70px]">
          <h2 className="mb-16 text-[40px] font-bold leading-[1.05] text-[#9c1367]">
            We don't position brands on instinct
            <br />
            We position them on evidence
          </h2>

          <div className="space-y-1">
            {insights.map((item, i) => {
              const isActive = active === i;

              return (
                <motion.div
                  key={i}
                  layout
                  transition={{
                    duration: 0.45,
                  }}
                  className={`relative w-fit overflow-hidden rounded-full px-7 py-5 transition-all duration-500

        ${
          isActive
            ? "bg-gradient-to-r from-[#A11772] to-[#6C0A4D] min-w-[300px] sm:min-w-[420px] lg:min-w-[520px]"
            : "bg-transparent"
        }

        `}
                >
                  <h3
                    className={`text-[23px] font-bold uppercase transition-colors duration-500

          ${isActive ? "text-white" : "text-[#9C1367]"}

          `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-2 text-[18px] transition-colors duration-500

          ${isActive ? "text-white" : "text-[#5F5F5F]"}

          `}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
          <div className="hidden lg:block pointer-events-none absolute right-[70px] top-[400px] select-none">
            <h2 className="text-[150px] font-bold leading-none text-[#E9E9E9]">
              4C
            </h2>

            <h2 className="-mt-6 text-[90px] font-bold leading-none text-[#E9E9E9]">
              THINKING
            </h2>
          </div>
        </div>
      </section> */}
   <section className="relative overflow-hidden bg-[#f4f4f4] py-20">
  {/* Watermark */}
  <div className="hidden lg:block absolute right-0 bottom-0 pointer-events-none z-0">
    <h2 className="text-[140px] font-bold leading-[0.85] text-[#ECECEC] text-right">
      4C
    </h2>

    <h2 className="text-[140px] font-bold leading-[0.85] text-[#ECECEC] -mt-2">
      THINKING
    </h2>
  </div>

  {/* Content */}
 <div className="relative z-10 px-5 sm:px-8 lg:px-[115px]">
    <div className="max-w-[900px]">
      <h2 className="mb-10 text-[36px] md:text-[48px]   font-semibold leading-[1.05] text-[#9c1367]">
        We don't position brands on instinct
        <br />
        We position them on evidence
      </h2>

      <div className="space-y-2">
        {insights.map((item, i) => {
          const isActive = active === i;

          return (
            <motion.div
              key={i}
              layout
              transition={{ duration: 0.45 }}
              className={`relative w-fit overflow-hidden rounded-full px-7 py-5 transition-all duration-500
                ${
                  isActive
                    ? "bg-gradient-to-r from-[#A11772] to-[#6C0A4D] min-w-[300px] sm:min-w-[420px] lg:min-w-[520px]"
                    : "bg-transparent"
                }
              `}
            >
              <h3
                className={`text-[23px] font-semibold uppercase transition-colors duration-500
                  ${isActive ? "text-white" : "text-[#9C1367]"}
                `}
              >
                {item.title}
              </h3>

              <p
                className={`mt-2 text-[18px] transition-colors duration-500
                  ${isActive ? "text-white" : "text-[#5F5F5F]"}
                `}
              >
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  </div>
</section>
 
      {/* ================= TEAM ================= */}

      {/* <section>
        <div className="px-5 sm:px-8 lg:px-[70px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-[100px]">
            <div>
              <h2 className="mb-20 text-[35px] font-bold text-[#9c1367]">
                We Are The Team Behind Your Team Dedicated To Build Your Brand
              </h2>

              {member && (
                <>
                  <h3 className="text-[30px] font-bold text-[#9c1367]">
                    {member.name}
                  </h3>

                  <p className="mt-2 uppercase text-[#777]">
                    {member.designation}
                  </p>

                  <p className="mt-8 max-w-md text-[20px] leading-[1.6] text-[#555]">
                    {member.description}
                  </p>
                </>
              )}

              <div className="mt-12 flex gap-8">
                <button onClick={prevMember}>
                  <ArrowLeft size={40} />
                </button>

                <button onClick={nextMember}>
                  <ArrowRight size={40} />
                </button>
              </div>
            </div>

            <div className="relative h-[350px] sm:h-[500px] lg:h-[700px]">
              {member && (
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  unoptimized
                  className="object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section> */}

  <section className="overflow-hidden bg-white ">
  <div className="px-5 sm:px-8 md:px-16">
    <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">

      {/* Left Content */}
      <div className="w-full lg:w-[60%] py-5 lg:py-0">
        <h2 className="text-[32px] sm:text-[40px]  font-semibold leading-[1.08] text-[#9C1367]">
          We Are The Team Behind Your Team Dedicated To Build Your Brand
        </h2>

        <AnimatePresence mode="wait">
          {member && (
            <motion.div
              key={member.id}
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 60, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-10 md:mt-14 lg:mt-20"
            >
              <h3 className="text-[24px] sm:text-[28px] lg:text-[36px] font-bold uppercase text-[#9C1367]">
                {member.name}
              </h3>

              <p className="mt-2 text-[14px] sm:text-[16px] uppercase text-[#666]">
                {member.designation}
              </p>

              <p className="mt-6 max-w-[500px] text-[16px] sm:text-[18px] lg:text-[22px] leading-[1.7] text-[#555]">
                {member.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 lg:mt-12 flex items-center gap-8">
          <button
            onClick={prevMember}
            className="transition duration-300 hover:scale-110"
          >
            <ArrowLeft className="h-8 w-8 md:h-11 md:w-11 text-[#8B8B8B]" />
          </button>

          <button
            onClick={nextMember}
            className="transition duration-300 hover:scale-110"
          >
            <ArrowRight className="h-8 w-8 md:h-11 md:w-11 text-[#8B8B8B]" />
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-[40%] flex justify-center lg:justify-end">
        <AnimatePresence mode="wait">
          {member && (
            <motion.div
              key={member.id}
              initial={{ x: 120, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -120, opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="flex justify-center lg:justify-end"
            >
              <Image
                src={member.photo}
                alt={member.name}
                width={900}
                height={1100}
                unoptimized
                priority
                className="
                  w-full
                  max-w-[320px]
                  sm:max-w-[420px]
                  md:max-w-[520px]
                  h-auto
                  object-contain
                "
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  </div>
</section>

      {/* ================= CONTACT ================= */}

      <ContactSection />
    </main>
  );
}
