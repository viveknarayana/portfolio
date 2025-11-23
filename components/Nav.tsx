"use client";
import { Button } from "@/components/ui/button";
import { Github, Linkedin } from "lucide-react";
import useActiveSection from "@/hooks/useActiveSection";
import FloatingObject from "./StarsBackground";
import TextReveal from "./animations/TextReveal";
import FadeIn from "./animations/FadeIn";
import { motion } from "framer-motion";

type NavItem = {
  name: string;
  href: string;
};

export default function Nav() {
  const activeSection = useActiveSection([
    "about",
    "experience",
    "projects",
    "contact",
  ]);

  const navItems: NavItem[] = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const getNavItemClasses = (href: string) => {
    const isActive = activeSection === href.substring(1);
    return {
      linkClass: isActive ? "active" : "",
      indicatorClass: `nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all ${isActive
          ? "active w-16 bg-foreground h-2"
          : "group-hover:w-16 group-hover:bg-foreground group-hover:h-px"
        }`,
      textClass: `nav-text text-xs font-bold uppercase tracking-widest ${isActive
          ? "text-foreground"
          : "text-slate-500 group-hover:text-foreground"
        }`,
    };
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24 flex flex-col lg:gap-4">
      <div className="flex flex-col gap-4 lg:pr-24 mt-6 lg:mt-0">
        <div className="w-full flex lg:items-center lg:justify-start">
        </div>
        <TextReveal className="text-[42px] font-bold lg:text-start">
          Hi, I'm Vivek
        </TextReveal>
        <FadeIn delay={0.3} direction="up">
          <h2 className="text-xl lg:text-start">
            Full-Stack and AI Developer
          </h2>
        </FadeIn>
        <FadeIn delay={0.5} direction="up">
          <p className="text-lg lg:text-start text-muted-foreground">
            I develop and improve web and AI applications to ensure efficiency and ease of use. My focus is on leveraging AI to create innovative solutions and designing web applications that offer real value and usability in everyday tasks.
          </p>
        </FadeIn>

        {/* Add the floating 3D object here */}

      </div>
      <FadeIn delay={0.7} direction="up">
        <nav className="lg:flex hidden">
          <ul className="flex flex-col w-max text-start gap-6 uppercase text-xs font-medium">
            {navItems.map((item: NavItem, index) => {
              const { linkClass, indicatorClass, textClass } = getNavItemClasses(
                item.href
              );
              return (
                <motion.li
                  key={item.name}
                  className="group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                >
                  <a href={item.href} className={`py-3 ${linkClass}`}>
                    <motion.span
                      className={indicatorClass}
                      layoutId="nav-indicator"
                    ></motion.span>
                    <span className={textClass}>{item.name}</span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>
      </FadeIn>
      <FadeIn delay={0.9} direction="up">
        <ul className="flex flex-row gap-6 mt-6 lg:mt-0">
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon">
              <a
                href="https://github.com/viveknarayana"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="icon">
              <a
                href="https://www.linkedin.com/in/vivek-narayana-a6ab46231/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-[1.2rem] w-[1.2rem]" />
              </a>
            </Button>
          </motion.div>
        </ul>
      </FadeIn>
    </header>
  );
}