/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import { FiPlus, FiMinus } from "react-icons/fi";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AppContext from '../../context/AppContext';

function Quantity({ book, initialQuantity }) {
    const [quantity, setQuantity] = useState(initialQuantity)
    const { dispatchCart } = useContext(AppContext);

    const handleQuantityIncrement = (bookID) => {
        if (quantity < 10) {
            dispatchCart({
                type: "UPDATE_CART",
                payload: {
                    bookID: bookID,
                    quantity: quantity + 1
                }
            })

            setQuantity(quantity + 1)
        } else {
            showToast()
        }
    }

    const handleQuantityDecrement = (bookID) => {
        if (quantity > 1) {
            dispatchCart({
                type: "UPDATE_CART",
                payload: {
                    bookID: bookID,
                    quantity: quantity - 1
                }
            })

            setQuantity(quantity - 1)
        }
    }

    const showToast = () => {
        toast("You can add only 10 Quantities", {
            position: "top-center",
            theme: "light"
        })
    }

    return (
        <>
            <ToastContainer/>
            <div className='flex gap-4 border p-2 rounded-md w-fit'>
                <button className='text-sm' onClick={() => handleQuantityDecrement(book.bookID)}>
                    <FiMinus />
                </button>
                <span className='font-bold'>{quantity}</span>
                <button className='text-sm' onClick={() => handleQuantityIncrement(book.bookID)}>
                    <FiPlus />
                </button>
            </div>
        </>

    )
}

export default Quantity