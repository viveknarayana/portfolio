"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Inter } from "next/font/google";
import { jobProjects } from "@/components/Projects";
import { jobPositions } from "@/components/ExpCards";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleSectionTitle({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  const [displayText, setDisplayText] = useState(" ".repeat(text.length));

  useEffect(() => {
    if (!isInView) return;

    setDisplayText(" ".repeat(text.length));
    let frame = 0;
    const totalFrames = text.length + 28;
    const timer = window.setInterval(() => {
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < frame - 3) return char;
          const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
          return SCRAMBLE_CHARS[randomIndex];
        })
        .join("");

      setDisplayText(next);
      frame += 1;

      if (frame > totalFrames) {
        setDisplayText(text);
        window.clearInterval(timer);
      }
    }, 68);

    return () => window.clearInterval(timer);
  }, [isInView, text]);

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, scaleX: 0.75, transformOrigin: "left" }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="relative text-sm font-semibold uppercase tracking-[0.18em] text-zinc-400 md:text-xl"
    >
      <span className="invisible whitespace-pre">{text}</span>
      <span className="absolute left-0 top-0 whitespace-pre">{displayText}</span>
    </motion.h2>
  );
}

function ScrambleHeroName({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.8 });
  const [displayText, setDisplayText] = useState(" ".repeat(text.length));

  useEffect(() => {
    if (!isInView) return;

    setDisplayText(" ".repeat(text.length));
    let frame = 0;
    const totalFrames = text.length + 26;
    const timer = window.setInterval(() => {
      const next = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < frame - 3) return char;
          const randomIndex = Math.floor(Math.random() * SCRAMBLE_CHARS.length);
          return SCRAMBLE_CHARS[randomIndex];
        })
        .join("");

      setDisplayText(next);
      frame += 1;

      if (frame > totalFrames) {
        setDisplayText(text);
        window.clearInterval(timer);
      }
    }, 62);

    return () => window.clearInterval(timer);
  }, [isInView, text]);

  return (
    <motion.h1
      ref={ref}
      initial={{ opacity: 0, scaleX: 0.75, transformOrigin: "left" }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: false, amount: 0.8 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative max-w-3xl text-4xl font-semibold uppercase leading-[1.05] tracking-[0.08em] text-zinc-100 md:text-7xl"
    >
      <span className="invisible whitespace-pre">{text}</span>
      <span className="absolute left-0 top-0 whitespace-pre">{displayText}</span>
    </motion.h1>
  );
}

export default function TestRevampPage() {
  const auraRef = useRef<HTMLDivElement>(null);
  const [openExperience, setOpenExperience] = useState<string | null>(null);

  useEffect(() => {
    const updateAuraPosition = (e: PointerEvent) => {
      if (!auraRef.current) return;
      auraRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
      auraRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("pointermove", updateAuraPosition);
    return () => window.removeEventListener("pointermove", updateAuraPosition);
  }, []);

  return (
    <main
      className={`${inter.className} relative min-h-screen overflow-hidden bg-transparent text-zinc-100`}
    >
      <div
        ref={auraRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.04) 24%, rgba(255,255,255,0.015) 42%, rgba(255,255,255,0) 62%)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 opacity-35 [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />

      <section className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-16 md:px-12">
        <ScrambleHeroName text="VIVEK NARAYANA" />

        <motion.p
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base"
        >
          I am a Computer Science junior at UC Davis focused on backend architecture,
          distributed systems, cloud infrastructure, and practical AI products that ship.
        </motion.p>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.7, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.22em] text-zinc-500"
        >
          <a
            href="https://github.com/viveknarayana"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
          >
            github <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/vivek-narayana-a6ab46231/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
          >
            linkedin <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="mailto:vivekpersonal400@gmail.com"
            className="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
          >
            email <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-12 md:px-12">
        <div className="mb-8">
          <ScrambleSectionTitle text="EXPERIENCE" />
        </div>
        <div className="space-y-4">
          {jobPositions.map((item, index) => (
            <motion.article
              key={`${item.place}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group rounded-lg border border-zinc-800/90 bg-zinc-950/60 p-5 backdrop-blur-sm transition-colors hover:border-zinc-600"
            >
              <button
                type="button"
                onClick={() =>
                  setOpenExperience((prev) =>
                    prev === item.place ? null : item.place
                  )
                }
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <div>
                  <h3 className="text-sm font-medium uppercase tracking-[0.08em] text-zinc-100 md:text-base">
                    {item.currentPosition} - {item.place}
                  </h3>
                  <span className="mt-1 block text-xs uppercase tracking-[0.16em] text-zinc-500">
                    {item.timeline}
                  </span>
                </div>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform ${openExperience === item.place ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence initial={false}>
                {openExperience === item.place && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-[88px_1fr]">
                      <div className="relative h-20 w-20 overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
                        <Image
                          src={item.logoPath}
                          alt={`${item.place} logo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-sm leading-relaxed text-zinc-400">{item.description}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-24 md:px-12">
        <div className="mb-8">
          <ScrambleSectionTitle text="PROJECTS" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {jobProjects.map((project, index) => (
            <motion.a
              key={`${project.title}-${index}`}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group rounded-lg border border-zinc-800/90 bg-zinc-950/60 p-5 transition-colors hover:border-zinc-600"
            >
              <div className="relative mb-4 aspect-video w-full overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
                <Image
                  src={project.imagePath}
                  alt={`Screenshot of ${project.title}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex w-full items-center justify-between gap-3 text-left">
                <h4 className="text-sm font-medium uppercase leading-snug tracking-[0.07em] text-zinc-100 md:text-base">
                  {project.title}
                </h4>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-zinc-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-zinc-200" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.slice(0, 6).map((skill) => (
                  <span
                    key={`${project.title}-${skill}`}
                    className="rounded border border-zinc-800 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

    </main>
  );
}
