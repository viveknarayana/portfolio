"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import TiltCard from "./animations/TiltCard";
import StaggerContainer, { StaggerItem } from "./animations/StaggerContainer";
import { motion } from "framer-motion";

import Image from "next/image";

const jobPositions = [
  {
    timeline: "Oct 2025 - Present",
    currentPosition: "Software Engineer Intern",
    place: "Eudia",
    previousPositions: [""],
    description:
      "Building company-wide analytics on LLM and model usage, leveraging Trino, Redis, Apache Iceberg, and Azure Blob Storage to efficiently track user activity and message trends",
    skills: [
      "Trino",
      "Redis",
      "Apache Iceberg",
      "Azure Blob Storage",
      "LLM Analytics",
      "Data Engineering",
    ],
    logoPath: "/Eudia.jpeg"
  },
  {
    timeline: "July 2025 – Sep. 2025",
    currentPosition: "AI Infrastructure Researcher",
    place: "DECAL Lab, University of California, Davis",
    previousPositions: [""],
    description:
      "Collaborating with a startup to develop an intelligent assistant and safety app for the outdoors using Flutter. Developing modular RAG pipelines and multi-agent AI architectures implemented with AWS Bedrock. Optimized backend cloud infrastructure by cutting DynamoDB read latency by 90% with Redis caching.",
    skills: [
      "Flutter",
      "Dart",
      "AWS Bedrock",
      "RAG Pipelines",
      "Multi-Agent Architecture",
      "DynamoDB",
      "Redis",
      "Cloud Optimization",
      "AI Safety",
      "Outdoor Technology",
    ],
    logoPath: "/UC DAVIS.png"
  },
  {
    timeline: "June 2025 – Sep. 2025",
    currentPosition: "Application Development Intern",
    place: "Centene Corporation",
    previousPositions: [""],
    description:
      "Spearheading the migration of Go-based microservices to AWS Lambda using Terraform and S3. Enhancing customer-facing front-end UI with React and integrating MongoDB to improve claim data accessibility. Collaborated on optimizing cloud resource usage to improve application performance and reduce costs.",
    skills: [
      "Go",
      "AWS Lambda",
      "Terraform",
      "S3",
      "React",
      "MongoDB",
      "Cloud Optimization",
    ],
    logoPath: "/Centene.png"
  },
  {
    timeline: "July 2023 – Aug. 2024",
    currentPosition: "Software Engineering Intern",
    place: "Mytonomy",
    previousPositions: [""],
    description:
      "Developed Python scripts to automate company link verification, improving workflow efficiency by 90%. Led the creation of RAG health chatbots with Streamlit and integrated AI tools like PineconeDB and Snowflake for vector search. Enhanced data visualization in Sisense and automated PDF-to-HTML conversion using Docker on EC2/S3, reducing manual effort by 4 months and ensuring system reliability through unit testing.",
    skills: [
      "Python",
      "Streamlit",
      "CI/CD",
      "PineconeDB",
      "Snowflake",
      "Sisense",
      "Docker",
      "EC2/S3",
      "Unit Testing",
    ],
    logoPath: "/Mytonomy.png"
  },
  {
    timeline: "Aug. 2022 – Dec. 2022",
    currentPosition: "Coding Teacher",
    place: "CodeFu Tri-Valley",
    previousPositions: [""],
    description:
      "Taught programming to 100+ elementary students through Scratch, using custom game-based projects to reinforce essential coding skills. Achieved a 95% improvement rate in students' coding abilities by focusing on fundamental concepts like loops, variables, and functions.",
    skills: [
      "Teaching",
      "Scratch",
      "Curriculum Development",
      "Student Engagement",
    ],
    logoPath: "/CodeFu.webp"
  }

];

export default function ExpCard() {
  return (
    <section id="experience" className="scroll-mt-16 lg:mt-16">
      <StaggerContainer staggerDelay={0.15}>
        {jobPositions.map((job, index) => (
          <StaggerItem key={index}>
            <TiltCard tiltAmount={5} scale={1.01}>
              <Card
                className="lg:p-6 mb-4 w-full border border-transparent bg-transparent hover:border-blue-300 dark:hover:border-blue-400 lg:hover:drop-shadow-lg transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-16 w-16 rounded-xl bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-700 relative">
                      <Image
                        src={job.logoPath}
                        alt={`${job.place} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <CardContent className="flex flex-col p-0 flex-grow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-slate-200">
                          {job.currentPosition}
                        </h3>
                        <p className="text-slate-400 font-medium">
                          {job.place}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500 font-mono mt-1 md:mt-0">
                        {job.timeline}
                      </p>
                    </div>

                    {job.previousPositions.map((position, posIndex) => (
                      position && (
                        <p key={posIndex} className="text-slate-500 text-sm font-medium mb-2">
                          {position}
                        </p>
                      )
                    ))}

                    <CardDescription className="py-3 text-slate-400 leading-relaxed">
                      {job.description}
                    </CardDescription>

                    <CardFooter className="p-0 flex flex-wrap gap-2 mt-2">
                      {job.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge variant="secondary" className="bg-slate-800/50 text-slate-300 hover:bg-slate-800">{skill}</Badge>
                        </motion.div>
                      ))}
                    </CardFooter>
                  </CardContent>
                </div>
              </Card>
            </TiltCard>
          </StaggerItem>
        ))}
      </StaggerContainer>

    </section>
  );
}
