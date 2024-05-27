/* eslint-disable no-unused-vars */
import React from 'react'
import Header from '../../components/user/Header'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/user/profile/SideBar'

function ProfileLayout() {
    return (
        <>
            <Header />
            <div className='mt-16 px-2 flex gap-x-2'>
                <aside className=''>
                    <SideBar />
                </aside>
                <main className=' flex-1 rounded-md p-2 bg-white shadow-sm'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default ProfileLayout