/* eslint-disable no-unused-vars */
import React from 'react'
import styles from "../styles/resetPassword.module.css"
import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa'
function InvalidLink() {
    return (
        <div className={`w-screen h-screen flex justify-center ${styles.bgPattern}`}>
            <div className='mt-16'>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">Link is not valid anymore</h2>
                <p className="text-slate-400 mb-4">This could be one of the reasons:</p>
                <ul className="list-disc list-inside text-gray-600 mb-5">
                    <li>The link has expired.</li>
                    <li>The link has already been used.</li>
                    <li>The link is broken.</li>
                    <li>The link has been tampered with.</li>
                </ul>
                <div className='flex justify-start'>
                    <Link to="/user/" className='flex items-center justify-center gap-2 bg-blue-600 text-white p-2 rounded-lg w-full text-center hover:bg-blue-500 focus:ring '>
                        Go back to Home
                        <FaArrowRight />
                    </Link>
                </div>
            </div>


        </div>
    )
}

export default InvalidLink