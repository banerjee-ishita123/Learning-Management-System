import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhook.js'

//Initialize express
const app = express()

//connect to database

await connectDB()
//Middilwares
app.use(cors())

//Routs
app.get('/',(req,res)=>res.send('Api Working'))
app.post('/clerk',express.json(),clerkWebhooks)

//port
const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`)
})