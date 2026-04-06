"use client";
import Head from "next/head";
import Nav from "@/components/Nav";
import ExpCard from "@/components/ExpCards";
import Projects from "@/components/Projects";

import Contact from "@/components/Contact";
import { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const auraRef = useRef<HTMLDivElement>(null);
  const [isAuraActive, setIsAuraActive] = useState(false);

  useEffect(() => {
    const updateAuraPosition = (e: MouseEvent) => {
      if (!auraRef.current) return;
      auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      if (!isAuraActive) {
        window.requestAnimationFrame(() => setIsAuraActive(true));
      }
    };
    window.addEventListener("pointermove", updateAuraPosition);

    return () => {
      window.removeEventListener("pointermove", updateAuraPosition);
    };
  }, [isAuraActive]);

  return (
    <>
      <Head>
        <style jsx global>{`
          body {
            font-family: "${inter.style.fontFamily}";
          }
        `}</style>
      </Head>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div ref={auraRef} className={`mouse-aura ${isAuraActive ? "active" : ""}`} />
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
