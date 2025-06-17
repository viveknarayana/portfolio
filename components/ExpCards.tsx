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

const jobPositions = [
  {
    timeline: "June 2025 – Present",
    currentPosition: "Application Development Intern",
    place: "Centene",
    previousPositions: [""],
    description:
      "Leading migration of services written in Go to AWS Lambda, while managing infrastructure with EC2 and S3 for scalable deployment.",
    skills: [
      "Go",
      "AWS Lambda",
      "EC2",
      "S3",
      "Python",
      "JavaScript",
      "Infrastructure Management",
    ],
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
  }
  
];

export default function ExpCard() {
  return (
    <section id="experience" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Experience
        </h2>
      </div>
      <>
        {jobPositions.map((job, index) => (
          <Card
            key={index}
            className="lg:p-6 mb-4 flex flex-col lg:flex-row w-full min-h-fit gap-0 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200"
          >
            <CardHeader className="h-full w-full p-0">
              <CardTitle className="text-base text-slate-400 whitespace-nowrap">
                {job.timeline}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
              <p className="text-foreground font-bold">
                {job.currentPosition} • {job.place}
              </p>
              {job.previousPositions.map((position, index) => (
                <p key={index} className="text-slate-400 text-sm font-bold">
                  {position}
                </p>
              ))}
              <CardDescription className="py-3 text-muted-foreground">
                {job.description}
              </CardDescription>
              <CardFooter className="p-0 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))}
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </>
      
    </section>
  );
}
