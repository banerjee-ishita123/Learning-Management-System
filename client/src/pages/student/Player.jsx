import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import YouTube from 'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'

const Player = () => {
  const {enrollCourses,calculChapterTime} = useContext(AppContext)
  const {courseID} = useParams()
  const [courseData,setCourseData] = useState(null)
  const [openSection,setOpenSection] = useState({})
  const [playerData,setplayerData] = useState(null)

  const getCourseData=()=>{
    enrollCourses.map((course)=>{
      if(course._id===courseID){
        setCourseData(course)
      }
    })
  }
  useEffect(()=>{
    getCourseData()
  },[enrollCourses])

  const toggleSection=(index)=>{
    setOpenSection((prev)=>({...prev,
      [index]: !prev[index],
    }))
  };
  const getYouTubeVideoId = (url) => {
    if (!url) return null; // Prevent errors on empty URLs
    try {
      const parsedUrl = new URL(url);
      
      // Handle different YouTube URL formats
      if (parsedUrl.hostname.includes('youtu.be')) {
        return parsedUrl.pathname.substring(1); // Extract ID from youtu.be/abcd1234
      } else if (parsedUrl.hostname.includes('youtube.com')) {
        return new URLSearchParams(parsedUrl.search).get('v'); // Extract ID from watch?v=abcd1234
      }
    } catch (error) {
      console.error('Invalid YouTube URL:', url);
      return null;
    }
  };
  
  return (
    <>
    <div className="grid md:grid-cols-2 gap-10 p-4 sm:p-10 md:px-36">
    
      {/*left column */}
      <div className='text-gray-800'>
    <h1 className='text-xl font-semibold'>Course Structure</h1>
      <div className='pt-8'>
                       {courseData && courseData.courseContent.map((chapter,index)=>(
                        <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                           <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={()=>{toggleSection(index)}}>
                             <div className='flex items-center gap-2'>
                             <img 
                            src={assets.down_arrow_icon} 
                               alt='arrow-icon' 
                             className={`transform transition-transform duration-300 ${openSection[index] ? 'rotate-180' : ''}`}
                              />
    
                          <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                            </div>
                            <p>{chapter.chapterContent.length} lectures- {calculChapterTime(chapter)}</p>
                          </div>
                          <div className={`overflow-hidden transition-all duration-300 ${openSection[index] ? 'max-h-[500px]' : 'max-h-0'}`}>
    
                            <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300'>
                              {chapter.chapterContent.map((lecture,i)=>
                              <li key={i} className='flex items-start gap-2 py-1'>
                                <img className='w-4 h-4 mt-1' src={false ? assets.blue_tick_icon : assets.play_icon} alt='play-icon' />
                                <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                  <p>{lecture.lectureTitle}</p>
                                  <div className='flex gap-2'>{lecture.lectureUrl && <p 
                                  onClick={()=>setplayerData({
                                    ...lecture , chapter : index + 1,lecture: i+1
                                  })}
                                  className='text-blue-500 cursor-pointer'>Watch</p>}
                                  <p>{humanizeDuration( lecture.lectureDuration * 60 *1000,{units:['h','m']})}</p>
                                  </div>
    
                                </div>
    
                              </li>)}
                            </ul>
                          </div>
                        </div>
                       ))}
                    </div>
                    <div className='flex items-center gap-2 py-3 mt-10'>
                    <h1 className='text-xl font-bold'>Rate this course:</h1>
                    <Rating initialRating ={0}/>
                    </div>
               
    </div>
      {/* right column */}
      <div className='md:mt-10'>
        {playerData ? (
          <div>
         <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video'/>
         <div className='flex justify-between items-center mt-1'>
          <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
          <button className='text-blue-600'>{false ? 'completed' : 'mark completed'}</button>
         </div>
          </div>
        ) :
        <img src={courseData ? courseData.courseThumbnail : null} alt=''/>
      }
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Player
