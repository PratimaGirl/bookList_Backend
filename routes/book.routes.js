const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const {
  addBook,
  getBook,
  getBooksByUserId,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const validateAddBook = [
  body("title").notEmpty().withMessage("Book title is required"),
  body("author").notEmpty().withMessage("Author name is required"),
];

const validateUpdateBook = [
  param("bookId").isMongoId().withMessage("Invalid book ID"),
  body("title").optional().notEmpty().withMessage("Book title cannot be empty"),
  body("author").optional().notEmpty().withMessage("Author name cannot be empty"),
];

const validateUserId = [
  param("userId").isMongoId().withMessage("Invalid user ID"),
];

const validateBookId = [
  param("bookId").isMongoId().withMessage("Invalid book ID"),
];

router.post("/", validateAddBook, addBook);
router.get("/", getBook);
router.get("/:userId", validateUserId, getBooksByUserId);
router.put("/:bookId", validateUpdateBook, updateBook);
router.delete("/:bookId", validateBookId, deleteBook);

module.exports = router;