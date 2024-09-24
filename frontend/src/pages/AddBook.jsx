import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../api'; // Import the addBook function from the centralized API

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [image, setImage] = useState(null); // State to hold the image file
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('publicationDate', publicationDate);
    formData.append('image', image); // Append the image file

    // Use the centralized addBook API
    addBook(formData) // Pass formData instead of JSON
      .then(() => {
        alert('Book added successfully');
        navigate('/'); // Navigate to Home page after successful book addition
      })
      .catch((error) => {
        console.error('Error adding book:', error);
        alert('Error adding book. Please try again.');
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-md-6">
        <div className="card shadow p-4">
          <h1 className="text-center mb-4">Add a New Book</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                id="author"
                className="form-control"
                placeholder="Enter author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                id="genre"
                className="form-control"
                placeholder="Enter genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publicationDate" className="form-label">Publication Date</label>
              <input
                type="date"
                id="publicationDate"
                className="form-control"
                value={publicationDate}
                onChange={(e) => setPublicationDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Book Cover Image</label>
              <input
                type="file"
                accept="image/*"
                id="image"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">Add Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
