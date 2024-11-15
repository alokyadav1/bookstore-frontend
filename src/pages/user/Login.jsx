/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "../../Axios/axios";
import SessionContext from "../../context/sessionContext";

const now = Date.now();
const LoginPage = () => {
  const navigate = useNavigate();
  const { dispatchUser } = useContext(UserContext);
  const {dispatchSession} = useContext(SessionContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/user/login", { email, password, role:"USER" })
      console.log(res);
      console.log(res.status);
      if (res.status == 200) {
        localStorage.setItem("currentUser", JSON.stringify(res.data))
        localStorage.setItem("userRole", "USER")

        dispatchSession({
          type: "LOGIN",
        })
        
        dispatchUser({
          type: "SET_USER",
          payload: res.data.user
        })
        navigate("/user")
      }
    } catch (error) {
      console.log(error.response.status);
      setError(error.response.data)
      setLoading(false)
    }
    setLoading(false);

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="w-full flex flex-col">
          {error && <span className="text-center w-full text-red-500 text-sm font-bold">{error}</span>}
          <h2 className=" text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm space-y-5">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">

            <div className="text-sm">
              <Link
                to={"/user/forgot-password"}
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-progress"
              disabled={loading}
            >
              Sign in
            </button>
          </div>
        </form>
        <div className="text-sm text-center">
          <p className="text-gray-600">
            New user?{" "}
            <Link
              to="/user/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
