import express from "express";
import {
  getBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
  createBookWithAuthorValidation,
} from "../controllers/BookController.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/validated-book", createBookWithAuthorValidation);
router.post("/", createBook);
router.patch("/:id", updateBookById);
router.delete("/:id", deleteBookById);

export default router;
