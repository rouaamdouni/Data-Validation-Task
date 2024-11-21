import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "ISAMM_SECRET";

export const signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      ...req.body, //spread operator for the role
      // login: req.body.login,
      password: hashedPassword,
    });
    await user.save();
    // user.password = undefined;
    const { password, ...newUser } = user.toObject(); //remove password from response using rest operator
    res.status(200).json({
      msg: "user created",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ login: req.body.login });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "wrong password" });
    }
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      //process.env.JWT_SECRET
      //
      expiresIn: "1d",
    });
    res.status(200).json({
      msg: "success",
      token: token,
    });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
