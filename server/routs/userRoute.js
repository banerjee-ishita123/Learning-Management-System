import express from 'express';
import { addUserRating, getUserCourseProgress, getUserData, purchaseCourse, updateUserCourseProgress, userEnrollCourses } from '../controllers/userController.js';

const userRouter=express.Router()
userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrollCourses)
userRouter.post('/purchase',purchaseCourse)
userRouter.post('/update-coure-progress',updateUserCourseProgress)
userRouter.post('/get-coure-progress',getUserCourseProgress)
userRouter.post('/add-rating',addUserRating)
export default userRouter;