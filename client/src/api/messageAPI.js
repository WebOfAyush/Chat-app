import axios from "axios"
export const sendMessage = async ({ receiverId, message }) => {
  try {
    const response = await axios.post(
      "/api/message/send",
      { message, receiverId },
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status !== 201) {
      console.error("Non-200 status code:", response.status);
      return response.data?.message || "Error";
    }
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to send message.");
  }
};

export const getMessages = async(receiverId) => {
  try {
    const response = await axios.get(
      `/api/message/${receiverId}`
    );
    if (response.status !== 200) {
      console.error("status code:", response.status);
      return response.data?.message || "Error";
    }
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to get messages.");
  }
}
export const sendMessagesWithAttachment = async ({ receiverId, message, file }) => {
  try {
    const formData = new FormData();
    formData.append("message", message);
    formData.append("receiverId", receiverId);
    formData.append("file", file); 

    const response = await axios.post(
      "/api/message/send-with-attachment",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      }
    );

    if (response.status !== 201) {
      console.error("Non-200 status code:", response.status);
      return response.data?.message || "Error";
    }
    return response.data;
  } catch (error) {
    console.error("Error details:", error.response || error.message);
    throw new Error(error.response?.data?.message || "Failed to send message.");
  }
};
