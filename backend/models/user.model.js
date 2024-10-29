import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    maxLength : [15, "username must be at most 15 characters"]
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
    default: "",
  },
  bio: {
    type: String,
    default: "",
    maxLength : [200, "Bio must be at most 200 characters"]
  },
  link: {
    type: String,
    default: "",
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const User = mongoose.model("User", userSchema);
export default User;
