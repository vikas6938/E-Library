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
      <img
        src={book.imageUrl || 'https://via.placeholder.com/150'} // Placeholder image if no image is provided
        className="card-img-top"
        alt={`${book.title} cover`}
      />
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
