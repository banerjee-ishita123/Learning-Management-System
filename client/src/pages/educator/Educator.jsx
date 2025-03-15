import React from 'react'
import { Outlet } from 'react-router-dom'
import Navber from '../../components/educator/Navber'
import Sidebar from '../../components/educator/Sidebar'
import Footer from '../../components/educator/Footer'
const Educator = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <Navber/>
      <div className='flex'>
        <Sidebar/>
      <div className='flex'>
        <Outlet/>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Educator
