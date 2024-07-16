/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import AdminContext from '../../context/AdminContext'
import { FaCandyCane, FaEllipsisVertical, FaPlus, FaSort, FaTrash } from 'react-icons/fa6'
import { showToast } from '../../utils/toast'
import FullScreenModal from '../../components/admin/Modal'
import DeleteModalContent from '../../components/admin/DeleteModalContent'
import BookForm from '../../components/admin/BookForm'
import { ImCancelCircle } from 'react-icons/im'
import axios from "../../Axios/axios"
import { ToastContainer } from 'react-toastify'
function Inventory() {
    const admin = JSON.parse(localStorage.getItem('admin'))
    const { nearOutOfStock } = useContext(AdminContext)
    const [stockInventory, setStockInventory] = useState([])
    const [stockEdit, setStockEdit] = useState({ stock: '', bookId: '' })
    const [showCancelBtn, setShowCancelBtn] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [sortStockAsc, setSortStockAsc] = useState(false)
    const [data, setData] = useState({
        title: "Delete Book",
        type: 'book',
        itemName: '',
        bookId: ''
    })

    const totalBooksCount = nearOutOfStock?.length
    const zeroStockBooksCount = nearOutOfStock?.filter(book => book.stock === 0).length

    useEffect(() => {
        setStockInventory(nearOutOfStock)
    }, [nearOutOfStock])


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false)
        setShowDeleteModal(false)
    };

    const handleRemove = (status) => {
        closeModal()
        setShowDeleteModal(false)
        if (status == 200) {
            showToast("Book deleted Successfully")
        } else {
            showToast("Failed to delete book")
        }
    }

    const handleEditBook = (status) => {
        closeModal()
        if (status == 200) {
            showToast("Book updated successfully")
        } else {
            showToast("Failed to update book")
        }
    }


    const handleDelete = (book) => {
        setData({ ...data, itemName: book.title, bookId: book.bookID })
        setShowDeleteModal(true)
        openModal()
    }


    const handleAddStock = (book) => {
        setStockEdit({ bookId: book.bookID })
        setShowCancelBtn(true)
    }

    const handleStockChange = (e) => {
        setStockEdit({ ...stockEdit, stock: e.target.value })
    }

    const handleCancel = () => {
        setShowCancelBtn(false)
        setStockEdit({ bookId: '', stock: '' })
    }

    const sortByStock = () => {
        if (sortStockAsc) {
            sortByStockASC()
        } else {
            sortByStockDESC()
        }

        setSortStockAsc(!sortStockAsc)
    }

    const sortByStockASC = () => {
        const sorted = [...nearOutOfStock].sort((a, b) => a.stock - b.stock)
        setStockInventory(sorted)
    }

    const sortByStockDESC = () => {
        const sorted = [...nearOutOfStock].sort((a, b) => b.stock - a.stock)
        setStockInventory(sorted)
    }


    const updateStock = async (stock, bookId) => {
        const res = await axios.patch(`/api/book/update/${bookId}`, { stock }, {
            headers: {
                Authorization: `Bearer ${admin?.token}`
            }
        })
        if (res.status == 200) {
            showToast("Stock updated successfully")
        } else {
            showToast("Failed to update stock")
        }
    }
    return (
        <>
            <FullScreenModal isOpen={isModalOpen} onClose={closeModal}>
                {
                    showDeleteModal && (
                        <DeleteModalContent modal={data} onConfirm={handleRemove} onClose={closeModal} />
                    )
                }
            </FullScreenModal>
            <ToastContainer />
            <div className='container p-4'>
                <h1 className="text-2xl font-bold mb-4">Inventory</h1>
                <div>
                    <div className="relative container mx-auto mt-10">
                        <div className='flex flex-wrap items-center justify-between mb-2'>
                            <h1 className="text-xl font-bold">Book Near Out of Stock</h1>
                            <div className='flex gap-x-5'>
                                <div className=' relative border border-gray-400 rounded p-1 flex items-center gap-x-2'>
                                    <div className='h-2 w-16 bg-red-500 rounded'></div>
                                    <span>Stock = 0</span>
                                    <span className='h-5 w-5 bg-red-500 rounded-full text-white flex items-center justify-center text-xs font-bold absolute -top-3 -right-2'>{zeroStockBooksCount}</span>
                                </div>
                                <div className=' relative border border-gray-400 rounded p-1 flex items-center gap-x-2'>
                                    <div className='h-2 w-16 bg-yellow-400 rounded'></div>
                                    <span>Stock {'<'} 10</span>
                                    <span className='h-5 w-5 bg-yellow-400 rounded-full text-black flex items-center justify-center text-xs font-bold absolute -top-3 -right-2'>{totalBooksCount - zeroStockBooksCount}</span>
                                </div>
                            </div>
                        </div>
                        <div className=" overflow-x-auto rounded-lg">
                            <table className="min-w-full rounded-lg ">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-2 px-4 border-b border-gray-200">Cover</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Title</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Author</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Price</th>
                                        <th className="py-2 px-4 border-b border-gray-200">ISBN</th>
                                        <th className="py-2 px-4 border-b border-gray-200">
                                            <div className='flex items-center justify-center gap-x-1'>
                                                <span>Stock</span>
                                                <FaSort className='text-sm cursor-pointer' onClick={sortByStock} />
                                            </div>
                                        </th>
                                        <th className="py-2 px-4 border-b border-gray-200">Category</th>
                                        <th className="py-2 px-4 border-b border-gray-200">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className=''>
                                    {stockInventory?.map((book) => (
                                        <tr
                                            key={book.bookID}
                                            className={`relative border text-center border-gray-200  ${book.stock === 0 ? 'border-s-8 border-s-red-500 ' : book.stock < 10 ? 'border-s-8 border-s-yellow-400' : 'bg-white'
                                                }`}
                                        >
                                            <td className="py-2 px-4 h-16 ">
                                                <div className='h-16 w-12 bg-slate-300 rounded'>
                                                    <img
                                                        src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg`}
                                                        alt={`${book.title} cover`}
                                                        className="w-12 h-16 object-cover rounded"
                                                    />
                                                </div>
                                            </td>
                                            <td className="py-2 px-4 ">{book.title}</td>
                                            <td className="py-2 px-4">{book.author}</td>
                                            <td className="py-2 px-4">&#8377;{book.price}</td>
                                            <td className="py-2 px-4">{book.isbn}</td>
                                            <td className="py-2 px-4">
                                                <div className='flex gap-x-1'>
                                                    <input type="number"
                                                        value={book.bookID == stockEdit.bookId ? stockEdit.stock : book.stock} className='w-12 border rounded text-center disabled:bg-slate-100 disabled:border-none'
                                                        onChange={handleStockChange}
                                                        disabled={book.bookID != stockEdit.bookId} />
                                                    <button
                                                        className={`bg-blue-600 px-1 rounded text-white ${book.bookID == stockEdit.bookId ? 'block' : 'hidden'}`}
                                                        onClick={() => updateStock(stockEdit.stock, book.bookID)}>
                                                        Save
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-2 px-4">{book.category}</td>
                                            <td className="py-2 px-4">
                                                <div className='flex justify-center items-center gap-x-2 '>
                                                    <div>
                                                        {
                                                            showCancelBtn && book.bookID == stockEdit.bookId ? (
                                                                <ImCancelCircle className='text-blue-500 cursor-pointer'
                                                                    onClick={handleCancel} />
                                                            ) : (
                                                                <FaPlus data-tooltip-target="tooltip-add" className='text-blue-500 cursor-pointer' onClick={() => handleAddStock(book)} />
                                                            )
                                                        }
                                                    </div>
                                                    <FaTrash data-tooltip-target="tooltip-delete" className='text-red-500 cursor-pointer' onClick={() => handleDelete(book)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Inventory