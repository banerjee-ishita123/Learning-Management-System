import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <Footer className='bg-gray-900 md:px-10 text-left w-full mt-10'>
      <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30'>
        <div className='flex flex-col md:items-start items-center w-full'><img src={assets.logo_dark} alt='logo'></img>
        <p>Learn anything, anytime, anywhere. Expand your knowledge and skills with ease through interactive courses, 
          expert guidance, and a seamless learning experience. </p>
        </div>
        
        <div></div>
        <div></div>
     </div>
     <p>Copyright 2025 © Ishita Banerjee. All Right Reserved.</p>
    </Footer>
  )
}

export default Footer
