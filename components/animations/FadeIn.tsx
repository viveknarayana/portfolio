"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    className?: string;
}

import { useLanding } from "@/context/LandingContext";

export default function FadeIn({
    children,
    delay = 0,
    duration = 0.5,
    direction = "up",
    className = "",
}: FadeInProps) {
    let isLandingVisible = false;
    try {
        const context = useLanding();
        isLandingVisible = context.isLandingVisible;
    } catch (e) {
        // Ignore if not in provider
    }

    const directionOffset = {
        up: { y: 40 },
        down: { y: -40 },
        left: { x: 40 },
        right: { x: -40 },
        none: {},
    };

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...directionOffset[direction],
            }}
            whileInView={isLandingVisible ? undefined : {
                opacity: 1,
                x: 0,
                y: 0,
            }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration,
                delay,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
