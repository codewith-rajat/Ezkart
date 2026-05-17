import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, password, username, email, confirmPassword } = req.body
        console.log("Signup attempt with email:", email);
        
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({
                message: "User already exists",
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
        });
        
        console.log("User created successfully:", user._id);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        console.error("Signup error:", error.message);
        res.status(500).json({message: error.message,});
    }
}

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with email:", email);
    
    const user = await User.findOne({email});
    console.log("User found:", user ? "Yes" : "No");

    if (!user) {
      console.log("User not found in database");
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Password does not match");
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};