"use client";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

const TreeWireMesh = dynamic(() => import("@/components/TreeWireMesh"), {
    ssr: false,
    loading: () => null,
});

const inter = Inter({ subsets: ["latin"] });

interface LandingOverlayProps {
    onEnter: () => void;
}

export default function LandingOverlay({ onEnter }: LandingOverlayProps) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.5
            }
        },
        exit: {
            opacity: 0,
            y: -50,
            transition: { duration: 0.5 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] as any }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] w-full h-screen overflow-hidden bg-[#0a0a0a]"
            style={{ fontFamily: inter.style.fontFamily }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
                opacity: 0,
                scale: 1.5,
                filter: "blur(20px)",
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
            }}
            transition={{ duration: 0.5 }}
        >
            {/* Three.js Tree Wire Mesh - Full Screen Background */}
            <motion.div
                className="absolute inset-0 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
            >
                <TreeWireMesh />
            </motion.div>

            {/* Content Overlay */}
            <motion.div
                className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 pointer-events-none"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-12 rounded-3xl border border-white/10 pointer-events-auto">
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                        variants={itemVariants}
                    >
                        Vivek Narayana
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 mb-8 font-light"
                        variants={itemVariants}
                    >
                        Full Stack & AI Developer
                    </motion.p>
                    <motion.div
                        className="flex gap-4 justify-center"
                        variants={itemVariants}
                    >
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onEnter();
                            }}
                            className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                        >
                            Enter Portfolio
                        </button>
                    </motion.div>
                </div>
            </motion.div>

            {/* Technical UI Elements */}
            <motion.div
                className="absolute top-8 left-8 text-white text-sm font-mono opacity-60"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 1, delay: 1 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.5 } }}
            >
                <div>0.077</div>
            </motion.div>
            <motion.div
                className="absolute bottom-8 left-8 text-white text-sm font-mono opacity-60"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.5 } }}
            >
                <div>viveknarayana.com</div>
            </motion.div>

            {/* Compass-like indicator */}
            <motion.div
                className="absolute top-8 right-8 text-white text-xs font-mono opacity-50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ duration: 1, delay: 1.4 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.5 } }}
            >
                <div className="relative w-32 h-32">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
                        <text x="50" y="20" textAnchor="middle" fontSize="8" fill="currentColor">N</text>
                        <text x="80" y="55" textAnchor="middle" fontSize="8" fill="currentColor">E</text>
                        <text x="50" y="90" textAnchor="middle" fontSize="8" fill="currentColor">S</text>
                        <text x="20" y="55" textAnchor="middle" fontSize="8" fill="currentColor">W</text>
                        <line x1="50" y1="50" x2="50" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
                    </svg>
                </div>
            </motion.div>
        </motion.div>
    );
}
