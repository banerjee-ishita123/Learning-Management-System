
import Course from "../models/Course.js";


//Get all courses

export const getAllCourses=async(req,res)=>{
  try {
    const courses= await Course.find({isPublished:true}).select(['-courseContent','-enrolledStudents']).populate({path:'educator'});
    res.json({success:true,courses})
  } catch (error) {
    res.json({success:false,message:error.message})
    
  }
}

//Get course by id
export const getCourseId=async(req,res)=>{
  const {id}=req.params
try {
  const courseData=await Course.findById(id).populate({path:'educator'});
  //remove lecture url if preview is false
  courseData.courseContent.forEach(chapter=>{
    chapter.chapterContent.forEach(lecture=>{
      if(!lecture.isPreviewFree){
        lecture.lectureUrl="";
      }
    })
  })
  
    // Convert to plain object to avoid circular structure error
    const plainCourseData = JSON.parse(JSON.stringify(courseData));

    res.json({ success: true, courseData: plainCourseData });
} catch (error) {
  res.json({success:false,message:error.message})
}
}
