/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { FaCartShopping } from "react-icons/fa6";
import AppContext from '../../context/AppContext';
import axios from "../../Axios/axios"
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const { user, dispatchUser } = useContext(UserContext)
    const { cart } = useContext(AppContext)


    useEffect(() => {
        const getSearchResult = async (search) => {
            if (search.length > 0) {
                const res = await axios.get(`/api/search/searchByTitleOrAuthor/${search}`, {
                    headers: {
                        Authorization: `Bearer ${currentUser.token}`
                    }
                })
                return res.data
            }
            return []
        }
        const handleInputChange = async () => {
            console.log("input change");
            setIsLoading(true)
            const result = await getSearchResult(keyword)
            setSearchResult(result)
            setIsLoading(false)
        }
        const inputChange = setTimeout(handleInputChange, 1000)

        return () => clearTimeout(inputChange)
    }, [currentUser.token, keyword])

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
        navigate("/user/register")
    }

    return (
        <header className=" bg-white/70 backdrop-blur-md text-neutral-800 font-semibold fixed top-0 w-full p-3 h-14 pr-5 flex justify-between items-center rounded-xl mt-1 mx-1 z-50 shadow-md">
            <div className="flex items-center">
                <Link to="/user" className="text-xl font-bold">Bookstore</Link>
            </div>
            <div className='relative w-1/3 group'>
                <form onSubmit={handleSearch}>
                    <div className='flex bg-zinc-100 border border-zinc-400 rounded-xl'>
                        <input
                            className='p-2 rounded-l-xl border-r border-slate-200 px-4 font-normal w-full bg-zinc-100 focus:outline-1 focus:outline-blue-800 '
                            type="text" placeholder='Search Books' value={keyword}
                            onChange={e => setKeyword(e.target.value)}
                            required
                        />
                        <button className='px-4 text-zinc-500' type='submit '>
                            <FaSearch />
                        </button>
                    </div>
                    <div className='invisible group-hover:visible absolute top-full w-full bg-white rounded-xl shadow-2xl max-h-96 overflow-auto'>
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
                    </div>
                </form>




            </div>
            <nav className="ml-6">
                <Link to="/user" className="mr-4">Home</Link>
                <Link to="#" className="mr-4">Books</Link>
                <Link to="#" className="mr-4">About</Link>
            </nav>
            <div className="flex items-center">
                {
                    user != null ? (
                        <div className='flex items-center'>
                            <div className=' relative flex items-center'>
                                <Link to="/user/cart" className="mr-4 text-3xl">
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
                                    <Link to="/user/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">User Profile</Link>
                                    <Link to="/user/orderHistory" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Order History</Link>
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
