import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { Line } from 'rc-progress';
import Footer from '../../components/student/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyEnrollments = () => {
  const {
    enrolledCourses,
    calculateCourseDuration,
    navigate,
    userData,
    fetchEnrolledCourses,
    backendUrl,
    getToken,
    calculateNoOfLectures,
  } = useContext(AppContext);

  const [progressArray, setProgressArray] = useState([]);

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      console.log('Fetching progress with token:', token);
  
      const tempProgressArray = await Promise.all(
        enrolledCourses.map(async (course) => {
          try {
            console.log(`Fetching progress for course: ${course._id}`);
            const { data } = await axios.post(
              `${backendUrl}/api/user/get-coure-progress`, // ✅ Fixed typo
              { courseId: course._id },
              { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log('Progress data:', data);
  
            let totalLectures = calculateNoOfLectures(course);
            const lectureCompleted = data.progressData ? data.progressData.lectureCompleted.length : 0;
            return { totalLectures, lectureCompleted };
          } catch (err) {
            console.error(`Error fetching progress for course ${course._id}:`, err);
            return { totalLectures: 0, lectureCompleted: 0 }; // Prevent breaking UI
          }
        })
      );
  
      setProgressArray(tempProgressArray);
    } catch (error) {
      console.error('Error in getCourseProgress:', error);
      toast.error(error.response?.data?.error || 'Error fetching progress');
    }
  };
  

  useEffect(() => {
    if (userData && enrolledCourses.length === 0) {
      fetchEnrolledCourses();
    }
  }, [userData, enrolledCourses]);  // ✅ Added `enrolledCourses`
  useEffect(() => {
    console.log("Updated Enrolled Courses:", enrolledCourses);
  }, [enrolledCourses]);

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseProgress();
    }
  }, [enrolledCourses]);
  const uniqueCourses = Array.from(
    new Map(enrolledCourses.map(course => [course._id, course])).values()
  );
  return (
    <>
      <div className="md:px-36 px-8 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollment</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {uniqueCourses.map((course, index) => (
              <tr className="border-b border-gray-500/20" key={course._id}>
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img src={course.courseThumbnail} alt="" className="w-14 sm:w-24 md:w-28" />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        progressArray[index]
                          ? (progressArray[index].lectureCompleted * 100) / progressArray[index].totalLectures
                          : 0
                      }
                      className="bg-gray-300 rounded-full"
                    />
                  </div>
                </td>
                <td className="px-4 py-4 max-sm:hidden">{calculateCourseDuration(course)}</td>
                <td className="px-4 py-4 max-sm:hidden">
                  {progressArray[index] &&
                    `${progressArray[index].lectureCompleted} / ${progressArray[index].totalLectures} Lectures`}
                </td>
                <td className="px-4 py-4 max-sm:text-right">
                  <button
                    className="px-3 sm:px-5 py-1.5 sm:py-2 bg-blue-600 max-sm:text-xs text-white"
                    onClick={() => navigate('/player/' + course._id)}
                  >
                    {progressArray[index] &&
                    progressArray[index].lectureCompleted / progressArray[index].totalLectures === 1
                      ? 'Completed'
                      : 'Ongoing'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
