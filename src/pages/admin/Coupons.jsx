/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Coupon from '../../components/admin/Coupon';
import { FaPlus } from 'react-icons/fa';
import FullScreenModal from '../../components/admin/Modal';
import CouponForm from '../../components/admin/CouponForm';
import { ToastContainer } from 'react-toastify';

const couponsData = [
  {
    "couponID": 1,
    "couponCode": "FIRST",
    "couponDesc": "Special Discount for New Customers",
    "discount": 20,
    "maxDiscount": 100,
    "minAmount": 299.0,
    "expiryDate": null,
    "eligibility": null
  },
  {
    "couponID": 2,
    "couponCode": "SECOND",
    "couponDesc": "Special Discount for New Customers",
    "discount": 20,
    "maxDiscount": 100,
    "minAmount": 299.0,
    "expiryDate": null,
    "eligibility": null
  }
]


function Coupons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [coupons, setCoupons] = useState(couponsData);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEdit = (couponID) => {
    console.log('Edit coupon with ID:', couponID);
    // Implement the logic to edit the coupon details
  };

  const handleRemove = (couponID) => {
    setCoupons(coupons.filter(coupon => coupon.couponID !== couponID));
  };

  const filteredCoupons = coupons.filter(coupon =>
    coupon.couponCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coupon.couponDesc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false)
  };

  return (
    <>
      <ToastContainer />
      <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
        <CouponForm />
      </FullScreenModal>

      <div className="container mx-auto p-4 ">
        <h1 className="text-2xl font-bold mb-4">Coupons</h1>
        <div className="mb-4 flex justify-between">
          <input
            type="text"
            placeholder="Search by coupon code or description"
            className="border p-2 rounded w-1/2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="flex items-center bg-blue-600 text-white rounded shadow px-5 gap-x-2" onClick={openModal}>
            <FaPlus />
            Add Coupons
          </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {filteredCoupons.map(coupon => (
            <Coupon
              key={coupon.couponID}
              coupon={coupon}
              onEdit={handleEdit}
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>


    </>
  );
}

export default Coupons