/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import BookCard from "../../components/user/BookCard"

function BookSuggestion({ category, author, bookID, handleClick }) {
    const [suggestedBooks, setSuggestedBooks] = useState([])
    const { books } = useContext(AppContext)

    useEffect(() => {
        const filterSuggestedBooks = (category, author) => {
            const filter = books.filter(book => book.category == category || book.author == author)
            return filter;
        }
        const filter = filterSuggestedBooks(category, author)
        setSuggestedBooks(filter)
    }, [author, books, category])

    return (
        <div className='flex gap-5 overflow-auto'>
            {
                suggestedBooks.slice(0, 10).map((book, index) => {
                    if (book.bookID == bookID) {
                        return null;
                    }
                    return (
                        <BookCard key={index}
                            book={book}
                            handleClick={handleClick}
                        />
                    )
                })
            }
        </div>
    )
}

export default BookSuggestion