import Event from "../models/Event.js";

// Controller to create an event
export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(201).json({ data: savedEvent });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ data: events });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
