/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import axios from "../../Axios/axios"
import { showToast } from '../../utils/toast'
import { ToastContainer } from 'react-toastify'

function Coupons({ appliedCoupon, totalPrice }) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const [coupon, setCoupon] = useState(null)
    const [couponCode, setCouponCode] = useState("")

    const handleApplyCoupon = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/api/coupon/apply-coupon", { couponCode }, {
                headers: {
                    Authorization: `Bearer ${currentUser?.token}`
                }
            })
            let discount = (totalPrice * res.data.discount) / 100
            if (discount > res.data.maxDiscount) discount = res.data.maxDiscount
            setCoupon(res.data)
            setCouponCode("")
            appliedCoupon({coupon:res.data,discount:discount})

        } catch (error) {
            console.log("error");
            showToast("Invalid")
        }
    }
    return (
        <div>
            <ToastContainer />
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
    )
}

export default Coupons