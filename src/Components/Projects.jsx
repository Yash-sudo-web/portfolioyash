import React from 'react';
import github from '../assets/github.png';
import link from '../assets/link.png';
import KisaanMitr from '../assets/KisaanMitr.png'
import Synkro from '../assets/Synkro.png'
import TrashTrades from '../assets/TrashTrades.png'
import projectsData from '../projectsData.json';
import { useState } from 'react';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
    },

    {
      url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
    },
    {
      url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
    },
  ];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
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
            <div className='cursor-pointer' onClick={prevSlide}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"/></svg></div>
            <div><img className='pr-10 transition duration-300 transform hover:scale-110' src={slides[currentIndex].url} alt={`project${project.id}`} /></div>
            <div className='cursor-pointer' onClick={nextSlide}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"/></svg></div>
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
