/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import BooksBarChart from '../../components/admin/charts/BooksBarChart'
import { FaUser, FaBook, FaShoppingCart, FaDollarSign, FaTag, FaRupeeSign } from 'react-icons/fa';
import StatsCard from '../../components/admin/StatsCard';
import axios from "../../Axios/axios"
import AdminContext from '../../context/AdminContext';

const calculateTotalSales = (orders) => {
    const totalSales = orders.reduce((acc,order) => {
      return acc + order.totalAmount
    },0)

    return totalSales;
}

function AdminDash() {
  const { books, userList, orderList } = useContext(AdminContext)

  
  const stats = [
    { title: 'Users', value: userList?.length, icon: <FaUser />, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    { title: 'Books', value: books?.length, icon: <FaBook />, color: 'text-green-500', bgColor: 'bg-green-500' },
    { title: 'Orders', value: orderList?.length, icon: <FaShoppingCart />, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
    { title: 'Sales', value: calculateTotalSales(orderList), icon: <FaRupeeSign />, color: 'text-red-500', bgColor: 'bg-red-500' },
    { title: 'Coupons', value: 30, icon: <FaTag />, color: 'text-purple-500', bgColor: 'bg-purple-500' },
  ];

  console.log("books dash:", books);
  return (
    <div>
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            bgColor={stat.bgColor}
          />
        ))}
      </div>
      <div>
        <div className='w-1/2 border rounded shadow-lg px-2 mx-4'>
          <BooksBarChart inputData={books} />
        </div>
      </div>
    </div>
  )
}

export default AdminDash