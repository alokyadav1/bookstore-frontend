/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react'
import UserContext from '../../context/UserContext'
import { MdCreditCard, MdEmail } from 'react-icons/md'
import { FaRegCreditCard } from 'react-icons/fa6'

function PaymentDetail() {
    const { user } = useContext(UserContext)
    const [cardHolderName, setCardHolderName] = useState('')
    const [card, setCard] = useState({})

    const handleCardNumberChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');

        // Limit the input to 19 digits
        if (inputValue.length > 19) {
            inputValue = inputValue.slice(0, 19);
        }

        // Add a space after every 4 digits
        const formattedValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 ');

        setCard({...card,[e.target.name]:formattedValue});
    }

    const handleExpiryDateChange = (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');

        let month = e.target.value.slice(0,2)
        if(month > 12) return
        // Limit the input to 4 digits
        if (inputValue.length > 4) {
            inputValue = inputValue.slice(0, 4);
        }

        // Add a slash after the first 2 digits (for MM/YY format)
        const formattedValue = inputValue.replace(/(\d{2})(?=\d)/g, '$1/');

        setCard({...card,[e.target.name]:formattedValue});
    }

    return (
        <div>
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">
                Complete your order by providing your payment details.
            </p>
            <div>
                <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">
                    Email
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="email"
                        name="email"
                        className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="your.email@gmail.com"
                        value={user?.email}
                        disabled
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <MdEmail />
                    </div>
                </div>
                <label
                    htmlFor="card-holder"
                    className="mt-4 mb-2 block text-sm font-medium"
                >
                    Card Holder
                </label>
                <div className="relative">
                    <input
                        type="text"
                        id="card-holder"
                        name="card-holder"
                        value={cardHolderName}
                        onChange={(e) => setCardHolderName(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Your full name here"
                    />
                    <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                        <MdCreditCard />
                    </div>
                </div>
                <label
                    htmlFor="card-no"
                    className="mt-4 mb-2 block text-sm font-medium"
                >
                    Card Details
                </label>
                <div className="flex gap-x-2">
                    <div className="relative w-7/12 flex-shrink-0">
                        <input
                            type="text"
                            id="card-no"
                            name="cardNumber"
                            value={card?.cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full tracking-wide rounded-md border border-gray-300 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                            maxLength={19}
                            placeholder="xxxx xxxx xxxx xxxx"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                            <FaRegCreditCard />
                        </div>
                    </div>
                    <input
                        type="text"
                        name="cardExpiry"
                        value={card?.cardExpiry}
                        className="w-full tracking-wider rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="MM/YY"
                        onChange={handleExpiryDateChange}
                        maxLength={5}
                    />
                    <input
                        type="text"
                        name="credit-cvc"
                        maxLength={3}
                        className="w-1/6 tracking-wider flex-shrink-0 rounded-md border border-gray-300 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                        placeholder="CVC"
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetail