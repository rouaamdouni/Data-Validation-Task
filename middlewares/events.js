import { eventValidationSchema } from "../models/Event.js";

export const validateEvent = (req, res, next) => {
  const { error } = eventValidationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
