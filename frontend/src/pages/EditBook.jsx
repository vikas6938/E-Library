import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookDetails, updateBook } from '../api'; // Import API functions

const EditBook = () => {
  const { id } = useParams(); // Get book ID from URL params
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [image, setImage] = useState(null); // For updating the image file

  useEffect(() => {
    // Fetch book details and pre-fill the form
    getBookDetails(id).then((response) => {
      const book = response.data;
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setPublicationDate(book.publicationDate);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('genre', genre);
    formData.append('publicationDate', publicationDate);
    if (image) {
      formData.append('image', image); // Append the image file if updated
    }

    // Update the book
    updateBook(id, formData)
      .then(() => {
        alert('Book updated successfully');
        navigate('/'); // Navigate back to Home after successful update
      })
      .catch((error) => {
        console.error('Error updating book:', error);
        alert('Error updating book. Please try again.');
      });
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">Edit Book</h1>
      <form onSubmit={handleSubmit} className="mt-4" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />
        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="border rounded p-2 w-full mb-4"
        />

        {/* Optionally upload a new image */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded p-2 w-full mb-4"
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
