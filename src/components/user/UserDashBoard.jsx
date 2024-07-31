/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import BookReducer from '../../reducer/BookReducer'
import AppContext from '../../context/AppContext'
import axios from "../../Axios/axios"
import cartReducer from '../../reducer/CartReducer'
import { AddressProvider } from '../../context/AddressContext'
import { OrderProvider } from '../../context/OrderContext.jsx'
import UserContext from '../../context/UserContext.js'

function UserDashBoard() {
  const { user } = useContext(UserContext)
  const [books, dispatchBook] = useReducer(BookReducer, null)
  const [cart, dispatchCart] = useReducer(cartReducer, [])
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get("/api/book/all-books");
      dispatchBook({
        type: "SET_BOOK",
        payload: res.data
      })
    }

    const fetchCart = async () => {
      const res = await axios.get("/api/cart/get-cart", {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })

      const userCart = res.data.map(item => {
        return { book: item.book, quantity: item.quantity }
      })

      dispatchCart({
        type: "SET_CART",
        payload: userCart
      })

      console.log("user cart:", userCart);
    }

    if (user != null) {
      fetchCart()
    }
    fetchBook()

  }, [currentUser?.token])


  return (
    <AppContext.Provider value={{ books, dispatchBook, cart, dispatchCart }}>
      <AddressProvider>
        <OrderProvider>
          <>
            <Outlet />
          </>
        </OrderProvider>
      </AddressProvider>

    </AppContext.Provider>

  )
}

export default UserDashBoard