/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';
import axios from "../../Axios/axios"
import { AiOutlineMail } from 'react-icons/ai';
import Header from '../../components/user/Header';

const EmailVerificationSuccess = () => {
    const { token } = useParams()
    console.log("token", token);
    const [error, setError] = useState()

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.post(`/auth/user/verify?token=${token}`)
            } catch (error) {
                setError("Token is expired or invalid")
            }
        }
        verifyUser()
    }, [token])

    const handleResendEmail = () => {

    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {
                    error ? (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md space-y-5">
                            <div>
                                <h3 className="text-lg font-semibold">Oops!</h3>
                                <p className="text-sm">It seems like the link you clicked is either expired or the token is invalid.</p>
                            </div>
                            <button
                                onClick={handleResendEmail}
                                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
                            >
                                <AiOutlineMail className="mr-1" /> Resend Email
                            </button>
                        </div>
                    ) : (
                        <div className="max-w-md w-full space-y-8">
                            <div>
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                    Email Verified Successfully!
                                </h2>
                                <p className="mt-2 text-center text-sm text-gray-600">
                                    Your email has been successfully verified.
                                </p>
                            </div>
                            <div>
                                <Link
                                    to="/user/login"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
};

export default EmailVerificationSuccess;
