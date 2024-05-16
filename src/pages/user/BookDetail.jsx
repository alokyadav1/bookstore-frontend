/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../../context/AppContext';
import Image from "../../assets/img.png"
import { FiPlus, FiMinus } from "react-icons/fi";
import { FaStar } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import axios from "../../Axios/axios"
import Reviews from '../../components/user/Review/Reviews';
import BookRating from '../../components/user/BookRating';
import DeleteModal from '../../components/user/Review/DeleteModal';
import Header from "../../components/user/Header"

// handle add to cart
function BookDetail() {
    const { bookID } = useParams()
    const navigate = useNavigate()
    const { books, cart, dispatchCart } = useContext(AppContext)
    const { user } = useContext(UserContext)
    const [quantity, setQuantity] = useState(1)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rating, setRating] = useState(0)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [reviews, setReviews] = useState([]);


    const book = books?.find(book => book.bookID == bookID)

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get(`/api/review/get-review-by-bookID/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            setReviews(res.data)
            console.log("reviews res: ", res);
        }
        fetchReviews()
    }, [bookID, currentUser.token])


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
        setQuantity(1)
        addToCartToast()
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

    const handleQuantityIncrement = () => {
        if (quantity < 10) {
            setQuantity(quantity + 1)
        } else {
            showToast()
        }
    }

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleDelete = () => {
        setShowDeleteModal((prev) => !prev);
    };

    const showToast = () => {
        toast("You can add only 10 Quantities", {
            position: "top-center",
            theme: "light"
        })
    }

    const addToCartToast = () => {
        toast("Book added to cart", {
            position: "top-center",
            theme: "light"
        })
    }
    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <>
            <Header />
            <div className='p-2 mt-16'>
                <div className='flex'>
                    <div className='flex flex-wrap flex-1 gap-4 items center text-zinc-600  md:w-2/5 p-2 rounded-md'>
                        <div className='flex flex-wrap md:flex-nowrap flex-1 gap-4  items center text-zinc-600 p-2 rounded-md'>
                            <div className=''>
                                <img src={Image} alt={book.title} className=' w-60 h-80 min-w-60 rounded-md' />
                            </div>
                            <div className='flex-grow py-2 relative '>
                                <p className=' text-sm text-white font-semibold bg-orange-600 rounded-md px-1 w-fit'>{book.category}</p>
                                <p className='text-2xl font-bold text-wrap w-full'>{book.title}</p>
                                <p className='text-blue-400'>{book.author}</p>
                                <p className='font-bold text-lg '>&#8377; {book.price}</p>
                                <p className='text-zinc-500'>
                                    <span>ISBN: </span>
                                    <span>{book.isbn}</span>
                                </p>

                                <div className='flex items-center gap-2'>
                                    <p>All India Delivery</p>
                                    <p className='relative bg-slate-200 text-green-600 rounded-md shadow-sm px-2'>
                                        <span className='absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full'></span>
                                        <span className='pl-3'>In Stock</span>
                                    </p>
                                </div>
                                <div className='py-2'>
                                    <ToastContainer />
                                    <div className='flex gap-4 border p-2 rounded-md w-fit'>
                                        <button className='text-sm' onClick={() => handleQuantityDecrement(book.bookID)}>
                                            <FiMinus />
                                        </button>
                                        <span className='font-bold'>{quantity}</span>
                                        <button className='text-sm' onClick={() => handleQuantityIncrement(book.bookID)}>
                                            <FiPlus />
                                        </button>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <button
                                        onClick={() => handleAddToCart(book)}
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add to Cart
                                    </button>
                                    <button
                                        onClick={handleBuyNow}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Rating  */}
                        <div className=' w-full'>
                            <h3 className="text-lg font-semibold mb-2 text-center">User Rating</h3>
                            <BookRating reviews={reviews} />
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className=' md:w-1/3 relative w-fit max-h-screen overflow-auto'>
                        <Reviews onDeleteReview={handleDelete} reviews={reviews} />
                    </div>

                </div>

            </div>

            {/* Write a Review */}
            <div className='flex justify-center bg-slate-200'>
                <div className=" p-1 py-3 rounded-lg shadow-sm w-1/2">
                    <h3 className="text-center text-xl font-bold py-4 ">Write a Review</h3>
                    <div className="flex justify-center gap-1 text-slate-400">
                        {
                            Array.from({ length: 5 }).map((a, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        className={`${rating > index ? 'text-orange-500' : 'text-slate-400'} text-3xl cursor-pointer`}
                                        onClick={(e) => setRating(index+1)}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className=" flex items-center gap-2 mt-4">
                        <div className="bg-red-700 text-white rounded-full w-10 h-10 font-extrabold flex justify-center items-center">
                            <p>{user.username[0].toUpperCase()}</p>
                        </div>
                        <textarea placeholder="Write a review..." rows={5} className="flex-grow border-1 rounded-md" />
                        <button className="bg-blue-700 text-white px-2 p-1 rounded-md">Submit</button>
                    </div>
                </div>
            </div>

            {showDeleteModal && <DeleteModal onDelete={handleDelete} />}
        </>
    );
}

export default BookDetail