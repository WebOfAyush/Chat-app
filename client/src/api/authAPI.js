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
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to log in.");
  }
};
