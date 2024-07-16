/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { NavLink } from 'react-router-dom'

function StatsCard({ icon, title, value, color, bgColor }) {
  return (
    <NavLink to={`${title.toLowerCase()}`}>
      <div className={`shadow-lg rounded-lg p-6 flex items-center space-x-4 ${bgColor} text-white`}>
        <div className={`text-3xl text-white`}>
          {icon}
        </div>
        <div>
          <div className="text-gray-200">{title}</div>
          <div className="text-2xl font-bold text-white">{value}</div>
        </div>
      </div>
    </NavLink>
  )
}

export default StatsCard