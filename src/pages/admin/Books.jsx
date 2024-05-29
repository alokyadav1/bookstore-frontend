/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Book from '../../components/admin/Book';
import { FaPlus } from 'react-icons/fa6';
import { showToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';

const booksData = [
  {
    "bookID": 271,
    "title": "Critique of Pure Reason",
    "description": "A seminal work in modern philosophy.",
    "aboutBook": null,
    "author": "Immanuel Kant",
    "price": 550.0,
    "isbn": "9780140449471",
    "stock": 20,
    "category": "Philosophy"
  },
  {
    "bookID": 278,
    "title": "I, Robot",
    "description": "A science fiction classic exploring robotics.",
    "aboutBook": null,
    "author": "Isaac Asimov",
    "price": 450.0,
    "isbn": "9780553294385",
    "stock": 20,
    "category": "Sci-Fi"
  },
  {
    "bookID": 319,
    "title": "Treasure Island",
    "description": "A tale of pirates and buried treasure.",
    "aboutBook": null,
    "author": "Robert Louis Stevenson",
    "price": 300.0,
    "isbn": "9780141321008",
    "stock": 20,
    "category": "Adventure"
  },
  {
    "bookID": 321,
    "title": "The Count of Monte Cristo",
    "description": "A swashbuckling adventure novel.",
    "aboutBook": null,
    "author": "Alexandre Dumas",
    "price": 500.0,
    "isbn": "9780140449260",
    "stock": 20,
    "category": "Adventure"
  },
  {
    "bookID": 334,
    "title": "Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future",
    "description": "The biography of the tech entrepreneur.",
    "aboutBook": null,
    "author": "Elon Musk",
    "price": 550.0,
    "isbn": "9780062301239",
    "stock": 20,
    "category": "Biography"
  },
  {
    "bookID": 336,
    "title": "The Last Lion: Winston Spencer Churchill",
    "description": "The life of Britain's wartime leader.",
    "aboutBook": null,
    "author": "Winston Churchill",
    "price": 600.0,
    "isbn": "9780141981255",
    "stock": 20,
    "category": "Biography"
  },
  {
    "bookID": 363,
    "title": "Strange Case of Dr Jekyll and Mr Hyde",
    "description": "A novella about the duality of human nature.",
    "aboutBook": null,
    "author": "Robert Louis Stevenson",
    "price": 300.0,
    "isbn": "9780486266886",
    "stock": 20,
    "category": "Horror"
  },
  {
    "bookID": 388,
    "title": "The Notebook",
    "description": "A modern romance novel.",
    "aboutBook": null,
    "author": "Nicholas Sparks",
    "price": 500.0,
    "isbn": "9780446605236",
    "stock": 20,
    "category": "Romance"
  }
]
function Books() {
  const [filter, setFilter] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = booksData.filter(book =>
    (filter === '' || book.category.includes(filter)) &&
    book.price >= priceRange[0] && book.price <= priceRange[1] &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) || book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (bookID) => {
    showToast("Book Edited successfully")
  }
  const handleRemove = (bookID) => {
    showToast("Book Removed successfully")
  }

  return (
    <>
      <ToastContainer />
      <div className="container mx-auto p-4">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-4">Books</h1>
          <div className="flex items-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <FaPlus />
            <button className="focus:outline-none">Add Book</button>
          </div>
        </div>
        <div className="mb-4 flex space-x-4">
          <input
            type="text"
            placeholder="Search by title or author"
            className="border p-2 rounded flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="border p-2 rounded "
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Adventure">Adventure</option>
            <option value="Biography">Biography</option>
            <option value="Novel">Novel</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Horror">Horror</option>
          </select>
          <div className="flex items-center flex-grow">
            <span>Max Price:</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              className="mx-2 flex-grow"
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            />
            <span>&#8377;{priceRange[1]}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.map(book => (
            <Book key={book.bookID} book={book} onEdit={handleEdit} onRemove={handleRemove} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Books