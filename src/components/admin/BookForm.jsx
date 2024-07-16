/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaBook, FaUser, FaTag, FaDollarSign, FaHashtag, FaBoxes } from 'react-icons/fa';
import axios from "../../Axios/axios"

const BookForm = ({ data, isAddForm, title, handleEditBook, handleAddBook }) => {
  const currentUser = JSON.parse(localStorage.getItem("admin"))
  console.log("data", data);
  const [formData, setFormData] = useState(data || {
    title: '',
    description: '',
    author: '',
    price: '',
    isbn: '',
    stock: '',
    category: 'Self-Help',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddForm) {
      addBook(formData)
    } else {
      editBook(formData)
    }
    console.log(formData);
  };

  const editBook = async (book) => {
    try {
      const res = await axios.patch(`/api/book/update/${data.bookID}`, book, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })
      console.log("book edit red:", res.data);
      handleEditBook(res.status)
    } catch (error) {
      console.log(error);
      handleEditBook(500)
    }
  }

  const addBook = async (book) => {
    try {
      const res = await axios.post("/api/book/add", book, {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })

      handleAddBook(res.status)
    } catch (error) {
      console.log(error);
      handleAddBook(500)
    }


  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaBook className="mr-3 text-gray-500" />
          <input
            type="text"
            name="title"
            placeholder="Book Title"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaUser className="mr-3 text-gray-500" />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaTag className="mr-3 text-gray-500" />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaDollarSign className="mr-3 text-gray-500" />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaHashtag className="mr-3 text-gray-500" />
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaBoxes className="mr-3 text-gray-500" />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.stock}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center border-b border-gray-300 py-2">
          <FaTag className="mr-3 text-gray-500" />
          <select
            name="category"
            className="w-full py-1 px-2 focus:outline-none"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Philosophy">Philosophy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Mystery">Mystery</option>
            <option value="Adventure">Adventure</option>
            <option value="Biography">Biography</option>
            <option value="Novel">Novel</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
            <option value="Romance">Romance</option>
            <option value="History">History</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          {isAddForm ? 'Add Book' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default BookForm;
