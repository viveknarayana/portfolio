"use client";
import { motion, Variants } from "framer-motion";

interface TextRevealProps {
    children: string;
    delay?: number;
    className?: string;
}

export default function TextReveal({
    children,
    delay = 0,
    className = "",
}: TextRevealProps) {
    const words = children.split(" ");

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: delay },
        },
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 100,
            },
        },
    };

    return (
        <motion.div
            style={{ overflow: "hidden", display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={className}
        >
            {words.map((word, index) => (
                <motion.span
                    variants={child}
                    style={{ display: "inline-block" }}
                    key={index}
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
}
