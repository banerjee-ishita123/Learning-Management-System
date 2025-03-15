import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import { AppContext } from '../../context/AppContext';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const {isEducator}=useContext(AppContext)
  const menuItems=[
      {name:'Dashboard',path:'/educator',icon:assets.home_icon},
      {name:'Add Course',path:'/educator/add-course',icon:assets.add_icon},
      {name:'My Course',path:'/educator/my-courses',icon:assets.my_course_icon},
      {name:'Student Enrolled',path:'/educator/student-enrolled',icon:assets.my_course_icon},
  ];
  return  isEducator &&(
    <div className='md:w-64 w-16  text-base min-h-screen border-r border-gray-300 py-3 flex flex-col'>
      {menuItems.map((item)=>(
        <NavLink
        to={item.path}
        key={item.name}
        end={item.path==='/educator'}
        className={({isActive})=> `flex items-center md:flex-row flex-col justify-start justify-center py-3.5 md:px-10 gap-3 ${isActive ? 'bg-indigo-50 border-r-[6px] border-indigo-500/90' : 'hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90'} `}
        >
          <img src={item.icon} alt='' className='w-6 h-6'/>
          <p className='md:block hidden text-center'>{item.name}</p>
        </NavLink>
      ))}
    </div>
  )
}

export default Sidebar
