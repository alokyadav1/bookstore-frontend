/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import axios from "../../../Axios/axios"
import { header } from '../../../utils/apiRequests'
import { showToast } from "../../../utils/toast"
import { ToastContainer } from 'react-toastify'
import AddressContext from '../../../context/AddressContext'

function AddressForm({ add = null, handleCancel }) {
    const [address, setAddress] = useState(add)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const { addAddress, updateAddress } = useContext(AddressContext)

    let resMsg = "";
    const handleInputChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (add == null) { // add address
            const success = addAddress(address)
            if (success) {
                resMsg = "Address added successfully"
                handleCancel()
            } else {
                resMsg = "Unable to add address"
            }
        } else { // update address
            const success = updateAddress(address)
            if (success) {
                handleCancel()
                resMsg = "Address Updated Successfully"
            } else {
                resMsg = "Unable to update address"
            }
        }
        showToast(resMsg)
    }

    return (
        <div>
            <ToastContainer />
            <form className='mt-3 space-y-3' onSubmit={handleSubmit}>
                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="name" className='text-xs text-gray-400 px-2 w-full'>Name</label>
                        <input type="text" placeholder='' id='name' name='name'
                            className='px-2 w-full rounded-md outline-none'
                            value={address?.name} onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="mobile" className='text-xs text-gray-400 px-2 w-full'>Mobile</label>
                        <input type="number" placeholder='' id='mobile' name='mobileNo'
                            className='px-2 w-full rounded-md outline-none'
                            value={address?.mobileNo} onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="pin" className='text-xs text-gray-400 px-2 w-full'>Pin Code</label>
                        <input type="number" placeholder='' id='pin' name='pinCode'
                            className='px-2 w-full rounded-md outline-none'
                            value={address?.pinCode} onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="street" className='text-xs text-gray-400 px-2 w-full'>Street</label>
                        <input type="text" placeholder='' id='street' name='street'
                            className='px-2 w-full rounded-md outline-none'
                            value={address?.street} onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                    <label htmlFor="area" className='text-xs text-gray-400 px-2 w-full'>Area</label>
                    <textarea type="text" placeholder='' id='area' name='building'
                        className='px-2 w-full rounded-md outline-none'
                        value={address?.building} onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="city" className='text-xs text-gray-400 px-2 w-full'>City</label>
                        <input type="text" placeholder='' id='city' name='city'
                            className='px-2 w-full rounded-md outline-none'
                            value={address?.city} onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="state" className='text-xs text-gray-400 px-2 w-full'>State</label>
                        <select name="state" id="state" className='px-1 w-full rounded-md focus:outline focus:outline-blue-600' onChange={handleInputChange}>
                            <option value="null">Select State</option>
                            <option value="MAHARASHTRA">Maharashtra</option>
                            <option value="UP">Uttar Pradesh</option>
                            <option value="GOA">Goa</option>
                            <option value="RAJASTHAN">Rajasthan</option>
                        </select>
                    </div>


                </div>

                <div className='flex flex-wrap gap-x-5 gap-y-2'>
                    <div className='relative flex-grow border bg-white focus-within:outline focus-within:outline-1 focus-within:outline-blue-600 rounded-md'>
                        <label htmlFor="landmark" className='text-xs text-gray-400 px-2 w-full'>Landmark (Optional)</label>
                        <input type="text" placeholder='' id='landmark' name='landmark'
                            className='px-2 w-full rounded-md outline-none' onChange={handleInputChange}
                            value={address?.landmark}

                        />
                    </div>


                    <div className='flex items-center md:justify-center gap-x-5 gap-y-2 relative flex-grow'>
                        <div className='flex items-center gap-x-2'>
                            <label htmlFor="home">Home</label>
                            <input type="radio" id='home' value="Home" name='addressType' onChange={handleInputChange} />
                        </div>
                        <div className='flex items-center gap-x-2'>
                            <label htmlFor="office">Office</label>
                            <input type="radio" id='office' name='addressType' value="Office" onChange={handleInputChange} />
                        </div>
                    </div>
                </div>


                <div className=' flex justify-between md:block md:space-x-2 mt-5'>
                    <button className='py-2 px-5' onClick={handleCancel}>Cancel</button>
                    <button className='bg-blue-700 text-white py-2 px-5 rounded-md' type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default AddressForm