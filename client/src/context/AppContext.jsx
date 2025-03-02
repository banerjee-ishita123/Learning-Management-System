import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
export const AppContext = createContext()/* AppContex act like a storage box where we can keep storage data*/ 
export const AppContextProvider=(props)=>{
  /* This AppContexProvider component will wrap around the parts of our app that need access to the shared data.*/
  
  const currency=import.meta.env.VITE_CURRENCY
  const navigate=useNavigate()
  const [allCourses,setallCourses]=useState([])
  const [isEducator,setisEducator]=useState(true)

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
  useEffect(()=>{
   fetchAllCourses()
  },[])
    const value={
       currency,allCourses,navigate,calculateRating,isEducator,setisEducator
    }
        return(
          /*<AppContext.Provider> is the actual provider that shares data. 
          {props.children} means whatever components are inside AppContextProvider will have access to this shared data. */
          <AppContext.Provider value={value}> 
           
            {props.children}
          </AppContext.Provider>
        )
}
