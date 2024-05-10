/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FaCartShopping } from "react-icons/fa6";
import AppContext from '../../context/AppContext';


const Header = () => {
    const navigate = useNavigate();
    const { user, dispatchUser } = useContext(UserContext)
    const { cart } = useContext(AppContext)

    const handleLogout = () => {
        dispatchUser({
            type: "LOGOUT"
        })
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");
        navigate("/user/register")
    }

    return (
        <header className=" bg-white/70 backdrop-blur-md text-neutral-800 font-semibold fixed top-0 w-full p-3 pr-5 flex justify-between items-center rounded-full mt-1 mx-1 z-50">
            <div className="flex items-center">
                <Link to="/" className="text-xl font-bold">Bookstore</Link>
            </div>
            <nav className="ml-6">
                <Link to="/" className="mr-4">Home</Link>
                <Link to="/books" className="mr-4">Books</Link>
                <Link to="/about" className="mr-4">About</Link>
            </nav>
            <div className="flex items-center">
                {
                    user != null ? (
                        <div className='flex items-center'>
                            <div className=' relative flex items-center'>
                                <Link to="cart" className="mr-4 text-3xl">
                                    <FaCartShopping />
                                    {
                                        cart.length > 0 && <span className='absolute -top-2 right-2 w-5 h-5 rounded-full border border-slate-600 bg-blue-800 text-white text-sm flex items-center justify-center'>{cart.length}</span>
                                    }

                                </Link>
                            </div>

                            <div className="relative group p-2">
                                <div className='bg-red-600 rounded-full border border-red-300 flex items-center justify-center w-9 h-9 text-white'>
                                    <button className="group uppercase">
                                        {user.username[0]}
                                    </button>
                                </div>
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 hidden group-hover:block text-center">
                                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Profile</Link>
                                    <Link to="/order-history" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Order History</Link>
                                    <hr />
                                    <button className="block w-full px-4 py-2 hover:bg-gray-200 text-lg text-red-400 mx-auto text-center" onClick={handleLogout}>Logout</button>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div>
                            <Link
                                to="/user/login"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2">
                                Login
                            </Link>
                            <Link
                                to="/user/register"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full">
                                Sign Up
                            </Link>
                        </div>
                    )
                }
            </div>
        </header>
    );
}

export default Header;
