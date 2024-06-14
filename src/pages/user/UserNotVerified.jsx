/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserNotVerified = () => {
  const navigate = useNavigate()
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      setEmailSent(true);
    } catch (error) {
      console.error('Error resending email:', error);
      alert('There was an error resending the email. Please try again later.');
    }
    setLoading(false);
  };

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Email Verification Required</h2>
        <p className="mb-4">You need to verify your email address to continue. Please check your email for the verification link.</p>
        <p className="mb-4">If you didn't receive the email, click the button below to resend the verification email.</p>
        {emailSent ? (
          <p className="text-green-600 flex items-center justify-center">
            <FaEnvelope className="mr-2" /> A verification email has been resent to your email address. Please check your inbox.
          </p>
        ) : (
          <button
            onClick={handleResendEmail}
            className={`px-4 py-2 mt-4 text-white rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Sending...' : (
              <div className="flex items-center">
                <FaEnvelope className="mr-2" /> Resend Verification Email
              </div>
            )}
          </button>
        )}
        <button
          onClick={handleBack}
          className="px-4 py-2 mt-4 text-white bg-gray-500 hover:bg-gray-700 rounded flex items-center absolute top-0 left-2"
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>
    </div>
  );
};

export default UserNotVerified;
