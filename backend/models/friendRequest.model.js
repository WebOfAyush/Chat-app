import mongoose, { Mongoose } from "mongoose";
const friendRequest = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    }
}, { timestamps: true });
const FriendRequest = mongoose.model("FriendRequest", friendRequest);
export default FriendRequest;