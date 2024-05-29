/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Book = ({ book, onEdit, onRemove }) => {

    return (
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
                    onClick={() => onEdit(book.bookID)}
                >
                    <FaEdit />
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded-full  transition-transform transform hover:scale-110"
                    onClick={() => onRemove(book.bookID)}
                >
                    <FaTrashAlt />
                </button>
            </div>
        </div>
    );
};

export default Book;
