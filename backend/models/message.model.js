import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
    maxlength: [500 , "message cant be more than 500 words."],
  },
});
const Message = mongoose.model("Message", messageSchema);
export default Message;

