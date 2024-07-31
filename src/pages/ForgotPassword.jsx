/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from "../styles/resetPassword.module.css"
import axios from "../Axios/axios"
import { ToastContainer } from 'react-toastify'
import { showToast } from '../utils/toast'
function ForgotPassword() {
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")

  const handleSendPasswordResetLink = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post("/api/reset-password/send-reset-token", { email })
      console.log("res: ", res);
      if (res.status == 200) {
        showToast("Reset link sent to your email")
      }
    } catch (error) {
      setError(error.response.data)
      showToast(error.response.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <ToastContainer />
      <div className={`w-screen h-screen flex justify-center ${styles.bgPattern} `}>
        <div className='max-w-md px-10 py-5 mt-10 '>
          <div>
            <h2 className='text-lg font-bold text-center'>Forgot Password</h2>
          </div>

          <div className='mt-10 opacity-70 text-sm'>
            <p>Enter the email address associated with your account and we'll send you a link to reset your password</p>
          </div>

          <form action="" className='mt-5' onSubmit={handleSendPasswordResetLink}>
            <div className='space-y-1'>
              <label htmlFor="email" className='text-slate-400'>Email</label>
              <input type="email" name="email" id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='block w-full p-2 rounded-lg border focus:outline-none focus:ring focus:ring-inset' />
            </div>
            <button
              className={`mt-4 bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-500 focus:ring disabled:bg-blue-400`} disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </button>
          </form>

          <div className='mt-10 text-sm  flex gap-x-3 justify-center'>
            <p className='text-slate-500'>Remember your password?</p>
            <Link to={"/user/login"} className='text-blue-500'>Sign in</Link>
          </div>
        </div>
      </div>
    </>

  )
}

export default ForgotPassword