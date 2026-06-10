"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import axios from "axios";
import { apiUrl } from "../config";

type ClientLogo = {
    id: number;
    client_name: string;
    client_logo: string;
    altTag: string;
};

function LogoRow({
    items,
    reverse = false,
    trigger,
}: {
    items: ClientLogo[];
    reverse?: boolean;
    trigger: boolean;
}) {
    const marqueeItems = [...items, ...items, ...items, ...items];

    return (
        <div className="relative w-full overflow-hidden">
            <motion.div
                initial={{ opacity: 0, x: reverse ? -80 : 80 }}
                animate={trigger ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex w-max gap-4 md:gap-6"
            >
                <motion.div
                    className="flex w-max gap-4 md:gap-6"
                    animate={{
                        x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 50,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                >
                    {marqueeItems.map((logo, index) => (
                        <div
                            key={`${logo.id}-${index}`}
                            className="flex h-25 w-42.5 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:h-[150px] md:w-[250px]"
                        >
                            <img
                                src={`${logo.client_logo}`}
                                alt={logo.altTag || logo.client_name}
                                className="max-h-25 max-w-full object-contain  transition duration-300 grayscale-0 md:max-h-[100px]"
                            />
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    );
}

export function LogoSlider() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const [clients, setClients] = useState<ClientLogo[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const res = await axios.post(`${apiUrl}/OurClient`);

                if (res.data?.status && Array.isArray(res.data.data)) {
                    setClients(res.data.data);
                } else {
                    setClients([]);
                }
            } catch (error) {
                console.error("Our Client API Error:", error);
                setClients([]);
            } finally {
                setLoading(false);
            }
        };

        fetchClients();
    }, []);

    const middleIndex = Math.ceil(clients.length / 2);
    const topRow = clients.slice(0, middleIndex);
    const bottomRow = clients.slice(middleIndex);

    return (
        <section
            ref={sectionRef}
            className="w-full overflow-hidden bg-[#e5e5e5] py-12 md:py-16"
        >
            {loading ? (
                <div className="flex min-h-55 items-center justify-center">
                    <div className="h-12 w-12 rounded-full border-4 border-white border-t-[#A62666] animate-spin"></div>
                </div>
            ) : clients.length === 0 ? null : (
                <div className="space-y-6">
                    <LogoRow items={topRow} reverse={false} trigger={isInView} />
                    <LogoRow
                        items={bottomRow.length > 0 ? bottomRow : topRow}
                        reverse={true}
                        trigger={isInView}
                    />
                </div>
            )}
        </section>
    );
}