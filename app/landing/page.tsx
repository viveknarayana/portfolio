"use client";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";

const TreeWireMesh = dynamic(() => import("@/components/TreeWireMesh"), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: '#0a0a0a', fontFamily: inter.style.fontFamily }}
    >
      {/* Three.js Tree Wire Mesh - Full Screen Background */}
      <TreeWireMesh />

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-black/30 p-12 rounded-3xl border border-white/10 pointer-events-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Vivek Narayana
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            Full Stack & AI Developer
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Enter Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Technical UI Elements */}
      <div className="absolute top-8 left-8 text-white text-sm font-mono opacity-60">
        <div>0.077</div>
      </div>
      <div className="absolute bottom-8 left-8 text-white text-sm font-mono opacity-60">
        <div>viveknarayana.com</div>
      </div>

      {/* Compass-like indicator */}
      <div className="absolute top-8 right-8 text-white text-xs font-mono opacity-50">
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
      </div>
    </div>
  );
}


