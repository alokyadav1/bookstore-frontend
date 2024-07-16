/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import BooksBarChart from '../../components/admin/charts/BooksBarChart'
import { FaUser, FaBook, FaShoppingCart, FaDollarSign, FaTag, FaRupeeSign } from 'react-icons/fa';
import StatsCard from '../../components/admin/StatsCard';
import axios from "../../Axios/axios"
import AdminContext from '../../context/AdminContext';

const calculateTotalSales = (orders) => {
  const totalSales = orders.reduce((acc, order) => {
    return acc + order.totalAmount
  }, 0)

  return totalSales;
}

function AdminDash() {
  const { books, userList, orderList, topCustomerWithMostPurchase } = useContext(AdminContext)


  const stats = [
    { title: 'Users', value: userList?.length, icon: <FaUser />, color: 'text-blue-500', bgColor: 'bg-blue-500' },
    { title: 'Books', value: books?.length, icon: <FaBook />, color: 'text-green-500', bgColor: 'bg-green-500' },
    { title: 'Orders', value: orderList?.length, icon: <FaShoppingCart />, color: 'text-yellow-500', bgColor: 'bg-yellow-500' },
    { title: 'Sales', value: calculateTotalSales(orderList).toFixed(2), icon: <FaRupeeSign />, color: 'text-red-500', bgColor: 'bg-red-500' },
    { title: 'Coupons', value: 30, icon: <FaTag />, color: 'text-purple-500', bgColor: 'bg-purple-500' },
  ];

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
      <div className='flex items-stretch '>
        <div className='flex-grow w-1/3 border rounded shadow-lg px-2 ml-4 mr-2 bg-white'>
          <BooksBarChart inputData={books} />
        </div>
        <div className='flex-grow bg-white rounded-lg shadow-md mx-4'>
          <h2 className='m-2 text-center  text-lg font-medium text-gray-900 mb-4'>Top Customers by Orders</h2>
          <table className=' min-w-full divide-y divide-gray-200 text-center'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope='col' className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>First Name</th>
                <th scope='col' className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Last Name</th>
                <th scope='col' className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                <th scope='col' className='px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'>Total Orders</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {topCustomerWithMostPurchase.map((customer, index) => (
                <tr key={index} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{customer?.firstName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{customer?.lastName}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{customer?.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{customer?.orderCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default AdminDash