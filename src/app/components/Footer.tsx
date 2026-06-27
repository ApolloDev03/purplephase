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

const Footer = () => {
    const socialLinks = [
        { name: 'Facebook', icon: <FaFacebookF />, href: 'https://www.facebook.com/PurplePhaseCommunications/' },
        { name: 'Instagram', icon: <FaInstagram />, href: 'https://www.instagram.com/purple_phase_communications/' },
        { name: 'LinkedIn', icon: <FaLinkedinIn />, href: 'https://www.linkedin.com/company/purple-phase-communications' },
        { name: 'Youtube', icon: <FaYoutube />, href: 'https://www.youtube.com/@purplephasecommunications' },
        { name: 'Behance', icon: <FaBehance />, href: 'https://www.behance.net/purple_phase' },
        { name: 'Pinterest', icon: <FaPinterestP />, href: 'https://in.pinterest.com/purple_phase_communications' }
    ];

    const navLinks = [
        // { name: "Home", href: "/" },
        { name: "About", href: "/about-us" },
        { name: "Case Studies", href: "/CaseStudies" },
        { name: "Portfolio", href: "/Portfolio" },
        { name: "Knowledge Corner", href: "/KnowledgeCorner" },
        { name: "Career", href: "/Career" },
        { name: "Contact", href: "/contact" },
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <footer className="bg-white py-16 text-[13px] 2xl:text-[20px] font-sans selection:bg-primary/10 px-6  md:px-12 lg:px-20 2xl:px-32">
            <div className="max-w-full  mx-auto  grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">

                {/* Left Side: Branding & Contact (Spans 6 columns) */}
                <motion.div
                    {...fadeInUp}
                    className="lg:col-span-6 flex   flex-col items-start"
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

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 w-full">

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
    <div className="flex flex-col">
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
    </div>

    {/* UK */}
    <div className="flex flex-col">
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
    </div>

</div>
                    </div>
                </motion.div>

                {/* Right Side Wrapper: Nav and Socials (Spans 6 columns) */}
                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2  lg:justify-items-end">

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
                        className="flex flex-col lg:min-w-[150px]"
                    >
                        <h4 className=" text-[#626262] mb-2 ">Follow Us</h4>
                        <ul className="space-y-2">
                            {socialLinks.map((social) => (
                                <li key={social.name}>
                                    <a href={social.href} className="flex items-center gap-4  text-black group transition-all duration-300 hover:translate-x-1">
                                        <span className="w-4 flex justify-center text-black group-hover:text-primary transition-colors duration-300">
                                            {social.icon}
                                        </span>
                                        <span className="group-hover:text-primary transition-colors">{social.name}</span>
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
                className="max-w-full mx-auto pt-10 grid grid-cols-1 gap-10 lg:grid-cols-2 text-[#575757]  "
            >
                <div className=" text-center items-center lg:text-left">
                    <span className="">
                        Copyright © {new Date().getFullYear()}. All rights reserved Purple Phase Communications
                    </span>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2  lg:justify-items-end">
                    <div className="flex flex-col lg:min-w-[150px] ">
                        <a href="#" className="hover:text-primary transition-colors ">Terms & Conditions</a>
                    </div>
                    <div className="flex flex-col lg:min-w-[150px]">
                        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    </div>
                </div>
            </motion.div>
        </footer>
    );
};

export default Footer;

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import {
//     FaFacebookF,
//     FaInstagram,
//     FaLinkedinIn,
//     FaBehance,
//     FaPinterestP,
//     FaYoutube,
//     FaXTwitter,
// } from "react-icons/fa6";
// import logo from "../assets/ppc-combined-logo.png";
// import { FaMapMarkerAlt } from "react-icons/fa";

// const Footer = () => {
//     const navLinks = [
//         { name: "About", href: "/about-us" },
//         { name: "Case Studies", href: "/CaseStudies" },
//         { name: "Portfolio", href: "/Portfolio" },
//         { name: "Knowledge Corner", href: "/KnowledgeCorner" },
//         { name: "Career", href: "/Career" },
//         { name: "Contact", href: "/contact" },
//     ];

//     const socialLinks = [
//         { name: "Behance", icon: <FaBehance />, href: "https://www.behance.net/purple_phase" },
//         { name: "Pinterest", icon: <FaPinterestP />, href: "https://in.pinterest.com/purple_phase_communications" },
//         { name: "Instagram", icon: <FaInstagram />, href: "https://www.instagram.com/purple_phase_communications/" },
//         { name: "Linkedin", icon: <FaLinkedinIn />, href: "https://www.linkedin.com/company/purple-phase-communications" },
//         { name: "Facebook", icon: <FaFacebookF />, href: "https://www.facebook.com/PurplePhaseCommunications/" },
//         { name: "Twitter", icon: <FaXTwitter />, href: "#" },
//         { name: "Youtube", icon: <FaYoutube />, href: "https://www.youtube.com/@purplephasecommunications" },
//     ];

//     const offices = [
//         {
//             title: "Ahmedabad Office",
//             address: "1st Floor, 2 Opera Society,\nPaldi, Ahmedabad, Gujarat.",
//             phones: ["+91 99986 10505", "+91 93270 09400"],
//         },
//         {
//             title: "Mumbai Office",
//             address: "",
//             phones: ["+91 90000 00000"],
//         },
//         {
//             title: "UK Office",
//             address: "",
//             phones: ["+44 00000 00000"],
//         },
//     ];

//     const fadeInUp = {
//         initial: { opacity: 0, y: 18 },
//         whileInView: { opacity: 1, y: 0 },
//         viewport: { once: true },
//         transition: { duration: 0.5 },
//     };

//     return (
//     <footer className=" bg-[#f7f7f7] font-sans text-[#4f4f4f]">
//         <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-12 lg:px-[75px]">
//             <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.35fr_0.75fr_0.65fr] lg:gap-20">
//                 {/* LEFT SIDE */}
//                 <motion.div {...fadeInUp}>
//                     {/* Logo */}
//                     <div className="mb-8">
//                         <Image
//                             src={logo}
//                             alt="Purple Phase Communications"
//                             className="h-auto w-[190px] object-contain"
//                             priority
//                         />
//                     </div>

//                     {/* Email */}
//                     <p className="mb-8 text-[15px] font-semibold text-[#444444]">
//                         Email :{" "}
//                         <a
//                             href="mailto:info.purplephase@gmail.com"
//                             className="font-normal underline underline-offset-2 transition hover:text-[#b02078]"
//                         >
//                             info.purplephase@gmail.com
//                         </a>
//                     </p>

//                     {/* Offices */}
//                     <div className="grid grid-cols-1 gap-7 md:grid-cols-3 md:gap-8">
//                         {offices.map((office) => (
//                             <div key={office.title}>
//                                 <div className="mb-2 flex items-center gap-2">
//                                     <FaMapMarkerAlt className="text-[12px] text-[#b02078]" />
//                                     <h4 className="text-[15px] font-semibold leading-tight text-[#3f3f3f]">
//                                         {office.title.replace(" Office", "")}
//                                     </h4>
//                                 </div>

//                                 <div className="space-y-1 pl-5">
//                                     {office.phones.map((phone) => (
//                                         <a
//                                             key={phone}
//                                             href={`tel:${phone.replace(/\s/g, "")}`}
//                                             className="block w-fit border-b border-[#777777] text-[14px] leading-tight text-[#555555] transition hover:border-[#b02078] hover:text-[#b02078]"
//                                         >
//                                             {phone}
//                                         </a>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* Copyright */}
//                     <p className="mt-12 text-[15px] leading-relaxed text-[#777777]">
//                         Copyright © {new Date().getFullYear()}. All rights reserved Purple Phase Communications
//                     </p>
//                 </motion.div>

//                 {/* NAVIGATION */}
//                 <motion.div
//                     {...fadeInUp}
//                     transition={{ delay: 0.1, duration: 0.5 }}
//                     className="lg:pl-4"
//                 >
//                     <ul className="space-y-5">
//                         {navLinks.map((link) => (
//                             <li key={link.name}>
//                                 <a
//                                     href={link.href}
//                                     className="block text-[15px] leading-none text-[#4f4f4f] transition hover:translate-x-1 hover:text-[#b02078]"
//                                 >
//                                     {link.name}
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>

//                     <div className="mt-16">
//                         <a
//                             href="#"
//                             className="text-[15px] text-[#777777] transition hover:text-[#b02078]"
//                         >
//                             Terms &amp; Conditions
//                         </a>
//                     </div>
//                 </motion.div>

//                 {/* SOCIAL */}
//                 <motion.div
//                     {...fadeInUp}
//                     transition={{ delay: 0.2, duration: 0.5 }}
//                 >
//                     <h4 className="mb-3 text-[16px] font-normal text-[#555555]">
//                         Follow Us
//                     </h4>

//                     <ul className="space-y-3">
//                         {socialLinks.map((social) => (
//                             <li key={social.name}>
//                                 <a
//                                     href={social.href}
//                                     target="_blank"
//                                     rel="noopener noreferrer"
//                                     className="flex items-center gap-2 text-[15px] leading-none text-[#555555] transition hover:translate-x-1 hover:text-[#b02078]"
//                                 >
//                                     <span className="flex w-4 justify-center text-[12px]">
//                                         {social.icon}
//                                     </span>
//                                     <span>{social.name}</span>
//                                 </a>
//                             </li>
//                         ))}
//                     </ul>

//                     <div className="mt-10">
//                         <a
//                             href="#"
//                             className="text-[15px] text-[#777777] transition hover:text-[#b02078]"
//                         >
//                             Privacy Policy
//                         </a>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     </footer>
// );
// };

// export default Footer;
