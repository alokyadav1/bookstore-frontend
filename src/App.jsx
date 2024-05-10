/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import AdminAuth from './pages/AdminAuth'
import LoginPage from './pages/user/Login'
import Register from './pages/user/Register'
import Home from './pages/Home'
import UserDashBoard from './components/user/UserDashBoard'
import Dashboard from './pages/user/Dashboard/Dashboard'
import UserContext from './context/UserContext'
import UserReducer from './reducer/UserReducer'
import axios from "./Axios/axios"
import Cart from './pages/user/Cart'
import CheckoutPage from './pages/user/Checkout'
import PaymentSuccessfulPage from './pages/user/PaymentSuccessful'
import OrderHistory from './pages/user/Order/OrderHistory'
function App() {

  const [user, dispatchUser] = useReducer(UserReducer, null)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userRole = localStorage.getItem("userRole")

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/user/get-user", {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })
      console.log("app res: ",res);
      dispatchUser({
        type: "SET_USER",
        payload: res.data.user
      })
    }

    if (currentUser?.token != null) {
      fetchUser()
    }   
  
  },[])

  const ProtectedUrl = ({ children }) => {
    if (userRole !== "User") {
      return <Navigate to="/user/login" />
    }
    return children;
  }
  return (
    <>
      <UserContext.Provider value={{user, dispatchUser}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<UserDashBoard />}>
              <Route index element={<Dashboard/>} />
              <Route path='cart' element={<Cart/>}/>
              <Route path='checkout' element={<CheckoutPage/>}/>
              <Route path='checkout/payment-success' element={<PaymentSuccessfulPage/>}/>
              <Route path='orderHistory' element={<OrderHistory/>}/>
            </Route>
            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

    </>
  )
}

export default App
