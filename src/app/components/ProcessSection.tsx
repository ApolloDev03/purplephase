// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import { HiArrowUpRight } from "react-icons/hi2";
// import listen from "../assets/listen-before-advise.png";
// import { useRouter } from "next/navigation";


// const ProcessSection = () => {
//     const router=useRouter();
//     return (
//         <section className="relative max-w-full overflow-hidden bg-white px-6 py-16 sm:px-8 lg:px-20 2xl:px-32">
//             <div className="mx-auto grid  grid-cols-1 items-center gap-12  lg:grid-cols-[35%_65%]">
//                 {/* Left Image */}
//                 <motion.div
//                     initial={{ opacity: 0, x: -40 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     viewport={{ once: true }}
//                     transition={{ duration: 0.8, ease: "easeOut" }}
//                     className="relative flex justify-center lg:justify-start"
//                 >
//                     <div className="relative">
//                         <Image
//                             src={listen.src}
//                             alt="We listen before we advise"
//                             width={750}
//                             height={650}
//                             className="h-[538px] w-[610px] object-contain"
//                             priority
//                         />
//                     </div>
//                 </motion.div>

//                 {/* Right Content */}
//                 <div className="text-center lg:text-left ">
//                     <h2
//                         className=" uppercase leading-tight tracking-wide text-primary sm:text-[36px] lg:text-[40px] 2xl:text-[58px]"
//                     >
//                         We Listen, Before We Advise.
//                     </h2>

//                     <motion.div
//                         initial={{ opacity: 0, y: 24 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.7, delay: 0.15 }}
//                         className="mt-5 space-y-4 font-body text-[17px] font-light leading-[1.65] text-[#555] sm:text-[20px] lg:text-2xl 2xl:text-[28px]"
//                     >
//                         <p>
//                             We understand your business, your pain points and your consumers.
//                         </p>

//                         <p>
//                             We believe in creativity anchored in clarity led by strategic storytelling
//                             <br className="hidden xl:block" /> and powered by impactful innovation...
//                         </p>

//                         <p>We say thousand No&apos;s to a single Yes!</p>
//                     </motion.div>

//                     <h3
//                                         className="mt-8 font-heading text-[20px] font-bold uppercase leading-[1.45] tracking-wide text-secondary sm:text-[22px] lg:text-2xl 2xl:text-[36px]"
//                     >
//                         That&apos;s How We Build Your Brand...
//                         <br />
//                         From Idea To Execution...
//                     </h3>

//                     <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
//                         transition={{ duration: 0.5, delay: 0.45 }}
//                         onClick={()=>router.push("/about-us")}
//                         className="mt-9 flex justify-center lg:justify-start"
//                     >
//                         <button className="motion-shine group inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-[15px] lg:text-[20px] 2xl:text-[24px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30">
//                             Decode Our DNA

//                             <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
//                                 <HiArrowUpRight className="h-5 w-5" />
//                             </span>
//                         </button>
//                     </motion.div>
//                 </div>
//             </div>

//             {/* Bottom Purple Strip */}
//             {/* <div className="pointer-events-none absolute bottom-0 left-0 h-4 w-full bg-primary shadow-[0_-4px_16px_rgba(142,42,93,0.35)] sm:h-5" /> */}
//         </section>
//     );
// };

// export default ProcessSection;
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HiArrowUpRight } from "react-icons/hi2";
import listen from "../assets/listen-before-advise.png";
import { useRouter } from "next/navigation";

const ProcessSection = () => {
  const router = useRouter();

  return (
    <section className="relative max-w-full overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14 md:px-8 lg:px-16 lg:py-16 xl:px-20 2xl:px-32">
      <div className="mx-auto grid max-w-[1680px] grid-cols-1 items-center gap-8 sm:gap-10 md:gap-12 lg:grid-cols-[42%_58%] lg:gap-10 xl:grid-cols-[38%_62%] xl:gap-14 2xl:grid-cols-[35%_65%] 2xl:gap-16">
        
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex justify-center lg:justify-start"
        >
          <div className="relative w-full max-w-[310px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[520px] xl:max-w-[610px] 2xl:max-w-[700px]">
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
          <h2 className="uppercase leading-[1.12] tracking-wide text-primary text-[28px] sm:text-[36px] md:text-[42px] lg:text-[40px] xl:text-[48px] 2xl:text-[58px]">
            We Listen, Before We Advise.
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mx-auto mt-4 max-w-[720px] space-y-3 font-body text-[15px] font-light leading-[1.65] text-[#555] sm:mt-5 sm:text-[17px] md:text-[19px] lg:mx-0 lg:text-[20px] xl:text-[24px] 2xl:text-[28px]"
          >
            <p>
              We understand your business, your pain points and your consumers.
            </p>

            <p>
              We believe in creativity anchored in clarity led by strategic storytelling
              <br className="hidden xl:block" /> and powered by impactful innovation...
            </p>

            <p>We say thousand No&apos;s to a single Yes!</p>
          </motion.div>

          <h3 className="mx-auto mt-6 max-w-[720px] font-heading text-[18px] font-bold uppercase leading-[1.45] tracking-wide text-secondary sm:mt-8 sm:text-[21px] md:text-[24px] lg:mx-0 lg:text-[24px] xl:text-[30px] 2xl:text-[36px]">
            That&apos;s How We Build Your Brand...
            <br />
            From Idea To Execution...
          </h3>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            onClick={() => router.push("/about-us")}
            className="mt-7 flex justify-center sm:mt-9 lg:justify-start"
          >
            <button className="motion-shine group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[14px] font-bold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#7a1f50] hover:shadow-xl hover:shadow-primary/30 sm:gap-3 sm:px-6 sm:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[24px]">
              Decode Our DNA

              <span className="flex h-5 w-5 items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                <HiArrowUpRight className="h-4 w-4 lg:h-5 lg:w-5" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;