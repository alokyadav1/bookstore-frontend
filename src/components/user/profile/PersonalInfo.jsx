/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import UserContext from '../../../context/UserContext'

function PersonalInfo() {
  const {user} = useContext(UserContext)
  const [infoEditable, setInfoEditable] = useState(false)
  const [emailEditable, setEmailEditable] = useState(false)
  const [mobileEditable, setMobileEditable] = useState(false)
  return (
    <>
      <div className='py-4 px-2'>
        <div className='mb-3 flex gap-x-5 items-center'>
          <h2 className='text-xl '>Personal Information</h2>
          {
            infoEditable ? (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setInfoEditable(false)}>Cancel</span>
            ) : (
              <span className='text-sm text-blue-500 cursor-pointer' onClick={() => setInfoEditable(true)}>Edit</span>
            )
          }
        </div>
        <form className='w-fit'>
          <div className='flex gap-x-5 '>
            <div className='flex flex-col '>
              <label htmlFor="firstName" className='text-sm text-slate-500'>First Name</label>
              <input type="text" name="firstName" id='firstName' value={user?.firstName}
                className='p-2 rounded-md bg-slate-50 border disabled:opacity-75 disabled:bg-slate-200  disabled:cursor-not-allowed'
                disabled={!infoEditable}
              />
            </div>
            <div className='flex flex-col '>
              <label htmlFor="lastName" className='text-sm text-slate-500'>Last Name</label>
              <input type="text" id='lastName' value={user?.lastName}
                className='p-2 rounded-md bg-slate-50 border disabled:opacity-75 disabled:bg-slate-200  disabled:cursor-not-allowed'
                disabled={!infoEditable}
              />
            </div>

          </div>
          <div className='mt-5'>
            <p className='text-sm text-slate-500'>Your Gender</p>
            <div className={`flex gap-x-5`}>
              <div className='space-x-1 '>
                <input type="radio" value={"MALE"} name='gender' id='male' checked={user?.gender == "MALE"} disabled={!infoEditable} />
                <label htmlFor="male">Male</label>
              </div>
              <div className='space-x-1'>
                <input type="radio" value={"FEMALE"} name='gender' id='female' checked={user?.gender == "FEMALE"} disabled={!infoEditable} />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>
          {
            infoEditable && (
              <div className='flex justify-center'>
                <button className='bg-blue-600 text-white p-1 px-4 rounded-sm'>Save</button>
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
        <form>
          <div className='w-2/5 flex gap-x-4'>
            <input type="email" value={user?.email}
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
          <div className='w-2/5 flex gap-x-4 '>
            <input type="number" value={user?.mobileNumber}
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