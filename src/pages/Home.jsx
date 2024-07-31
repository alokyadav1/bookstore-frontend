/* eslint-disable no-unused-vars */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const navigateToPortal = (portal) => {
    navigate(`${portal}`)
  }
  return (
    <>
    <header className="bg-gray-800 text-white shadow-md">
      <div className=" mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">
          Bookstore
        </Link>
      </div>
    </header>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="space-y-8 text-center text-white">
          <h2 className="text-4xl md:text-2xl sm:text-sm font-extrabold">
            Welcome! Are you a User or Admin?
          </h2>
          <div className="flex flex-wrap justify-center gap-10">
            <div
              onClick={() => navigateToPortal('user')}
              className="group w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="/user.jpg"
                alt="User"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-500 transition-colors duration-300">
                  User Portal
                </h3>
                <p className="mt-2 text-gray-600">
                  Access your user dashboard and manage your account.
                </p>
              </div>
            </div>
            <div
              onClick={() => navigateToPortal('admin')}
              className="group w-64 h-80 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <img
                src="/admin.jpg"
                alt="Admin"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 group-hover:text-red-500 transition-colors duration-300">
                  Admin Portal
                </h3>
                <p className="mt-2 text-gray-600">
                  Manage users and settings for the application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}

export default Home