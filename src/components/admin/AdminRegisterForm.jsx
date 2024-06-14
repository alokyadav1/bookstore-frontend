/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from "../../Axios/axios"

const AdminRegisterForm = ({onSuccess}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onSuccess()
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg px-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Add Admin</h2>
        <form onSubmit={handleSubmit}>
          {['firstName', 'lastName', 'mobileNumber', 'email', 'password'].map((field) => (
            <div className="relative mb-6" key={field}>
              <input
                type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="peer placeholder-transparent h-10 w-full border rounded px-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-500"
                placeholder=" "
              />
              <label
                htmlFor={field}
                className="absolute left-2 top-3 text-gray-600 bg-white px-2 text-sm transition-all duration-200 ease-in-out transform -translate-y-6 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-blue-500"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            </div>
          ))}
          <div className="relative mb-6">
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="peer placeholder-transparent h-10 w-full border px-2 border-gray-300 rounded text-gray-900 focus:outline-none focus:border-blue-500"
              placeholder=" "
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
           
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminRegisterForm;
