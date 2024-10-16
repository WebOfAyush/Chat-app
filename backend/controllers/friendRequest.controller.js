import { z } from "zod";
import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";
export const sendfriendRequest = async (req, res) => {
  try {
    const { toUserId } = req.body;
    const fromUserId = req.user._id;

    const user = await User.findById(toUserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingRequest = await FriendRequest.findOne({
      from: fromUserId,
      to: toUserId,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    const friendRequest = new FriendRequest({
      from: fromUserId,
      to: user._id,
    });
    await friendRequest.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    console.error(`Error in friendRequest controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const acceptFriendRequest = async (req, res) => {

};
export const sendfriendRequestSchema = z.object({
  toUserId: z.string().length(24, { message: "Invalid user ID format" }),
});

