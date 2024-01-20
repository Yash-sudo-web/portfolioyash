import React from 'react';

const Contact = () => {
  return (
    <>
      <div className='text-center text-white m-auto max-w-[1176px] pt-12'>
        <h1 id='projects' className='text-5xl' style={{ fontFamily: 'monospace' }}>
          <strong>CONTACT ME</strong> TO BRING YOUR<br />
          <em>VISION TO <strong>"SUCCESSFUL"</strong> FRUITION.</em>
        </h1>
      </div>
      <div className='relative m-auto max-w-[1176px] flex justify-center items-start gap-32 pt-20 pb-28'>
        <div className='text-white text-xl font-nova-flat max-w-[50%] pt-8'>Embark on a journey of innovation and excellence with my specialized freelance services, offering expert development in MERN stack for dynamic websites and crafting customized CLI tools using Python—all at minimal costs.<br/><br/> Your project's unique needs will be met with efficiency and creativity. Contact me via the provided form, and let's bring your vision to life, turning ideas into reality. </div>
        <div className='border rounded'>
        <form className=" p-6 rounded shadow-md w-80">
            <div className="mb-4">
            <label className="block mb-2 text-white">Name:</label>
            <input type="text" id="name" name="name" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"/>
            </div>
            <div className="mb-4">
            <label className="block mb-2 text-white">Email:</label>
            <input type="email" id="email" name="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"/>
            </div>
            <div className="mb-4">
            <label className="block mb-2 text-white">Message:</label>
            <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">Submit</button>
        </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
