/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import User from '../../components/admin/User';
import UserContext from '../../context/UserContext';
import { ConfirmModal } from '../../components/admin/ConfirmModal';
import { showToast } from '../../utils/toast';
import { ToastContainer } from 'react-toastify';
import AdminContext from '../../context/AdminContext';

function Users() {
    const { user } = useContext(UserContext)
    const { userList } = useContext(AdminContext)
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState('')
    const [openModal, setOpenModal] = useState(false)

    const handleEdit = (userID) => {
        console.log('Edit user with ID:', userID);
        setOpenModal(true)
        // Implement the logic to edit the user details
    };

    const handleRemove = (userID) => {
        // setUsers(users?.filter(user => user.userID !== userID));
    };

    const handleConfirm = (confirm) => {
        showToast(`User clicked ${confirm}`)
        console.log("confirm", confirm);
        setOpenModal(false)
    }

    const filteredUsers = userList?.filter(user =>
        (filter === '' || user.role === filter) &&
        (user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <>
            <ToastContainer />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
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
                openModal && <ConfirmModal handleConfirm={handleConfirm} />
            }

        </>
    );
}

export default Users