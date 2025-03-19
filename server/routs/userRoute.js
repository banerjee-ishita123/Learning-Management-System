import express from 'express';
import { getUserData, purchaseCourse, userEnrollCourses } from '../controllers/userController.js';

const userRouter=express.Router()
userRouter.get('/data',getUserData)
userRouter.get('/enrolled-courses',userEnrollCourses)
userRouter.post('/purchase',purchaseCourse)
export default userRouter;