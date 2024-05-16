/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';

const Filter = ({ categories, authors }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedAuthors, setSelectedAuthors] = useState([]);
  const [publicationDate, setPublicationDate] = useState('');

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleAuthor = (author) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
  };

  return (
    <div className="p-4 border rounded-md shadow-lg">
      <h2 className="text-xl font-bold mb-4">Filter Books</h2>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        {categories.map((category) => (
          <label key={category} className="block mb-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="mr-2"
            />
            {category}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
            className="w-20 p-1 border rounded"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
            className="w-20 p-1 border rounded"
            min="0"
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Ratings</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="block mb-2">
            <input
              type="radio"
              name="rating"
              value={rating}
              checked={selectedRating === rating}
              onChange={() => setSelectedRating(rating)}
              className="mr-2"
            />
            {rating} Stars & Up
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Authors</h3>
        {authors.map((author) => (
          <label key={author} className="block mb-2">
            <input
              type="checkbox"
              checked={selectedAuthors.includes(author)}
              onChange={() => toggleAuthor(author)}
              className="mr-2"
            />
            {author}
          </label>
        ))}
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Publication Date</h3>
        <input
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className="w-full p-1 border rounded"
        />
      </div>

      <button
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => {
          // Implement filter action here
          console.log('Filters:', {
            selectedCategories,
            priceRange,
            selectedRating,
            selectedAuthors,
            publicationDate,
          });
        }}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
