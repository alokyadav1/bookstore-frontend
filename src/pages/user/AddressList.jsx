/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaBuilding } from 'react-icons/fa6'

function AddressList({ addresses, shippingAddress = null, onShippingAddressChange }) {
    const handleAddressChange = (newAddress) => {
        onShippingAddressChange(newAddress)
    }
    return (
        <div>
            <h2 className='p-2 text-center text-xl font-bold'>Please Select Shipping Address</h2>
            <div className='space-y-5'>
                {
                    addresses.map((address, index) => {
                        return (
                            <div className={`p-2 border-2 rounded-md cursor-pointer ${address?.addressID == shippingAddress?.addressID && 'border-blue-500'}`} key={index}
                                onClick={() => handleAddressChange(address)}>
                                <div className="flex gap-x-2 items-center">
                                    <div className=' relative flex items-center justify-between'>
                                        <div className='flex items-center gap-x-1 p-1 px-1  text-zinc-500 rounded-md bg-slate-200 w-fit'>
                                            <AiFillHome />
                                            <p className='border w-fit text-sm'>{address?.addressType}</p>
                                        </div>
                                    </div>
                                    <p className=" mb-2 flex gap-x-5 font-bold pt-2 text-slate-600">
                                        <span>{address?.name}</span>
                                        <span>{address?.mobileNo}</span>
                                    </p>
                                </div>
                                <div className='flex items-center gap-x-2 text-zinc-500'>
                                    <FaBuilding />
                                    <p className='text-zinc-500'>
                                        <span>{address?.building}, </span>
                                        <span>{address?.street}, </span>
                                        <span>{address?.city}, </span>
                                        <span>{address?.state} - </span>
                                        <span className='font-bold'>{address?.pinCode} </span>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default AddressList