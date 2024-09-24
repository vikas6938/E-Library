const Book = require('../models/bookModel');

// Create a new book
exports.createBook = async (req, res) => {
  const { title, author, genre } = req.body;

  if (!title || !author || !genre) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const book = new Book({ title, author, genre });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all books or a specific book by ID
exports.getBooks = async (req, res) => {
  try {
    const books = req.params.id ? await Book.findById(req.params.id) : await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book
exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Borrow a book
exports.borrowBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.available) {
      book.available = false;
      book.borrowedBy = req.user.id;
      await book.save();
      res.status(200).json({ message: 'Book borrowed successfully' });
    } else {
      res.status(400).json({ error: 'Book is already borrowed' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Return a book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book.borrowedBy.toString() === req.user.id.toString()) {
      book.available = true;
      book.borrowedBy = null;
      await book.save();
      res.status(200).json({ message: 'Book returned successfully' });
    } else {
      res.status(400).json({ error: 'You cannot return a book you didn\'t borrow' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
