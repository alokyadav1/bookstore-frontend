/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import OrderDetail from '../../components/admin/OrderDetail';
import Order from '../../components/admin/Order';
import axios from "../../Axios/axios"
import AdminContext from '../../context/AdminContext';

const ordersData = [
  {
    "orderId": 22,
    "userId": 7,
    "orderDate": 1715884200000,
    "totalAmount": 899.0,
    "orderDetail": [
      {
        "orderDetailId": 45,
        "book": {
          "bookID": 290,
          "title": "Atomic Habits",
          "description": "A practical guide to building good habits.",
          "aboutBook": null,
          "author": "James Clear",
          "price": 450.0,
          "isbn": "9780735211292",
          "stock": 20,
          "category": "Self-Help"
        },
        "quantity": 1
      },
      {
        "orderDetailId": 46,
        "book": {
          "bookID": 300,
          "title": "The Big Sleep",
          "description": "A hard-boiled detective novel.",
          "aboutBook": null,
          "author": "Raymond Chandler",
          "price": 400.0,
          "isbn": "9780394758282",
          "stock": 20,
          "category": "Mystery"
        },
        "quantity": 1
      }
    ]
  },
  {
    "orderId": 23,
    "userId": 3,
    "orderDate": 1716229800000,
    "totalAmount": 369.0,
    "orderDetail": [
      {
        "orderDetailId": 47,
        "book": {
          "bookID": 270,
          "title": "Beyond Good and Evil",
          "description": "Explores concepts of morality and individualism.",
          "aboutBook": null,
          "author": "Friedrich Nietzsche",
          "price": 400.0,
          "isbn": "9780140449419",
          "stock": 20,
          "category": "Philosophy"
        },
        "quantity": 1
      }
    ]
  },

]
const usersData = [
  { userID: 7, username: "johndoe", email: "john.doe@example.com", role: "USER" },
  { userID: 3, username: "janedoe", email: "jane.doe@example.com", role: "USER" },
  // Add more users here...
];
function Orders() {
  const { userList, orderList } = useContext(AdminContext)
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = orderList?.filter(order => {
    return order.orderDetail.some(detail =>
      (detail.book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detail.book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        detail.book.author.toLowerCase().includes(searchQuery.toLowerCase())) &&
      searchQuery === '' || order.orderId == parseInt(searchQuery)
    );
  });

  const getUserById = (userId) => userList?.find(user => user.userID === userId);
  console.log("customeer name:", getUserById(3));
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by book title or author"
          className="border p-2 rounded w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {filteredOrders?.map(order => (
          <Order key={order.orderId} order={order} user={getUserById(order.userId)} />
        ))}
      </div>
    </div>
  );
}

export default Orders