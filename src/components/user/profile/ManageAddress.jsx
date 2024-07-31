/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { address } from '../../../data/address'
import AddressCard from './AddressCard';
import request from '../../../utils/apiRequests';
import { header } from '../../../utils/apiRequests';
import axios from "../../../Axios/axios"
import { FaCirclePlus, FaPlus } from 'react-icons/fa6';
import AddressForm from './AddressForm';
import AddressContext from '../../../context/AddressContext';

function ManageAddress() {
  const { addresses, loading } = useContext(AddressContext)
  const [showAddressForm, setShowAddressForm] = useState(false)

  const handleCancel = () => {
    setShowAddressForm(false)
  }

  if(loading){
    return <h1>Loading...</h1>
  }

  return (
    <div className='px-2'>
      <h2 className='text-xl pb-2'>Manage Addresses</h2>
      <div>
        <div className={`border rounded-md ${showAddressForm && 'bg-slate-50'}`}>
          {
            showAddressForm ? (
              <div className='p-5 py-3 w-fit md:w-2/3'>
                <p className='uppercase text-blue-600 text-center md:text-left'>Add a New Address</p>
                <AddressForm handleCancel={handleCancel} />
              </div>
            ) : (
              <div className='p-2 py-3 text-blue-600 flex items-center justify-start gap-x-2 cursor-pointer' onClick={() => setShowAddressForm(true)}>
                <FaPlus />
                <button className='uppercase'>Add a New Address</button>
              </div>
            )
          }
        </div>
        <div className='w-full mt-5'>
          {
            addresses.map((add, index) => (
              <AddressCard key={index} address={add} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default ManageAddress