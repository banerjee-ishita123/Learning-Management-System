import React, { useEffect, useRef } from 'react'
import uniqid from 'uniqid';
import Quill from 'quill'
import { useState } from 'react';
import Theme from 'quill/core/theme';
import { assets } from '../../assets/assets';
const AddCourse = () => {
  const quillref=useRef(null);
  const editorref=useRef(null);
  const [courseTitle,setCourseTitle]=useState('')
  const [coursePrice,setCoursePrice]=useState(0)
  const [discount,setDiscount]=useState(0)
  const [image,setImage]=useState(null)
  const [chapters,setChapters]=useState([])
  const [showPopup,setShowPopup]=useState(false)
  const [currentChapterId,setCurrentChapterId]=useState(null)
  const [lectureDetails,setLectureDetails]=useState(
    {
      lectureTitle:'',
      lectureDetails:'',
      lectureUrl:'',
      isPreviewFree:false

    }
  )
  const handleChapter=(action,chapterId)=>{
    if(action==='add'){
      const title=prompt("Enter Chapter Name:")
      if(title){
        const newChapter={
          chapterId:uniqid(),
          chapterTitle:title,
          chapterContent:[],
          collapsed:false,
          chapterOrder:chapters.length>0 ? chapters.slice(-1)[0].chapterOrder + 1:1,

        };
        setChapters([...chapters,newChapter])
      }
    }else if(action==='remove'){
      setChapters(chapters.filter((chapter)=>chapter.chapterId !==chapterId));
    }else if(action==='toggle'){
      setChapters(
        chapters.map((chapter)=>chapter.chapterId===chapterId ? {...chapter,collapsed : !chapter.collapsed} : chapter)
      );
    }
  }
  const handleLecture=(action,chapterId,lectureIndex)=>{
    if(action==='add'){
    
        setCurrentChapterId(chapterId)
        setShowPopup(true)
      }
    else if(action==='remove'){
    
      setChapters(
        chapters.map((chapter)=>{if(chapter.chapterId===chapterId ){chapter.chapterContent.splice(lectureIndex,1)}
        return chapter
      })
      );
    }
  }
  const addLecture=()=>{
    setChapters(
      chapters.map((chapter)=>{
        if(chapter.chapterId===currentChapterId){
          const newLecture={
            ...lectureDetails,
            lectureOrder:chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1:1,
            lectureId:uniqid()
          };
          chapter.chapterContent.push(newLecture)
        }
        return chapter;
      })

    );
    setShowPopup(false);
    setLectureDetails({
      lectureTitle:'',
      lectureDetails:'',
      lectureUrl:'',
      isPreviewFree:false
    })
  }
  const handlesubmit=async(e)=>{
    e.preventDefault()
  }
  useEffect(
    //initiate quill only once
    ()=>{
      if(!quillref.current&& editorref.current){
        quillref.current=new Quill(editorref.current,{theme:'snow'})
      }
    },[]
  )

  return (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-20 p-4 pt-8 pb-20'>
    <form onSubmit={handlesubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
      <div className='flex flex-col gap-1'>
        <p>Course Title</p>
        <input onChange={e=>setCourseTitle(e.target.value)} value={courseTitle} type='text' placeholder='Type Here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required/>

      </div>
      <div className='flex flex-col gap-1'>
        <p>Course Description</p>
        <div ref={editorref}></div>

      </div>
      <div className='flex items-center justify-between flex-wrap '>
        <div className='flex flex-col gap-1'>
          <p>Course Price</p>
          <input onChange={e=>setCoursePrice(e.target.value)} value={coursePrice} type='number' placeholder='0' className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
        </div>
        <div className='flex md:flex-row flex-col items-center gap-3'>
          <p>Course Thumbnail</p>
          <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
            <img src={assets.file_upload_icon} alt='' className='p-3 bg-blue-500 rounded'/>
            <input onChange={e=>setImage(e.target.files[0])} type='file' id='thumbnailImage' accept='*image/*' hidden/>
            <img className='max-h-10' src={image ? URL.createObjectURL(image):''} alt='' />

          </label>
        </div>
      </div>
      <div className='flex flex-col gap-1'>
          <p>Discount%</p>
          <input onChange={e=>setDiscount(e.target.value)} value={coursePrice} type='number' placeholder='0' min={0} max={100} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
        </div>
        {/* adding chapters and lecturs */}
        <div>
          {chapters.map((chapter,chapterIndex)=>(
            <div key={chapterIndex} className='bg-white rounded-lg border mb-4'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center'>
                  <img onClick={()=>handleChapter('toggle',chapter.chapterId)} src={assets.dropdown_icon} width={14} alt=''  className={`mr-2 transition-all cursor-pointer ${chapter.collapsed && 'rotate-90' }`}/>
                  <span className='font-semibold'>{chapterIndex + 1} {chapter.chapterTitle}</span>
                </div>
                <div className='text-gray-500'>{chapter.chapterContent.length} lectures</div>
                <img  onClick={()=>handleChapter('remove',chapter.chapterId)} src={assets.cross_icon} alt="" className='cursor-pointer' />
              </div>
              {!chapter.collapsed && (
              <div className='p-4'>
              {chapter.chapterContent.map((lecture,lectureIndex)=>(
              <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                <span>
                  {lectureIndex + 1} . {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'> Link </a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}
                </span>
                <img src={assets.cross_icon} alt="" className='cursor-pointer' onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)} />
              </div>

                
              ))}
              <div onClick={()=>handleLecture('add',chapter.chapterId)} className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>+Add Lecture</div>

              </div>
              )}
            </div>
          ))}
          <div onClick={()=>handleChapter('add')} className='flex justify-center items-center p-2 rounded-lg bg-blue-100 cursor-pointer'>+ Add Chapter</div>
          {showPopup &&(
          <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 backdrop-blur-[1.25px]
'>
            <div className='bg-white text-gray-700 rounded p-4 relative w-full max-w-80'>
              <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>
              <div className='mb-2'>
                <p>Lecture Title</p>
                <input onChange={(e)=>setLectureDetails({...lectureDetails,lectureTitle:e.target.value})} value={lectureDetails.lectureTitle} type='text'  className='mt-1 block w-full py-2 px-3 rounded border'/>

              </div>
              <div className='mb-2'>
                <p>Duration (Minites)</p>
                <input onChange={(e)=>setLectureDetails({...lectureDetails,lectureDuration:e.target.value})} value={lectureDetails.lectureDuration} type='number'  className='mt-1 block w-full py-2 px-3 rounded border' />

              </div>
              <div className='mb-2'>
                <p>Lectue Url</p>
                <input onChange={(e)=>setLectureDetails({...lectureDetails,lectureUrl:e.target.value})} value={lectureDetails.lectureUrl} type='text' className='mt-1 block w-full py-2 px-3 rounded border' />

              </div>
              <div className='mb-2'>
                <p>Is Preview Free?</p>
                <input onChange={(e)=>setLectureDetails({...lectureDetails,isPreviewFree:e.target.checked})} checked={lectureDetails.isPreviewFree} type='checkbox' className='mt-1 scale-125' />

              </div>
              <button onClick={addLecture} type='button' className='w-full bg-blue-400 text-white px-4 py-2 rounded '>Add</button>
              <img  onClick={()=>{setShowPopup(false)}} src={assets.cross_icon} className='absolute top-4 right-4 w-4 cursor-pointer' alt="" />
            </div>
            </div>)}
        </div>
        <button type='submit' className='  w-max bg-black text-white px-8 py-2.5 rounded my-3'>Add</button>
    </form>
    
  </div>
)
}

export default AddCourse
