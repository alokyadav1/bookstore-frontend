/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import OrderDetail from '../../components/admin/OrderDetail';
import Order from '../../components/admin/Order';
import axios from "../../Axios/axios"
import AdminContext from '../../context/AdminContext';
import FullScreenModal from '../../components/admin/Modal';
import { FaSort } from 'react-icons/fa6';

function Orders() {
  const { userList, orderList } = useContext(AdminContext)
  const [searchQuery, setSearchQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [amountSortAsc, setAmountSortAsc] = useState(false)
  const [orderDateSortAsc, setOrderDateSortAsc] = useState(false)
  useEffect(() => {
    setOrders(orderList)
  }, [orderList])

  const openModal = (order) => {
    setCurrentOrder(order);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setIsModalOpen(false)
  };

  const dateFormattingOptions = {
    year: 'numeric', month: 'long', day: 'numeric'
  }

  const handleSearch = (search) => {
    const filteredOrders = orderList?.filter(order => {
      return order.orderDetail.some(detail =>
        (detail.book.title.toLowerCase().includes(search.toLowerCase()) ||
          detail.book.author.toLowerCase().includes(search.toLowerCase()) ||
          detail.book.author.toLowerCase().includes(search.toLowerCase())) &&
        search === '' || order.orderId == parseInt(search)
      );
    });
    setOrders(filteredOrders)
  }

  const sortByAmount = () => {
    if (amountSortAsc) {
      sortByAmountAsc()
    } else {
      sortByAmountDesc()
    }
    setAmountSortAsc(!amountSortAsc)
  }
  const sortByAmountDesc = () => {
    const sorted = [...orders].sort((a, b) => b.totalAmount - a.totalAmount)
    console.log("sorted orders: ", sorted);
    setOrders(sorted)
  }

  const sortByAmountAsc = () => {
    const sorted = [...orders].sort((a, b) => a.totalAmount - b.totalAmount)
    console.log("sorted orders: ", sorted);
    setOrders(sorted)
  }


  const sortByOrderDate = () => {
    if (orderDateSortAsc) {
      sortByOrderDateAsc()
    } else {
      sortByOrderDateDesc()
    }
    setOrderDateSortAsc(!orderDateSortAsc)
  }

  const sortByOrderDateDesc = () => {
    const sorted = [...orders].sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
    console.log("sorted orders: ", sorted);
    setOrders(sorted)
  }

  const sortByOrderDateAsc = () => {
    const sorted = [...orders].sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate))
    console.log("sorted orders: ", sorted);
    setOrders(sorted)
  }

  const getUserById = (userId) => userList?.find(user => user.userID === userId);

  return (
    <>
      <FullScreenModal isOpen={isModalOpen} onClose={closeModal} showCloseBtn={true}>
        <div>
          <div className=' mb-6 text-center text-blue-600'>
            <h2 className='text-2xl font-bold'>Order History</h2>
            <p className='text-green-600 font-bold'>#{currentOrder.orderId}</p>
          </div>
          {currentOrder?.orderDetail?.map(detail => (
            <OrderDetail key={detail.orderDetailId} detail={detail} />
          ))}
        </div>
      </FullScreenModal>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by book title or author"
            className="border p-2 rounded w-full"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div className=''>
          <div className="border rounded-lg shadow-md bg-gray-50 mb-4 overflow-x-auto">
            <table className="w-full border-collapse text-center">
              <thead className='bg-slate-200'>
                <tr>
                  <th className="px-4 py-4 border-b-2">Order ID</th>
                  <th className="px-4 py-4 border-b-2">
                    <div className='flex items-center justify-center gap-x-1'>
                      <span>Order Date</span>
                      <FaSort className='text-sm cursor-pointer' onClick={sortByOrderDate}/>
                    </div>
                  </th>
                  <th className="px-4 py-4 border-b-2 ">
                    <div className='flex items-center justify-center gap-x-1'>
                      <span>Total Amount</span>
                      <FaSort className='text-sm cursor-pointer' onClick={sortByAmount} />
                    </div>
                  </th>
                  <th className="px-4 py-4 border-b-2">Customer</th>
                  <th className="px-4 py-4 border-b-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders?.map((order) => {
                    const user = getUserById(order.userId);
                    const orderDate = new Date(order.orderDate).toLocaleDateString('en-IN', dateFormattingOptions);
                    return (
                      <tr key={order.orderId} >
                        <td className="px-4 py-2 border-b">{order.orderId}</td>
                        <td className="px-4 py-2 border-b">{orderDate}</td>
                        <td className="px-4 py-2 border-b">&#8377;{order.totalAmount.toFixed(2)}</td>
                        <td className="px-4 py-2 border-b">{user?.email}</td>
                        <td className="px-4 py-2 border-b">
                          <button className='text-blue-500 py-2 px-4 rounded' onClick={() => openModal(order)}>View Books</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </>
  );
}

export default Orders