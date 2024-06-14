/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const CouponForm = ({couponData=null}) => {
  const [formData, setFormData] = useState(couponData || {
    couponCode: "",
    couponDesc: "",
    discount: null,
    maxDiscount: null,
    minAmount: null,
    expiryDate: "",
    eligibility: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white px-6 py-4 rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">{couponData ? 'Edit' : 'Add'} Coupon</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Coupon Code</label>
        <input
          type="text"
          name="couponCode"
          value={formData.couponCode}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description</label>
        <textarea
          name="couponDesc"
          value={formData.couponDesc}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Discount (%)</label>
        <input
          type="number"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Max Discount</label>
        <input
          type="number"
          name="maxDiscount"
          value={formData.maxDiscount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Min Amount</label>
        <input
          type="number"
          name="minAmount"
          value={formData.minAmount}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Expiry Date</label>
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Eligibility</label>
        <input
          type="text"
          name="eligibility"
          value={formData.eligibility}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Submit</button>
    </form>
  );
};

export default CouponForm;
