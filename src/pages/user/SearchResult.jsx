/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/user/Header'
import axios from "../../Axios/axios"
import BookCard from '../../components/user/BookCard'
import Filter from '../../components/user/Filter'

function SearchResult() {
    const { keyword } = useParams()
    const [allResultBooks, setAllResultBooks] = useState([])
    const [resultBooks, setResultBooks] = useState([])
    const [filterCategories, setFilterCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const categories = ['Philosophy', 'Sci-Fi', 'Self-Help', 'Mystery', 'Adventure', 'Biography', 'Novel', 'Fantasy', 'Horror', 'Romance'];
    const authors = ['Author A', 'Author B', 'Author C', 'Author D'];

    useEffect(() => {
        const search = async () => {
            setLoading(true)
            const res = await axios.get(`/api/search/searchByTitleOrAuthor/${keyword}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
            setResultBooks(res.data)
            setAllResultBooks(res.data)
            setLoading(false)
        }
        search()
    }, [currentUser.token, keyword])

    const handleApplyFilter = (filter) => {
        const filteredBooks = allResultBooks.filter(book => {
            const categoriesFilter = filter.selectedCategories.length <= 0 || filter.selectedCategories.includes(book.category)
            return categoriesFilter && (
                book.price >= filter.priceRange.at(0) && book.price <= filter.priceRange.at(1)
            )
        })
        setResultBooks(filteredBooks)
    }

    return (
        <>
            <Header />
            {
                !loading ? (
                    <div className='mt-16 p-2 flex'>
                        <div className="container mx-auto w-fit">
                            <Filter categories={categories} authors={authors} handleFilter={handleApplyFilter} />
                            {/* Add other components here */}
                        </div>
                        <div className=' flex-grow p-4'>
                            <p>Search Result for
                                <span className='font-bold'> &quot;{keyword}&quot;
                                </span>
                            </p>
                            <div className='flex flex-wrap justify-start gap-8 py-4'>
                                {
                                    resultBooks.length > 0 ? (
                                        resultBooks.map((book, index) => {
                                            return <BookCard
                                                key={index}
                                                book={book}
                                                bookQuantity={0} />
                                        })
                                    ) : (
                                        <div className='font-extrabold text-3xl  w-full md:h-96 flex items-center justify-center text-zinc-200'>
                                            No Book Found
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='flex justify-center items-center mt-16 h-96'>
                        <p className='font-bold text-xl'>loading...</p>
                    </div>
                )
            }

        </>
    )
}

export default SearchResult