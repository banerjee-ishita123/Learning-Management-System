import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks, stripeWebhooks } from './controllers/webhook.js'
import educatorRouter from './routs/educatorRouts.js'
import { clerkMiddleware } from '@clerk/express'
import connectCloudinary from './configs/cloudinary.js'
import courseRouter from './routs/courseRoute.js'
import userRouter from './routs/userRoute.js'

//Initialize express
const app = express()

//connect to database

await connectDB()
await connectCloudinary()
//Middilwares
app.use(cors())
app.use(express.json());
app.use(clerkMiddleware())
{app.use((req, res, next) => {
  console.log("Auth Object:", req.auth);
  console.log("Headers:", req.headers.authorization);
  next();
});}
//Routs
app.get('/',(req,res)=>res.send('Api Working'))
app.post('/clerk',express.json(),clerkWebhooks)
app.use('/api/educator',express.json(),educatorRouter)
app.use('/api/course',express.json(),courseRouter)
app.use('/api/user',express.json(),userRouter)
app.post('/stripe', express.raw({ type: 'application/json' }), stripeWebhooks);

//port
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`)
})