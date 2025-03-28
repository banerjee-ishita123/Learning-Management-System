import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

const Hero = () => {
  return (
    <div className='flex flex-col items-center justify-denter w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-home-heading-large md:text-5xl text-3xl text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx:auto'>Empower your future with the courses designed to <span className='text-blue-600'> fit your choice.</span><img src={assets.sketch} alt='sketch' className='md:block hidden absolute -bottom-7 right-0'/></h1>

      <p className='md:block hidden text-gray-500 max-wl-2xl mx:auto'>We bring together world-class instructors, interactive content, and a supportive community <br/>to help you achieve your personal and professional goal</p>

      <p className='md:hidden text-gray-500 max-wl-sm mx:auto'>We bring together world-class instructors 
        to help you achieve your personal and professional goal</p>
        <SearchBar/>
    </div>
  )
}

export default Hero
