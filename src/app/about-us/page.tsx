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
    sub_designation:string;
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
 const [heroLineHeight, setHeroLineHeight] = useState(40);

useEffect(() => {
  const updateHeroLineHeight = () => {
    const width = window.innerWidth;

    if (width >= 1536) {
      setHeroLineHeight(72);
    } else if (width >= 1280) {
      setHeroLineHeight(64);
    } else if (width >= 768) {
      setHeroLineHeight(56);
    } else if (width >= 640) {
      setHeroLineHeight(52);
    } else {
      setHeroLineHeight(40);
    }
  };

  updateHeroLineHeight();

  window.addEventListener("resize", updateHeroLineHeight);

  return () => {
    window.removeEventListener("resize", updateHeroLineHeight);
  };
}, []);
  return (
    <>
      {/* ================= HERO ================= */}

      {/* <section className="relative h-[200px] md:h-[500px] lg:h-[500px] 2xl:h-[720px] overflow-hidden bg-[#dedede]">
   
        <div className="absolute right-0 top-0 h-full w-full">
          <img
            src="/assets/about/about-main.gif"
            alt="About Banner"
            className=" absolute
      inset-0
      h-full
     w-full
      object-cover
      object-[95%_center]
      xl:object-center "
          />
        </div>

      
        <div className="relative z-10 flex h-full items-center">
          <div className="px-4 lg:px-8 ">
            <div className="h-[300px] overflow-hidden max-w-[50%] md:max-w-[620px] lg:max-w-[760px]">
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
                       style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}
                      className={`h-[44px] sm:h-[56px] text-[26px] md:text-[32px] lg:text-[38px] xl:text-[60px]  font-extrabold leading-[1.09]
                transition-all duration-500

                ${center
                          ? "text-[#9C1367] opacity-100 2xl:text-[60px]"
                          : "text-[#9C1367] opacity-0 2xl:text-[60px]"
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
  className="flex absolute  xl:mt-10 justify-center lg:justify-start"
>
  <button className=" motion-shine 
            group
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-primary
            px-3
            py-2
            text-[14px]
            font-bold
            text-white
            shadow-lg
            shadow-primary/20
            transition-all
            duration-300

            hover:-translate-y-1
            hover:bg-[#7a1f50]
            hover:shadow-xl
            hover:shadow-primary/30

            lg:px-7
            lg:py-3
           !text-[13px]
sm:!text-[14px]
lg:!text-[15px]
2xl:!text-[18px]">
    Meet The Team

    <span className="flex h-4 w-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
    </span>
  </button>
</motion.div>
          </div>
        </div>
      </section> */}
<section
  className="
    relative
    h-[200px]
    overflow-hidden
    bg-[#dedede]

    md:h-[440px]
    lg:h-[500px]
    xl:h-[580px]
    2xl:h-[680px]
  "
>
  {/* Background GIF */}
  <div className="absolute inset-0">
    <img
      src="/assets/about/about-main.gif"
      alt="About Banner"
      className="
        h-full
        w-full
        object-cover
        sm:object-[88%_center]
        md:object-[82%_center]
        xl:object-center
      "
    />
  </div>

  {/* Readability overlay */}
  <div
    className="
      pointer-events-none
      absolute
      inset-0
      z-[1]
      bg-gradient-to-r
      from-white/90
      via-white/35
      to-transparent

      sm:from-white/80
      md:from-white/45
      md:via-white/10
    "
  />

  {/* Content */}
  <div className="relative z-10 flex h-full items-center">
    <div
      className="
        flex
        w-full
        flex-col
        items-start
        justify-center
        px-4
        lg:px-8
        2xl:px-14
      "
    >
      {/* Animated heading viewport */}
      <div
        className="
          w-full
          h-[156px]
       max-w-[120px]

          md:h-[168px]
          md:max-w-[620px]

          xl:h-[192px]
          xl:max-w-[760px]

          2xl:h-[216px]
        "
      >
        <motion.div
          animate={{
            y: -(index * heroLineHeight),
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          {[...items, ...items].map((text, i) => {
            const isActive =
              (i - index + items.length) % items.length === 1;

            return (
              <h1
                key={`${text}-${i}`}
                style={{
                  fontVariantCaps: "all-small-caps",
                  fontFeatureSettings: '"smcp", "c2sc"',
                }}
                className={`
                  m-0
                  flex
                  h-[40px]
                  items-center
                  whitespace-nowrap
                  text-[21px]
                  font-extrabold
                  leading-none
                  transition-all
                  duration-500

                  min-[400px]:text-[23px]

                  sm:h-[52px]
                  sm:text-[25px]

                  md:h-[56px]
                  md:text-[38px]

                  lg:text-[44px]

                  xl:h-[64px]
                  xl:text-[58px]

                  2xl:h-[72px]
                  2xl:text-[66px]

                  ${
                    isActive
                      ? "translate-x-0 text-[#9C1367] opacity-100"
                      : "translate-x-0 text-[#9C1367] opacity-0"
                  }
                `}
              >
                {text}
              </h1>
            );
          })}
        </motion.div>
      </div>

      {/* Button */}
      <motion.div
        initial={{
          opacity: 0,
          y: 15,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.5,
          delay: 0.35,
        }}
        className="
          relative
          z-20
          mt-2

          sm:mt-3
          md:mt-5
          xl:mt-7
          2xl:mt-8
        "
      >
        <button
          type="button"
          onClick={() => {
            document.getElementById("team")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="
            motion-shine
            group
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-primary
            px-4
            py-2
            text-[12px]
            font-bold
            text-white
            shadow-lg
            shadow-primary/20
            transition-all
            duration-300

            hover:-translate-y-1
            hover:bg-[#7a1f50]
            hover:shadow-xl

            sm:px-5
            sm:py-2.5
            sm:text-[14px]

            lg:px-7
            lg:py-3
            lg:text-[15px]

            2xl:px-8
            2xl:py-3.5
            2xl:text-[18px]
          "
        >
          Meet The Team

          <LuMoveUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300

              group-hover:translate-x-1
              group-hover:-translate-y-1

              lg:h-5
              lg:w-5
            "
          />
        </button>
      </motion.div>
    </div>
  </div>
</section>

      {/* ================= PURPLE POTENTIAL ================= */}

    <section className="w-full bg-white py-[20px] lg:py-[30px] 2xl:py-[85px]">
  <div className="mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
    <div className="grid items-center  lg:grid-cols-[52%_48%]">
      
      {/* Image */}
      <div className="relative flex h-[260px] w-full items-center justify-center sm:h-[330px] md:h-[380px] lg:h-[420px]">
        <Image
          src="/assets/about/chess.png"
          alt="Unlock Brand Potential"
          width={560}
          height={420}
          className="h-auto w-full max-w-[320px] xl:max-w-[680px] xl:max-h-[538px] object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className=" lg:pl-4 xl:pl-8">
        <h2
          className=" text-[34px] font-semibold !leading-none tracking-[0.03em] text-[#9c1367] sm:text-[42px] md:text-[48px] lg:text-[58px]"
          style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }}
        >
          Unlock Your Brand&apos;s <br />
          Greatest Potential
        </h2>

        <p className="my-7  text-[16px] font-normal leading-[1.55] tracking-[0.01em] text-[#555555] sm:text-[18px] lg:text-[20px]">
          In alchemy, before raw gold turns into gleaming gold,
          <br  />
          there is a phase when it turns Purple. This phase of
          <br  />
          transformation is Purple Phase.
        </p>

        <h3
          className="max-w-[680px] text-[18px] font-bold leading-[1.45] tracking-[0.04em] text-secondary sm:text-[21px] lg:text-[26px]"
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
        <div className="py-[20px] lg:py-[30px] 2xl:py-[85px] mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
          <h2 className="mb-6  leading-[1.05] text-[#9c1367]">
            We are Purple Phase
          </h2>

          <div className=" space-y-8  leading-[1.5] text-[#5A5A5A]">
            <p >
              A Strategic Branding & AI Native Digital Marketing Agency with a
              global vision and deep local resonance.
            </p>

            <p >
              Established in 2010, we have a legacy spanning <b>70 years</b> in
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

            <p className="mb-4">
              Every time we start with the same question.
            </p>

            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className=" text-[20px] 2xl:text-[36px] font-bold uppercase text-secondary">
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
                        <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-3 py-2 lg:px-6 lg:py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
                              Tell Your Story
                            <span className="flex h-4 w-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                                <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
                            </span>
                        </button>
                    </motion.div>
          
          </div>
        </div>
      </section>

      {/* ================= LEGACY ================= */}
      <section className="bg-white ">
        <div className="py-[20px] lg:py-[30px] 2xl:py-[85px] mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
          <h2 className="mb-8  leading-[120%] text-[#9c1367]">
            Your brand isn’t a project to us
            <br />
            It’s a story we help write
          </h2>

          <p className=" 2xl:w-[926px] leading-[1.6] text-[#424242]">
            Stories that intrigue, excite, shock, dare, inspire, bring a smile,<br/>
            compel to think & act, and more than anything touch consumers <br/> in a
            way which elevates their lives.
          </p>
        </div>
      </section>

      <section className="bg-[#F6F6F6] py-[20px] lg:py-[30px] 2xl:py-[85px]">
        <div className=" mx-auto max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32">
          {/* Years */}
          <div className="grid grid-cols-2  lg:gap-10 items-start">
            {/* 70 Years */}
            <div className="relative flex justify-center">
              <Image
                src="/assets/about/70years.jpg"
                alt="70 Years"
                width={560}
                height={420}
                className=" w-auto lg:w-[734px] lg:h-[620px] object-contain"
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
                className="w-auto lg:w-[734px] lg:h-[620px] object-contain"
                priority
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 ">
            <p className="text-justify leading-[1.75] ">
              When there was no AI, no social media, no design tools, no internet…in
              fact no computer and mobile phone… when even rotary dial phones (what’s
              that? Look up in Google) were a luxury…our story began back then in
              1953.
            </p>

            <p className="mt-7 text-justify leading-[1.75] ">
              At that time, we used to hand-paint advertisements, posters and billboards for some of India’s biggest brands. Even 60 feet billboards were painstakingly hand painted. Of course there was no CTRL+Z. One mistake and you have to redo the entire thing.
            </p>

            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="mt-4   tracking-[0.4px] text-secondary leading-[1.45]">
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
  <button className="motion-shine  group inline-flex items-center gap-3 rounded-full bg-primary px-3 py-2 lg:px-6 lg:py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
   Leverage Legacy
    <span className="flex h-4 w-4 lg:h-5 lg:w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
      <LuMoveUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
    </span>
  </button>
</motion.div>
          
          </div>
        </div>
      </section>
      {/* ================= AI EDGE ================= */}


      {/* <section className="relative overflow-hidden bg-white">
        <div className="relative min-h-[638px]">

          
          <div className="absolute top-0 right-0 h-full w-full lg:w-[50%]">
            <Image
              src="/assets/about/menvsrobochess.png"
              alt="Human Thinking AI Edge"
              fill
              priority
              className="object-cover object-right"
            />
          </div>

    
          <div className="relative z-10 flex  items-center">
            <div className="max-w-full lg:w-[60%] bg-white px-4 lg:px-6 xl:px-10 2xl:px-32 py-16">

              <div className="">
                <h2 className="mb-2   text-[#9C1367]">
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
      </section> */}

      <section className="relative overflow-hidden bg-white">
  <div
    className="
      grid
      grid-cols-1

      lg:relative
      lg:block
      lg:min-h-[638px]
    "
  >
    {/* Image: Top on mobile, right side on large screens */}
    <div
      className="
        relative
        order-1
        h-[300px]
        w-full
        md:h-[480px]

        lg:absolute
        lg:right-0
        lg:top-0
        lg:h-full
        lg:w-[50%]
      "
    >
      <Image
        src="/assets/about/menvsrobochess.png"
        alt="Human Thinking AI Edge"
        fill
        priority
        sizes="(max-width: 1023px) 100vw, 50vw"
        className="
          object-cover
          object-[95%_center]
          lg:object-right
        "
      />
    </div>

    {/* Content: Below image on mobile, left side on large screens */}
    <div
      className="
        relative
        z-10
        order-2
        flex
        w-full
        items-center

        lg:min-h-[638px]
      "
    >
      <div
        className="
          w-full          
          p-4

          sm:px-6

          md:px-8
          md:py-14

          lg:w-[60%]
          lg:px-6
          lg:py-16

          xl:px-10
          2xl:px-32
        "
      >
        <h2
          className="
            mb-3
            text-[#9C1367]
          "
        >
          Human Thinking,
          <br />
          AI Edge
        </h2>

        <p
          className="
            mb-6
            leading-[1.6]
            text-[#424242]

            lg:mb-8
          "
        >
          We thoughtfully deploy AI capabilities where it adds
          <br className="hidden lg:block" /> real value across research,
          strategy, content, design,
          <br className="hidden lg:block" /> media planning and digital
          marketing.
        </p>

        <p
          className="
            mb-6
            leading-[1.6]
            text-[#424242]

            lg:mb-8
          "
        >
          Human thinking and judgement is absolutely
          <br className="hidden lg:block" /> irreplaceable. What AI does is
          help our team to
          <br className="hidden lg:block" /> sharpen insights, explore
          possibilities, and move brands
          <br className="hidden lg:block" /> with greater speed and precision.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.45,
          }}
          className="
            flex
            justify-center

            lg:justify-start
          "
        >
          <button
            type="button"
            onClick={handleContactPopupOpen}
            className="
              motion-shine
              group
              mt-3
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              bg-primary
              px-3
              py-2
              text-[14px]
              font-semibold
              text-white
              shadow-lg
              shadow-primary/20
              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-[#7a1f50]
              hover:shadow-xl
              hover:shadow-primary/30

              lg:px-6
              lg:py-3
              sm:text-[15px]

              lg:mt-5
              lg:gap-3
              lg:text-[20px]

              2xl:text-[24px]
            "
          >
            Get AI Edge

            <span
              className="
                flex
                h-4
                w-4
                items-center
                justify-center
                text-white
                transition-transform
                duration-300

                group-hover:translate-x-1
                group-hover:-translate-y-1

                lg:h-5
                lg:w-5
              "
            >
              <LuMoveUpRight className="h-full w-full" />
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  </div>
</section>
      {/* ================= EVIDENCE ================= */}

     
      <section className="relative overflow-hidden bg-[#f4f4f4] py-[20px] lg:py-[30px] xl:py-20">
        {/* Watermark */}
        <div className="text-[60px] lg:text-[140px] 2xl:text-[200px] font-bold leading-[0.85] text-[#ECECEC] block absolute right-0 bottom-0 pointer-events-none z-0">
          <h1 className=" text-right">
            4C
          </h1>

          <h1 className=" lg:-mt-2">
            THINKING
          </h1>
        </div>

        {/* Content */}
        <div className="relative  ">
          <div className="max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32 ">
            <h2 className="mb-10 text-[36px] md:text-[48px]   font-semibold leading-[120%] text-[#9c1367]">
              We don’t position brands on instinct
              <br />
              We position them on evidence
            </h2>

            <div className="space-y-2">
              {insights.map((item, i) => {
                return (
                <div className="">
 <motion.div
  key={i}
  layout
  transition={{ duration: 0.45 }}
  className="
    group relative w-fit overflow-hidden rounded-full px-4 lg:px-7 py-5
    bg-transparent
    transition-all duration-500 ease-in-out
    hover:bg-gradient-to-r
    hover:from-[#A11772]
    hover:to-[#6C0A4D]
    group-hover:min-w-[300px]
    group-hover:sm:min-w-[420px]
    group-hover:lg:min-w-[520px]
    cursor-pointer
  "
>
  <h4  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="text-[30px] lg:text-[36px] font-semibold  text-[#9C1367] transition-colors duration-500 group-hover:text-white">
    {item.title}
  </h4>

  <span className="mt-2 block text-[15px] lg:text-[18px] 2xl:text-[28px] text-[#424242] transition-colors duration-500 group-hover:text-white">
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
  <div className="max-w-full px-4 lg:px-6 xl:px-10 2xl:px-32 ">
    <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-12">
 
<div className="w-full flex flex-col justify-center">
    <h2 className="mt-[20px] lg:mt-0 font-semibold leading-[120%] text-primary">
      We Are The Team Behind Your Team Dedicated To Build Your Brand
    </h2>
  
    <div className="relative mt-10 lg:mt-24 min-h-[230px] ">

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
            <h2 className="uppercase text-[20px]! xl:text-[28px]! tracking-[1px] text-primary">
              {member.name}
            </h2>
<p className="my-1 lg:text-[21px]!">{member.sub_designation}</p>
            <h3  style={{
            fontVariantCaps: "all-small-caps",
            fontFeatureSettings: '"smcp", "c2sc"',
          }} className="  text-primary">
              {member.designation}
            </h3>

     <p className="mt-2 w-full max-w-[500px] whitespace-pre-line">
  {member.description
    ?.replace(/\\r\\n|\\n|\\r/g, "\n")
    .replace(/\r\n|\r/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .trim()}
</p>
          </motion.div>
        )}
      </AnimatePresence>

    </div>

   
    <div className="lg:mt-8 flex items-center gap-12">

      <button
        onClick={prevMember}
        className="group"
      >
        <MoveLeft className="h-10 w-10 lg:h-14 lg:w-14  text-[#9B9B9B] transition group-hover:-translate-x-1" />
      </button>

      <button
        onClick={nextMember}
        className="group"
      >
        <MoveRight className="h-10 w-10 lg:h-14 lg:w-14 text-[#9B9B9B] transition group-hover:translate-x-1" />
      </button>

    </div>

</div>

    
      <div className="w-full lg:w-[42%] flex justify-center lg:justify-end">

        <div className="relative h-[250px] lg:h-[680px] w-full max-w-[560px] overflow-hidden">

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
