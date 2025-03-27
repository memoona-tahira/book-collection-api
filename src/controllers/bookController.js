const Book = require('../models/books');

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = async (req, res) => {
  try {
    // Build query
    let query = {};

    // Filter by genre if provided
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    // Filter by author if provided
    if (req.query.author) {
      query.author = { $regex: req.query.author, $options: 'i' }; // Case-insensitive search
    }

    // Filter by minimum rating
    if (req.query.minRating) {
      query.rating = { $gte: parseInt(req.query.minRating) };
    }

    // Filter by read status
    if (req.query.isRead) {
      query.isRead = req.query.isRead === 'true';
    }

    // Add pagination (as in previous example)
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const total = await Book.countDocuments(query);
    const books = await Book.find(query).limit(limit).skip(startIndex);

    res.status(200).json({
      success: true,
      count: books.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      data: books
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    // Check if error is a casting error (invalid ObjectId)
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Create new book
// @route   POST /api/v1/books
// @access  Public
exports.createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      data: book
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Public
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: book
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);

      return res.status(400).json({
        success: false,
        error: messages
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Public
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({
        success: false,
        error: 'Book not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid book ID format'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};