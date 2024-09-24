import axios from 'axios';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions

// User Authentication APIs
export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

export const registerUser = (username, email, password) => {
  return api.post('/auth/register', { username, email, password });
};

// export const getUserById = (id) => {
//   return api.get(`/users/${id}`);
// };

// Book APIs
export const getBooks = () => {
  return api.get('/books');
};

export const getBookDetails = (id) => {
  return api.get(`/books/${id}`);
};

export const addBook = (bookData) => {
  return api.post('/books', bookData);
};

export const borrowBook = (id) => {
  return api.post(`/books/${id}/borrow`);
};

export const returnBook = (id) => {
  return api.post(`/books/${id}/return`);
};

export const updateBook = (id, bookData) => api.put(`/books/${id}`, bookData); // Update book by ID
export const deleteBook = (id) => api.delete(`/books/${id}`); // Delete book by ID

// Export default Axios instance to use if needed
export default api;
