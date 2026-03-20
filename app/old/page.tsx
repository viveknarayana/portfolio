"use client";
import Head from "next/head";
import ExpCard from "@/components/ExpCards";
import Projects from "@/components/Projects";

import Contact from "@/components/Contact";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function OldHome() {
  const auraRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState("about");

  useEffect(() => {
    const updateAuraPosition = (e: MouseEvent) => {
      if (auraRef.current) {
        auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    window.addEventListener("pointermove", updateAuraPosition);

    return () => {
      window.removeEventListener("pointermove", updateAuraPosition);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -79% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <>
      <Head>
        <style jsx global>{`
          html {
            overflow: auto;
            position: static;
            width: 100%;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          html::-webkit-scrollbar {
            display: none;
          }
          body {
            font-family: "${inter.style.fontFamily}";
            overflow: auto;
            position: static;
            width: 100%;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }
          body::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </Head>

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-12">
        <div ref={auraRef} className="mouse-aura" />

        <div className="sticky top-4 z-50 mb-12 flex justify-center">
          <div className="inline-flex rounded-full border border-slate-800 bg-slate-900/80 p-1 shadow-xl backdrop-blur-md">
            {["About", "Experience", "Projects"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  const element = document.getElementById(tab.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.toLowerCase()
                    ? "bg-slate-100 text-slate-900 shadow-lg"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <main className="mx-auto flex w-full max-w-5xl flex-col gap-32 pb-32">
          <Contact />
          <ExpCard />
          <Projects />
        </main>
      </div>
    </>
  );
}
