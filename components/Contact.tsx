import { Mail, Github, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import FadeIn from "./animations/FadeIn";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="flex flex-col gap-12 max-w-4xl mx-auto items-center justify-center text-center min-h-[80vh] py-12">
      <div className="flex flex-col gap-6 items-center">
        <FadeIn delay={0.1} direction="down">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-200">
            Vivek Narayana
          </h1>
        </FadeIn>

        <FadeIn delay={0.2} direction="up">
          <h2 className="text-2xl md:text-3xl font-light text-blue-400">
            CS @ UC Davis
          </h2>
        </FadeIn>

        <FadeIn delay={0.3} direction="up">
          <p className="mt-8 text-xl md:text-2xl leading-relaxed text-slate-300 max-w-3xl">
            I&apos;m a Computer Science Junior at UC Davis and a passionate full-stack developer. I specialize in building scalable web applications and backend systems, with a focus on integrating AI to create smarter, more interactive user experiences.
          </p>
        </FadeIn>
      </div>

      <FadeIn delay={0.5} direction="up">
        <div className="flex flex-row gap-8 mt-8 justify-center">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://github.com/viveknarayana"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-20 w-20 rounded-2xl border-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-blue-400 hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)] transition-all duration-300">
                <Github className="h-10 w-10 text-slate-200" />
              </Button>
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://www.linkedin.com/in/vivek-narayana-a6ab46231/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-20 w-20 rounded-2xl border-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-blue-400 hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)] transition-all duration-300">
                <Linkedin className="h-10 w-10 text-slate-200" />
              </Button>
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <a
              href="mailto:vivekpersonal400@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="h-20 w-20 rounded-2xl border-2 border-slate-700 bg-slate-900/50 hover:bg-slate-800 hover:border-blue-400 hover:shadow-[0_0_30px_-5px_rgba(96,165,250,0.3)] transition-all duration-300">
                <Mail className="h-10 w-10 text-slate-200" />
              </Button>
            </a>
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
}
