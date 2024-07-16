/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from 'react'
import axios from "../Axios/axios"


const OrderContext = createContext()

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const headers = {
    headers: {
        Authorization: `Bearer ${currentUser?.token}`
    }
}

function OrderProvider({ children }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const res = await axios.get("/api/orders/get-orders", headers)
            console.log("orders: ", res?.data);
            setOrders(res.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <OrderContext.Provider value={{ orders, loading }}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext;
export { OrderProvider }