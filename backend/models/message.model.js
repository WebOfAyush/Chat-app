import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
    maxlength: [500, "message must be at most 500 characters long"],
  },
});
const Message = mongoose.model("Message", messageSchema);
export default Message;
