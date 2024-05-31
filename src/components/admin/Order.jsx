/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/components/Order.jsx
import React from 'react';
import OrderDetail from './OrderDetail';

const Order = ({ order,user }) => {
    const orderDate = new Date(order.orderDate).toLocaleDateString();

    return (
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
                {order.orderDetail.map(detail => (
                    <OrderDetail key={detail.orderDetailId} detail={detail} />
                ))}
            </div>
        </div>
    );
};

export default Order;
