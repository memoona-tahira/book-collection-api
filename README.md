# Book Collection API

A RESTful API for managing a personal book collection.

## API Design

### Resource Modeling

This API represents a personal book collection with the following schema:

- **Book**
    - `_id`: Unique identifier (MongoDB ObjectId)
    - `title`: String, required
    - `author`: String, required
    - `year`: Number
    - `genre`: String
    - `rating`: Number (1-5)
    - `isRead`: Boolean
    - `createdAt`: Date of creation
    - `updatedAt`: Date of last update

### Resource URIs

| Resource | URI |
|----------|-----|
| Collection of books | `/api/v1/books` |
| Specific book | `/api/v1/books/:id` |

### HTTP Methods

| Method | URI | Action |
|--------|-----|--------|
| GET | `/api/v1/books` | Retrieve all books |
| GET | `/api/v1/books/:id` | Retrieve a specific book |
| POST | `/api/v1/books` | Add a new book |
| PUT | `/api/v1/books/:id` | Update a specific book |
| DELETE | `/api/v1/books/:id` | Remove a specific book |

### Resource Representations

Book JSON:

```json
{
  "_id": "60d21b4667d0d8992e610c85",
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "year": 1925,
  "genre": "Classic",
  "rating": 4,
  "isRead": true,
  "createdAt": "2023-03-15T14:30:20.123Z",
  "updatedAt": "2023-03-15T14:30:20.123Z"
}