import React from 'react';
import BookList from '../components/BookList';
// import libraryImage from '../assets/library-image.jpg'; 

const Home = () => {
  return (
    <div className="container mt-5">
      {/* Image Section */}
      <div className="text-center">
        {/* <img 
          src={libraryImage} 
          alt="Library" 
          className="img-fluid mb-4" 
          style={{ maxHeight: '400px', objectFit: 'cover', width: '100%' }}
        /> */}
      </div>

      <header className="text-center mb-4">
        <h1 className="display-4">Welcome to the E-Library</h1>
        <p className="lead">Browse through a wide selection of books and find your next read!</p>
        <hr className="my-4" />
      </header>

      {/* Book List Section */}
      <section className="book-list">
        <h2 className="text-center mb-4">Available Books</h2>
        <div className="row">
          <BookList />
        </div>
      </section>
    </div>
  );
};

export default Home;
