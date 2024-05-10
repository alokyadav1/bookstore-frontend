/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const PaymentSuccessfulPage = () => {
    const location = useLocation()
    const order = location.state;
    const [state, setState] = useState(order)
    
  const invoiceData = {
    // Replace with your invoice data
    invoiceNumber: 'INV-123456',
    amount: '$100',
    date: 'May 9, 2024',
    // Other relevant data
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-4">Payment Successful!</h1>
        <p className="text-lg text-center mb-6">Thank you for your purchase.</p>
        <div className="mb-6">
          <p className="text-gray-600">Invoice Number: {invoiceData.invoiceNumber}</p>
          <p className="text-gray-600">Amount: &#8377;{state.totalPrice}</p>
          <p className="text-gray-600">Date: {invoiceData.date}</p>
          {/* Additional invoice details */}
        </div>
        <div className="flex justify-between items-center">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <a href="#">Download Invoice</a>
          </button>
          <Link to="/user" className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfulPage;
