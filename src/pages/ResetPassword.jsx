/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import styles from "../styles/resetPassword.module.css"
import { ToastContainer } from 'react-toastify'
import { Link, useParams } from 'react-router-dom'
import axios from "../Axios/axios"
import { showToast } from '../utils/toast'
import Success from "../assets/success.png"
import InvalidLink from '../components/InvalidLink'

function ResetPassword() {
  const { token } = useParams()
  const [validToken, setValidToken] = useState(null)
  const [error, setError] = useState("")
  const [passwordDoesNotMatchError, setPasswordDoesNotMatchError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false)

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.get(`/api/reset-password/validate-password-token?token=${token}`)
        if (res.status === 200) {
          setValidToken(true)
        }
      } catch (error) {
        setValidToken(false)
        console.log(error);
      }
    }
    checkToken()
  })

  const handlePassword = (e) => {
    setPassword(e.target.value)
    checkPasswordMatch(e.target.value, confirmPassword)
  }
  const handleConfirmPasswordReset = (e) => {
    setConfirmPassword(e.target.value)
    checkPasswordMatch(password, e.target.value)
  }

  const checkPasswordMatch = (p1, p2) => {
    if (p1.length > 0 && p2.length > 0 && p1 !== p2) {
      setPasswordDoesNotMatchError("Passwords do not match")
    } else {
      setPasswordDoesNotMatchError("")
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPasswordDoesNotMatchError("Passwords do not match")
      return
    }
    setLoading(true)
    try {
      const res = await axios.post(`api/reset-password/reset-password?token=${token}`, { password })
      if (res.status === 200) {
        setPasswordResetSuccess(true)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  if (validToken === null) {
    return <div>loading...</div>
  } else if (validToken === false && passwordResetSuccess === false) {
    return <InvalidLink/>
  }
  return (
    <>
      <ToastContainer />

      <div className={`w-screen h-screen flex justify-center ${styles.bgPattern} `}>
        {
          passwordResetSuccess ? (
            <div className='mt-10 space-y-4 flex flex-col items-center'>
              <h2 className='text-lg font-bold text-center'>Password Reset Successful</h2>
              <div>
                <img src={Success} alt="success" width={150} />
              </div>
              <div className='text-center'>
                <p className=''>Your password has been changed successfully.</p>
                <p className=''>Please use below button to login to your account.</p>
              </div>
              <Link to="/user/login" className='bg-blue-600 text-white p-2 rounded-lg w-1/2 text-center hover:bg-blue-500 focus:ring'>Login</Link>
            </div>
          ) : (
            <div className='max-w-md px-10 py-5 mt-10 '>
              <div>
                <h2 className='text-lg font-bold text-center'>Reset Password</h2>
              </div>

              <div className='mt-10 opacity-70 text-sm'>
                <p>Enter your new password below. A strong password helps keep your account secure. </p>
              </div>

              <form onSubmit={handleResetPassword} className='mt-5 space-y-2'>
                <div className='space-y-1'>
                  <label htmlFor="password" className='text-slate-500'>New Password</label>
                  <input type="password" name="password" id="password"
                    value={password}
                    onChange={handlePassword}
                    required
                    className='block w-full p-2 rounded-lg border focus:outline-none focus:ring focus:ring-inset' />
                </div>
                <div className='space-y-1 mt-2'>
                  <label htmlFor="confirm-password" className='text-slate-500'>Confirm Password</label>
                  <input type="password" name="confirm-password" id="confirm-password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordReset}
                    required
                    className='block w-full p-2 rounded-lg border focus:outline-none focus:ring focus:ring-inset' />
                </div>
                {
                  passwordDoesNotMatchError && <p className='text-red-500 text-sm opacity-80'>Passwords do not match</p>
                }
                <button
                  className={`mt-5 bg-blue-600 text-white p-2 rounded-lg w-full hover:bg-blue-500 focus:ring disabled:bg-blue-400`} disabled={loading || (password.length <= 0 && confirmPassword.length <= 0) || password != confirmPassword}>
                  {loading ? 'Sending...' : 'Save'}
                </button>
              </form>

              <div className='mt-10 text-sm  flex gap-x-3 justify-center'>
                <p className='text-slate-500'>Remember your password?</p>
                <Link to={"/user/login"} className='text-blue-500'>Sign in</Link>
              </div>
            </div>
          )
        }
      </div >
    </>
  )
}

export default ResetPassword