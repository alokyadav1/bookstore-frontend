/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useReducer, useEffect } from 'react'
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom'
import AdminAuth from './pages/AdminAuth'
import LoginPage from './pages/user/Login'
import Register from './pages/user/Register'
import Home from './pages/Home'
import UserDashBoard from './components/user/UserDashBoard'
import Dashboard from './pages/user/Dashboard/Dashboard'
import UserContext from './context/UserContext'
import UserReducer from './reducer/UserReducer'
import SessionReducer from './reducer/SessionReducer'
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
import UserNotVerified from './pages/user/UserNotVerified'
import EmailVerificationSuccess from './pages/user/EmailVerificationSuccess'
import Invoice from './components/user/Invoice'
import Inventory from './pages/admin/Inventory'
import SessionContext from './context/sessionContext'
import FullScreenModal from './components/admin/Modal'
import Alert from './components/Alert'
import SessionAlertModal from './components/SessionAlertModal'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'

function App() {

  const [session, dispatchSession] = useReducer(SessionReducer, { isLoggedIn: false });
  const [tokenExpired, setTokenExpired] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [user, dispatchUser] = useReducer(UserReducer, null)
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const admin = JSON.parse(localStorage.getItem("admin"));
  const userRole = localStorage.getItem("userRole")
  const [timeoutID, setTimeoutID] = useState(null)
  const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null)

  useEffect(() => {
    const fetchUser = async (token) => {
      try {
        const res = await axios.get("/api/user/get-user", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log("App.js: ", res.data);
        dispatchUser({
          type: "SET_USER",
          payload: res.data.user
        })
      } catch (error) {
        console.log("Error: ", error);
        localStorage.clear()
      }
    }

    if (currentUser?.token != null) {
      fetchUser(currentUser?.token)
    } else if (admin?.token != null) {
      fetchUser(admin?.token)
    }

    return () => clearTimeout(timeoutID)

  }, [])

  // useEffect(() => {
  //   if (session.isLoggedIn) {
  //     const tokenExpirationTimeout = setTimeout(() => {
  //       if (userRole === 'USER') {
  //         setCurrentLoggedInUser("user")
  //         localStorage.removeItem('userRole');
  //         localStorage.removeItem('currentUser');
  //       } else if (userRole === 'ADMIN') {
  //         setCurrentLoggedInUser("admin")
  //         localStorage.removeItem('userRole');
  //         localStorage.removeItem('admin');
  //       }

  //       setTokenExpired(true)
  //     }, 1000 * 120)
  //     setTimeoutID(tokenExpirationTimeout)
  //   }

  //   return () => clearTimeout(timeoutID)
  // }, [session])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const ProtectedAdmin = ({ children }) => {
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('admin');

    if (storedRole !== 'ADMIN' || !storedUser) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('admin');
      return <Navigate to="/admin/login" />;
    }

    return children;
  }

  const ProtectedUserProfile = ({ children }) => {
    const storedRole = localStorage.getItem('userRole');
    const storedUser = localStorage.getItem('currentUser');

    if (storedRole !== 'USER' || !storedUser) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('currentUser');
      return <Navigate to="/user/login" />;
    }

    return children
  }
  return (
    <>

      <SessionContext.Provider value={{ session, dispatchSession }}>
        <UserContext.Provider value={{ user, dispatchUser }}>
          {
            tokenExpired && (
              <Alert currentLoggedInUser={currentLoggedInUser} />
            )
          }
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/user' element={<UserDashBoard />}>
                <Route index element={<Dashboard />} />
                <Route path='cart' element={<Cart />} />
                <Route path='checkout' element={<CheckoutPage />} />
                <Route path='checkout/payment-success' element={<PaymentSuccessfulPage />} />
                <Route path='orderHistory' element={<OrderHistory />} />
                <Route path='invoice' element={<Invoice />} />
                <Route path='category/:categoryName' element={<Category />} />
                <Route path='search/:keyword' element={<SearchResult />} />
                <Route path='book/:bookID' element={<BookDetail />} />
                <Route path='profile' element={<ProtectedUserProfile><ProfileLayout /></ProtectedUserProfile>}>
                  <Route index element={<PersonalInfo />} />
                  <Route path='address' element={<ManageAddress />} />
                  <Route path='myreviews' element={<MyReviews />} />
                  <Route path='mycoupons' element={<MyCoupons />} />
                </Route>
              </Route>

              <Route path='/admin' element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
                <Route path='' element={<AdminDash />} />
                <Route path='users' element={<Users />} />
                <Route path='books' element={<Books />} />
                <Route path='orders' element={<Orders />} />
                <Route path='coupons' element={<Coupons />} />
                <Route path='inventory' element={<Inventory />} />
              </Route>


              <Route path='/user/login' element={<LoginPage />} />
              <Route path='/user/register' element={<Register />} />
              <Route path='/user/forgot-password' element={<ForgotPassword />} />
              <Route path='/user/reset-password/:token' element={<ResetPassword />} />
              <Route path='/user/not-verified' element={<UserNotVerified />} />
              <Route path='/user/verify/:token' element={<EmailVerificationSuccess />} />
              <Route path='/admin/login' element={<AdminLogin />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </SessionContext.Provider>

      {
        user != null && <SessionAlertModal />
      }

    </>
  )
}

export default App
