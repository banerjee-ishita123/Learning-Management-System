import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import  Loading from '../../components/student/Loading'

const Dashboard = () => {
  const {currency} =useContext(AppContext)
  const [dashboardData,setDashboardData]=useState(null)

  const fetchDashboardData=async()=>{
    setDashboardData(dummyDashboardData)
  }
  useEffect(()=>{
    fetchDashboardData()
  },[])
  return dashboardData ?(
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 pt-8 p-4 pb-0'>
      <div className='space-y-5'>
        <div className='flex flex-wrap gap-5 items-center'>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt='patients_icon'/>
            <div>
              <p className='text-2xl font-medium text-gray-600'> {dashboardData.enrolledStudentsData.length}</p>
              <p className='text-base text-gray-500'>Total Enrollment</p>
            </div>

          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt='appoiments_icon'/>
            <div>
              <p className='text-2xl font-medium text-gray-600'> {dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>

          </div>
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt='earning_icon'/>
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency} {dashboardData.totalEarning}</p>
              <p className='text-base text-gray-500'>Total Earning</p>
            </div>

          </div>
        </div>
        <div >
          <h1 className='text-lg pb-4 font-medium'>
          Latest Enrollment</h1>
          <div className='flex flex-com items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>
          <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead  className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
            <th className='px-4 py-3 font-semibold '>Student Name</th>
            <th className='px-4 py-3 font-semibold '>Course Title</th>
            
          </tr>
        </thead>
        <tbody className='text-sm text-gray-900'>
          {dashboardData.enrolledStudentsData.map((item,index)=>(
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={item.student.imageUrl} alt='profile' className='w-9 h-9 rounded-full'/>
              <span className='truncate '>{item.student.name}</span>
              </td>
              <td className='px-4 py-4 truncate'>
                {item.courseTitle}
              </td>
            
            </tr>
          ))}
        </tbody>
        </table>
          </div>
        </div>

      </div>
      
    </div>
  ) : <Loading/>
}

export default Dashboard
