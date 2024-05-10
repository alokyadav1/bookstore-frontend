/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react'
import Image from "../../assets/img.png"
import { FiPlus,FiMinus } from "react-icons/fi";
import { GoHeart } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from 'react-toastify';
import AppContext from '../../context/AppContext';

function CartCard({ cartItem }) {
    const {dispatchCart} = useContext(AppContext)

    const handleQuantityIncrement = () => {
        if (cartItem.quantity < 10) {
            dispatchCart({
                type:"UPDATE_CART",
                payload:{
                    bookID: cartItem.book.bookID,
                    quantity: cartItem.quantity + 1
                }
            })
        }else{
            showToast()
        }
    }

    const handleQuantityDecrement = () => {
        if (cartItem.quantity > 1) {
            // setCart({...cart,quantity:cart.quantity -1 });
            dispatchCart({
                type:"UPDATE_CART",
                payload:{
                    bookID: cartItem.book.bookID,
                    quantity: cartItem.quantity - 1
                }
            })
        }
    }

    const handleRemoveItem = () => {
        dispatchCart({
            type:"REMOVE_FROM_CART",
            payload:{
                bookID:cartItem.book.bookID
            }
        })
    }

    const showToast = () => {
        toast("You can add only 10 Quantities",{
            position:"top-center",
            theme:"light"
        })
    }


    
    return (

        <>
        <ToastContainer/>
        <div className='relative flex justify-between border p-2 rounded-md bg-slate-100'>
            <div className='flex gap-2'>
                <div>
                    <img src={Image} alt="" className='w-24 h-32 rounded-md' />
                </div>
                <div className='pl-5'>
                    <p className='text-slate-600 font-bold text-lg'>{cartItem?.book.title}</p>
                    <p className='italic text-slate-800'>{cartItem?.book.author}</p>
                    <p className='bg-blue-200 text-blue-700 text-sm w-fit rounded-lg px-2 mt-3'>{cartItem?.book.category}</p>
                </div>
            </div>
            <div className='flex justify-between items-center'>
                <div className='text-slate-700 border rounded-md px-2 flex items-center space-x-2'>
                    <button className='text-sm' onClick={handleQuantityDecrement}><FiMinus/></button>
                    <span>{cartItem?.quantity}</span>
                    <button className='text-sm' onClick={handleQuantityIncrement}><FiPlus/></button>
                </div>
                <div className='flex flex-col justify-between border text-lg'>
                    <p className='absolute top-2 right-2 font-bold text-lg'>&#8377;{cartItem.book.price}</p>
                    <div className='absolute flex gap-4 bottom-2 right-2'>
                        <span className='cursor-pointer'><GoHeart/></span>
                        <span className=' cursor-pointer' onClick={handleRemoveItem}><RiDeleteBin6Line/></span>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CartCard