/* eslint-disable no-unused-vars */
import React from 'react'

function CheckoutHeader() {
    return (
        <div className="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
            <a href="/user" className="text-2xl font-bold text-gray-800">
                Bookstore
            </a>
            <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
                <div className="relative">
                    <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                                href="#"
                            >

                            </a>
                            <span className="font-semibold text-gray-900">Shop</span>
                        </li>

                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                                href="#"
                            >
                                2
                            </a>
                            <span className="font-semibold text-gray-900">Shipping</span>
                        </li>

                        <li className="flex items-center space-x-3 text-left sm:space-x-4">
                            <a
                                className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                                href="#"
                            >
                                3
                            </a>
                            <span className="font-semibold text-gray-500">Payment</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default CheckoutHeader