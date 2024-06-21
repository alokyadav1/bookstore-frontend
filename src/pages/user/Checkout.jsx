/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/CheckoutPage.js

import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext"
import axios from "../../Axios/axios"
import ConfettiComponent from "../../components/ConfettiComponent";
import { ToastContainer } from "react-toastify";
import AddressContext from "../../context/AddressContext";
import Coupons from "./Coupons";
import CheckoutHeader from "./CheckoutHeader";
import PaymentDetail from "./PaymentDetail";
import ShippingAddress from "./ShippingAddress";

const CheckoutPage = () => {
    const navigate = useNavigate()
    const { dispatchCart } = useContext(AppContext)
    const { addresses, loading } = useContext(AddressContext)
    const [shippingAddress, setShippingAddress] = useState()
    const [cartItem, setCartItem] = useState(null)
    const [coupon, setCoupon] = useState(null)
    const [showConfetti, setShowConfetti] = useState(false)
    const [discountAmount, setDiscountAmount] = useState(0)
    const location = useLocation();
    // const cart = location.state.cart;
    let totalPrice = 0;
    const shippingCharge = 49;
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    useEffect(() => {
        setCartItem(location.state.cart)
        setShippingAddress(formateAddress(addresses.at(0)))
    }, [addresses, location.state.cart])

    const handlePlaceOrder = async () => {
        const book = cartItem?.map(item => {
            return {
                bookId: item.book.bookID,
                quantity: item.quantity
            }
        })

        const res = await axios.post("/api/orders/save-order", {
            totalAmount: totalPrice, 
            books: book, 
            couponId: coupon?.couponID,
            shippingAddress:shippingAddress,
            discountPrice:discountAmount,
            shipping_charges:shippingCharge
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

    // delete cart once order is completed
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

    const handleApplyCoupon = (response) => {
        console.log("coupon res", response);
        setShowConfetti(true)
        setDiscountAmount(response?.discount)
        setCoupon(response.coupon)
    }

    const changeShippingAddress = (newAddress) => {
        setShippingAddress(formateAddress(newAddress))
        console.log(newAddress);
    }

    const formateAddress = (address) => {
        const add = `${address.building},${address?.street},${address?.city},${address?.state}-${address?.pinCode}`
        const recipientName = address?.name
        const recipientMobile = address?.mobileNo

        return `${recipientName}/${add}/${recipientMobile}`
    }
    return (
        <>
            {showConfetti && <ConfettiComponent />}
            <ToastContainer />
            <CheckoutHeader />
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
                                                className="m-2 w-20 h-28 rounded-md border object-cover object-center"
                                                src={`https://covers.openlibrary.org/b/isbn/${item.book.isbn}-L.jpg`}
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
                    <Coupons appliedCoupon={handleApplyCoupon} totalPrice={totalPrice} />
                    {shippingAddress}
                </div>
                <div className="mt-10  px-1 pt-8 lg:mt-0">
                    <div className="space-y-2">
                        {/* Payment Detail */}
                        <div className="border p-4 bg-white rounded-md">
                            <PaymentDetail />
                        </div>

                        {/* shipping address */}
                        {
                            loading ? (
                                <div>
                                    Loading Addresses...
                                </div>
                            ) : (
                                <div className="border p-4 bg-white rounded-md">
                                    <ShippingAddress addresses={addresses} handleShippingAddressParent={changeShippingAddress} />
                                </div>
                            )
                        }

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
            </div >
        </>

    );
};

export default CheckoutPage;
