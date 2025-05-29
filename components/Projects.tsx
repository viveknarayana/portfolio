"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight } from "lucide-react";

const jobProjects = [
  {
    imagePath: "/firewatch.png",
    title: "Firewatch - AI-Powered Fire Detection and Emergency Response",
    description:
      "Built an AI system that detects fires in real-time from surveillance footage using Roboflow, analyzes severity with Gemini, and autonomously contacts emergency services through a custom AI agent. Includes a FastAPI backend, real-time annotation, and alert logic.",
    skills: [
      "Python",
      "FastAPI",
      "Roboflow",
      "Gemini",
      "Supabase",
      "Cerebras",
    ],
    link: "https://github.com/viveknarayana/firehack",
  },
  {
    imagePath: "/volare.png",
    title: "Volare - AI Powered Interview Preparation App",
    description: 
      "Developed an AI-powered behavioral interview simulation feature using Groq, integrating facial expression and body language analysis with HumeAI. The app tracks performance using a React dashboard and stores results in Supabase.",
    skills: [
      "Python",
      "JavaScript",
      "GPT-4",
      "React",
      "Supabase",
      "HumeAI",
    ],
    link: "https://volare.aksads.tech/",
  },
  {
    imagePath: "/billy.png",
    title: "BillyAI - Open-Source Social Media Platform",
    description:
      "Developed an AI-powered social media platform enabling users to engage in political discussions. Worked with a 4-person team to integrate PineconeDB for vector embeddings and used OpenAI/You.com API for summarizing legislation.",
    skills: [
      "Python",
      "TypeScript",
      "Next.js",
      "React",
      "PostgreSQL",
      "Prisma",
    ],
    link: "https://billy-ai.vercel.app/",
  },
  {
    imagePath: "/poshify.png",
    title: "Poshify - Artificial Intelligence Fashion Website",
    description:
      "Developed a fashion website using OpenCV, Flask, and fuzzy logic to dynamically curate outfit schedules. Hosted on AWS with EC2, S3, and RDS using MySQL.",
    skills: [
      "Python",
      "JavaScript",
      "Flask",
      "OpenCV",
      "AWS",
      "MySQL",
    ],
    link: "https://github.com/viveknarayana/Poshify",
  },
  {
    imagePath: "/ballVision.png",
    title: "BallVision - Computer Vision Soccer Analysis",
    description:
      "Applied OpenCV and YOLO to track ball possessions, player speeds, and distances in soccer clips. Utilized K-Means clustering to differentiate team colors and generate detailed player metrics.",
    skills: ["Python", "OpenCV", "YOLO", "scikit-learn", "K-Means"],
    link: "https://github.com/viveknarayana/BallVision",
  },
  {
    imagePath: "/cryptoAutomation.png",
    title: "Crypto Automation",
    description:
      "Developed an algorithmic trading system that executes buy and sell orders for ETH, BTC, and LTC based on a custom strategy. The system automates trade execution and real-time order placement, sending instant notifications via a Discord bot.",
    skills: [
      "Python",
      "Robinhood API",
      "Discord Bot"
    ],
    link: "https://github.com/viveknarayana/Crypto-Automation",
  },
  {
    "imagePath": "/calcCalculator.jpeg",
    "title": "CalcFix Calculator",
    "description": 
      "Built a comprehensive calculus calculator capable of solving problems from Calculus I and II, including derivatives, integrals, limits, and series expansions. Developed during a hackathon (2/24 - 2/26), the project features a Flask backend for computation and a frontend using HTML, CSS, and JavaScript for an interactive user experience.",
    "skills": [
      "Flask",
      "Python",
      "HTML",
      "CSS",
      "JavaScript"
    ],
    "link": "https://github.com/viveknarayana/Calculus-Calculator"
}
];


export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Projects
        </h2>
      </div>
      <>
        {jobProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-pointer"
          >
            <Card className="group lg:p-6 mb-4 flex flex-col lg:flex-row w-full min-h-fit gap-0 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200">
              <CardHeader className="h-full w-full lg:w-1/3 mb-4 p-0">
                <Image
                  src={project.imagePath}
                  alt={`Screenshot of ${project.title}`}
                  width={1920}
                  height={1080}
                  priority
                  className="bg-[#141414] mt-2 border border-muted-foreground rounded-[0.5rem]"
                />
              </CardHeader>
              <CardContent className="flex flex-col p-0 w-full lg:w-2/3">
                <p className="text-primary font-bold">
                  {project.title}{" "}
                  <MoveUpRight className="ml-1 inline-block h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                </p>
                <CardDescription className="py-3 text-muted-foreground">
                  {project.description}
                </CardDescription>
                <CardFooter className="p-0 flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))}
                </CardFooter>
              </CardContent>
            </Card>
          </a>
        ))}
      </>
    </section>
  );
}
