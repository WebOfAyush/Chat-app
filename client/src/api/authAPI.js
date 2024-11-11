import axios from "axios";

export const signup = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    const fullName = `${firstName} ${lastName}`;
    const response = await axios.post(
      "/api/auth/signup",
      {
        email,
        username,
        fullName,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to create account."
    );
  }
};
export const login = async ({ username, password }) => {
  try {
    const response = await axios.post(
      "/api/auth/signin",
      {
        username,
        password,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.error("status code:", response.status);
      return response.data?.message || "Error";
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to log in.";
    throw new Error(errorMessage);
  }
};
export const logout = async () => {
  try {
    const response = await axios.post(
      "/api/auth/signout",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.error("status code:", response.status);
      return response.data?.message || "Error";
    }
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Failed to log out.";
    throw new Error(errorMessage);
  }
};
