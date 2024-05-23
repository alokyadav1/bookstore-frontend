/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaBuilding } from 'react-icons/fa6'

function AddressCard({ address }) {
    return (
        <div className="w-fit p-2 shadow-md rounded-lg my-4 bg-slate-50">
            <div className="p-2">
                <div className='flex items-center gap-x-1 p-1 px-1  text-zinc-500 rounded-md bg-slate-200 w-fit'>
                    <AiFillHome/>
                    <p className='border w-fit text-sm'>{address.addressType}</p>
                </div>
                <p className=" mb-2 flex gap-x-5 font-bold pt-2">
                    <span>{address.name}</span>
                    <span>{address.mobileNo}</span>
                </p>
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
        </div>
    )
}

export default AddressCard