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

const BookCard = ({ book, bookQuantity,handleClick }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const { cart, dispatchCart } = useContext(AppContext);
    const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(0)
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

    return (
        <div className=" w-72 max-w-76 min-w-72 flex-shrink-0 flex-grow-0 rounded shadow-lg">
            <Link
                to={`/user/book/${book.bookID}`}
            >
                <div onClick={handleClick}>
                    <img className="w-32 h-48 rounded mx-auto" src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`||Image} alt={book.title} />
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{book.title}</div>
                        <p className="text-gray-500 text-base italic">{book.description}</p>
                        <p className="text-gray-700 text-base"><span className='font-bold'>Author:</span> {book.author}</p>
                        <p className=" text-slate-700 text-xl font-extrabold ">&#8377;{book.price}</p>
                    </div>
                </div>
            </Link>
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
        </div>
    );
};

export default BookCard;
