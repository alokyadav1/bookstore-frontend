/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext';
import BookCard from '../../components/user/BookCard'
import { useParams } from 'react-router-dom';
import Header from '../../components/user/Header';
import axios from "../../Axios/axios"

function Category({ category }) {
    const { books, cart } = useContext(AppContext);
    const [categoryBooks, setCategoryBooks] = useState([])
    const { categoryName } = useParams()

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get("/api/book/all-books");
            const category = {}
            res.data?.forEach(book => {
                if (!(book.category in category)) {
                    category[book.category] = []
                }
                category[book.category].push(book)
            })
            console.log("books: ", books);
            console.log("category: ", category[categoryName]);
            setCategoryBooks(category[categoryName])
        }

        if (books == null) {
            fetchBooks()
        } else {
            const category = {}
            books?.forEach(book => {
                if (!(book.category in category)) {
                    category[book.category] = []
                }
                category[book.category].push(book)
            })
            console.log("books: ", books);
            console.log("category: ", category[categoryName]);
            setCategoryBooks(category[categoryName])
        }

    }, [books, categoryName])


    return (
        <>
            <Header />
            <section className="py-5 mt-16">
                <p className='text-3xl font-bold text-center text-zinc-400'>{categoryName}</p>
                <div className='flex flex-wrap justify-start gap-8 p-4'>
                    {
                        categoryBooks && (
                            categoryBooks.map((book, index) => {
                                return <BookCard
                                    key={index}
                                    book={book}
                                    bookQuantity={0} />
                            })
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default Category