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
                <main className='border flex-1 rounded-md p-2 bg-white'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default ProfileLayout