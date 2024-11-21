import Book from "../models/Book.js";
import BookInstance from "../models/Book-model.js";
export const getBooks = async (req, res) => {
  const books = await Book.find();
  res.json({ data: books });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)
    .populate("author")
    .populate("category");
  res.json({ data: book });
};

export const createBook = async (req, res) => {
  const newBook = new Book(req.body);
  const savedBook = await newBook.save();
  return res.json({ data: savedBook });
};

export const updateBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (req.body.author) {
    book.author = req.body.author;
  }

  if (req.body.categories) {
    book.categories = book.categories.concat(req.body.categories);
  }

  await book.save();
  return res.json({ data: book });
};

export const deleteBookById = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ msg: "book deleted" });
};

export const createBookWithAuthorValidation = async (req, res) => {
  try {
    const { author } = req.body;

    const existingBooks = await BookInstance.find({ author });
    if (existingBooks.length === 0) {
      return res.status(400).json({
        error: "L'auteur doit avoir écrit au moins un autre livre avant.",
      });
    }

    const newBook = new BookInstance(req.body);
    const savedBook = await newBook.save();

    return res.status(201).json({ data: savedBook });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
