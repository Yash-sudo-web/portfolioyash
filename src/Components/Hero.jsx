import React from 'react'
import hero from '../assets/hero.jpg'
import hero2 from '../assets/hero2.jpeg'
import hero3 from '../assets/hero3.jpg'
export const Hero = () => {
  return (
    <>
    <div className='m-auto max-w-[1176px] flex'>
        <div>
            <img src={hero} className='h-[70%] w-[90%] grayscale border-l-2 border-r-2 border-b-2 border-t' />
        </div>
        <div className='w-[40%] text-white'>
            <br/><br/><br/>
            <p className='text-[22px]'>An architectural style that emerged in the mid-20s is based in raw and unadorned use of concrete.</p>
            <br/>
            <p className='text-lg font-nova-flat'>Named by the French term béton brut, or raw concrete, Brutalism became popular in the post-WWII era, when the need for affordable housing and public buildings led to the widespread use of concrete.</p>
        </div>
    </div>
    </>
  )
}
