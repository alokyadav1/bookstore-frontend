/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import FullScreenModal from './Modal';
import BookForm from './BookForm';
import DeleteModalContent from './DeleteModalContent';
import { showToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';

const Book = ({ book, onRemove, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
        setShowDeleteModal(false)
    };

    const handleRemove = (status) => {
        closeModal()
        setShowDeleteModal(false)
        if(status == 200) {
            showToast("Book deleted Successfully")
        } else {
            showToast("Failed to delete book")
        }
    }

    const handleEditBook = (status) => {
        closeModal()
        if (status == 200) {
            showToast("Book updated successfully")
        } else {
            showToast("Failed to update book")
        }
    }

    

    const modalData = {
        title: "Delete Book",
        type: 'book',
        itemName: book.title,
        bookId: book.bookID
    }

    return (
        <>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                {
                    showDeleteModal ? (
                        <DeleteModalContent modal={modalData} onConfirm={handleRemove} onClose={closeModal} />
                    ) : (
                        <BookForm
                            isAddForm={false}
                            data={book}
                            title={'Edit Book'}
                            handleEditBook={handleEditBook}
                        />
                    )
                }
            </FullScreenModal>
            <div className="relative border rounded-lg p-4 bg-white shadow-md text-center">
                <div className=" w-32 h-48 mb-4 bg-gray-200 shadow-lg rounded overflow-hidden mx-auto">
                    <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.title} cover`} className="w-full h-48 object-cover rounded mb-4" />
                </div>
                <h2 className="text-xl font-bold mb-2">{book.title}</h2>
                <p className="text-gray-700 mb-1"><strong>Author:</strong> {book.author}</p>
                <p className="text-gray-700 mb-1"><strong>Price:</strong> &#8377;{book.price.toFixed(2)}</p>
                <p className="text-gray-700 mb-1"><strong>Stock:</strong> {book.stock}</p>
                <p className="text-gray-700"><strong>Category:</strong> {book.category}</p>
                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-full transition-transform transform hover:scale-110"
                        onClick={openModal}
                    >
                        <FaEdit />
                    </button>
                    <button
                        className="bg-red-500 text-white p-2 rounded-full  transition-transform transform hover:scale-110"
                        onClick={() => {
                            setShowDeleteModal(true)
                            openModal()
                        }}
                    >
                        <FaTrashAlt />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Book;
