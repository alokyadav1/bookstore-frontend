/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/user/Header'
import {
    PhilosophyImg, SciFiImg, SelfHelpImg, MysteryImg, AdventureImg,
    BiographyImg, NovelImg, FantasyImg, HorrorImg, RomanceImg
} from '../../../data/images'
import styles from "./dashboard.module.css"
// import books from '../../../data/books'
import BookCard from '../../../components/user/BookCard'
import AppContext from '../../../context/AppContext'
import CategorySection from '../Category'
import { Link } from 'react-router-dom'

function Dashboard() {
    const { books, cart } = useContext(AppContext);
    const [categoryBooks, setCategoryBooks] = useState({})

    const categorySection = [
        {
            title: "Philosophy",
            img: PhilosophyImg
        },
        {
            title: "Sci-Fi",
            img: SciFiImg
        },
        {
            title: "Self-Help",
            img: SelfHelpImg
        },
        {
            title: "Mystery",
            img: MysteryImg
        },
        {
            title: "Adventure",
            img: AdventureImg
        },
        {
            title: "Biography",
            img: BiographyImg
        },
        {
            title: "Novel",
            img: NovelImg
        },
        {
            title: "Fantasy",
            img: FantasyImg
        },
        {
            title: "Horror",
            img: HorrorImg
        },
        {
            title: "Romance",
            img: RomanceImg
        }
    ];



    // useEffect(() => {
    //     const category = {}
    //     books?.forEach(book => {
    //         if (!(book.category in category)) {
    //             category[book.category] = []
    //         }
    //         category[book.category].push(book)
    //     })

    //     setCategoryBooks(category)
    // },[books])

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
                <section className='flex flex-wrap justify-around items-center gap-y-4 p-5'>
                    {
                        categorySection.map((category, index) => {
                            return (
                                <div key={index} className='w-1/5 flex justify-center items-center'>
                                    <Link to={`category/${category.title}`} className='text-center cursor-pointer'>
                                        <img src={category.img} alt={category.title} className='w-16' />
                                        <p>{category.title}</p>
                                    </Link>
                                </div>
                            )
                        })
                    }
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