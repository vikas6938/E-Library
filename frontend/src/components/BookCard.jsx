import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteBook } from '../api'; // Import delete API function

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  // Delete Book function
  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this book?');
    if (confirmDelete) {
      deleteBook(book._id)
        .then(() => {
          alert('Book deleted successfully');
          window.location.reload(); // Reload the page after deletion
        })
        .catch((error) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book');
        });
    }
  };

  return (
    <div className="card mb-4 shadow-sm" style={{ maxWidth: '350px' }}>
      <div style={{ height: '250px', overflow: 'hidden' }}>
        <img
          src={`http://localhost:5000${book.imageUrl}`} // Dynamic image URL
          className="card-img-top img-fluid"
          alt={`${book.title} cover`} // Alt text for accessibility
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} // Ensures the image covers the entire space
        />
      </div>
      <div className="card-body">
        <h5 className="card-title text-primary">{book.title}</h5>
        <p className="card-text"><strong>Author:</strong> {book.author}</p>
        <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
        <p className="card-text"><strong>Published:</strong> {book.publicationDate}</p>
        <div className="d-flex justify-content-between mt-4">
          <Link to={`/books/${book._id}`} className="btn btn-info btn-sm">View Details</Link>
          <Link to={`/edit-book/${book._id}`} className="btn btn-warning btn-sm">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
