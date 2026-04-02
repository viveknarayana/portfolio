"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight } from "lucide-react";
import TiltCard from "./animations/TiltCard";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";

export const jobProjects = [
  {
    imagePath: "/wave.png",
    title: "Wave - Kubernetes-Native LLM Inference Gateway",
    description:
      "FastAPI gateway in front of vLLM with an OpenAI-compatible chat API and streaming. Gateway-side priority batching (short windows, premium first; each call is still a worker request—vLLM does GPU continuous batching internally), KV-cache-aware routing with optional Redis affinity, eviction and reroute under pressure, conversation-scoped exact and semantic prompt caching, in-memory tenant model/context limits, in-process SLO-style admission (429 on free tier when guards trip), Prometheus /metrics, and Kubernetes manifests with CPU-based HPA (metrics-server in cluster).",
    skills: [
      "Python",
      "FastAPI",
      "Kubernetes",
      "Redis",
      "vLLM",
      "Prometheus",
    ],
    link: "https://github.com/viveknarayana/wave",
  },
  {
    imagePath: "/redian.png",
    title: "Redian - LLM Agent Security Testing Framework",
    description:
      "Built a modular Python framework for automating red teaming and security evaluation of LLM agents using Google Gemini. Features stateful multi-turn tool interactions via LangGraph, dynamic prompt injection attacks with meta-LLM payload generation, and automated evaluation using LLM-based judges to assess agent vulnerabilities and logical consistency.",
    skills: [
      "Python",
      "LangGraph",
      "Google Gemini",
      "MCP Protocol",
      "Prompt Injection",
      "LLM Security",
      "Async/Await",
      "Docker",
    ],
    link: "https://github.com/viveknarayana/Redian",
  },
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
    imagePath: "/terminal-agent.png",
    title: "Terminal Agent - AI-Powered Code Execution Platform",
    description:
      "Developed a sophisticated AI agentic loop that executes code in isolated Docker containers with real-time tool calling capabilities. Features MCP (Model Context Protocol) integration for GitHub API access and streaming response handling with comprehensive logging and error management.",
    skills: [
      "Python",
      "Docker",
      "Groq API",
      "MCP Protocol",
      "Rich TUI",
      "Textual",
      "Async/Await",
      "Tool Calling",
    ],
    link: "https://github.com/viveknarayana/terminal-agent",
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

export function ProjectCard({ project }: { project: typeof jobProjects[0] }) {
  return (
    <TiltCard tiltAmount={3} scale={1.02} className="h-full">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <Card className="group h-full flex flex-col overflow-hidden border-slate-800 bg-slate-900/50 hover:border-slate-600 hover:bg-slate-900/80 transition-all duration-300">
          <div className="relative w-full aspect-video overflow-hidden bg-slate-950">
            <Image
              src={project.imagePath}
              alt={`Screenshot of ${project.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <CardContent className="flex flex-col flex-grow p-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 group-hover:text-blue-400 transition-colors">
                {project.title}
                <MoveUpRight className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </h3>
              <CardDescription className="mt-2 text-slate-400">
                {project.description}
              </CardDescription>
            </div>
            <div className="mt-auto flex flex-wrap gap-2">
              {project.skills.map((skill, skillIndex) => (
                <Badge
                  key={skillIndex}
                  variant="secondary"
                  className="bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </a>
    </TiltCard>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-32 lg:mt-16">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-200 mb-8 flex items-center">
        Projects
        <div className="h-px bg-slate-800 flex-grow ml-6"></div>
      </h2>
      <StaggerContainer staggerDelay={0.15} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobProjects.map((project, index) => (
          <StaggerItem
            key={index}
            className="col-span-1"
          >
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
