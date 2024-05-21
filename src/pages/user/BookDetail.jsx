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
import { showToast } from '../../utils/toast';
import Reviews from '../../components/user/Review/Reviews';
import BookRating from '../../components/user/BookRating';
import DeleteModal from '../../components/user/Review/DeleteModal';
import Header from "../../components/user/Header"
import BookSuggestion from '../../components/user/BookSuggestion';
import { comment } from 'postcss';

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
    const [reviewExists, setReviewExists] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState({ comment: "", rating: 0 })
    const [review, setReview] = useState("")
    const [showError, setShowError] = useState(false)


    const book = books?.find(book => book.bookID == bookID)

    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get(`/api/review/get-review-by-bookID/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            const rev = res.data.find(r => r.email == user.email)
            setReviews(res.data)
            if(rev != null) setUserReview(rev)
            setReviewExists(rev != null)
            console.log("reviews res: ", res);
        }
        fetchReviews()
        scrollToTop()
    }, [bookID, currentUser.token, user?.email])


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
        showToast("Book added to cart")
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
            showToast("You can add only 10 Quantities")
        }
    }

    const handleQuantityDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (userReview?.rating <= 0) {
            setShowError(true)
            return;
        }
        const data = userReview;

        const header = {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        }
        try {
            const res = await axios.post(`/api/review/add-review/${bookID}`, data, header)
            showToast("Review Added successfully")
            setReviewExists(true)
        } catch (error) {
            showToast("There was an error.")
        }
        setReview("")
        setShowError(false)
    }
    const handleDeleteModal = () => {
        setShowDeleteModal((prev) => !prev);
    }

    const handleDelete = async() => {
        try {
            const res = await axios.delete(`/api/review/delete-user-review/${bookID}`,{
                headers:{
                    Authorization:`Bearer ${currentUser?.token}`
                }
            })
            showToast("Review deleted successfully.")
        } catch (error) {
            console.log(error);
            showToast("Unable to delete the review.")
        }
        setShowDeleteModal((prev) => !prev);
    };

    const handleCancel = () => {
        setShowDeleteModal((prev) => !prev);
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant'
        })
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <>
            <ToastContainer />
            <Header />
            <div className='p-2 mt-16'>
                <div className='flex'>
                    <div className='flex flex-wrap flex-1 gap-4 items center text-zinc-600  md:w-2/5 p-2 rounded-md'>
                        <div className='flex flex-wrap md:flex-nowrap flex-1 gap-4  items center text-zinc-600 p-2 rounded-md'>
                            <div className=''>
                                <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={book.title} className=' w-60 h-80 min-w-60 rounded-md' />
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
                                    <p className='relative bg-slate-200 text-green-600 rounded-full shadow-sm px-2 text-sm'>
                                        <span className='absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full'></span>
                                        <span className='pl-3'>In Stock</span>
                                    </p>
                                </div>
                                <div className='py-2'>
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
                    <div className=' md:w-1/3 relative border rounded-md w-fit max-h-screen overflow-auto no-scrollbar px-2'>
                        <Reviews onDeleteReview={handleDeleteModal} reviews={reviews} />
                    </div>

                </div>

            </div>

            {/* Write a Review */}
            <div className='flex justify-center bg-slate-200'>
                <div className=" p-1 py-3 rounded-lg shadow-sm w-1/2">
                    <h3 className="text-center text-xl font-bold py-4 ">{reviewExists ? "Your Review" : "Write Review"}</h3>
                    <div className="flex justify-center gap-1 text-slate-400">
                        {
                            Array.from({ length: 5 }).map((a, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        className={`${userReview?.rating > index ? 'text-orange-500' : 'text-slate-400'} text-3xl cursor-pointer`}
                                        onClick={(e) => {
                                            if (!reviewExists) {
                                                setUserReview({ ...userReview, rating: index + 1 })
                                            }
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                    {
                        showError && <p className='text-center mt-1 text-red-900 text-sm'>Please select rating!</p>
                    }
                    <div className=" flex items-center gap-2 mt-4">
                        <form className='flex items-center gap-2 mt-4 w-full' onSubmit={handleSubmitReview}>
                            <div className="bg-red-700 text-white rounded-full w-10 h-10 font-extrabold flex justify-center items-center">
                                <p>{user?.username[0].toUpperCase()}</p>
                            </div>
                            {
                                reviewExists ? (
                                    <div className='border p-2 rounded-md bg-slate-100 w-fit italic text-zinc-500'>
                                        <q>{userReview?.comment}</q>
                                    </div>
                                ) : (
                                    <textarea
                                        placeholder="Write a review..."
                                        rows={4}
                                        className="flex-grow border border-slate-400 rounded-md p-2"
                                        value={userReview?.comment}
                                        onChange={(e) => setUserReview({ ...userReview, comment: e.target.value })}
                                    />
                                )
                            }
                            {
                                !reviewExists && (
                                    <button
                                        type='submit'
                                        className="bg-blue-700 text-white px-2 p-1 rounded-md"
                                    >Submit</button>
                                )
                            }
                        </form>

                    </div>
                </div>
            </div>
            <div className='p-5'>
                <h3 className='text-xl font-bold mb-2'>You may Like</h3>
                <div>
                    <BookSuggestion
                        category={book.category}
                        author={book.author}
                        bookID={bookID}
                        handleClick={scrollToTop} />
                </div>
            </div>
            {showDeleteModal && <DeleteModal onDelete={handleDelete} onCancel={handleCancel} />}
        </>
    );
}

export default BookDetail