/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { FaBook, FaUser, FaTag, FaDollarSign, FaHashtag, FaBoxes } from 'react-icons/fa';

const BookForm = ({ data, isAddForm, title }) => {
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
    // Add your form submission logic here, such as an API call
    console.log(formData);
  };

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
            <option value="Self-Help">Self-Help</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Biography">Biography</option>
            <option value="Science">Science</option>
            <option value="Fantasy">Fantasy</option>
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
