"use client";
import { motion } from 'framer-motion';
import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
    FaBehance,
    FaPinterestP,
    FaYoutube
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
        <footer className="bg-white  font-sans selection:bg-primary/10">
            <div className="max-w-full py-10 mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0">

                {/* Left Side: Branding & Contact (Spans 6 columns) */}
                <motion.div
                    {...fadeInUp}
                    className="lg:col-span-6 flex flex-col items-start"
                >
                    <div className="flex items-center gap-6 mb-6">
                        <Image src={logo} alt="Purple Phase" className="h-16 sm:h-20 md:h-24 2xl:h-32 w-auto object-contain" />
                    </div>



                    <div className="space-y-4">
                        <a href="mailto:info.purplephase@gmail.com"
                            className="group relative inline-block  text-[#4A4A4A] transition-colors hover:text-primary">
                            info.purplephase@gmail.com
                            <span className="absolute -bottom-2 left-0 w-full h-px bg-gray-200 group-hover:bg-primary transition-colors duration-300" />
                        </a>

                        <div className="pt-4 space-y-1">
                            {['+91 93270 09400'].map((num) => (
                                <p key={num} className=" text-[#4A4A4A] hover:text-primary cursor-pointer transition-colors duration-300">
                                    {num}
                                </p>
                            ))}
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
                                        className="text-[16px] text-black hover:text-primary transition-all duration-300 block hover:translate-x-1"
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
                        <h4 className="text-[16px] text-[#626262] mb-2 ">Follow Us</h4>
                        <ul className="space-y-2">
                            {socialLinks.map((social) => (
                                <li key={social.name}>
                                    <a href={social.href} className="flex items-center gap-4 text-[16px] text-black group transition-all duration-300 hover:translate-x-1">
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
                className="max-w-full mx-auto px-6 md:px-12 lg:px-16 py-10 grid grid-cols-1 lg:grid-cols-12 text-[10px] text-[#575757] tracking-[0.2em] uppercase font-medium"
            >
                <div className="lg:col-span-6 text-center items-center lg:text-left">
                    <p className="">
                        Copyright © {new Date().getFullYear()}. All rights reserved Purple Phase Communications
                    </p>
                </div>


                <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2  lg:justify-items-end">
                    <div className="flex flex-col lg:min-w-[150px]">
                        <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
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