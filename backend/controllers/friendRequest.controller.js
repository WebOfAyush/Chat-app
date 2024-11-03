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
    if (user.friends.includes(fromUserId)) {
      return res.status(400).json({ message: "You are already friends" });
    }
    if (fromUserId === toUserId)
      return res
        .status(400)
        .json({ message: "You can't send yourself Friend Request" });
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
    console.error(`Error in sendfriendRequest controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not found" });
    }

    friendRequest.status = "accepted";
    await friendRequest.save();

    await User.findByIdAndUpdate(friendRequest.from, {
      $addToSet: { friends: friendRequest.to },
    });
    await User.findByIdAndUpdate(friendRequest.to, {
      $addToSet: { friends: friendRequest.from },
    });
    await FriendRequest.findByIdAndDelete(requestId);
    res.status(200).json({
      message: "Friend Request Accepted",
    });
  } catch (error) {
    console.error(`Error in acceptfriendRequest controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const declineFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;
    const friendRequest = await FriendRequest.findById(requestId);
    if (!friendRequest) {
      return res.status(404).json({ message: "Friend Request not found" });
    }

    friendRequest.status = "declined";
    await friendRequest.save();
    await FriendRequest.findByIdAndDelete(requestId);
    res.status(200).json({
      message: "Friend Request Declined",
    });
  } catch (error) {
    console.error(`Error in declinefriendRequest controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const incommingFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendRequests = await FriendRequest.find({ to: user._id }).populate("from");
    if (friendRequests.length === 0) {
      return res.status(200).json({ message: "No friend requests found" });
    }
    return res.status(200).json(friendRequests);
  } catch (error) {
    console.error(`Error in viewfriendRequest controller: ${error.message}`);
    return res.status(500).json({ error: error.message });
  }
};
export const outgoingFriendRequests = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const friendRequests = await FriendRequest.find({
      from: user._id,
    }).populate("to");
    if (friendRequests.length === 0) {
      return res
        .status(200)
        .json({ message: "No outgoing friend requests found" });
    }
    return res.status(200).json(friendRequests);
  } catch (error) {
    console.error(
      `Error in outgoingfriendRequest controller: ${error.message}`
    );
    return res.status(500).json({ error: error.message });
  }
};