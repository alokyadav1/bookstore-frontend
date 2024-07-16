/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { FaTrash } from 'react-icons/fa'
import axios from "../../Axios/axios"

function DeleteModalContent({ onClose, onConfirm, modal }) {
    const currentAdmin = JSON.parse(localStorage.getItem("admin"))

    const handleDeleteBook = async(bookID) => {
        const res = await axios.delete(`/api/book/delete/${bookID}`,{
            headers: {
                Authorization: `Bearer ${currentAdmin?.token}`
            }
        })

        onConfirm(res.status)
    }

    console.log("modal", modal);
    return (
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center text-red-600 flex items-center justify-center">
                <FaTrash className="mr-2" /> {modal?.title}
            </h2>
            <p className="text-center mb-6">Are you sure you want to delete the {modal?.type} <br />
                <strong> &quot;{modal?.itemName}&quot;</strong>
            </p>
            <div className="flex justify-between">
                <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
                    onClick={() => handleDeleteBook(modal?.bookId)}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}

export default DeleteModalContent