"use client";
import { motion } from "framer-motion";
import { ReactNode, useRef } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    scale?: number;
}

export default function TiltCard({
    children,
    className = "",
    tiltAmount = 10,
    scale = 1.02,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -tiltAmount;
        const rotateY = ((x - centerX) / centerX) * tiltAmount;

        ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.1s ease-out",
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
