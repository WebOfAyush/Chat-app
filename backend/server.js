import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
const app = express()
const PORT = process.env.PORT

connectMongoDB()
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})