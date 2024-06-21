/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaBuilding } from 'react-icons/fa6'
import FullScreenModal from '../../components/admin/Modal'
import AddressList from './AddressList'
import { showToast } from '../../utils/toast'
import { ToastContainer } from 'react-toastify'

function ShippingAddress({ addresses, handleShippingAddressParent }) {
    const [shippingAddress, setShippingAddress] = useState(addresses.at(0))
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => setIsModalOpen(true)
    const closeModal = () => setIsModalOpen(false)

    const handleShippingAddressChange = (newAddress) => {
        setShippingAddress(newAddress)
        handleShippingAddressParent(newAddress)
        closeModal()
    }
    return (
        <>
        <ToastContainer/>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <AddressList addresses={addresses} shippingAddress={shippingAddress} onShippingAddressChange={handleShippingAddressChange} />
            </FullScreenModal>
            <div className="">
                <h2 className="mb-4">Shipping Address</h2>
                <div className="p-2 border-2 border-blue-500 rounded-md shadow cursor-pointer" onClick={openModal}>
                    <div className="flex gap-x-2 items-center">
                        <div className=' relative flex items-center justify-between'>
                            <div className='flex items-center gap-x-1 p-1 px-1  text-zinc-500 rounded-md bg-slate-200 w-fit'>
                                <AiFillHome />
                                <p className='border w-fit text-sm'>{shippingAddress?.addressType}</p>
                            </div>
                        </div>
                        <p className=" mb-2 flex gap-x-5 font-bold pt-2 text-slate-600">
                            <span>{shippingAddress?.name}</span>
                            <span>{shippingAddress?.mobileNo}</span>
                        </p>
                    </div>
                    <div className='flex items-center gap-x-2 text-zinc-500'>
                        <FaBuilding />
                        <p className='text-zinc-500'>
                            <span>{shippingAddress?.building}, </span>
                            <span>{shippingAddress?.street}, </span>
                            <span>{shippingAddress?.city}, </span>
                            <span>{shippingAddress?.state} - </span>
                            <span className='font-bold'>{shippingAddress?.pinCode} </span>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShippingAddress