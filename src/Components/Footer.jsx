import React from 'react'

const Footer = () => {
  return (
    <>
    <hr />
    <div className='h-40 flex text-white justify-between items-center'>
        <div className='text-xl pl-[5%]' style={{ fontFamily: 'monospace' }}>New Delhi, 110018 — India</div> 
        <div></div>    
        <div className='flex text-white gap-16 pr-[5%]'>
        <a className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center" href='https://drive.google.com/file/d/1gCyPl44byf5PiJq5-sn-iJrcOYEjNLn4/view?usp=sharing'>Resume</a>
        <a href='mailto:ymathur123@gmail.com' className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">Email</a>
        <a className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center" href='https://www.linkedin.com/in/yash-mathur-3a2aa21b7/'>LinkedIn</a>
        <a className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right" href='https://github.com/Yash-sudo-web'>Github</a>
        </div>
        <div className='text-xl pr-[5%]' style={{ fontFamily: 'monospace' }}>Made by <em>Yash Mathur⚡</em></div> 
    </div>
    </>
  )
}

export default Footer