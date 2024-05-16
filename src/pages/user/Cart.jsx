/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import CartCard from '../../components/user/CartCard'
import { FaChevronCircleDown } from "react-icons/fa";
import "../../App.css"
import { useNavigate } from 'react-router-dom';
import axios from "../../Axios/axios"


function Cart() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const navigate = useNavigate()
    const {cart, dispatchCart} = useContext(AppContext)
    const [isExpanded, setIsExpanded] = useState(false)
    // const cart = [
    //     {
    //         "book": {
    //             "bookID": 40,
    //             "title": "Mort",
    //             "description": "Fantasy novel set on the Discworld",
    //             "author": "Terry Pratchett",
    //             "price": 549.0,
    //             "rating": 3.3,
    //             "isbn": "9780061020711",
    //             "stock": 20,
    //             "category": "Fantasy"
    //         },
    //         "quantity": 2
    //     },
    //     {
    //         "book": {
    //             "bookID": 42,
    //             "title": "The Catcher in the Rye",
    //             "description": "Novel about teenage angst and alienation",
    //             "author": "J.D. Salinger",
    //             "price": 599.0,
    //             "rating": 3.3,
    //             "isbn": "9780316769488",
    //             "stock": 20,
    //             "category": "Classic"
    //         },
    //         "quantity": 2
    //     }
    // ]

    const totalPrice = cart.reduce((acc, item) => {
        return acc + (item.book.price * item.quantity)
    },0)

    const handleDeleteCart = async() => {
        const res = await axios.delete("/api/cart/delete-cart",{
            headers:{
                Authorization:`Bearer ${currentUser.token}`
            }
        })
        dispatchCart({
            type:"DELETE_CART",
        })
    }

    const handleCheckout = () => {
        navigate("/user/checkout",{
            state:{cart:cart}
        })
    }

    return (
        <div className='px-2'>
            <h2 className='text-center font-semibold text-2xl mb-4'>Cart</h2>
            {
                cart.length > 0 ? (
                    <div className='flex flex-wrap gap-5'>
                        <div className=' flex-1'>
                            <div className='flex justify-between text-sm font-bold'>
                                <span>{cart.length} items</span>
                                <span className='text-red-400 font-normal cursor-pointer' onClick={handleDeleteCart}>Empty cart</span>
                            </div>
                            <div className='flex flex-col gap-2 overflow-auto h-fit max-h-screen'>
                                {
                                    cart.length > 0 && (
                                        cart.map(c => <CartCard key={c.book.bookID} cartItem={c} />)
                                    )
                                }
                            </div>
                        </div>
                        <div className='relative border flex-1 self-start p-5 rounded-lg mt-5 h-auto'>
                            <div className='py-2'>
                                {
                                    cart.length > 0 && (
                                        cart.map(c => {
                                            return (
                                                <div key={c.book.bookID} className='flex justify-between'>
                                                    <p>
                                                        <span className='text-sm'>x{c.quantity}</span> {c.book.title}
                                                    </p>
                                                    <p className='font-bold'>&#8377;{c.quantity * c.book.price}</p>
                                                </div>
                                            )
                                        })
                                    )
                                }
                                <div className='flex justify-between'>
                                    <p>Shipping</p>
                                    <p className='font-bold'>Free</p>
                                </div>
                            </div>
                            <hr />
                            <div className='py-2'>
                                <div
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className='flex items-center justify-between text-blue-500 cursor-pointer'>
                                    <p>I have a promo code</p>
                                    <FaChevronCircleDown />
                                </div>
                                <div className={`overflow-hidden transition-max-h ${isExpanded ? "h-auto p-2" : "h-0"}`}>
                                    <form className='flex flex-wrap justify-between'>
                                        <input type="text"
                                            className='border rounded-md p-2 w-2/3'
                                            placeholder='Enter coupon code' />
                                        <button className=' bg-gray-800 p-2 rounded-lg text-white'>Apply Coupon</button>
                                    </form>
                                </div>
                            </div>
                            <div>

                            </div>
                            <hr />
                            <div className='flex justify-between'>
                                <p className='text-xl font-bold'>Total</p>
                                <p className='text-2xl font-extrabold'>&#8377;{totalPrice}</p>
                            </div>
                            <button className='relative left-1/2 -translate-x-1/2 bg-blue-700 text-white p-3 px-5 rounded-2xl shadow-xl' onClick={handleCheckout}>Checkout</button>
                        </div>
                    </div>
                ):(
                    <div className='text-center font-bold text-3xl'>
                        Cart is Empty.
                    </div>
                )
            }
        </div>
    )
}

export default Cart