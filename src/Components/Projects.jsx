import React from 'react';
import github from '../assets/github.png';
import link from '../assets/link.png';
import KisaanMitr from '../assets/KisaanMitr.png'
import Synkro from '../assets/Synkro.png'
import TrashTrades from '../assets/TrashTrades.png'
import projectsData from '../projectsData.json';

const Projects = () => {
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
            <img className='pr-10 transition duration-300 transform hover:scale-110' src={KisaanMitr} alt={`project${project.id}`} />
            <br />
            <p className='text-white pr-8 text-lg font-nova-flat'>
              {project.description}
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
