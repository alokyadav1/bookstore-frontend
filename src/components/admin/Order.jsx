/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/Order.jsx
import React, { useState } from 'react';
import OrderDetail from './OrderDetail';
import FullScreenModal from './Modal';

const Order = ({ order, user }) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
    };

    return (
        <>
            <div className="border rounded-lg p-4 shadow-md bg-gray-50 mb-4">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold">Order ID: {order.orderId}</h2>
                        <p className="text-gray-700"><strong>Order Date:</strong> {orderDate}</p>
                        <p className="text-gray-700"><strong>Total Amount:</strong> &#8377;{order.totalAmount}</p>
                        <p className="text-gray-700"><strong>Customer:</strong> {user?.email}</p>
                    </div>
                </div>
                <div>
                    <button className='bg-blue-500 text-white p-2 w-full rounded' onClick={openModal}>View Books</button>
                </div>
            </div>

            <FullScreenModal isOpen={isModalOpen} onClose={closeModal} showCloseBtn={true}>
                <div>
                    <div className=' mb-6 text-center text-blue-600'>
                        <h2 className='text-2xl font-bold'>Order History</h2>
                        <p className='text-green-600 font-bold'>#{order.orderId}</p>
                    </div>
                    {order.orderDetail.map(detail => (
                        <OrderDetail key={detail.orderDetailId} detail={detail} />
                    ))}
                </div>
            </FullScreenModal>
        </>
    );
};

export default Order;
