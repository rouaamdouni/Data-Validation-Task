import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../controllers/AuthController.js";
import signupValidationSchema from "../models/User.js";

export const loggedMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("token: ", token);
    const decodedToken = jwt.verify(token, JWT_SECRET);
    const userId = decodedToken.id;
    try {
      const user = await User.findOne({ _id: userId });
      if (user) {
        req.auth = {
          userId: userId,
          role: user.role,
        };
        next();
      } else {
        res.status(401).json({ error: "user doesn't exist" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.auth.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "no access to this route" });
    }
  } catch (e) {
    res.status(401).json({ error: error.message });
  }
};

export const validateSignup = (req, res, next) => {
  const { error } = signupValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
