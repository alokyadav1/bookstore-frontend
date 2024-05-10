/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import CoverImg from "../../assets/img.png"
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import axios from "../../Axios/axios"
import { FiPlus, FiMinus } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const BookCard = ({ book, bookQuantity }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const { cart, dispatchCart } = useContext(AppContext);
    const [inCart, setInCart] = useState(false);
    const [quantity, setQuantity] = useState(0)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    useEffect(() => {
        const isInCart = (bookID) => {
            return cart.some(item => {
                if(item.book.bookID == bookID){
                    setQuantity(item.quantity)
                    return true;
                }
                return false;
            })
        }
        if (isInCart(book.bookID)) {
            setInCart(true)
        }
    },[book.bookID, cart])

    const handleAddToCart = async(book) => {
        if (user == null) {
            navigate("/user/login")
        }
                
        dispatchCart({
            type: "ADD_TO_CART",
            payload: { book, quantity:1 }
        })

        const res = await axios.post("/api/cart/add",{
            user:{userID:user.userID},
            book:{bookID:book.bookID},
            quantity:1
        },{
            headers:{
                Authorization:`Bearer ${currentUser.token}`
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
            navigate("/user/checkout",{
                state:{
                    cart:[{book,quantity:1}]
                }
            })
        }
    }

    const handleQuantityIncrement = (bookID) => {
        if (quantity < 10) {
            dispatchCart({
                type:"UPDATE_CART",
                payload:{
                    bookID: bookID,
                    quantity: quantity + 1
                }
            })

            setQuantity(quantity + 1)
        }else{
            showToast()
        }
    }

    const handleQuantityDecrement = (bookID) => {
        if (quantity > 1) {
            dispatchCart({
                type:"UPDATE_CART",
                payload:{
                    bookID: bookID,
                    quantity: quantity - 1
                }
            })

            setQuantity(quantity - 1)
        }
    }

    const showToast = () => {
        toast("You can add only 10 Quantities",{
            position:"top-center",
            theme:"light"
        })
    }

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
            <ToastContainer/>
            <div>
                <img className="w-full" src={CoverImg} alt={book.title} />
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{book.title}</div>
                    <p className="text-gray-500 text-base italic">{book.description}</p>
                    <p className="text-gray-700 text-base"><span className='font-bold'>Author:</span> {book.author}</p>
                    <p className=" text-slate-700 text-xl font-extrabold ">&#8377;{book.price}</p>
                </div>
            </div>
            <div className="px-6 py-4 flex justify-between items-center">
                {
                    !inCart ? (<button
                        onClick={() => handleAddToCart(book)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Add to Cart
                    </button>) : (
                        <div className='flex gap-4 border p-2 rounded-md'>
                            <button className='text-sm' onClick={() => handleQuantityDecrement(book.bookID)}>
                                <FiMinus />
                            </button>
                            <span className='font-bold'>{quantity}</span>
                            <button className='text-sm' onClick={() => handleQuantityIncrement(book.bookID)}>
                                <FiPlus />
                            </button>
                        </div>
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
