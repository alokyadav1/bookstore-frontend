/* eslint-disable react/prop-types */

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import FullScreenModal from "./Modal";
import { useState } from "react";
import DeleteModalContent from "./DeleteModalContent";
import { showToast } from "../../utils/toast";

/* eslint-disable no-unused-vars */
const User = ({ user, onEdit, onRemove, isCurrentAdmin }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };

    const handleDelete = () => {
        closeModal()
        showToast("User Deleted Successfully")
    }
    const modalData = {
        title: "Delete User",
        type: 'user',
        itemName: user.email
    }
    return (
        <>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <DeleteModalContent modal={modalData} onClose={closeModal} onConfirm={handleDelete} />
            </FullScreenModal>
            <div className={`border rounded-lg p-4 shadow-md relative flex flex-col items-center ${isCurrentAdmin ? 'bg-blue-200' : user.role === 'ADMIN' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                <div className="absolute top-2 right-2 flex space-x-2">
                    <button
                        className="bg-blue-500 text-white p-2 rounded-full"
                        onClick={() => onEdit(user.userID)}
                    >
                        <FaEdit />
                    </button>
                    {
                        !isCurrentAdmin && (
                            <button
                                className="bg-red-500 text-white p-2 rounded-full"
                                onClick={openModal}
                            >
                                <FaTrashAlt />
                            </button>
                        )
                    }
                </div>
                {user.role === 'ADMIN' && (
                    <div className={`absolute top-2 left-2 ${isCurrentAdmin ? 'bg-blue-700' : 'bg-red-500'} text-white px-2 py-1 rounded text-xs`}>
                        {isCurrentAdmin ? 'You' : 'Admin'}
                    </div>
                )}
                <h2 className="text-xl font-bold mb-2 text-center">{user.username}</h2>
                <p className="text-gray-700 mb-1 text-center"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-700 mb-1 text-center"><strong>Mobile Number:</strong> {user.mobileNumber || 'N/A'}</p>
                <p className="text-gray-700 mb-1 text-center"><strong>First Name:</strong> {user.firstName || 'N/A'}</p>
                <p className="text-gray-700 text-center"><strong>Last Name:</strong> {user.lastName || 'N/A'}</p>
            </div>
        </>
    );
};
export default User;