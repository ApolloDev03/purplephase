

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LuMoveUpRight } from "react-icons/lu";
import listen from "../assets/listen-before-advise.png";
import { useRouter } from "next/navigation";

const ProcessSection = () => {
  const router = useRouter();

  return (
    <section className="relative max-w-full overflow-hidden bg-white px-6 py-[85px] sm:px-8 lg:px-20 2xl:px-32">
      <div className="mx-auto grid grid-cols-1 items-center gap-10 lg:grid-cols-[45%_55%]">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center "
        >
          <div className="relative w-full max-w-[680px] max-h-[538px]">
            <Image
              src={listen}
              alt="We listen before we advise"
              width={750}
              height={650}
              className="h-auto w-full object-contain"
              priority
            />
          </div>
        </motion.div>

        {/* Right Content */}
        <div className="text-center lg:text-left">
          <h2 className="text-[58px] leading-32.5!  lowercase [font-variant-caps:small-caps]! text-primary ">
            We Listen, Before We Advise.
          </h2>
     
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className=" max-w-[850px] leading-1 !space-y-7 font-body text-[17px] font-light leading-[1.38] text-[#424242] sm:text-[20px] lg:text-[28px]"
          >
            <p>
              We understand your business, your pain points and your
              <br className="hidden lg:block" />
              consumers.
            </p>

            <p >
              We believe in creativity anchored in clarity led by strategic
              <br className="hidden lg:block" />
              storytelling and powered by impactful innovation...
            </p>

            <p>We say thousand No’s to a single Yes!</p>
          </motion.div>

          <h3 className=" mt-4 font-bold lowercase [font-variant-caps:small-caps]!  text-secondary ">
          THAT’S  How We Build Your Brand...
            <br />
            From Idea To Execution...
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="mt-9 flex justify-center lg:justify-start"
          >
            <button
              type="button"
              onClick={() => router.push("/about-us")}
              className="motion-shine group inline-flex items-center gap-3 sm:gap-[25px] rounded-full bg-primary px-6 py-3 text-[15px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 lg:text-[20px] 2xl:text-[24px]"
            >
              Decode Our DNA

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <LuMoveUpRight className="h-5 w-5" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default ProcessSection;
