import React from 'react';
import hero from '../assets/hero.jpg';

export const Hero = () => {
  return (
    <>
      <div className='relative m-auto max-w-[1176px] flex'>
        <div className='absolute bg-[#f7f8f2] text-black z-30 text-5xl top-[72.5%] font-bold'>
          STRENGTH <br /> IN SIMPLICITY
        </div>
        <div className='max-h-[80vh]'>
          <img src={hero} className='h-[85%] w-[90%] grayscale border-l-2 border-r-2 border-b-2 border-t' alt='Hero' />
        </div>

        <div className='w-[40%] text-white'>
          <br/><br/><br/>
          <p className='text-[22px]'>An architectural style that emerged in the mid-20s is based on the raw and unadorned use of concrete.</p>
          <br/>
          <p className='text-lg font-nova-flat'>Named by the French term béton brut, or raw concrete, Brutalism became popular in the post-WWII era, when the need for affordable housing and public buildings led to the widespread use of concrete.</p>
        </div>
      </div>
    </>
  );
};
