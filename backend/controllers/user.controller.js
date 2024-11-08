import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import Conversation from "../models/conversation.model.js"
import { getUserProfileSchema } from "../schema/user/userSchema.js";
import { z } from "zod";
import FriendRequest from "../models/friendRequest.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const { username } = getUserProfileSchema.parse(req.params);
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle Zod validation errors
      return res.status(400).json({
        error: error.errors.map((err) => err.message).join(", "),
      });
    }
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, currentPassword, newPassword, bio, link } =
      req.body;
    let { profileImg } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    if (
      (!currentPassword && newPassword) ||
      (!newPassword && currentPassword)
    ) {
      return res.status(400).json({
        message: "Please provide both passwords",
      });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect Password" });
      if (newPassword.length < 6)
        return res
          .status(400)
          .json({ message: "Password should be more than 6 characters long" });

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      user.password = hashedPassword;
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const uploadedResponse = await cloudinary.uploader.upload(profileImg);
      profileImg = uploadedResponse.secure_url;
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.link = link || user.link;
    user.profileImg = profileImg || user.profileImg;

    await user.save();
    user.password = undefined;

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const currentUserId = req.user._id;
    const friendRequests = await FriendRequest.find({
      $or: [{ from: currentUserId }, { to: currentUserId }],
      status: { $in: ["pending", "accepted"] },
    });

    const excludedUserIds = friendRequests.map((req) =>
      req.from.toString() === currentUserId.toString() ? req.to : req.from
    );

    const users = await User.find({
      username: { $regex: query, $options: "i" },
      _id: { $nin: [...excludedUserIds, currentUserId] },
    })
      .limit(5)
      .select("username profileImg bio _id");

    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in search user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const getUserFriends = async (req, res) => {
  try {
    const userId = req.user._id;
    // const conversations = await Conversation.find({
    //     participants: { $in: [userId] }
    // })
    // .populate({
    //     path: 'messages',
    //     options: { sort: { createdAt: -1 }, limit: 1 } 
    // })
    // .populate('participants', 'username profileImg')
    // .exec();

    // res.status(200).json(conversations);
    if (!userId) return res.status(404).json({ message: "UserId not found" });
    const user = await User.findById(userId)
      .populate("friends")
      .select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(user.friends);
  } catch (error) {
    console.log(`Error in getUserFriends: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
