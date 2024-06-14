/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// FullScreenModal.jsx
import React from 'react';
import { MdCancel } from 'react-icons/md';

const FullScreenModal = ({ children, isOpen, onClose, showCloseBtn = false }) => {
    if (!isOpen) return null;

    const handlepropagation = (e) => {
        e.stopPropagation()
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 py-5" onClick={onClose}>
            <div className="relative bg-white p-4 rounded shadow-lg max-w-lg w-full max-h-full h-fit overflow-y-auto overflow-x-hidden no-scrollbar" onClick={handlepropagation}>
                <button onClick={onClose} className="absolute top-1 right-1">
                    <MdCancel className='text-black text-2xl' />
                </button>
                {children}
                {
                    showCloseBtn && (
                        <div className='flex justify-center'>
                            <button className='w-11/12 bg-red-500 text-white rounded p-2' onClick={onClose}>Close</button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default FullScreenModal;
