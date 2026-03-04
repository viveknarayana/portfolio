"use client";
import Head from "next/head";
import ExpCard from "@/components/ExpCards";
import Projects, { jobProjects, ProjectCard } from "@/components/Projects";

import Contact from "@/components/Contact";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
// import LandingOverlay from "@/components/LandingOverlay";
// import { useLanding } from "@/context/LandingContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const auraRef = useRef<HTMLDivElement>(null);
  // const { isLandingVisible, setIsLandingVisible } = useLanding();
  const [activeTab, setActiveTab] = useState('about');

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
        // Find the overlapping entry that is currently intersecting
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -79% 0px" } // Biased towards top of screen
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
            /* Hide scrollbar for Chrome, Safari and Opera */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          html::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
          body {
            font-family: "${inter.style.fontFamily}";
            overflow: auto;
            position: static;
            width: 100%;
            /* Hide scrollbar for Chrome, Safari and Opera */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </Head >

      {/* <AnimatePresence mode="wait">
        {isLandingVisible && (
          <LandingOverlay onEnter={() => { setIsLandingVisible(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        )}
      </AnimatePresence> */}

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-12">
        <div ref={auraRef} className="mouse-aura" />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 sticky top-4 z-50">
          <div className="inline-flex p-1 bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-800 shadow-xl">
            {['About', 'Experience', 'Projects'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  const element = document.getElementById(tab.toLowerCase());
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab.toLowerCase()
                  ? 'bg-slate-100 text-slate-900 shadow-lg'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <main className="w-full max-w-5xl mx-auto flex flex-col gap-32 pb-32">
          <Contact />
          <ExpCard />
          <Projects />
        </main>
      </div >
    </>
  );
}
