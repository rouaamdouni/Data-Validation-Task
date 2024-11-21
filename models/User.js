import mongoose from "mongoose";
import Joi from "joi";

export const signupValidationSchema = Joi.object({
  login: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

export default mongoose.model("User", UserSchema);
