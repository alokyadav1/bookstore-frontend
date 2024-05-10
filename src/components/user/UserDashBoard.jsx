/* eslint-disable no-unused-vars */
import React, { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import BookReducer from '../../reducer/BookReducer'
import AppContext from '../../context/AppContext'
import axios from "../../Axios/axios"
import cartReducer from '../../reducer/CartReducer'

function UserDashBoard() {
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

    const fetchCart = async() => {
      const res = await axios.get("/api/cart/get-cart",{
        headers:{
          Authorization:`Bearer ${currentUser.token}`
        }
      })

      const userCart = res.data.map(item => {
        return {book: item.book, quantity:item.quantity}
      })

      dispatchCart({
        type:"SET_CART",
        payload:userCart
      })

      console.log("user cart:", userCart);
    }

    fetchBook()
    fetchCart()

  }, [])


  return (
    <AppContext.Provider value={{books, dispatchBook, cart, dispatchCart}}>
      <>
        <Outlet />
      </>
    </AppContext.Provider>

  )
}

export default UserDashBoard