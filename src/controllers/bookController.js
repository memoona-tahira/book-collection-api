// Dummy data for testing (we'll replace with MongoDB later)
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925,
    genre: 'Classic',
    rating: 4,
    isRead: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960,
    genre: 'Classic',
    rating: 5,
    isRead: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// @desc    Get all books
// @route   GET /api/v1/books
// @access  Public
exports.getBooks = (req, res) => {
  res.status(200).json({
    success: true,
    count: books.length,
    data: books
  });
};

// @desc    Get single book
// @route   GET /api/v1/books/:id
// @access  Public
exports.getBook = (req, res) => {
  const book = books.find(b => b.id === req.params.id);

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
};

// @desc    Create new book
// @route   POST /api/v1/books
// @access  Public
exports.createBook = (req, res) => {
  const newBook = {
    id: (books.length + 1).toString(),
    ...req.body,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  books.push(newBook);

  res.status(201).json({
    success: true,
    data: newBook
  });
};

// @desc    Update book
// @route   PUT /api/v1/books/:id
// @access  Public
exports.updateBook = (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  books[index] = {
    ...books[index],
    ...req.body,
    updatedAt: new Date()
  };

  res.status(200).json({
    success: true,
    data: books[index]
  });
};

// @desc    Delete book
// @route   DELETE /api/v1/books/:id
// @access  Public
exports.deleteBook = (req, res) => {
  const index = books.findIndex(b => b.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Book not found'
    });
  }

  books.splice(index, 1);

  res.status(200).json({
    success: true,
    data: {}
  });
};