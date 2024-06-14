/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { AiFillHome } from 'react-icons/ai'
import { FaBuilding, FaEllipsisVertical } from 'react-icons/fa6'
import AddressForm from './AddressForm'
import { ToastContainer } from 'react-toastify'
import FullScreenModal from '../../admin/Modal'
import { ConfirmModal } from '../../admin/ConfirmModal'
import DeleteModalContent from '../../admin/DeleteModalContent'
import { showToast } from '../../../utils/toast'

function AddressCard({ address }) {
    const [showMoreOptions, setShowMoreOptions] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handlePropagation = () => {
        setShowMoreOptions(false)
    }


    const handleCancel = () => {
        setShowEditForm(false)
        // showMoreOptions(false)
    }

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const handleConfirmDeleteAddress = () => {
        closeModal()
        setShowMoreOptions(!showMoreOptions)
        showToast("Address deleted Successfully")

    }

const modal = {
    title:"Delete Address",
    type:'Address',
    itemName:`${address?.building}, ${address?.street}, ${address?.city}, ${address?.state}`
}
    return (
        <>
            <ToastContainer />
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                <DeleteModalContent modal={modal} onClose={closeModal} onConfirm={handleConfirmDeleteAddress}/>
            </FullScreenModal>
            {
                showEditForm ? (
                    <div className={`border p-5 py-3 w-full ${showEditForm && 'bg-slate-50'}`}>
                        <div className=' w-2/3'>
                            <p className='uppercase text-blue-600'>Edit Address</p>
                            <AddressForm add={address} handleCancel={handleCancel} />
                        </div>
                    </div>
                ) : (
                    <div className={` relative border w-full p-2 shadow-sm rounded-lg my-4 bg-slate-50 `} onClick={handlePropagation}>
                        <div className="p-2 w-2/3">
                            <div className=' relative flex items-center justify-between'>
                                <div className='flex items-center gap-x-1 p-1 px-1  text-zinc-500 rounded-md bg-slate-200 w-fit'>
                                    <AiFillHome />
                                    <p className='border w-fit text-sm'>{address?.addressType}</p>
                                </div>
                            </div>
                            <p className=" mb-2 flex gap-x-5 font-bold pt-2">
                                <span>{address?.name}</span>
                                <span>{address?.mobileNo}</span>
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
                        <div className='absolute top-2 right-2 ' onClick={(e) => e.stopPropagation()}>
                            <div className='flex justify-end cursor-pointer' onClick={() => setShowMoreOptions(!showMoreOptions)}>
                                <FaEllipsisVertical />
                            </div>
                            {
                                showMoreOptions && (
                                    <ul className='bg-white rounded-md shadow-md mt-1'>
                                        <li className='p-1 px-2 hover:bg-slate-100 cursor-pointer hover:text-blue-600'
                                            onClick={() => {
                                                setShowMoreOptions(false)
                                                setShowEditForm(true)
                                            }}
                                        >
                                            Edit
                                        </li>
                                        <li className='pb-1 px-2 hover:bg-slate-100 cursor-pointer hover:text-red-600'
                                            onClick={openModal}>
                                            Remove
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default AddressCard