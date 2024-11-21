import Joi from "joi";
import mongoose from "mongoose";

export const eventValidationSchema = Joi.object({
  title: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required(),
});

const Event = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", Event);
