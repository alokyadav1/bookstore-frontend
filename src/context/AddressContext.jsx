/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, createContext } from 'react'
import axios from "../Axios/axios"


const AddressContext = createContext()

const currentUser = JSON.parse(localStorage.getItem("currentUser"))
const headers = {
    headers: {
        Authorization: `Bearer ${currentUser?.token}`
    }
}

function AddressProvider({ children }) {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchAddress()
    }, [])

    const fetchAddress = async () => {
        try {
            const res = await axios.get("/api/address/get-user-address", headers)
            console.log("address: ", res?.data);
            setAddresses(res.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    const addAddress = async (address) => {
        try {
            const res = await axios.post("/api/address/add", address, headers)
            setAddresses([...addresses, address])
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    const updateAddress = async (updatedAddress) => {
        try {
            const res = await axios.patch("/api/address/update-address", updatedAddress, headers)
            // update the address in state also
            const updatedAddresses = addresses.map((address) => {
                if (address.addressID == updatedAddress.addressID) {
                    return {...updatedAddress};
                }
                return address
            })
            console.log('updated Addresses', updatedAddresses);
            setAddresses(updatedAddresses)
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    const deleteAddress = async() => {
        
    }


    return (
        <AddressContext.Provider value={{ addresses, loading, addAddress, updateAddress }}>
            {children}
        </AddressContext.Provider>
    )
}

export default AddressContext;
export { AddressProvider }