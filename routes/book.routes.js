const express = require("express");
const { body, param } = require("express-validator");
const router = express.Router();
const { addBook, getBook, getBooksByUserId } = require("../controllers/book.controller");


const validateAddBook = [
    body("title").notEmpty().withMessage("Book title is required"),
    body("author").notEmpty().withMessage("Author name is required"),
  ];
  
  // Validation middleware for fetching books by userId
  const validateUserId = [
    param("userId").isMongoId().withMessage("Invalid user ID"),
  ];

router.post("/", validateAddBook, addBook);

// Get all books route
router.get("/", getBook);

// Get books by user ID route with validation
router.get("/:userId", validateUserId, getBooksByUserId);
module.exports = router;
