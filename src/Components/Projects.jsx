import React from "react";
import github from "../assets/github.png";
import link from "../assets/link.png";
import projectsData from "../projectsData.json";
import { useState } from "react";

export const Projects = () => {
  const [projects, setProjects] = useState(projectsData);
  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  // Split projects into two groups: first 3 and remaining 2
  const firstRowProjects = projects.slice(0, 3);
  const secondRowProjects = projects.slice(3);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => {
      const isExpanded = prev.includes(id);
      return isExpanded
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id];
    });
  };

  const isDescriptionExpanded = (id) => expandedDescriptions.includes(id);

  const prevSlide = (id) => {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const projectIndex = newProjects.findIndex(
        (project) => project.id === id
      );
      if (projectIndex !== -1) {
        newProjects[projectIndex].currentIndex =
          newProjects[projectIndex].currentIndex - 1;
        if (newProjects[projectIndex].currentIndex < 0) {
          newProjects[projectIndex].currentIndex =
            newProjects[projectIndex].imageSrc.length - 1;
        }
      }
      return newProjects;
    });
  };

  const nextSlide = (id) => {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const projectIndex = newProjects.findIndex(
        (project) => project.id === id
      );
      if (projectIndex !== -1) {
        newProjects[projectIndex].currentIndex =
          newProjects[projectIndex].currentIndex + 1;
        if (
          newProjects[projectIndex].currentIndex >
          newProjects[projectIndex].imageSrc.length - 1
        ) {
          newProjects[projectIndex].currentIndex = 0;
        }
      }
      return newProjects;
    });
  };

  // Render a project card
  const renderProject = (project) => (
    <div
      key={project.id}
      className="border-r border-t w-[30%] items-center justify-center max-custom:border max-custom:flex max-custom:flex-col max-custom:w-[80%] max-custom:p-4"
    >
      <h1
        className="pt-6 text-2xl text-white"
        style={{ fontFamily: "monospace" }}
      >
        {project.name}
      </h1>
      <br />
      <div className="flex items-center relative transition duration-300 transform custom:pr-8 hover:scale-110">
        <div
          className="cursor-pointer absolute z-10 text-white text-3xl"
          onClick={() => prevSlide(project.id)}
        >
          &lt;
        </div>
        <div>
          <img
            className=""
            src={project.imageSrc[project.currentIndex]}
            alt={`project${project.id}`}
          />
        </div>
        <div
          className="cursor-pointer absolute z-10 right-1 custom:right-8 text-white text-3xl"
          onClick={() => nextSlide(project.id)}
        >
          &gt;
        </div>
      </div>

      <br />
      <p className="text-white pr-8 text-lg font-nova-flat">
        {isDescriptionExpanded(project.id)
          ? project.description
          : `${project.description.slice(0, 150)}...`}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => toggleDescription(project.id)}
        >
          {isDescriptionExpanded(project.id) ? " Read Less" : " Read More"}
        </span>
      </p>
      <div className="flex justify-center gap-12 custom:pr-12 pt-6">
        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="cursor-pointer w-10 h-10 transition duration-300 transform hover:scale-110"
              src={github}
              alt="github"
            />
          </a>
        )}
        {project.websiteLink && (
          <a
            href={project.websiteLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              className="cursor-pointer w-8 h-8 transition duration-300 transform hover:scale-110"
              src={link}
              alt="link"
            />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="border pb-28">
      <div className="text-center text-white m-auto max-w-[1176px] pt-24">
        <h1
          id="projects"
          className="text-5xl"
          style={{ fontFamily: "monospace" }}
        >
          HIGHLIGHTING MY PASSION THROUGH
          <br />
          <em>
            {" "}
            CRAFTED <strong>PROJECTS</strong> ON DISPLAY
          </em>
        </h1>
      </div>
      <br />
      <br />
      <br />

      <div className="flex flex-col max-custom:items-center custom:flex-row custom:justify-between m-auto max-w-[1176px] max-custom:gap-12 mb-12">
        {firstRowProjects.map((project) => renderProject(project))}
      </div>

      <div className="flex flex-col max-custom:items-center custom:flex-row custom:justify-center m-auto max-w-[1176px] max-custom:gap-12 gap-12">
        {secondRowProjects.map((project) => renderProject(project))}
      </div>
    </div>
  );
};
