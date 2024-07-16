/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/admin/AdminSideBar'
import BookReducer from '../../reducer/BookReducer'
import AdminContext from '../../context/AdminContext'
import axios from "../../Axios/axios"
import UserListReducer from '../../reducer/UserListReducer'
import Modal from '../../components/admin/Modal'
import FullScreenModal from '../../components/admin/Modal'

function AdminLayout() {
    const [books, dispatchBooks] = useReducer(BookReducer)
    const [userList, dispatchUserList] = useReducer(UserListReducer)
    const [orderList, setOrderList] = useState([])
    const [nearOutOfStock, setNearOutOfStock] = useState();
    const [topCustomerWithMostPurchase, setTopCustomerWithMostPurchase] = useState([]);
    const admin = JSON.parse(localStorage.getItem("admin"))
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    useEffect(() => {
        const fetchBook = async () => {
            const res = await axios.get("/api/book/all-books");
            dispatchBooks({
                type: "SET_BOOK",
                payload: res.data
            })
        }

        const fetchUsers = async () => {
            const res = await axios.get("api/user/get-all-users", {
                headers: {
                    Authorization: `Bearer ${admin?.token}`
                }
            });
            dispatchUserList({
                type: "SET_USER_LIST",
                payload: res.data
            })
        }

        const fetchOrders = async () => {
            const res = await axios.get("/api/orders/get-all-orders", {
                headers: {
                    Authorization: `Bearer ${admin?.token}`
                }
            })
            setOrderList(res.data)
        }

        const fetchNearOutOfStockBooks = async () => {
            const res = await axios.get("/api/book/stock/near-out-of-stock", {
                headers: {
                    Authorization: `Bearer ${admin?.token}`
                }
            })

            setNearOutOfStock(res.data)
            if (res.data.length > 0) openModal()
        }

        const fetchTopCustomerWithMostPurchase = async () => {
            const res = await axios.get("/api/user/top-customer", {
                headers: {
                    Authorization: `Bearer ${admin?.token}`
                }
            })
            console.log("top customer", res.data);

            setTopCustomerWithMostPurchase(res.data)
        }
        fetchBook()
        fetchUsers()
        fetchOrders()
        fetchNearOutOfStockBooks()
        fetchTopCustomerWithMostPurchase()
    }, [admin?.token])
    return (
        <>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <div className='space-y-2 text-center'>
                    <p className='mb-5'>{nearOutOfStock?.length} books are getting out of stock</p>
                    <div>
                        {nearOutOfStock?.map((book, index) => (
                            <div key={index} className='flex justify-between items-center border-b p-2'>
                                <p>{book.title}</p>
                                <p>Stock: {book.stock}</p>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-center items-center'>
                        <Link to="/admin/inventory" onClick={closeModal} className='bg-red-500 text-white px-2 py-1 rounded'>View</Link>
                    </div>
                </div>
            </FullScreenModal>
            <AdminContext.Provider value={{ books, dispatchBooks, userList, dispatchUserList, orderList, nearOutOfStock, topCustomerWithMostPurchase }}>
                <div className='flex gap-x-2 '>
                    <div className='w-fit'>
                        <AdminSideBar />
                    </div>
                    <main className=' min-h-screen flex-grow rounded-md max-h-screen overflow-auto'>
                        <Outlet />
                    </main>
                </div>
                <Modal />
            </AdminContext.Provider>

        </>
    )
}

export default AdminLayout