import React from 'react';
import github from '../assets/github.png';
import link from '../assets/link.png';
import projectsData from '../projectsData.json';
import { useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState(projectsData);

  const [expandedDescriptions, setExpandedDescriptions] = useState([]);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => {
      const isExpanded = prev.includes(id);
      return isExpanded ? prev.filter((prevId) => prevId !== id) : [...prev, id];
    });
  };

  const isDescriptionExpanded = (id) => expandedDescriptions.includes(id);

  const prevSlide = (id) => {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const isFirstSlide = newProjects[id].currentIndex === 0;
      newProjects[id].currentIndex = isFirstSlide ? newProjects[id].imageSrc.length - 1 : newProjects[id].currentIndex - 1;
      return newProjects;
    });
  };

  const nextSlide = (id) => {
    setProjects((prevProjects) => {
      const newProjects = [...prevProjects];
      const isLastSlide = newProjects[id].currentIndex === newProjects[id].imageSrc.length - 1;
      newProjects[id].currentIndex = isLastSlide ? 0 : newProjects[id].currentIndex + 1;
      return newProjects;
    });
  };

  return (
    <div className='border pb-28'>
      <div className='text-center text-white m-auto max-w-[1176px] pt-24'>
        <h1 className='text-5xl' style={{ fontFamily: 'monospace' }}>
          HIGHLIGHTING MY PASSION THROUGH<br />
          <em> CRAFTED <strong>"PROJECTS"</strong> ON DISPLAY</em>
        </h1>
      </div>
      <br /><br /><br />
      <div className='flex flex-row justify-between m-auto max-w-[1176px]'>
        {projectsData.map((project) => (
          <div key={project.id} className='border-r border-t w-[30%]'>
            <h1 className='pt-6 text-2xl text-white' style={{ fontFamily: 'monospace' }}>
              {project.name}
            </h1>
            <br />
            <div className='flex items-center relative transition duration-300 transform pr-8 hover:scale-110'>
            <div className='cursor-pointer absolute z-10' onClick={() => prevSlide(project.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg></div>
            <div><img className='' src={project.imageSrc[project.currentIndex]} alt={`project${project.id}`} /></div>
            <div className='cursor-pointer absolute z-10 right-8' onClick={() => nextSlide(project.id)}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg></div>
            </div>
            <br />
            <p className='text-white pr-8 text-lg font-nova-flat'>
              {isDescriptionExpanded(project.id)
                ? project.description // Show full description if expanded
                : `${project.description.slice(0, 150)}...`} {/* Show a truncated version if not expanded */}
              <span
                className='text-blue-500 cursor-pointer'
                onClick={() => toggleDescription(project.id)}
              >
                {isDescriptionExpanded(project.id) ? ' Read Less' : ' Read More'}
              </span>
            </p>
            <div className='flex justify-center gap-12 pr-12 pt-6'>
              <a href={project.githubLink} target='_blank' rel='noopener noreferrer'>
                <img className='cursor-pointer w-10 h-10 transition duration-300 transform hover:scale-110' src={github} alt='github' />
              </a>
              <a href={project.websiteLink} target='_blank' rel='noopener noreferrer'>
                <img className='cursor-pointer w-8 h-8 transition duration-300 transform hover:scale-110' src={link} alt='link' />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
