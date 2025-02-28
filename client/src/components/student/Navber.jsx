import React from 'react'
import {assets} from '../../assets/assets'
import { Link } from 'react-router-dom'
const Navber = () => {
  return (
    <div className=''>
       <img src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer'/>
       <div className='hidden md:flex items-center gap-5 text-gray-500'>
        <div>
          <button>
            Become Educator
          </button>
          | <Link to='my-enrollments'>My Enrollments</Link>
          </div>
          <button className='bg-blue-600 text-white px-5 py-2 rounded-full'>Create Account</button>
       </div>
       <div></div>
    </div>
  )
}

export default Navber
