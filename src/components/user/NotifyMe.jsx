/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const NotifyMe = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setMessage('Thank you! You will be notified.');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg ">
      <h2 className="text-2xl font-bold text-center mb-4">Notify Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Notify Me
          </button>
        </div>
        {message && <p className="text-center text-green-500">{message}</p>}
      </form>
    </div>
  );
};

export default NotifyMe;
