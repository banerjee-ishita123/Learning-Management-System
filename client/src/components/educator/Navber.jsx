import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navber = () => {
  const educatorData=dummyEducatorData
  const {user}=useUser()
  return (
   
    <div>
       <Link to={'/'}>
       
      <img src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' />
      </Link>
      <div>
        <p>Hi!{user?user.fullName : 'Developers'}</p>
        {user ? UserButton : <img src={assets.profile_img} className='max-w-8'/>}
      </div>
    </div>
  )
}

export default Navber
