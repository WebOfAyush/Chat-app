import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
const protectRoutes = async(req,res,next) =>{
   try {
     const token = req.cookies.jwt;
     if(!token){
        return res.status(401).json({
             message : "Unauthorized, Login/Signup to access"
         })
     }
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
     if(!decoded){
         return res.status(401).json({
             message: "Unauthorized, Token is invalid"
         })
     } 
     const user = await User.findById(decoded.userId)
     if(!user){
         return res.status(404).json({
             message: "User not found"
         })
     }
     req.user = user
     next()
   } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Server Error" });
  }
    
}
export default protectRoutes