/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSideBar from '../../components/admin/AdminSideBar'
import BookReducer from '../../reducer/BookReducer'
import AdminContext from '../../context/AdminContext'
import axios from "../../Axios/axios"
import UserListReducer from '../../reducer/UserListReducer'
import Modal from '../../components/admin/Modal'

function AdminLayout() {
    const [books, dispatchBooks] = useReducer(BookReducer)
    const [userList, dispatchUserList] = useReducer(UserListReducer)
    const [orderList, setOrderList] = useState([])

    const admin = JSON.parse(localStorage.getItem("admin"))

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

        fetchBook()
        fetchUsers()
        fetchOrders()
    }, [admin?.token])
    return (
        <>
            <AdminContext.Provider value={{ books, dispatchBooks, userList, dispatchUserList, orderList }}>
                <div className='flex gap-x-2 '>
                    <div className='w-fit'>
                        <AdminSideBar />
                    </div>
                    <main className=' min-h-screen flex-grow rounded-md max-h-screen overflow-auto'>
                        <Outlet />
                    </main>
                </div>
                <Modal/>
            </AdminContext.Provider>

        </>
    )
}

export default AdminLayout