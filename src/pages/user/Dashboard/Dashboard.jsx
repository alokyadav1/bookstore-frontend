/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/user/Header'
import styles from "./dashboard.module.css"
// import books from '../../../data/books'
import BookCard from '../../../components/user/BookCard'
import AppContext from '../../../context/AppContext'
function Dashboard() {
    const { books, cart } = useContext(AppContext);
    return (
        <div>
            <Header />
            <main className="">
                <section className={` relative text-center h-screen flex items-center justify-center ${styles.heroSection}`}>
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                    <div className='text-white relative z-20'>
                        <h1 className="text-6xl font-bold mb-4">Welcome to our Bookstore</h1>
                        <p className="text-xl mb-8">Discover your next favorite book</p>
                    </div>
                </section>
                <section className="py-5">
                    <p className='text-2xl font-bold text-center'>Featured books</p>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                        {
                            books != null && (
                                books.map((book, index) => {
                                    return <BookCard
                                        key={index}
                                        book={book}
                                        bookQuantity={0} />
                                })
                            )
                        }
                    </div>
                </section>
            </main>
            <footer className="bg-blue-500 text-white p-4 text-center">
                <div className="flex justify-center mb-4">
                    <a href="#" className="mr-4">Home</a>
                    <a href="#" className="mr-4">Books</a>
                    <a href="#" className="mr-4">About</a>
                </div>
                <div className="mb-4">
                    <span className="mr-4">&copy; 2024 Bookstore</span>
                    <span className="mr-4">|</span>
                    <span>Social Media Icons</span>
                </div>
                <div>
                    {/* Add social media icons */}
                </div>
            </footer>
        </div>
    )
}

export default Dashboard