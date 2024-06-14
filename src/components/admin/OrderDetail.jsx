/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/OrderDetail.jsx
import React from 'react';

const OrderDetail = ({ detail }) => {
    const { book, quantity } = detail;
    const bookCoverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

    return (
        <div className="border rounded-lg p-4 flex items-start bg-white mb-4">
            <div className='w-16 h-24 bg-slate-300 rounded'>
                <img src={bookCoverUrl} alt={book.title} className="w-16 h-24 object-cover rounded" />
            </div>
            <div className='px-4'>
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-700"><strong>Quantity:</strong> {quantity}</p>
                <p className='font-bold text-gray-700'>&#8377; {book?.price}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
