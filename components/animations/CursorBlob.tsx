"use client";
import { useEffect, useState } from "react";

export default function CursorBlob() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <>
            {/* Main cursor blob */}
            <div
                className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
                style={{
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <div
                    className="absolute h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        transition: "left 0.2s ease-out, top 0.2s ease-out",
                    }}
                />
            </div>

            {/* Secondary blob for depth */}
            <div
                className="pointer-events-none fixed inset-0 z-20 transition-opacity duration-300"
                style={{
                    opacity: isVisible ? 1 : 0,
                }}
            >
                <div
                    className="absolute h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 blur-3xl"
                    style={{
                        left: mousePosition.x,
                        top: mousePosition.y,
                        transition: "left 0.4s ease-out, top 0.4s ease-out",
                    }}
                />
            </div>
        </>
    );
}
