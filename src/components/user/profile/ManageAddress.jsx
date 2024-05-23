/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { address } from '../../../data/address'
import AddressCard from './AddressCard';
import request from '../../../utils/apiRequests';

function ManageAddress() {
  const [addresses, setAddresses] = useState(address);

  useEffect(() => {
    const fetchAddresses = async() => {
      try {
        const res = await request.get("/api/address/get-user-address")
        console.log("address: ",res?.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAddresses()
  })
  return (
    <div>
      <h2 className='text-xl'>My Addresses</h2>
      {
        address.map((add, index) => (
          <AddressCard key={index} address={add} />
        ))
      }
    </div>
  )
}

export default ManageAddress