import axios from "axios";

export const getMe = async () => {
  try {
    console.log(`${import.meta.env.VITE_API_ENDPOINT}api/auth/me`);
    const response = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}api/auth/me`
    );
    console.error(response.data);
    if (!response.status || response.status !== 200) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw new Error(error.message || "Something went wrong.");
  }
};
export const signup = async ({
  firstName,
  lastName,
  username,
  email,
  password,
}) => {
  try {
    const fullName = firstName + " " + lastName;
    console.log(fullName);

    const response = await axios.post(
      "/api/auth/signup",
      {
        email,
        username,
        fullName,
        password,
      },
      { 
        withCredentials:true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to create account!");
  }
};
export const login = async({username, password})=>{
  try {
    const res = await axios.post("/api/auth/signin",{
      username,
      password
    },
    { 
      withCredentials:true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error.response?.data || error.message);
    throw error.response?.data || new Error("Failed to create account!");
  }
}