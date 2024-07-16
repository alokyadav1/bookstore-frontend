/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import Header from '../../../components/user/Header'
import {
    PhilosophyImg, SciFiImg, SelfHelpImg, MysteryImg, AdventureImg,
    BiographyImg, NovelImg, FantasyImg, HorrorImg, RomanceImg
} from '../../../data/images'

import NewCustomerCouponImg from "../../../assets/coupon/new_customer.png"
import JulyCouponImg from "../../../assets/coupon/july_offer.png"

import styles from "./dashboard.module.css"
// import books from '../../../data/books'
import BookCard from '../../../components/user/BookCard'
import AppContext from '../../../context/AppContext'
import CategorySection from '../Category'
import { Link } from 'react-router-dom'
import axios from "../../../Axios/axios"
import { Virtual, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import OrderContext from '../../../context/OrderContext.jsx'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6'

function Dashboard() {
    const { orders } = useContext(OrderContext)
    const { books, cart } = useContext(AppContext);
    const [categoryBooks, setCategoryBooks] = useState({})
    const [bestseller, setBestSeller] = useState(null)
    const [suggested, setSuggested] = useState(null)
    const [swiperRef, setSwiperRef] = useState(null)
    const [error, setError] = useState()
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


    const settings = {
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false
    };


    useEffect(() => {
        const fetchBestSellerBooks = async () => {
            try {
                const res = await axios.get("/api/book/bestseller")
                setBestSeller(res.data)
            } catch (error) {
                setError("No Books found")
                console.log("error", error);
            }

        }

        const fetchSuggestedBooks = async () => {
            try {
                const res = await axios.get("/api/book/suggested", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("currentUser")).token}`
                    }
                })
                setSuggested(res.data)
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchBestSellerBooks()
        fetchSuggestedBooks()
    }, [])

    return (
        <div>
            <Header />
            <main className="bg-white">
                {/* Caurosel */}
                <section className='mt-16 max-h-96'>
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="max-h-96"
                    >
                        <SwiperSlide className='flex items-center justify-center max-h-96'>
                            <img src={NewCustomerCouponImg} alt="new customer" className='block h-80' />
                        </SwiperSlide>
                        <SwiperSlide className='flex items-center justify-center max-h-96'>
                            <img src={JulyCouponImg} alt="july_offer" className='block h-80' />
                        </SwiperSlide>

                    </Swiper>
                </section>
                {/* <section className={` relative text-center h-screen flex items-center justify-center ${styles.heroSection}`}>
                    <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                    <div className='text-white relative z-20'>
                        <h1 className="text-6xl font-bold mb-4">Welcome to our Bookstore</h1>
                        <p className="text-xl mb-8">Discover your next favorite book</p>
                    </div>
                </section> */}


                <section className='flex flex-wrap justify-around items-center gap-y-4 p-5 bg-slate-100'>
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

                {/* Suggested for you */}
                {
                    orders.length > 0 && (
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
                                        suggested?.map((book, index) => {
                                            return (
                                                <SwiperSlide key={book.bookID} virtualIndex={index}>
                                                    <BookCard book={book} />
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
                    )
                }

                {/* Bestsellers */}
                <section>
                    <h2 className='text-2xl my-5 mx-2'>Bestsellers</h2>
                    <div>
                        {
                            bestseller?.length > 0 ? (
                                <div>
                                    <Swiper
                                        // install Swiper modules
                                        modules={[Virtual, Navigation, Pagination]}
                                        spaceBetween={50}
                                        slidesPerView={4}
                                        navigation={
                                            {
                                                nextEl: '.swiper-button-next-custom',
                                                prevEl: '.swiper-button-prev-custom',
                                            }
                                        }
                                        virtual
                                        scrollbar={{ draggable: true }}
                                        onSwiper={setSwiperRef}
                                        breakpoints={{
                                            100: {
                                                slidesPerView: 1,
                                                spaceBetween: 20,
                                            },
                                            640: {
                                                slidesPerView: 2,
                                                spaceBetween: 20,
                                            },
                                            768: {
                                                slidesPerView: 3,
                                                spaceBetween: 40,
                                            },
                                            1024: {
                                                slidesPerView: 4,
                                                spaceBetween: 50,
                                            },
                                        }}
                                    >
                                        {
                                            bestseller.map((book, index) => {
                                                return (
                                                    <SwiperSlide key={book.bookID} virtualIndex={index}>
                                                        <BookCard book={book} />
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
                            ) : (
                                error ? (
                                    <p>{error}</p>
                                ) : (
                                    <p>loading...</p>
                                )
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