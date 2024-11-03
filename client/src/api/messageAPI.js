export const sendMessage = async({receiverId, message}) => {
    try {
      const response = await axios.post(
        "/api/message/send",
        {
          message,
          receiverId
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message,
            receiverId
          }),
        }
      );
      if (response.status !== 200) {
        return error.response?.data?.message;
      }
      return await response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update user.");
    }
  };