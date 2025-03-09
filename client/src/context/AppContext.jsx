import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration'
export const AppContext = createContext()/* AppContex act like a storage box where we can keep storage data*/ 
export const AppContextProvider=(props)=>{
  /* This AppContexProvider component will wrap around the parts of our app that need access to the shared data.*/
  
  const currency=import.meta.env.VITE_CURRENCY
  const navigate=useNavigate()
  const [allCourses,setallCourses]=useState([])
  const [isEducator,setisEducator]=useState(true)
  const [enrollCourses,setenrollCourses]=useState([])

  //Fetch all courses
  const fetchAllCourses= async ()=>{
    setallCourses(dummyCourses)
  }
  //function to calculate avearage rating course
  const calculateRating=(course)=>{
    if (course.courseRatings.length===0){
      return 0
    }
    let totalRating=0
    course.courseRatings.forEach(rating=>{
      totalRating+=rating.rating
    })
    return totalRating / course.courseRatings.length
  }
  //funcion to calculate course chapter time
  const calculChapterTime =(chapter)=>{
    let time=0
    chapter.chapterContent.map((lecture)=> time +=lecture.lectureDuration)
    return humanizeDuration(time*60*1000,{units:['h','m']})
  }
    //funcion to calculate course duration
    const calculateCourseDuration=(course)=>{
    let time=0
    course.courseContent.map((chapter)=>{chapter.chapterContent.map((lecture)=> time+=lecture.lectureDuration)})
    return humanizeDuration(time*60*1000,{units:['h','m']})


    }
    //function to calculate no of lecture in the course
    const calculateNoOfLecture = (course) => {
      let totalLecture = 0;
      course.courseContent.forEach(chapter => {
          if (Array.isArray(chapter.chapterContent)) {
              totalLecture += chapter.chapterContent.length; 
          }
      });
      return totalLecture;
  };
  //fetch User Enrolled courses
  const fetchEnrolledCourses=async ()=>{
    setenrollCourses(dummyCourses)
  }
  
  useEffect(()=>{
   fetchAllCourses()
   fetchEnrolledCourses()
  },[])
    const value={
       currency,allCourses,navigate,calculateRating,isEducator,setisEducator,calculChapterTime,calculateCourseDuration,calculateNoOfLecture,enrollCourses,fetchEnrolledCourses
    }
        return(
          /*<AppContext.Provider> is the actual provider that shares data. 
          {props.children} means whatever components are inside AppContextProvider will have access to this shared data. */
          <AppContext.Provider value={value}> 
           
            {props.children}
          </AppContext.Provider>
        )
}
