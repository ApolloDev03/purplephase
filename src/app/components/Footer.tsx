"use client";
import { motion } from 'framer-motion';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaBehance,
    FaPinterestP,
    FaYoutube,
    FaMapMarkerAlt
} from 'react-icons/fa';
import Image from 'next/image';
import logo from '../assets/ppc-combined-logo.png';
import { FaXTwitter } from 'react-icons/fa6';
import Link from 'next/link';

const Footer = () => {
    const socialLinks = [
        { name: 'Behance', icon: <FaBehance />, href: 'https://www.behance.net/purple_phase' },
        { name: 'Pinterest', icon: <FaPinterestP />, href: 'https://in.pinterest.com/purple_phase_communications' },
        { name: 'Instagram', icon: <FaInstagram />, href: 'https://www.instagram.com/purple_phase_communications/' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/purple-phase-communications' },
        { name: 'Facebook', icon: <FaFacebookF />, href: 'https://www.facebook.com/PurplePhaseCommunications/' },
        { name: 'Twitter', icon: <FaXTwitter />, href: 'https://x.com/sm_ppc' },
        { name: 'Youtube', icon: <FaYoutube />, href: 'https://www.youtube.com/@purplephasecommunications' },
    ];

    const navLinks = [
        // { name: "Home", href: "/" },
        { name: "About", href: "/about-us" },
        { name: "Case Studies", href: "/case-study" },
        { name: "Portfolio", href: "/Portfolio" },
        { name: "Knowledge Corner", href: "/KnowledgeCorner" },
        { name: "Career", href: "/career" },
        { name: "Contact", href: "/contact" },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <footer className="bg-[#f6f6f6] py-10 !lg:py-[30px]  2xl:text-[20px]!  font-sans selection:bg-primary/10 px-6  lg:px-6 xl:px-10 2xl:px-32">
            <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-12 md:gap-5 lg:grid-cols-12 lg:gap-0">

                {/* Left Side: Branding & Contact (Spans 6 columns) */}
                <motion.div
                    {...fadeInUp}
                    className="flex flex-col items-start md:col-span-6 lg:col-span-6"
                >
                    <div className="flex items-center gap-6 mb-6">
                        <Image src={logo} alt="Purple Phase" className="h-16 sm:h-20 md:h-24 2xl:h-32 w-auto object-contain" />
                    </div>



                    <div className="space-y-4">
                        <a href="mailto:info.purplephase@gmail.com"
                            className="group relative inline-block text-[#4A4A4A] transition-colors hover:text-primary">
                            info.purplephase@gmail.com
                            <span className="absolute -bottom-2 left-0 w-full h-px bg-gray-200 group-hover:bg-primary transition-colors duration-300" />
                        </a>

                      <div className="grid grid-cols-1 gap-8 pt-8 w-full md:grid-cols-1 lg:grid-cols-3">

    {/* Ahmedabad */}
    <div className="flex flex-col ">
        <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-primary text-sm" />
            <h4 className="font-medium  text-[#4A4A4A]">
                Ahmedabad
            </h4>
        </div>

        <a
            href="tel:+919998610505"
            className="text-[#666] hover:text-primary transition-colors"
        >
            +91 99986 10505
        </a>

        <a
            href="tel:+919327009400"
            className="text-[#666] hover:text-primary transition-colors"
        >
            +91 93270 09400
        </a>
    </div>

    {/* Mumbai */}
    {/* <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-primary text-sm" />
            <h4 className="font-medium text-[#4A4A4A]">
                Mumbai
            </h4>
        </div>

        <a
            href="tel:+919000000000"
            className="text-[#666] hover:text-primary transition-colors"
        >
            +91 90000 00000
        </a>
    </div> */}

    {/* UK */}
    {/* <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
            <FaMapMarkerAlt className="text-primary text-sm" />
            <h4 className="font-medium  text-[#4A4A4A]">
                UK
            </h4>
        </div>

        <a
            href="tel:+440000000000"
            className="text-[#666] hover:text-primary transition-colors"
        >
            +44 00000 00000
        </a>
    </div> */}

</div>
                    </div>
                </motion.div>

                {/* Right Side Wrapper: Nav and Socials (Spans 6 columns) */}
                <div className="grid grid-cols-1
  md:col-span-6
  md:grid-cols-2
  md:gap-4
  lg:col-span-6
  lg:justify-items-end pt-9 md:pt-0">

                    {/* Column 2: Navigation (Centered/Right alignment) */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.1 }}
                        className="flex flex-col lg:min-w-[150px]"
                    >
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className=" text-black hover:text-primary transition-all duration-300 block hover:translate-x-1"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Column 3: Social Media (Far Right alignment) */}
<motion.div
  {...fadeInUp}
  transition={{ delay: 0.2 }}
  className="flex flex-col mt-10 md:mt-0 lg:min-w-[150px]"
>
  <h4 className="text-[#626262] mb-2 ">Follow Us</h4>

  <ul className="space-y-2">
    {socialLinks.map((social) => (
      <li key={social.name}>
        <a
          href={social.href}
          className="flex !text-[14px] items-center gap-4 text-black group transition-all duration-300 hover:translate-x-1"
        >
          <span className="w-4 flex justify-center !text-[14px] text-black group-hover:text-primary transition-colors duration-300">
            {social.icon}
          </span>

          <span className="group-hover:text-primary transition-colors">
            {social.name}
          </span>
        </a>
      </li>
    ))}
  </ul>
</motion.div>
                </div>
            </div>

            {/* Bottom Bar: Copyright & Legal */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-full mx-auto pt-10 grid grid-cols-1 xl:gap-10 lg:grid-cols-12 text-[#575757]  "
            >
                <div className="col-span-6 text-center items-center lg:text-left">
                    <span className="text-[14px] 2xl:text-[18px]">
                        Copyright © {new Date().getFullYear()}. All rights reserved Purple Phase Communications
                    </span>
                </div>


                <div className="col-span-6  mt-3 lg:mt-0 grid grid-cols-1 sm:grid-cols-2 justify-items-center  lg:justify-items-end">
                <div className="flex flex-col lg:min-w-[150px] text-[14px] xl:text-[18px]">
  <Link
    href="/terms-and-conditions"
    className="hover:text-primary transition-colors"
  >
    Terms & Conditions
  </Link>
</div>

<div className="flex flex-col lg:min-w-[150px] text-[14px] xl:text-[18px]">
  <Link
    href="/privacy-policy"
    className="hover:text-primary transition-colors"
  >
    Privacy Policy
  </Link>
</div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;
