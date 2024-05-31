/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/Coupon.jsx
import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const Coupon = ({ coupon, onEdit, onRemove }) => {
    return (
        <div className="relative bg-white shadow-lg rounded-lg mb-4 p-6 border-dashed border-4 border-gray-300">
            <div className="absolute top-2 right-2 flex space-x-2">
                <button
                    className="bg-blue-500 text-white p-2 rounded-full"
                    onClick={() => onEdit(coupon.couponID)}
                >
                    <FaEdit />
                </button>
                <button
                    className="bg-red-500 text-white p-2 rounded-full"
                    onClick={() => onRemove(coupon.couponID)}
                >
                    <FaTrashAlt />
                </button>
            </div>
            <div className="p-2 rounded-t-lg">
                <h2 className="text-xl font-bold">{coupon.couponCode}</h2>
            </div>
            <div className="p-4  rounded-b-lg bg-white">
                <p className="text-gray-700 mb-1"><strong>Description:</strong> {coupon.couponDesc}</p>
                <p className="text-gray-700 mb-1"><strong>Discount:</strong> {coupon.discount}%</p>
                <p className="text-gray-700 mb-1"><strong>Max Discount:</strong> ${coupon.maxDiscount}</p>
                <p className="text-gray-700 mb-1"><strong>Min Amount:</strong> ${coupon.minAmount}</p>
                <p className="text-gray-700 mb-1"><strong>Expiry Date:</strong> {coupon.expiryDate ? new Date(coupon.expiryDate).toLocaleDateString() : 'N/A'}</p>
                <p className="text-gray-700"><strong>Eligibility:</strong> {coupon.eligibility || 'N/A'}</p>
            </div>
        </div>
    );
};

export default Coupon;