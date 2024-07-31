/* eslint-disable no-unused-vars */
import React from 'react'
import Header from '../../components/user/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/user/profile/SideBar'
import PersonalInfo from '../../components/user/profile/PersonalInfo'
import ManageAddress from '../../components/user/profile/ManageAddress'
import MyReviews from '../../components/user/profile/MyReviews'
function ProfileLayout() {
    return (
        <>
            <Header />
            <div className='hidden mt-16 px-2 md:flex md:gap-x-2'>
                <aside className='hidden md:block'>
                    <SideBar />
                </aside>
                <main className='flex-1 rounded-md p-2 bg-white shadow-sm'>
                    <Outlet />
                </main>
            </div>

            {/* Screen design */}
            <div className='md:hidden mt-16 px-2'>
                <div className=''>
                    <PersonalInfo />
                </div>

                <hr className='my-5'/>

                <div>
                    <ManageAddress />
                </div>

                <hr className='my-5' />

                <div>
                    <MyReviews />
                </div>
            </div>
        </>
    )
}

export default ProfileLayout