import React from 'react'
import { assets } from '../../assets/assets'
import navlogo from'../../assets/nav_logo_dark.png'
const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-10 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'> <img src={navlogo} alt='logo' className='w-80'></img>
        <p className='mt-6 text-center md:text-left text-sm text-white/80 '>Learn anything, anytime, anywhere. Expand your knowledge and skills with ease through interactive courses, 
          expert guidance, and a seamless learning experience. </p>
        </div>
        
        <div className='flex flex-col md:items-start ites-center w-full'>
          <h2 className='font-semibold text-white mb-5'>Companies</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>

            <li><a href='#'>Home</a></li>
            <li><a href='#'>About us</a></li>
            <li><a href='#'>Contact us</a></li>
            <li><a href='#'>Privacy Policy</a></li>
          </ul>
        </div>
        <div className='hidden md:flex flex-col items-start w-full'>
          <h2 className='font-semibold text-white mb-5'>Subscribe to our newsletter</h2>
          <p className='text-sm text-white/60'>The latest news,artical,and resourses send to 
          <br/> your inbox weekly</p>
          <div>
            <input type='email' placeholder='Enter your email' className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none h-9 w-64 rounded px-2 text-sm'/>
            <button className='bg-blue-600 w-24 h-9 text-white rounded ml-3'> Subscribe</button>
          </div>
        </div>
     </div>
     <p className='py-4 text-center text-xs md:text-sm text-white/60'>Copyright 2025 © Ishita Banerjee. All Right Reserved.</p>
    </footer>
  )
}

export default Footer
