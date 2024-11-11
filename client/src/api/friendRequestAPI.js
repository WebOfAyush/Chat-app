import axios from "axios"
export const  sendFriendRequest = async(toUserId) =>{
    try {
        const response = await axios.post("/api/friend-request/send", {
            toUserId
        },{
            headers : {
                "Content-Type": "application/json"
            }
        })
        if (response.status !== 200) {
            return error.response?.data?.message;
          }
          return await response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update user.");
      }
}
export const getOutgoingRequest = async()=>{
    try {
        const response = await axios.get("/api/friend-request/outgoing")
        if (response.status !== 200) {
            return error.response?.data?.message;
          }
          return await response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update user.");
      }
}
export const getIncommingRequest = async()=>{
    try {
        const response = await axios.get("/api/friend-request/incomming")
        if (response.status !== 200) {
            return error.response?.data?.message;
          }
          return await response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || "Failed to update user.");
      }
}
export const acceptFriendRequest = async(requestId)=>{
    try {
        const response = await axios.post("/api/friend-request/accept", {
            requestId
        },{
            headers : {
                "Content-Type": "application/json"
            }
        })
        if (response.status !== 200) {
            return error.response?.data?.message;
          }
          return await response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update user.");
      }
}
export const declineFriendRequest = async(requestId)=>{
    try {
        const response = await axios.post("/api/friend-request/decline", {
            requestId
        },{
            headers : {
                "Content-Type": "application/json"
            }
        })
        if (response.status !== 200) {
            return error.response?.data?.message;
          }
          return await response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to update user.");
      }
}
