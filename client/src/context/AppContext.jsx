import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from 'humanize-duration';
import {useAuth,useUser} from '@clerk/clerk-react';
import axios from 'axios';

import {  toast } from 'react-toastify';
export const AppContext = createContext()/* AppContex act like a storage box where we can keep storage data*/ 
export const AppContextProvider=(props)=>{
  /* This AppContexProvider component will wrap around the parts of our app that need access to the shared data.*/
  const backendUrl=import.meta.env.VITE_BACKEND_URL
  const currency=import.meta.env.VITE_CURRENCY
  const navigate=useNavigate()
  const {getToken}=useAuth()
  const {user}=useUser()



  const [allCourses,setallCourses]=useState([])
  const [isEducator,setIsEducator]=useState(false)
  const [enrolledCourses,setEnrolledCourses]=useState([])
  const [userData,setUserData]=useState(null)
  const [loading, setLoading] = useState(true);

  //Fetch all courses
  const fetchAllCourses= async ()=>{
   try {
    const {data}=await axios.get(backendUrl + '/api/course/all')
    if(data.success){
      setallCourses(data.courses)
      
    }else{
      toast.error(data.message)
    }
   } catch (error) {
    toast.error(error.message)
   }
  }
  //fetch user
  const fetchUserData=async()=>{
    if (user?.publicMetadata?.role === 'educator') {
      setIsEducator(true);
  }
    try {
      const token=await getToken();
    console.log(token)
     const {data}=await axios.get(backendUrl + '/api/user/data',{headers: {Authorization:`Bearer:${token}`}})
      
      
      if(data.success){
        setUserData(data.user)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }
  //function to calculate avearage rating course
  const calculateRating = (course) => {
    if (!course || !Array.isArray(course.courseRatings) || course.courseRatings.length === 0) {
      return 0; // Return 0 if course or courseRatings is undefined or empty
    }
  
    const totalRating = course.courseRatings.reduce((sum, rating) => sum + (rating.rating || 0), 0);
    
    return totalRating / course.courseRatings.length;
  };
  
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
    try {
      const token=await getToken()
    const {data}=await axios.get(backendUrl +'/api/user/enrolled-courses',{headers:{Authorization:`Bearer:${token}`}})
    if(data.success){
      setEnrolledCourses(data.enrolledCourses.reverse())
    }else{
      toast.error(data.message)
    }
    } catch (error) {
      toast.error(error.message)
    }
    
  }
  
  useEffect(()=>{
   fetchAllCourses()
  
  },[])

 
  useEffect(() => {
    if (user) {
        Promise.all([fetchUserData(), fetchEnrolledCourses()]).then(()=>{
            setLoading(false)
        });
        if (user?.publicMetadata?.role === 'educator') {
            setIsEducator(true);
        }
    }else{
        setLoading(false)
    }
}, [user]);
    const value={
       currency,allCourses,navigate,calculateRating,isEducator,setIsEducator,calculChapterTime,calculateCourseDuration,calculateNoOfLecture,enrolledCourses,fetchEnrolledCourses,backendUrl,setUserData,userData,getToken,fetchAllCourses
    }
        return(
          /*<AppContext.Provider> is the actual provider that shares data. 
          {props.children} means whatever components are inside AppContextProvider will have access to this shared data. */
          <AppContext.Provider value={value}> 
           
            {props.children}
          </AppContext.Provider>
        )
}
