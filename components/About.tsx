"use client";
/* eslint-disable */

export default function About() {
  return (
    <section id="about" className="scroll-mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          About
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-start text-muted-foreground lg:px-6">
          I’m a full-stack developer with a strong foundation in building{" "}
          <span className="text-white">scalable web applications</span> and{" "}
          <span className="text-white">backend systems</span>.
          My experience spans across front-end development, backend architecture, and building AI-driven systems that enhance functionality and user interaction.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          I’ve worked on{" "}
          <span className="text-white">large-scale web platforms</span>,
          implementing APIs, and integrating databases. Whether it's designing intuitive UIs, developing
          robust backends, or handling{" "}
          <span className="text-white">data processing pipelines</span>, I
          enjoy tackling technical challenges that improve efficiency and
          usability.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          My experience also includes{" "}
          <span className="text-white">machine learning applications</span> and{" "}
          <span className="text-white">automation tools</span> that streamline
          workflows, saving time and improving efficiency in data processing, 
          system management, and user interactions.
        </p>

      </div>
    </section>
  );
}
