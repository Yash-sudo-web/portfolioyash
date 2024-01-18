import React from 'react';
import github from '../assets/github.png';
import link from '../assets/link.png';
import kisaan from '../assets/KisaanMitr.png';

const Projects = () => {
  return (
    <div className='border pb-28'>
      <div className='text-center text-white m-auto max-w-[1176px] pt-24'>
        <h1 className='text-5xl' style={{ fontFamily: 'monospace' }}>
          CELEBRATED BY THEIR USE OF<br /><em> CONCRETE AND GEOMETRIC FORMS</em>
        </h1>
      </div>
      <br /><br /><br />
      <div className='flex flex-row justify-between m-auto max-w-[1176px]'>
        {[1, 2, 3].map((index) => (
          <div key={index} className='border-r border-t w-[30%]'>
            <h1 className='pt-6 text-2xl text-white' style={{ fontFamily: 'monospace' }}>
              CELEBRATED BY THEIR <br /><em> CONCRETE AND GEOMETRIC</em>
            </h1>
            <br />
            <img className='pr-10 transition duration-300 transform hover:scale-110' src={kisaan} alt={`project${index}`} />
            <br />
            <p className='text-white pr-8 text-lg font-nova-flat'>
              In the ever-evolving world, the art of forging genuine connections remains timeless.
              Whether it's with colleagues, clients, or partners, establishing a genuine rapport paves
              the way for collaborative success.
            </p>
            <div className='flex justify-center gap-12 pr-12 pt-6'>
              <img className='cursor-pointer w-10 h-10 transition duration-300 transform hover:scale-110' src={github} alt='github' />
              <img className='cursor-pointer w-8 h-8 transition duration-300 transform hover:scale-110' src={link} alt='link' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
