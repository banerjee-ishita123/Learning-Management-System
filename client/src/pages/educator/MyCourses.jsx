import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'

const MyCourses = () => {
  const {currency,allCourses}=useContext(AppContext)
  const [courses,setCourses]=useState(null)
  const fetchEducatorCourse=async()=>{
    setCourses(allCourses)
  }
  useEffect(()=>{
    fetchEducatorCourse()
  },[])

  return courses ?(
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Course</h2>
        <div className='flex flex-col items-center w-[80vw] max-w-4xl overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <table className='md:table-auto table-fixed w-full overflow-hidden'>
        <thead  className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
          <tr>
            <th className='px-4 py-3 font-semibold trancate'>All Courses</th>
            <th className='px-4 py-3 font-semibold truncate'>Earning</th>
            <th className='px-4 py-3 font-semibold truncate'>Students</th>
            <th className='px-4 py-3 font-semibold trancate'>Published On</th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-900'>
          {courses.map((course)=>(
            <tr className='border-b border-gray-500/20' key={course._id}>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                <img src={course.courseThumbnail} alt='course image' className='w-16'/>
                <span className='tramcate hidden md:block'>{course.courseTitle}</span>
              </td>
              <td className='px-4 py-4 '>
                {currency}{Math.floor(course.enrolledStudents.length * (course.coursePrice-course.discount * course.coursePrice /100))}
              </td>
              <td className='px-4 py-4 '>
                {course.enrolledStudents.length}
              </td>
              <td className='px-4 py-4 '>
               {new Date(course.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        </div>
      </div>
    </div>
  ):<Loading/>
}

export default MyCourses
