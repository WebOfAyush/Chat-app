import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/index.js";
export const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;
    const senderId = req.user._id;
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    await newMessage.save();
    await conversation.save();
    // socket wali chize
    const receiverSocketId = await getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(`Error in sendMessage controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const { _id: senderId } = req.user;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages participants");

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, userToChatId],
      });
    }

    res.status(200).json(conversation);
  } catch (error) {
    console.error(`Error in getMessages controller: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

