import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import humanizeDuration from 'humanize-duration';
import YouTube from 'react-youtube';
import Footer from '../../components/student/Footer';
import Rating from '../../components/student/Rating';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading from '../../components/student/Loading';

const Player = () => {
  const { enrolledCourses, calculateChapterTime, backendUrl, getToken, userData, fetchEnrolledCourses } = useContext(AppContext);
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const [playerData, setPlayerData] = useState(null);
  const [progressData, setProgressData] = useState(null);
  const [initialRating, setInitialRating] = useState(0);
  
  

  const getCourseData = () => {
    if (!enrolledCourses || enrolledCourses.length === 0) {
      console.warn("⚠️ enrolledCourses is empty or undefined");
      return;
    }
  
    enrolledCourses.forEach((course) => {  // ✅ Use forEach instead of map
      if (course._id === courseId) {
        setCourseData(course);
        course.courseRatings?.forEach((item) => { // ✅ Optional chaining to avoid errors
          if (item.userId === userData._id) {
            setInitialRating(item.rating);
          }
        });
      }
    });
  };
  

  useEffect(() => {
    if (enrolledCourses.length > 0) {
      getCourseData();
    }
  }, [enrolledCourses]);

  const markLectureAsCompleted = async (lectureId) => {
    if (!lectureId) return;
    try {
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/user/update-coure-progress`, { courseId, lectureId }, 
        { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        toast.success(data.message);
        getCourseProgress();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getCourseProgress = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.post(`${backendUrl}/api/user/get-coure-progress`, { courseId }, 
        { headers: { Authorization: `Bearer ${token}` } });

      if (data.success) {
        setProgressData(data.progressData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleRate = async (rating) => {
    try {
      const token = await getToken();
      console.log("📩 Sending rating request with:", { courseId, rating });
  
      const response = await axios.post(
        `${backendUrl}/api/user/add-rating`,
        { courseId, rating },
        { headers: { Authorization: `Bearer ${token}`} }
      );
  
      console.log("📝 Full API Response from Rating API:", response.data);
  
      if (response.data.success) {
        toast.success("Rating added!");
        fetchEnrolledCourses();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("❌ Error submitting rating:", error);
      toast.error("Failed to submit rating.");
    }
  };
  
  
  useEffect(() => {
    if (enrolledCourses) {
      const course = enrolledCourses.find((c) => c.id === courseId);
      if (course) {
        console.log("🔄 Updated rating from API:", course.rating); // Debug log
        setInitialRating(course.rating);  // ✅ Ensures UI updates
      }
    }
  }, [enrolledCourses]); 
  

  useEffect(() => {
    getCourseProgress();
  }, []);

  const toggleSection = (index) => {
    setOpenSection(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return courseData ? (
    <>
      <div className="grid md:grid-cols-2 gap-10 p-4 sm:p-10 md:px-36">
        {/* Left Column */}
        <div className="text-gray-800">
          <h1 className="text-xl font-semibold">Course Structure</h1>
          <div className="pt-8">
            {courseData.courseContent.map((chapter, index) => (
              <div key={index} className="border border-gray-300 bg-white mb-2 rounded">
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none" 
                     onClick={() => toggleSection(index)}>
                  <div className="flex items-center gap-2">
                    <img src={assets.down_arrow_icon} alt="arrow-icon" 
                         className={`transform transition-transform duration-300 ${openSection[index] ? 'rotate-180' : ''}`} />
                    <p className="font-medium md:text-base text-sm">{chapter.chapterTitle}</p>
                  </div>
                  <p>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-[500px]' : 'max-h-0'}`}>
                  <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i} className="flex items-start gap-2 py-1">
                        <img className="w-4 h-4 mt-1" 
                             src={playerData && progressData && progressData.lectureCompleted.includes(lecture.lectureId) 
                                    ? assets.blue_tick_icon 
                                    : assets.play_icon} 
                             alt="play-icon" />
                        <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                          <p>{lecture.lectureTitle}</p>
                          <div className="flex gap-2">
                            {lecture.lectureUrl && (
                              <p onClick={() => setPlayerData({ ...lecture, chapter: index + 1, lecture: i + 1 })}
                                 className="text-blue-500 cursor-pointer">
                                Watch
                              </p>
                            )}
                            <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ['h', 'm'] })}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 py-3 mt-10">
            <h1 className="text-xl font-bold">Rate this course:</h1>
            <Rating 
  initialRating={initialRating} 
  onRate={(rating) => {
    console.log("🎯 onRate triggered with:", rating);
    handleRate(rating);  // ✅ Calls your API function
  }} 
/>

          </div>
        </div>

        {/* Right Column */}
        <div className="md:mt-10">
          {playerData ? (
            <div>
              <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName="w-full aspect-video" />
              <div className="flex justify-between items-center mt-1">
                <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                {playerData.lectureId && (
                  <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className="text-blue-600">
                    {progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'Completed' : 'Mark Completed'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : null} alt="Course Thumbnail" />
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />;
};

export default Player;
