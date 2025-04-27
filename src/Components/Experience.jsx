"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ExternalLink } from "lucide-react";

const experiences = [
  {
    id: 1,
    company: "Sustainiam",
    role: "SDE Intern",
    period: "June 2024 – May 2025",
    description:
      "Led the development of the core product’s frontend from scratch, building a scalable and high-performance platform capable of supporting 10k+ concurrent users. Contributed to backend services, implemented comprehensive Jest and Playwright tests achieving 80%+ code coverage, and set up automation for deployment and scheduled cron jobs, boosting system efficiency and reliability by 60%.",
    skills: [
      "React.js",
      "Next.js",
      "Node.js",
      "Jest",
      "Playwright",
      "Docker",
      "CI/CD",
      "AWS",
      "Socket.io"
    ],
    url: "https://sustainiam.com/",
  },
  {
    id: 2,
    company: "Purezza Technologies",
    role: "MERN Stack Intern",
    period: "October 2023 – November 2023",
    description:
      "Contributed to building a job portal service and a wholesale e-commerce platform using the MERN stack and Tailwind CSS. Focused on clean architecture for scalability and maintainability, collaborated in Agile ceremonies like daily standups and sprint planning, and enhanced backend functionality with Docker containerization.",
    skills: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "TailwindCSS",
      "Docker",
    ],
    url: "https://purezzatechnologies.com/",
  },
];


export const Experience = () => {
  const [activeId, setActiveId] = useState(1);

  return (
    <section
      id="experience"
      className="w-full pt-16 pb-20 px-4 md:px-8 text-white"
    >
      <div className="max-w-6xl mx-auto">
        <h1
          className="text-5xl text-center text-white pb-16"
          style={{ fontFamily: "monospace" }}
        >
          CAREER PATH MAPPED <br />
          <em>
            {" "}
            THROUGH KEY <strong>MILESTONES.</strong>
          </em>
        </h1>

        <div className="relative">
          <div className="flex flex-col gap-12 md:gap-16">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: exp.id * 0.1 }}
                className="relative"
              >
                <div className="ml-6 md:ml-8">
                  <div
                    className="cursor-pointer transition-all duration-300 pb-3"
                    onClick={() =>
                      setActiveId(activeId === exp.id ? null : exp.id)
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg md:text-3xl font-normal">
                          {exp.role}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-400">
                          {exp.company} · {exp.period}
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 ${
                          activeId === exp.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeId === exp.id ? "auto" : 0,
                      opacity: activeId === exp.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-6">
                      <p className="text-sm md:text-base mb-4 md:mb-6 text-neutral-300">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {exp.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 md:px-3 py-1 text-xs rounded-full bg-neutral-800 text-neutral-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {exp.url && (
                        <a
                          href={exp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-xs md:text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                          Visit company{" "}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
