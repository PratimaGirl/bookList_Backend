const { validationResult } = require("express-validator");
const Book = require("../db/models/Book");

const getBook = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getBooksByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const books = await Book.find({ userId });
    res.json(books);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const addBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { title, author, userId } = req.body; // Include userId in the request body
    const book = new Book({ title, author, userId }); // Add userId when creating the book
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const updateBook = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { bookId } = req.params;
    const { title, author } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { title, author },
      { new: true, runValidators: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  addBook,
  getBook,
  getBooksByUserId,
  updateBook,
  deleteBook,
};
