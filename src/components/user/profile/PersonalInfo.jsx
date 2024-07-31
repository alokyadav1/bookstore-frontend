/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../../../context/UserContext'
import axios from "../../../Axios/axios"
import { ToastContainer } from 'react-toastify'
import { showToast } from '../../../utils/toast'

function PersonalInfo() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const { user } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState(null)
  const [infoEditable, setInfoEditable] = useState(false)
  const [emailEditable, setEmailEditable] = useState(false)
  const [mobileEditable, setMobileEditable] = useState(false)

  useEffect(() => {
    setUserDetails(user)
  }, [user])


  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails({ ...userDetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await axios.patch(`/api/user/update`, userDetails, {
      headers: {
        'Authorization': `Bearer ${currentUser?.token}`
      }
    })
    if (res.status === 200) {
      showToast("User details updated successfully")
    } else {
      showToast("Error updating user details")
    }
    setInfoEditable(false)
    setEmailEditable(false)
    setMobileEditable(false)
    console.log("userDetails", userDetails);
  }
  return (
    <>
      <ToastContainer />
      <div className='py-4 px-2'>
        <div className='mb-3 flex gap-x-5 items-center'>
          <h2 className='text-xl '>Personal Information</h2>
          {
            infoEditable ? (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => {
                setInfoEditable(false)
                setUserDetails(user)
              }}>Cancel</span>
            ) : (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setInfoEditable(true)}>Edit</span>
            )
          }
        </div>
        <form className='w-fit'>
          <div className='flex flex-wrap gap-x-5 gap-y-2 w-full '>
            <div className='flex flex-col w-full max-w-sm md:w-fit '>
              <label htmlFor="firstName" className='text-sm text-slate-500'>First Name</label>
              <input type="text" name="firstName" id='firstName' value={userDetails?.firstName}
                onChange={handleInputChange}
                className='p-2 rounded-md w-full bg-slate-50 border disabled:opacity-75 disabled:bg-slate-200  disabled:cursor-not-allowed'
                disabled={!infoEditable}
              />
            </div>
            <div className='flex flex-col w-full max-w-sm md:w-fit '>
              <label htmlFor="lastName" className='text-sm text-slate-500'>Last Name</label>
              <input type="text" id='lastName' name='lastName' value={userDetails?.lastName}
                onChange={handleInputChange}
                className='p-2 rounded-md bg-slate-50 border disabled:opacity-75 disabled:bg-slate-200  disabled:cursor-not-allowed'
                disabled={!infoEditable}
              />
            </div>

          </div>
          <div className='mt-5'>
            <p className='text-sm text-slate-500'>Your Gender</p>
            <div className={`flex gap-x-5`}>
              <div className='space-x-1 '>
                <input type="radio"
                  value={"MALE"}
                  name='gender'
                  id='male'
                  checked={userDetails?.gender == "MALE"}
                  onChange={handleInputChange}
                  disabled={!infoEditable} />
                <label htmlFor="male">Male</label>
              </div>
              <div className='space-x-1'>
                <input
                  type="radio"
                  value={"FEMALE"}
                  name='gender'
                  id='female'
                  checked={userDetails?.gender == "FEMALE"}
                  onChange={handleInputChange}
                  disabled={!infoEditable} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          {
            infoEditable && (
              <div className='flex justify-center'>
                <button className='bg-blue-600 text-white p-1 px-4 mt-2 rounded-sm' onClick={handleSubmit}>Save</button>
              </div>
            )
          }
        </form>
      </div >

      <div className='py-4 px-2'>
        <div className='mb-3 flex items-center gap-x-5'>
          <h2 className='text-xl '>Email Address</h2>
          {
            emailEditable ? (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setEmailEditable(false)}>Cancel</span>
            ) : (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setEmailEditable(true)}>Edit</span>
            )
          }
        </div>
        <form className=''>
          <div className='w-full max-w-sm md:w-2/5 flex gap-x-4'>
            <input type="email" value={userDetails?.email}
              onChange={handleInputChange}
              className='p-2 rounded-md bg-slate-50 border w-full disabled:opacity-75 disabled:bg-slate-200  disabled:cursor-not-allowed'
              disabled={!emailEditable}
            />
            {
              emailEditable && <button className='bg-blue-600 text-white p-1 px-4 rounded-md'>Save</button>
            }
          </div>
        </form>
      </div>

      <div className='py-4 px-2'>
        <div className='mb-3 flex items-center gap-x-5 '>
          <h2 className='text-xl'>Mobile Number</h2>
          {
            mobileEditable ? (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setMobileEditable(false)}>Cancel</span>
            ) : (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setMobileEditable(true)}>Edit</span>
            )
          }
        </div>
        <form>
          <div className='w-full max-w-sm md:w-2/5 flex gap-x-4 '>
            <input type="number" value={userDetails?.mobileNumber}
              onChange={handleInputChange}
              className='p-2 rounded-md bg-slate-50 border w-full disabled:opacity-75 disabled:bg-slate-200 disabled:cursor-not-allowed'
              disabled={!mobileEditable}
            />
            {
              mobileEditable && <button className='bg-blue-600 text-white p-1 px-4 rounded-md'>Save</button>
            }
          </div>
        </form>
      </div>
    </>
  )
}

export default PersonalInfo