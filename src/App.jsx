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
import Category from './pages/user/Category'
import SearchResult from './pages/user/SearchResult'
import BookDetail from './pages/user/BookDetail'
import PersonalInfo from './components/user/profile/PersonalInfo'
import ManageAddress from './components/user/profile/ManageAddress'
import MyReviews from './components/user/profile/MyReviews'
import MyCoupons from './components/user/profile/MyCoupons'
import ProfileLayout from './pages/user/ProfileLayout'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDash from './pages/admin/AdminDash'
import Users from './pages/admin/Users'
import Books from './pages/admin/Books'
import Orders from './pages/admin/Orders'
import Coupons from './pages/admin/Coupons'

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
      console.log("app res: ", res);
      dispatchUser({
        type: "SET_USER",
        payload: res.data.user
      })
    }

    if (currentUser?.token != null) {
      fetchUser()
    }

  }, [])

  const ProtectedAdmin = ({ children }) => {
    if (userRole !== "ADMIN") {
      return <Navigate to="/admin/login" />
    }
    return children;
  }
  return (
    <>
      <UserContext.Provider value={{ user, dispatchUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/user' element={<UserDashBoard />}>
              <Route index element={<Dashboard />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<CheckoutPage />} />
              <Route path='checkout/payment-success' element={<PaymentSuccessfulPage />} />
              <Route path='orderHistory' element={<OrderHistory />} />
              <Route path='category/:categoryName' element={<Category />} />
              <Route path='search/:keyword' element={<SearchResult />} />
              <Route path='book/:bookID' element={<BookDetail />} />
              <Route path='profile' element={<ProfileLayout />}>
                <Route index element={<PersonalInfo />} />
                <Route path='address' element={<ManageAddress />} />
                <Route path='myreviews' element={<MyReviews />} />
                <Route path='mycoupons' element={<MyCoupons />} />
              </Route>
            </Route>

            <Route path='/admin' element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
              <Route index element={<AdminDash />} />
              <Route path='users' element={<Users />} />
              <Route path='books' element={<Books />} />
              <Route path='orders' element={<Orders />} />
              <Route path='coupons' element={<Coupons />} />
            </Route>


            <Route path='/user/login' element={<LoginPage />} />
            <Route path='/user/register' element={<Register />} />
            <Route path='/admin/login' element={<AdminLogin/>} />
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>

    </>
  )
}

export default App
