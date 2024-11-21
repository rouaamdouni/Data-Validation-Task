import express from "express";
import { validateEvent } from "../middlewares/events.js";
import { createEvent, getAllEvents } from "../controllers/EventController.js";
const router = express.Router();

router.post("/events", validateEvent, createEvent);
router.get("/events", getAllEvents);

export default router;
