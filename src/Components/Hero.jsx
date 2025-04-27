import React from 'react';
import hero from '../assets/hero.jpg';

export const Hero = () => {
  return (
    <>
      <div className='m-auto max-w-[1176px] flex max-custom:flex-col max-custom:items-center pb-28'>
        <div id='about' className='max-custom:w-[90%] max-custom:pt-8 max-custom:flex max-custom:justify-center'>
          <img src={hero} className='grayscale border-l-2 border-r-2 border-b-2 border-t' alt='Hero' />
        </div>

        <div className='w-[40%] max-custom:w-[80%] text-white custom:pl-[88px]'>
          <br/><br/><br/>
          <p className='text-[22px]'>I'm Yash Mathur, An Engineering Pre Final Year at Maharaja Surajmal Institute of Technology, New Delhi.</p>
          <br/>
          <p className='text-lg font-nova-flat'>From diving into the intricacies of programming languages like C/C++, Golang, TypeScript, and Python to mastering web development with the MERN stack, and currently learning DevOps. I'm on a journey to explore and create.</p>
          <br/>
          <p className='text-lg font-nova-flat'>Welcome to my portfolio! Feel free to explore the projects I've worked on. If you find something that catches your eye or if you have any freelance opportunities or work collaborations in mind, don't hesitate to reach out. I'm open to exciting projects and new opportunities. Looking forward to connecting with you!</p>
        </div>
      </div>
    </>
  );
};