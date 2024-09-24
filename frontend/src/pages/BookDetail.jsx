import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetails } from '../api'; // Import the API function to fetch book details

const BookDetail = () => {
  const { id } = useParams(); // Get book ID from the URL
  const [book, setBook] = useState(null); // State to store the book data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch book details when the component mounts
    getBookDetails(id)
      .then((response) => {
        setBook(response.data); // Set the book data
        setLoading(false); // Set loading to false after fetching the data
      })
      .catch((error) => {
        console.error('Error fetching book details:', error);
        setError('Error fetching book details');
        setLoading(false); // Set loading to false if there's an error
      });
  }, [id]); // Fetch data when the ID changes

  // Display loading message if still fetching
  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  // Display error message if there's an error
  if (error) {
    return <div className="container mt-5">{error}</div>;
  }

  // Display the book details
  return (
    <div className="container mt-5">
      {book && (
        <div className="card shadow-sm">
          <div className="row no-gutters">
            <div className="col-md-4">
              <img
                src={`http://localhost:5000${book.imageUrl}`} // Display the book image
                className="card-img"
                alt={`${book.title} cover`}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title text-primary">{book.title}</h2>
                <p className="card-text">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="card-text">
                  <strong>Genre:</strong> {book.genre}
                </p>
                <p className="card-text">
                  <strong>Published:</strong> {book.publicationDate}
                </p>
                <p className="card-text">
                  <strong>Description:</strong> {book.description || 'No description available'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetail;
