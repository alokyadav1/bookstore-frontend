/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import UserContext from '../../context/UserContext';
import { showToast } from '../../utils/toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from 'react-icons/bi';
import { RiCloseLargeFill } from 'react-icons/ri';

function AdminSideBar({ handleMenu }) {
    const navigate = useNavigate()
    const { user, dispatchUser } = useContext(UserContext)
    const handleLogout = () => {
        dispatchUser({
            type: "LOGOUT"
        })
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");
        navigate("/admin/login")

    }

    const handlePropogation = (e) => {
        e.stopPropagation()
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-60 overscroll-none md:static md:bg-inherit' onClick={handleMenu}>
            <aside className='relative rounded flex flex-col justify-between md:py-2 min-h-screen w-fit min-w-64' onClick={handlePropogation}>
                <div className='md:border bg-zinc-600 text-white p-2 py-5 rounded-md shadow-md flex items-center gap-x-2'>
                    <FaCircleUser className='text-2xl' />
                    <div>
                        <p className='text-sm opacity-80'>Welcome, </p>
                        <p>{user?.email}</p>
                    </div>
                </div>
                <div className='md:border flex-grow bg-blue-600 text-white p-2 rounded-md shadow-md space-y-1'>
                    <ul id='admin-sidebar' onClick={handleMenu}>
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
                        <li className='rounded-md'>
                            <NavLink to="/admin/inventory" className="block w-full p-2 rounded-md hover:bg-sky-500">Inventory</NavLink>
                        </li>
                    </ul>
                </div>
                <div className='flex items-center gap-x-2 md:border bg-red-700 text-white px-2 rounded-md shadow-md '>
                    <button className='py-3 flex items-center gap-x-2' onClick={handleLogout}>
                        <BiLogOutCircle className='text-xl' />
                        Logout
                    </button>
                </div>
                <div className='absolute -right-10 border top-0 bg-blue-600 text-white p-2 rounded-md font-bold md:hidden' onClick={handleMenu}>
                    <RiCloseLargeFill />
                </div>
            </aside>

        </div>
    )
}

export default AdminSideBar