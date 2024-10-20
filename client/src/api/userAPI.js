import axios from "axios";
export const updateUserProfile = async ({
  fullName,
  email,
  currentPassword,
  newPassword,
  bio,
  link,
  profileImg
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
        profileImg
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
export const updateProfileImg = async ({
  profileImg
}) => {
  try {
    const response = await axios.post(
      "/api/user/update",
      {
        profileImg
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profileImg
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
export const searchUser = async (query) =>{
    try {
      const response = await axios.get(`/api/user/search?query=${query}`)
      if (response.status !== 200) {
        return error.response?.data?.message;
      }
      return await response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to search user.");
    }
}