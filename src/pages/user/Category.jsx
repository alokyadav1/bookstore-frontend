/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{useContext, useEffect, useState} from 'react'
import AppContext from '../../context/AppContext';
import BookCard from '../../components/user/BookCard'
import { useParams } from 'react-router-dom';
import Header from '../../components/user/Header';

function Category({category}) {
    const { books, cart } = useContext(AppContext);
    const [categoryBooks, setCategoryBooks] = useState([])
    const {categoryName} = useParams()
    
    useEffect(() => {
        const category = {}
        books?.forEach(book => {
            if (!(book.category in category)) {
                category[book.category] = []
            }
            category[book.category].push(book)
        })

        setCategoryBooks(category[categoryName])
    },[books, categoryName])

    
    return (
        <>
            <Header/>
            <section className="py-5 mt-16">
                <p className='text-3xl font-bold text-center text-zinc-400'>{categoryName}</p>
                <div className='flex flex-wrap justify-start gap-8 p-4'>
                    {
                        categoryBooks != null && (
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