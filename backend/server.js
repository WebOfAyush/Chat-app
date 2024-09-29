import express from "express"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
import connectMongoDB from "./db/connectMongoDB.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT
connectMongoDB()
app.use(express.json({limit:"5mb"}));
app.use(express.urlencoded({extended:true}))
app.use("/api/auth", authRoutes)

app.listen(PORT,()=>{
    console.log(`server is listening on ${PORT}`)
})