/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../../context/AppContext'
import BookCard from "../../components/user/BookCard"
import { Virtual, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

function BookSuggestion({ category, author, bookID, handleClick }) {
    const [suggestedBooks, setSuggestedBooks] = useState([])
    const { books } = useContext(AppContext)
    const [swiperRef, setSwiperRef] = useState(null)


    useEffect(() => {
        const filterSuggestedBooks = (category, author) => {
            const filter = books.filter(book => book.category == category || book.author == author)
            return filter;
        }
        const filter = filterSuggestedBooks(category, author)
        setSuggestedBooks(filter)
    }, [author, books, category])

    return (
        <>
            <section>
                <h2 className='text-2xl my-5 mx-2'>Suggested for you</h2>
                <div className='relative'>
                    <Swiper
                        // install Swiper modules
                        modules={[Virtual, Navigation, Pagination]}
                        spaceBetween={50}
                        slidesPerView={4}
                        slidesPerGroup={4}
                        navigation={
                            {
                                nextEl: '.swiper-button-next-custom',
                                prevEl: '.swiper-button-prev-custom',
                            }
                        }
                        virtual
                        scrollbar={{ draggable: true }}
                        onSwiper={setSwiperRef}
                        className='flex items-center'
                        breakpoints={{
                            100: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                                slidesPerGroup: 1
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                                slidesPerGroup: 2
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                                slidesPerGroup: 3
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 50,
                                slidesPerGroup: 4
                            },
                        }}
                    >
                        {
                            suggestedBooks.slice(0, 10).map((book, index) => {
                                if (book.bookID == bookID) {
                                    return null;
                                }
                                return (
                                    <SwiperSlide key={index}>
                                        <BookCard
                                            book={book}
                                            handleClick={handleClick}
                                        />
                                    </SwiperSlide>
                                )
                            })
                        }
                        <div className="swiper-button-next-custom absolute right-1 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700 w-10 h-10 opacity-30 cursor-pointer hover:opacity-80">
                            <FaArrowRight className="w-4 h-4" />
                        </div>
                        <div className="swiper-button-prev-custom absolute left-1 top-1/2 transform -translate-y-1/2 z-10 flex items-center justify-center bg-gray-800 text-white p-1 rounded-full hover:bg-gray-700  w-10 h-10 opacity-30 cursor-pointer hover:opacity-80">
                            <FaArrowLeft className="w-4 h-4" />
                        </div>
                    </Swiper>
                </div>
            </section>
        </>
    )
}

export default BookSuggestion