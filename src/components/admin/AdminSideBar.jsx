/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import UserContext from '../../context/UserContext';
import { showToast } from '../../utils/toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';

function AdminSideBar() {
    const navigate = useNavigate()
    const {user,dispatchUser} = useContext(UserContext)
    const handleLogout = () => {
        dispatchUser({
            type: "LOGOUT"
        })
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");
        navigate("/admin/login")
        showToast("Handle Logout")

    }
    return (
        <aside className='flex flex-col justify-between py-2 min-h-screen min-w-64 space-y-2'>
            <div className='border bg-zinc-600 text-white p-2 py-5 rounded-md shadow-md flex items-center gap-x-2'>
                <FaCircleUser className='text-2xl' />
                <div>
                    <p className='text-sm opacity-80'>Welcome, </p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <ul id='admin-sidebar' className='border flex-grow bg-blue-600 text-white p-2 rounded-md shadow-md space-y-1'>
                <li className='rounded-md'>
                    <NavLink to="/admin" className="block w-full p-2 rounded-md hover:bg-sky-500 " end>DashBoard</NavLink>
                </li>
                <li className='rounded-md'>
                    <NavLink to="/admin/users" className="block w-full p-2 rounded-md hover:bg-sky-500">Users</NavLink>
                </li>
                <li className='rounded-md'>
                    <NavLink to="/admin/books" className="block w-full p-2 rounded-md hover:bg-sky-500">Books</NavLink>
                </li>
                <li className='rounded-md'>
                    <NavLink to="/admin/orders" className="block w-full p-2 rounded-md hover:bg-sky-500">Orders</NavLink>
                </li>
                <li className='rounded-md'>
                    <NavLink to="/admin/coupons" className="block w-full p-2 rounded-md hover:bg-sky-500">Coupons</NavLink>
                </li>
            </ul>
            <div className='flex items-center gap-x-2 border bg-red-600 text-white px-2 rounded-md shadow-md '>
                <button className='py-3 flex items-center gap-x-2' onClick={handleLogout}>
                    <BiLogOutCircle className='text-xl' />
                    Logout
                </button>
            </div>
        </aside>
    )
}

export default AdminSideBar