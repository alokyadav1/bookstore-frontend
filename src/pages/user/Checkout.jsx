/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/CheckoutPage.js

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AppContext from "../../context/AppContext"
import { FaCross, FaCut } from "react-icons/fa";

import { showToast } from "../../utils/toast"

import axios from "../../Axios/axios"
import ConfettiComponent from "../../components/ConfettiComponent";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowUpLong } from "react-icons/fa6";

const CheckoutPage = () => {
    const navigate = useNavigate()
    const { user } = useContext(UserContext)
    const { dispatchCart } = useContext(AppContext)
    const [cartItem, setCartItem] = useState(null)
    const [coupon, setCoupon] = useState(null)
    const [couponCode, setCouponCode] = useState("")
    const [showConfetti, setShowConfetti] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
    const location = useLocation();
    // const cart = location.state.cart;
    let totalPrice = 0;
    const shippingCharge = 49;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        setCartItem(location.state.cart)
    }, [location.state.cart])

    const handlePlaceOrder = async () => {
        const book = cartItem?.map(item => {
            return {
                bookId: item.book.bookID,
                quantity: item.quantity
            }
        })

        const res = await axios.post("/api/orders/save-order", {
            totalAmount: totalPrice + shippingCharge - discountAmount, books: book
        }, {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        })

        deleteCart()

        navigate("payment-success", {
            state: {
                cartItem,
                totalPrice
            }
        })
    }

    const deleteCart = async () => {
        dispatchCart({
            type: "DELETE_CART"
        })

        const res = await axios.delete("/api/cart/delete-cart", {
            headers: {
                Authorization: `Bearer ${currentUser.token}`
            }
        })
    }

    const handleApplyCoupon = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/coupon/apply-coupon", { couponCode }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })
            console.log("res: ", res.data);
            console.log("status: ", res.status);
            console.log("success");
            let discount = (totalPrice * res.data.discount) / 100
            if (discount > res.data.maxDiscount) discount = res.data.maxDiscount
            setCoupon(res.data)
            setShowConfetti(true)
            setCouponCode("")
            setDiscountAmount(discount)
        } catch (error) {
            console.log("error");
            toast("Invalid", {
                position: "top-center",
                theme: "light"
            })
        }
    }
    return (
        <>
            {showConfetti && <ConfettiComponent />}
            <ToastContainer />
            <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
                <a href="#" className="text-2xl font-bold text-gray-800">
                    Bookstore
                </a>
                <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                    <div className="relative">
                        <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                    href="#"
                                >

                                </a>
                                <span className="font-semibold text-gray-900">Shop</span>
                            </li>

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                    href="#"
                                >
                                    2
                                </a>
                                <span className="font-semibold text-gray-900">Shipping</span>
                            </li>

                            <li className="flex items-center space-x-3 text-left sm:space-x-4">
                                <a
                                    className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                    href="#"
                                >
                                    3
                                </a>
                                <span className="font-semibold text-gray-500">Payment</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">
                        Check your items. And select a suitable shipping method.
                    </p>
                    {/* items section */}

                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">

                        {
                            cartItem?.map(item => {
                                totalPrice += item.quantity * item.book.price;
                                return (
                                    <>
                                        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                                            <img
                                                className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                                                src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                                                alt=""
                                            />
                                            <div className="flex w-full flex-col px-4 py-4">
                                                <span className="font-semibold">
                                                    {item.book.title}
                                                </span>
                                                <span className="float-right text-gray-400">Quantity: {item.quantity}</span>
                                                <p className="text-lg font-bold">&#8377;{item.book.price}</p>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                    {/* Coupon section */}
                    <section className="px-5 py-2 bg-slate-200 mt-12 rounded-lg border">
                        <p className="text-center font-bold text-xl text-zinc-500 py-2">Coupon</p>
                        <form onSubmit={handleApplyCoupon}>
                            <div className="flex gap-x-4 items-center">
                                <input
                                    className="p-2 flex-grow border rounded-md shadow-sm"
                                    type="text"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    placeholder="Enter Coupon Code"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="p-2 bg-blue-700 text-white rounded-md px-5"
                                >Apply</button>
                            </div>
                        </form>
                        {
                            coupon && (
                                <div className="relative bg-slate-100 rounded-xl px-5 py-2 text-zinc-600 mt-2 shadow-lg">
                                    <p className="font-bold text-green-600 text-lg">{coupon.couponCode}</p>
                                    <p>{coupon.couponDesc}</p>
                                    <p className="font-bold text-red-600">{coupon.discount}% off</p>
                                    <p className="text-xs">Max Discount - &#8377;{coupon.maxDiscount}</p>
                                    <span className="absolute top-1 right-5">
                                        x
                                    </span>
                                </div>
                            )
                        }
                        <p className="text-center mt-5 text-sm text-blue-500">View all Coupons</p>
                    </section>
                </div>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">
                        Complete your order by providing your payment details.
                    </p>
                    <div className="">
                        <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="your.email@gmail.com"
                                value={user?.email}
                                disabled
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label
                            htmlFor="card-holder"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Card Holder
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="card-holder"
                                name="card-holder"
                                className="w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Your full name here"
                            />
                            <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                            </div>
                        </div>
                        <label
                            htmlFor="card-no"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Card Details
                        </label>
                        <div className="flex">
                            <div className="relative w-7/12 flex-shrink-0">
                                <input
                                    type="text"
                                    id="card-no"
                                    name="card-no"
                                    className="w-full rounded-md border border-gray-300 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="xxxx-xxxx-xxxx-xxxx"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">

                                </div>
                            </div>
                            <input
                                type="text"
                                name="credit-expiry"
                                className="w-full rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="MM/YY"
                            />
                            <input
                                type="text"
                                name="credit-cvc"
                                className="w-1/6 flex-shrink-0 rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="CVC"
                            />
                        </div>
                        <label
                            htmlFor="billing-address"
                            className="mt-4 mb-2 block text-sm font-medium"
                        >
                            Billing Address
                        </label>
                        <div className="flex flex-col sm:flex-row">
                            <div className="relative flex-shrink-0 sm:w-7/12">
                                <input
                                    type="text"
                                    id="billing-address"
                                    name="billing-address"
                                    className="w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                    placeholder="Street Address"
                                />
                                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                                    <img
                                        className="h-4 w-4 object-contain"
                                        src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <select
                                type="text"
                                name="billing-state"
                                className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="State">State</option>
                            </select>
                            <input
                                type="text"
                                name="billing-zip"
                                className="flex-shrink-0 rounded-md border border-gray-300 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                                placeholder="ZIP"
                            />
                        </div>
                        {/* Total */}
                        <div className="mt-6 border-t border-b py-2">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                                <p className="font-semibold text-gray-900">&#8377; {totalPrice}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-gray-900">Shipping</p>
                                <p className="font-semibold text-gray-900">&#8377;{shippingCharge}</p>
                            </div>
                            {
                                coupon && <div className="flex items-center justify-between text-red-600">
                                    <p className="text-sm font-medium">{coupon?.couponCode}</p>
                                    <p className="font-semibold ">- &#8377;{discountAmount}</p>
                                </div>
                            }
                        </div>
                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">Total</p>
                            <p className="text-2xl font-semibold text-gray-900 flex items-center gap-x-2">
                                <span className={coupon ? 'text-zinc-400 text-lg line-through' : ''}>&#8377;{totalPrice + shippingCharge}</span>
                                {
                                    coupon && <span>&#8377;{totalPrice + shippingCharge - discountAmount}</span>
                                }
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handlePlaceOrder}
                        className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
                        Place Order
                    </button>
                </div>
            </div>
        </>

    );
};

export default CheckoutPage;
