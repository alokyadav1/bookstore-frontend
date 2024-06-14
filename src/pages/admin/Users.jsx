/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import User from '../../components/admin/User';
import UserContext from '../../context/UserContext';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { showToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';
import AdminContext from '../../context/AdminContext';
import FullScreenModal from '../../components/admin/Modal';
import AdminRegisterForm from '../../components/admin/AdminRegisterForm';
import GoogleForm from '../../components/admin/AdminRegisterForm';

function Users() {
    const { user } = useContext(UserContext)
    const { userList } = useContext(AdminContext)
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleEdit = (userID) => {
        console.log('Edit user with ID:', userID);
        // Implement the logic to edit the user details
    };

    const handleRemove = (userID) => {
        // setUsers(users?.filter(user => user.userID !== userID));
    };

    const filteredUsers = userList?.filter(user =>
        (filter === '' || user.role === filter) &&
        (user?.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );



    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAdminRegistration = () => {
        closeModal()
        showToast("Admin added successfully.")
    }

    return (
        <>
            <ToastContainer />
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <AdminRegisterForm onSuccess={handleAdminRegistration}/>
            </FullScreenModal>
            <div className="container mx-auto p-4">
                <div className='flex items-center justify-between mb-4'>
                    <h1 className="text-2xl font-bold">Users</h1>
                    <button
                        className='bg-blue-600 text-white p-2 rounded hover:bg-blue-500'
                        onClick={openModal}>
                        Add Admin
                    </button>
                </div>
                <div className="mb-4 flex justify-between">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        className="border p-2 rounded w-1/2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {filter}
                    <select className='w-1/5 border rounded'
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value=''>All</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUsers?.map(usr => (
                        <User
                            key={usr.userID}
                            user={usr}
                            onEdit={handleEdit}
                            onRemove={handleRemove}
                            isCurrentAdmin={usr?.email == user?.email}
                        />
                    ))}
                </div>

            </div>
            {
                // openModal && <ConfirmModal handleConfirm={handleConfirm} />
            }

        </>
    );
}

export default Users