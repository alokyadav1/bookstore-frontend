/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import CoverImg from "../../assets/img.png"
import UserContext from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import axios from "../../Axios/axios"
import { FiPlus, FiMinus } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Quantity from './Quantity';
import FullScreenModal from '../admin/Modal';
import NotifyMe from './NotifyMe';

const BookCard = ({ book, bookQuantity, handleClick }) => {

    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const { cart, dispatchCart } = useContext(AppContext);
    const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const isInCart = (bookID) => {
            return cart.some(item => {
                if (item.book.bookID == bookID) {
                    setQuantity(item.quantity)
                    return true;
                }
                return false;
            })
        }
        if (isInCart(book.bookID)) {
            setInCart(true)
        }
    }, [book.bookID, cart])

    const handleAddToCart = async (book) => {
        if (user == null) {
            navigate("/user/login")
        }

        dispatchCart({
            type: "ADD_TO_CART",
            payload: { book, quantity: 1 }
        })

        const res = await axios.post("/api/cart/add", {
            user: { userID: user.userID },
            book: { bookID: book.bookID },
            quantity: 1
        }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        })

        setInCart(true)
        setQuantity(1)
        console.log("cart: ", cart);
    }

    const handleBuyNow = () => {
        if (user == null) {
            navigate("/user/login")
        } else {
            navigate("/user/checkout", {
                state: {
                    cart: [{ book, quantity: 1 }]
                }
            })
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };
    return (
        <>
            
            <div className={` ${book.stock <= 0 ? 'opacity-60' : ''} w-72 max-w-76 min-w-72 flex-shrink-0 flex-grow-0 rounded shadow-lg`}>
                <Link
                    to={`/user/book/${book.bookID}`}
                >
                    <div onClick={handleClick}>
                        <div className=" w-32 h-48 mb-4 bg-gray-200 shadow-lg rounded overflow-hidden mx-auto">
                            <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={`${book.title} cover`} className="w-full h-48 object-cover rounded mb-4" />
                        </div>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2 max-h-12 leading-tight line-clamp-1">{book.title}</div>
                            <p className="text-gray-500 text-base italic max-h-18 leading-tight line-clamp-3">{book.description}</p>
                            <p className="text-gray-700 text-base"><span className='font-bold'>Author:</span> {book.author}</p>
                            <p className=" text-slate-700 text-xl font-extrabold ">&#8377;{book.price}</p>
                        </div>
                    </div>
                </Link>
                {
                    book.stock > 0 ? (
                        <div className="px-6 py-4 flex justify-between items-center">
                            {
                                !inCart ? (<button
                                    onClick={() => handleAddToCart(book)}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add to Cart
                                </button>) : (
                                    <Quantity book={book} initialQuantity={quantity} />
                                )
                            }
                            <button
                                onClick={handleBuyNow}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Buy Now
                            </button>
                        </div>
                    ) : (
                        <div className='bg-red-600 text-white p-2 rounded text-center mx-5 mt-4'>
                            Out of stock
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default BookCard;
