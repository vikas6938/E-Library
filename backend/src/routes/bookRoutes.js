const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Define routes
router.post('/books', bookController.createBook); // Create a new book
router.get('/books', bookController.getBooks); // Get all books
router.get('/books/:id', bookController.getBooks); // Get a book by ID
router.put('/books/:id', bookController.updateBook); // Update a book by ID
router.delete('/books/:id', bookController.deleteBook); // Delete a book by ID
router.post('/books/:id/borrow', bookController.borrowBook); // Borrow a book
router.post('/books/:id/return', bookController.returnBook); // Return a book

module.exports = router;
