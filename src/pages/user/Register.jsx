/* eslint-disable no-unused-vars */
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "../../Axios/axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', mobileNumber: '', gender: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/user/register", { ...formData, role: "USER" });
      if (res.status === 200) {
        navigate("/user/not-verified");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex flex-col">
          {error && <span className="text-center w-full text-red-500 text-sm font-bold">{error}</span>}
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-5">
            <div className="flex gap-x-2 ">
              <div className="flex-grow">
                <label htmlFor="firstName" className="sr-only">
                  FirstName
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="First Name"
                  value={formData?.firstName}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
              </div>
              <div className="flex-grow">
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Last Name"
                  value={formData?.lastName}
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-x-2 ">
              <div className="flex gap-x-2 flex-grow">
                <label htmlFor="gender" className="text-slate-500">Gender</label>
                <div className="space-x-2 flex-grow text-center">
                  <label htmlFor="male">
                    <input type="radio" name="gender" id="male" value="MALE"
                      onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} /> Male
                  </label>
                  <label htmlFor="female">
                    <input type="radio" name="gender" id="female" value="FEMALE"
                      onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} /> Female
                  </label>
                </div>
              </div>
              <div className="flex-grow">
                <label htmlFor="mobile" className="sr-only">Mobile</label>
                <input type="number" id="mobile"
                  value={formData?.mobileNumber}
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData?.email}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData?.password}
                onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-35 disabled:cursor-not-allowed"
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">
            Already have an Account?{" "}
            <Link
              to="/user/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
