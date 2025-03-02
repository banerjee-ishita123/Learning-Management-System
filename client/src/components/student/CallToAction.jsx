import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div className='flex flex-col items-center gap-4 pt-10 pd-24 px-8 md:px-0'>
      <h1 className='text-xl text-4xl text-gray-800 font-medium'>Learn anything, anytime, anywhere</h1>
      <p className='text-gray-500 sm:text-sm'> Unlock limitless learning opportunities at your convenience. Whether it's day or night, explore new skills and knowledge anytime, anywhere.</p>
      <div className='flex items-center font-medium gap-6 mt-4'>
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>Get Started</button>
        <button className='flex items-center gap-2'>Learn More <img src={assets.arrow_icon} alt='arrow_icon'></img></button>
      </div>
    </div>
  )
}

export default CallToAction
