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
import { IoNotifications } from 'react-icons/io5';
import FullScreenModal from '../../components/admin/Modal';
import NotifyMe from '../../components/user/NotifyMe';
import { FaAngleLeft } from 'react-icons/fa6';

// handle add to cart
function BookDetail() {
    const { bookID } = useParams()
    const navigate = useNavigate()
    const { books, cart, dispatchCart } = useContext(AppContext)
    const { user } = useContext(UserContext)
    const [quantity, setQuantity] = useState(1)
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(0)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [reviewExists, setReviewExists] = useState(false)
    const [reviews, setReviews] = useState([]);
    const [userReview, setUserReview] = useState({ comment: "", rating: 0 })
    const [review, setReview] = useState("")
    const [showError, setShowError] = useState(false)


    const book = books?.find(book => book.bookID == bookID)
    console.log("booksdetails => book: ", book);
    console.log("booksdetails => books: ", books);
    if (currentUser == null) navigate("/user/login")
    useEffect(() => {
        const fetchReviews = async () => {
            const res = await axios.get(`/api/review/get-review-by-bookID/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            const rev = res.data.find(r => r.email == user.email)
            setReviews(res.data)
            if (rev != null) setUserReview(rev)
            setReviewExists(rev != null)
            console.log("reviews res: ", res);
        }
        fetchReviews()
        scrollToTop()
    }, [bookID, currentUser?.token, user?.email])

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

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/api/review/delete-user-review/${bookID}`, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
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

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
        setShowDeleteModal(false)
    };

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
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <NotifyMe />
            </FullScreenModal>

            <div className='p-0 mt-16 md:p-2 '>
                {/* create a back button */}
                <button
                    onClick={() => navigate("/user")}
                    className="text-black font-bold py-2 px-4 rounded flex items-center">
                    <FaAngleLeft className="inline-block" />Back
                </button>
                <div className='flex flex-wrap'>
                    <div className='flex flex-wrap flex-1 gap-4 items center text-zinc-600  md:w-2/5 p-2 rounded-md'>
                        <div className='flex flex-wrap md:flex-nowrap flex-1 gap-4  items center text-zinc-600 p-2 rounded-md'>
                            <div className=' w-full md:w-fit md:h-80 rounded flex justify-center '>
                                <div className='bg-slate-200'>
                                    <img src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`} alt={book.title} className='w-50 h-60 md:w-fit md:h-80 object-contain rounded' />
                                </div>
                            </div>
                            <div className='flex-grow py-2 relative '>
                                <div className='flex flex-row-reverse items-center md:items-start md:flex-col'>
                                    <p className=' text-sm text-white font-semibold bg-orange-600 rounded-md p-1 w-fit'>{book.category}</p>
                                    <p className='text-2xl font-bold text-wrap w-full'>{book.title}</p>
                                </div>
                                <p className='text-blue-400'>{book.author}</p>
                                <p className='font-bold text-lg '>&#8377; {book.price}</p>
                                <p className='text-zinc-500'>
                                    <span>ISBN: </span>
                                    <span>{book.isbn}</span>
                                </p>

                                <div className='flex items-center gap-2'>
                                    <p>All India Delivery</p>
                                    {
                                        book.stock > 0 ? (
                                            <p className='relative bg-slate-200 text-green-600 rounded-full shadow-sm px-2 text-sm'>
                                                <span className='absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full'></span>
                                                <span className='pl-3'>In Stock</span>
                                            </p>
                                        ) : (
                                            <p className='relative bg-slate-200 text-red-600 rounded-full shadow-sm px-2 text-sm'>
                                                <span className='absolute top-1/2 left-2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full'></span>
                                                <span className='pl-3'>Out of Stock</span>
                                            </p>
                                        )
                                    }
                                </div>
                                {
                                    book.stock > 0 && (
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
                                    )
                                }
                                {
                                    book.stock > 0 ? (
                                        <div className='mt-2 w-full flex'>
                                            <button
                                                onClick={() => handleAddToCart(book)}
                                                className="flex-grow md:flex-grow-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add to Cart
                                            </button>
                                            <button
                                                onClick={handleBuyNow}
                                                className="flex-grow md:flex-grow-0 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Buy Now
                                            </button>
                                        </div>
                                    ) : (
                                        <div className='w-full space-y-2 mt-5'>
                                            <button className='bg-slate-200 opacity-50 border p-2 rounded-md w-1/3' disabled>Sold Out</button>
                                            <button className='w-1/3 bg-red-600 text-white p-2 rounded-md flex items-center justify-center gap-x-2 hover:bg-red-500 border-2  focus:border-2 focus:border-sky-400' onClick={openModal}>
                                                <IoNotifications />
                                                <span>Notify Me</span>
                                            </button>
                                        </div>
                                    )
                                }
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
            {
                user == null ? (
                    <div className='p-1 py-3 rounded-lg shadow-sm text-center'>
                        Please login to write review
                    </div>
                ) : (
                    <div className='flex flex-wrap justify-center w-full bg-slate-200'>
                        <div className=" p-1 py-3 rounded-lg shadow-sm w-full md:w-1/2">
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
                                <form className='flex flex-wrap items-center gap-2 mt-4 w-full' onSubmit={handleSubmitReview}>
                                    <div className="bg-red-700 text-white rounded-full w-10 h-10 font-extrabold flex justify-center items-center">
                                        <p>{user?.firstName[0].toUpperCase()}</p>
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
                )
            }
            <div>
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