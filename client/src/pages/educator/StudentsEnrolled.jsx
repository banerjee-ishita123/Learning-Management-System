import React, { useState } from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import { useEffect } from 'react'
import Loading from '../../components/student/Loading'
const StudentsEnrolled = () => {
  const [enrolledStudents,setenrolledStudents] =useState(null)
  const fetchStudentEnrolled=async()=>{
    setenrolledStudents(dummyStudentEnrolled)
  }
  useEffect(()=>{
    fetchStudentEnrolled()
  },[])
  return enrolledStudents ?(
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='flex flex-col items-center w-[80vw] max-w-4xl overflow-hidden rounded-md bg-white border border-gray-500/20'>
        <table className='md:table-auto table-fixed w-full overflow-hidden p-8'>
        <thead  className='text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
          <tr>
            <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
            <th className='px-4 py-3 font-semibold '>Student Name</th>
            <th className='px-4 py-3 font-semibold '>Course Title</th>
            <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
          </tr>
        </thead>
        <tbody className='text-sm text-gray-900'>
          {enrolledStudents.map((item,index)=>(
            <tr className='border-b border-gray-500/20' key={index}>
              <td className='px-4 py-3 text-center hidden sm:table-cell'>{index+1}</td>
              <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3'>
                <img src={item.student.imageUrl} alt='profile' className='w-9 h-9 rounded-full'/>
              <span className='truncate '>{item.student.name}</span>
              </td>
              <td className='px-4 py-4 truncate'>
                {item.courseTitle}
              </td>
            <td> {new Date(item.purchaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
    </div>
  ) :<Loading/>
}

export default StudentsEnrolled
