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
            <div className="border rounded-lg p-4 shadow-md bg-gray-50 mb-4 ">
                <table className="w-full text-left border-collapse ">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b-2">Order ID</th>
                            <th className="px-4 py-2 border-b-2">Order Date</th>
                            <th className="px-4 py-2 border-b-2">Total Amount</th>
                            <th className="px-4 py-2 border-b-2">Customer</th>
                            <th className="px-4 py-2 border-b-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="px-4 py-2 border-b">{order.orderId}</td>
                            <td className="px-4 py-2 border-b">{orderDate}</td>
                            <td className="px-4 py-2 border-b">&#8377;{order.totalAmount}</td>
                            <td className="px-4 py-2 border-b">{user?.email}</td>
                            <td className="px-4 py-2 border-b">
                                <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={openModal}>View Books</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
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
