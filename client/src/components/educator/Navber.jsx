import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import navlogo from'../../assets/nav_logo.png'
const Navber = () => {
  const educatorData=dummyEducatorData
  const {user}=useUser()
  return (
   
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3'>
       <Link to={'/'}>
       
      <img src={navlogo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' />
      </Link>
      <div className='flex items-center gap-5 text-gray-500 relative'>
        <p>Hi! {user ? user.fullName : 'Developers'}</p>
        {user ? <UserButton/> : <img src={assets.profile_img} className='max-w-8'/>}
      </div>
    </div>
  )
}

export default Navber
