import React from 'react';
import hero from '../assets/hero.jpg';

export const Hero = () => {
  return (
    <>
      <div className='relative m-auto max-w-[1176px] flex'>
        <div className='absolute bg-[#f7f8f2] text-black z-30 text-5xl top-[72.5%] font-bold'>
          STRENGTH <br /> IN SIMPLICITY
        </div>
        <div id='about' className='max-h-[80vh]'>
          <img src={hero} className='h-[85%] w-[90%] grayscale border-l-2 border-r-2 border-b-2 border-t' alt='Hero' />
        </div>

        <div className='w-[40%] text-white'>
          <br/><br/><br/>
          <p className='text-[22px]'>I'm Yash Mathur, An Engineering Sophormore at Maharaja Surajmal Institute of Technology, New Delhi.</p>
          <br/>
          <p className='text-lg font-nova-flat'>From diving into the intricacies of programming languages like C/C++, JavaScript, and Python to mastering web development with the MERN stack, and currently learning DevOps. I'm on a journey to explore and create.</p>
          <br/>
          <p className='text-lg font-nova-flat'>Welcome to my portfolio! Feel free to explore the projects I've worked on. If you find something that catches your eye or if you have any freelance opportunities or work collaborations in mind, don't hesitate to reach out. I'm open to exciting projects and new opportunities. Looking forward to connecting with you!</p>
        </div>
      </div>
    </>
  );
};

export default Hero;