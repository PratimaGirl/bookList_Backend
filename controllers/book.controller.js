const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
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

module.exports = {
  addBook,
  getBook,
  getBooksByUserId,
};
