import React from 'react'

const Header = () => {
  return (
    <>
        <hr />
        <div className='w-50 absolute text-4xl bg-white'>Work in Progress<br/> Not complete yet</div>
        <div className='m-auto max-w-[1176px]'>
        <hr className='w-[25%] border-b-8' />
        <div className='flex gap-40 pb-[3%] pt-[3%]'>
            <div className='text-white flex flex-col gap-1 w-[30%]'>
            <div className='text-5xl pb-1' style={{ fontFamily: 'monospace' }}>Yash Mathur</div>
            <div className='text-2xl pl-[25%]' style={{ fontFamily: 'monospace' }}>Full-Stack Developer</div>
            </div>
            <div style={{ fontFamily: 'monospace' }} className='text-white w-[55%] flex justify-between pl-4 pt-7'>
                <a href="#" className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left">about</a>
                <a href="#" className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center">projects</a>
                <a href="#" className="relative text-[22px] w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-right">contact me</a>
            </div>
            </div>
        </div>
        <hr/>
    </>
  )
}

export default Header