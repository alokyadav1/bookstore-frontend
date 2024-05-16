/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Header from '../../components/user/Header'
import axios from "../../Axios/axios"
import BookCard from '../../components/user/BookCard'
import Filter from '../../components/user/Filter'

function SearchResult() {
    const { keyword } = useParams()
    const [resultBooks, setResultBooks] = useState([])
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
            setLoading(false)
        }
        search()
    }, [currentUser.token, keyword])

    return (
        <>
            <Header />
            {
                !loading ? (
                    <div className='mt-16 p-2 flex'>
                        <div className="container mx-auto w-5/12">
                            <Filter categories={categories} authors={authors} />
                            {/* Add other components here */}
                        </div>
                        <div className=' flex-grow p-4'>
                            <p>Search Result for
                                <span className='font-bold'> &quot;{keyword}&quot;
                                </span>
                            </p>
                            <div className='flex flex-wrap justify-start gap-8 py-4'>
                                {
                                    resultBooks != null && (
                                        resultBooks.map((book, index) => {
                                            return <BookCard
                                                key={index}
                                                book={book}
                                                bookQuantity={0} />
                                        })
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