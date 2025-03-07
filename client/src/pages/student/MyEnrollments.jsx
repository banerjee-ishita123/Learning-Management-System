import React from 'react'

const MyEnrollments = () => {
  return (
    <div>
      <h1> My Enrollment </h1>
      <table>
        <thead>
          <tr>
            <th className='px-4 py-3 font-semibold truncate'>Course</th>
            <th className='px-4 py-3 font-semibold truncate'>Duration</th>
            <th className='px-4 py-3 font-semibold truncate'>Completed</th>
            <th className='px-4 py-3 font-semibold truncate'>Status</th>
          </tr>
        </thead>
      </table>
    </div>
  )
}

export default MyEnrollments
