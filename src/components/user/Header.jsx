/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FaCalendarMinus, FaBars, FaTimes } from "react-icons/fa";
import AppContext from '../../context/AppContext';
import axios from "../../Axios/axios"
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping } from 'react-icons/fa6';

const categories = ["Philosophy", "Sci-Fi", "Self-Help", "Mystery", "Adventure", "Biography", "Novel", "Fantasy", "Horror", "Romance"]

const Header = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [showSuggested, setShowSuggested] = useState(true)
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false); // state for hamburger menu
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const userRole = localStorage.getItem("userRole")
    const { user, dispatchUser } = useContext(UserContext)
    const { cart } = useContext(AppContext)

    useEffect(() => {
        const getSearchResult = async (search) => {
            if (search.length > 0) {
                const res = await axios.get(`/api/search/searchByTitleOrAuthor/${search}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser?.token}`
                    }
                })
                return res.data
            }
            return []
        }
        const handleInputChange = async () => {
            setIsLoading(true)
            const result = await getSearchResult(keyword)
            setSearchResult(result)
            setIsLoading(false)
        }
        const inputChange = setTimeout(handleInputChange, 1000)

        return () => clearTimeout(inputChange)
    }, [currentUser?.token, keyword])

    const handleSearch = (e) => {
        e.preventDefault()
        navigate(`/user/search/${keyword}`, {
            state: { keyword }
        })
    }

    const handleLogout = () => {
        dispatchUser({
            type: "LOGOUT"
        })
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userRole");
        navigate("/user/login")
    }

    if (userRole == "ADMIN") {
        dispatchUser({
            type: "LOGOUT"
        })
        localStorage.removeItem("currentUser");
    }

    return (
        <header className="bg-white/70 backdrop-blur-md text-neutral-800 font-semibold fixed top-0 w-full p-3 h-14 pr-5 flex justify-between items-center rounded-xl mt-1 mx-1 z-20 shadow-md">
            <div className="flex items-center">
                <Link to="/user" className="text-xl font-bold">Bookstore</Link>
            </div>
            <div className='sm:w-1/3 mx-2'>
                <form onSubmit={handleSearch}>
                    <div className='flex bg-zinc-100 border border-zinc-200 rounded-xl'>
                        <div className='relative w-full group'>
                            <input
                                className='p-2 border-l border-r border-slate-200 px-4 font-normal w-full bg-zinc-100 focus:outline-1 focus:outline-blue-800'
                                type="text" placeholder='Search Books' value={keyword}
                                onChange={e => setKeyword(e.target.value)}
                                required
                            />
                            <div className='invisible group-focus-within:visible absolute left-0 right-0 top-full translate-y-1 bg-white rounded-xl shadow-2xl max-h-96 overflow-auto'>
                                {
                                    searchResult.length > 0 ? (
                                        <ul>
                                            {
                                                searchResult.map((book, index) => {
                                                    return (
                                                        <Link to={`/user/book/${book.bookID}`} key={index}>
                                                            <li
                                                                className='p-1 px-2 cursor-pointer hover:bg-slate-100'>{book.title}
                                                            </li>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </ul>
                                    ) : (
                                        isLoading ? (
                                            <div>
                                                Loading...
                                            </div>
                                        ) : (
                                            keyword.length > 0 && (
                                                <div className='p-5'>
                                                    No Result Found
                                                </div>
                                            )
                                        )
                                    )
                                }
                                {
                                    searchResult.length <= 0 && (
                                        <div>
                                            <p className='text-lg p-1'>Suggested categories</p>
                                            {
                                                categories.map((category, index) => {
                                                    return (
                                                        <Link to={`/user/category/${category}`} key={index}>
                                                            <li
                                                                className='p-1 px-2 cursor-pointer list-none font-light hover:bg-slate-100'>{category}
                                                            </li>
                                                        </Link>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                        <button className='px-4 text-zinc-500' type='submit'>
                            <FaSearch />
                        </button>
                    </div>
                </form>
            </div>
            <div className="block md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>
            <div className={`${isMenuOpen ? 'border block absolute top-full right-0 bg-white p-2 rounded' : 'hidden md:flex'}`}>

                <nav className={`md:flex md:items-center  w-full lg:w-auto`}>
                    <Link to="/user" className="block lg:inline-block mr-4">Home</Link>
                    <Link to="#" className="block lg:inline-block mr-4">Books</Link>
                    <Link to="#" className="block lg:inline-block mr-4">About</Link>
                </nav>
                <div className={`md:flex md:items-center mt-2 sm:mt-0 `}>
                    {
                        user != null ? (
                            <div className='flex items-center'>
                                <div className='relative flex items-center'>
                                    <Link to="/user/cart" className="block lg:inline-block mr-4 text-3xl">
                                        <FaCartShopping />
                                        {
                                            cart.length > 0 && <span className='absolute -top-2 right-2 w-5 h-5 rounded-full border border-slate-600 bg-blue-800 text-white text-sm flex items-center justify-center'>{cart.length}</span>
                                        }
                                    </Link>
                                </div>
                                <div className="relative group p-2">
                                    <div className='bg-red-600 rounded-full border border-red-300 flex items-center justify-center w-9 h-9 text-white'>
                                        <button className="group uppercase">
                                            {user?.firstName[0]}
                                        </button>
                                    </div>
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 hidden group-hover:block text-center">
                                        <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Profile</Link>
                                        <Link to="/user/orderHistory" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Order History</Link>
                                        <hr />
                                        <button className="block w-full px-4 py-2 hover:bg-gray-200 text-lg text-red-400 mx-auto text-center" onClick={handleLogout}>Logout</button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex sm:flex md:justify-center items-center md:text-sm">
                                <Link
                                    to="/user/login"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mr-2 mb-2 sm:mb-0">
                                    Login
                                </Link>
                                <Link
                                    to="/user/register"
                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mb-2 sm:mb-0">
                                    Sign Up
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </header>
    );
}

export default Header;
