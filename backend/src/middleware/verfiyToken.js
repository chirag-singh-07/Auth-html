import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/UserModel.js";

dotenv.config();

export const protect = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    req.user = await User.findById(decoded.userId).select("-password");

    next();
  } catch (error) {
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
