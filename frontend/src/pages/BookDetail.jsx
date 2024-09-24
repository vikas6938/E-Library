import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`/api/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  const handleBorrow = () => {
    axios.post(`/api/books/${id}/borrow`)
      .then(() => alert('Book borrowed successfully'))
      .catch(error => console.error('Error borrowing book:', error));
  };

  const handleReturn = () => {
    axios.post(`/api/books/${id}/return`)
      .then(() => alert('Book returned successfully'))
      .catch(error => console.error('Error returning book:', error));
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Published: {book.publicationDate}</p>
      {book.available ? (
        <button onClick={handleBorrow} className="bg-blue-500 text-white px-4 py-2 rounded">Borrow</button>
      ) : (
        <button onClick={handleReturn} className="bg-red-500 text-white px-4 py-2 rounded">Return</button>
      )}
    </div>
  );
};

export default BookDetail;
