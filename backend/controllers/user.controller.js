import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import {v2 as cloudinary} from "cloudinary"

export const getUserProfile = (req,res) =>{
    try {
        const {username} = req.params ;
        const user = User.findOne({username}).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
        }
}
export const updateUserProfile = async(req,res)=>{
  try {
      const {fullName, email, currentPassword, newPassword, bio, link} = req.body;
      let {profileImg, coverImg} = req.body;
      const userId = req.user._id;
      const user = User.findById(userId) ;
      if(!user){
          return res.status(404).json({
              message:"User not found"
          })
      }
      if((!currentPassword && newPassword ) || (!newPassword && currentPassword)){
          return res.status(200).json({
              message:"Please provide both passwords"
          })
      }
      if(currentPassword && newPassword){
          const isMatch = await bcrypt.compare(currentPassword, user.password);
          if(!isMatch) return res.status(400).json({message:"Incorrect Password"}) 
          if(newPassword.length < 6) return res.status(400).json({message:"Password should be more than 6 characters long"})
          
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hash(newPassword, salt);
          user.password = hashedPassword;
      }
      if (profileImg) {
          if (user.profileImg) {
            await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
          }
          const uploadedResponse = await cloudinary.uploader.upload(profileImg);
          profileImg = uploadedResponse.secure_url;
        }
    
        if (coverImg) {
          if (user.coverImg) {
            await cloudinary.uploader.destroy(user.coverImg.split("/").pop().split(".")[0]);
          }
          const uploadedResponse = await cloudinary.uploader.upload(coverImg);
          coverImg = uploadedResponse.secure_url;
        }
          user.fullName = fullName || user.fullName;
          user.email = email || user.email;
          user.bio = bio || user.bio;
          user.link = link || user.link;
          user.profileImg = profileImg || user.profileImg;
          user.coverImg = coverImg || user.coverImg;
  
          user = await user.save();
          user.password = null
  
          return res.status(200).json(user);
  
      
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
}