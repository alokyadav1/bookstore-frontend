/* eslint-disable no-unused-vars */
import React from 'react'
import { FaChevronRight, FaUser } from 'react-icons/fa'
import { BsFillHandbagFill } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'
import { RiFolderUserFill, RiUserSettingsFill } from 'react-icons/ri'
import { ImSwitch } from 'react-icons/im'
function SideBar() {
    return (
        <>
            <aside>
                <div className='flex gap-x-2 items-center bg-white p-2 rounded-md border'>
                    <div className='flex items-center justify-center text-white bg-blue-500 w-10 h-10 text-2xl rounded-full '>
                        <FaUser />
                    </div>
                    <div className=''>
                        <span className='text-xs text-zinc-400'>Hello,</span>
                        <p className='font-bold text-zinc-500'>Alok Yadav</p>
                    </div>
                </div>
                <div className='bg-white rounded-md border mt-2 text-zinc-500'>
                    <Link to="/user/orderHistory" className='flex items-center justify-between  border-b p-2'>
                        <div className='flex items-center gap-x-2 text-lg'>
                            <BsFillHandbagFill className='text-blue-500 ' />
                            <p>My Orders</p>
                        </div>
                        <FaChevronRight />
                    </Link>
                    <div className='p-2 border-b'>
                        <div className='flex items-center gap-x-2 text-lg'>
                            <RiUserSettingsFill className='text-blue-500 ' />
                            <p>Account Setting</p>
                        </div>
                        <div className='flex flex-col text-black'>
                            <NavLink to="" className='py-2 px-6 hover:bg-slate-50 hover:text-blue-500 rounded-md'>Personal Information</NavLink>
                            <NavLink to="address" className='py-2 px-6 hover:bg-slate-50 hover:text-blue-500 rounded-md'>Manage Addresses</NavLink>
                        </div>
                    </div>
                    <div className='p-2'>
                        <div className='flex items-center gap-x-2 text-lg'>
                            <RiFolderUserFill className='text-blue-500 ' />
                            <p>My Stuff</p>
                        </div>
                        <div className='flex flex-col text-black'>
                            <NavLink to="myReviews" className='py-2 px-6 hover:bg-slate-50 hover:text-blue-500 rounded-md'>Review And Ratings</NavLink>
                            <NavLink to="wishlist" className='py-2 px-6 hover:bg-slate-50 hover:text-blue-500 rounded-md'>My Wishlist</NavLink>
                            <NavLink to="myCoupons" className='py-2 px-6 hover:bg-slate-50 hover:text-blue-500 rounded-md'>My Coupons</NavLink>
                        </div>
                    </div>
                </div>
                <div className='flex gap-x-2 items-center bg-white p-2 rounded-md border mt-2'>
                    <div className='flex items-center justify-center text-white bg-red-500 w-8 h-8 text-lg rounded-full '>
                        <ImSwitch />
                    </div>
                    <p>Logout</p>
                </div>
            </aside>
        </>
    )
}

export default SideBar