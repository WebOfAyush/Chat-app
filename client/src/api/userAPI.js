import axios from "axios";
export const updateUserProfile = async ({
  fullName,
  email,
  currentPassword,
  newPassword,
  bio,
  link,
}) => {
  try {
    const response = await axios.post(
      "/api/user/update",
      {
        fullName,
        email,
        currentPassword,
        newPassword,
        bio,
        link,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status !== 200) {
      return error.response?.data?.message;
    }
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to update user.");
  }
};
