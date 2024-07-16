/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Alert({currentLoggedInUser}) {
    const redirectToLogin = () => {
        window.location.href = `/${currentLoggedInUser}/login`
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 py-5">
            <div className="relative bg-white p-4 rounded shadow-lg h-fit overflow-y-auto overflow-x-hidden no-scrollbar">
                <div className='flex flex-col items-center gap-4'>
                    <h1 className='text-2xl font-bold'>Session expired</h1>
                    <button className='bg-red-500 text-white rounded p-2' onClick={redirectToLogin}>Login Again</button>
                </div>
            </div>
        </div>
    )
}

export default Alert