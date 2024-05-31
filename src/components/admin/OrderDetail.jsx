/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// src/components/OrderDetail.jsx
import React from 'react';

const OrderDetail = ({ detail }) => {
    const { book, quantity } = detail;
    const bookCoverUrl = `https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`;

    return (
        <div className="border rounded-lg p-4 flex items-start bg-white mb-4">
            <img src={bookCoverUrl} alt={book.title} className="w-16 h-24 object-cover mr-4" />
            <div>
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-gray-700"><strong>Quantity:</strong> {quantity}</p>
            </div>
        </div>
    );
};

export default OrderDetail;
