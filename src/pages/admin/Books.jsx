/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Book from '../../components/admin/Book';
import { FaPlus } from 'react-icons/fa6';
import { showToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import Modal from '../../components/admin/Modal';
import AddModal from '../../components/admin/Modal';
import FullScreenModal from '../../components/admin/Modal';
import BookForm from '../../components/admin/BookForm';
import Pagination from '../../components/Pagination';

function Books() {
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState(null)
  const [booksData, setBooksData] = useState([]);
  const { books } = useContext(AdminContext)

  const filteredBooks = books?.filter(book =>
    (category === '' || book.category.includes(category)) &&
    book.price >= priceRange[0] && book.price <= priceRange[1] &&
    (book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEdit = (status) => {
    if (status == 200) {
      showToast("Book updated successfully")
    } else {
      showToast("Failed to update book")
    }
  }

  const handleRemove = (bookID) => {
    showToast("Book Removed successfully")
  }

  const handleCancel = () => {

  }

  const handleAddBook = (status) => {
    closeModal()
    if (status == 200) {
      showToast("Book added successfully")
    } else {
      showToast("Failed to add book")
    }
  }


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);



  return (
    <>
      <ToastContainer />

      <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
        <BookForm isAddForm={true} title={'Add Book'} handleAddBook={handleAddBook} />
      </FullScreenModal>

      <div className=" mx-auto p-2">
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-bold mb-4">Books</h1>
          <div className="flex items-center gap-x-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
            <button className="flex items-center gap-x-2 focus:outline-none" onClick={openModal}>
              <FaPlus />
              <span>Add Book</span>
            </button>
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
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
            <option value="History">History</option>
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
        <div>
          <Pagination
            books={books}
            handleEdit={handleEdit}
            handleRemove={handleRemove}
            filter={{category,searchQuery,priceRange}}
          />
        </div>
      </div>
    </>
  );
}

export default Books
