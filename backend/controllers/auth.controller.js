import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already taken.",
      });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "email already taken.",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      const { password, ...userWithoutPassword } = newUser._doc;
      return res.status(201).json({ user: userWithoutPassword });
    }
  } catch (error) {
    console.error(`Error in signup controller: ${error}`);

    return res
      .status(500)
      .json({ success: false, message: "Signup failed", error: error.message });
  }
};
export const signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }
    generateTokenAndSetCookie(user._id, res);
    const { password: _, ...userWithoutPassword } = user._doc;
    return res.status(200).json({ userWithoutPassword });
  } catch (error) {
    console.error(`Error in signin controller: ${error}`);

    return res
      .status(500)
      .json({ success: false, message: "SignIn failed", error: error.message });
  }
};
export const signout = async(req,res) =>{
  try {
    res.cookie('jwt', "", {
      maxAge : 0
    })
    res.status(200).json({
      message: "logout successful"
    })
  } catch (error) {
    console.error(`Error in signout controller: ${error}`);

    return res
      .status(500)
      .json({ success: false, message: "Signout failed", error: error.message });
  }
}
