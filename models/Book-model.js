import mongoose from "mongoose";

const Book = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
      validate: {
        validator: async function (authorId) {
          // Rechercher si cet auteur a écrit d'autres livres
          const books = await mongoose.model("Book").find({ author: authorId });
          return books.length > 0; // Valide seulement si l'auteur a déjà des livres
        },
        message: "L'auteur doit avoir écrit au moins un autre livre avant.",
      },
    },
    price: {
      type: Number,
      required: true,
    },
    publicationDate: {
      type: Date,
    },
    categories: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Category",
    },
    pages: {
      type: Number,
    },
    publisher: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    stockQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },
    languages: {
      type: [String],
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
    },
    isDigital: {
      type: Boolean,
    },
    copiesSold: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("BookInstance", Book);
