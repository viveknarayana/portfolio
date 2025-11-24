"use client";
import Head from "next/head";
import Nav from "@/components/Nav";
import ExpCard from "@/components/ExpCards";
import Projects from "@/components/Projects";

import Contact from "@/components/Contact";
import { useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import LandingOverlay from "@/components/LandingOverlay";
import { useLanding } from "@/context/LandingContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const auraRef = useRef<HTMLDivElement>(null);
  const { isLandingVisible, setIsLandingVisible } = useLanding();

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

  return (
    <>
      <Head>
        <style jsx global>{`
          html {
            overflow: ${isLandingVisible ? 'hidden' : 'auto'};
            position: ${isLandingVisible ? 'fixed' : 'static'};
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
            overflow: ${isLandingVisible ? 'hidden' : 'auto'};
            position: ${isLandingVisible ? 'fixed' : 'static'};
            width: 100%;
            /* Hide scrollbar for Chrome, Safari and Opera */
            scrollbar-width: none; /* Firefox */
            -ms-overflow-style: none; /* IE and Edge */
          }
          body::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
      </Head>

      <AnimatePresence mode="wait">
        {isLandingVisible && (
          <LandingOverlay onEnter={() => { setIsLandingVisible(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
        )}
      </AnimatePresence>

      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div ref={auraRef} className="mouse-aura" />
        <div className="lg:flex lg:justify-between lg:gap-4">
          <Nav />
          <main className="flex flex-col pt-6 lg:pt-24 lg:w-1/2 lg:py-24 gap-8">
            <ExpCard />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </>
  );
}
