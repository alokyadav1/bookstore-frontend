/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaStar } from 'react-icons/fa';

const BookRating = ({reviews}) => {
    // Define ratings data

    const rating = {}

    reviews.forEach(review => {
        if(rating[review.rating]){
            rating[review.rating]++
        } else {
            rating[review.rating] = 1;
        }
    })

    const ratings = [
        { stars: 5, count: 1000 },
        { stars: 4, count: 2000 },
        { stars: 3, count: 200 },
        { stars: 2, count: 100 },
        { stars: 1, count: 300 },
    ];

    // Calculate total ratings
    const totalRatings = reviews.length;
    let ratingSum = 0;
    console.log("rating obj: ", rating);
    for(let key in rating){
        console.log("rating: ", rating[key]);
        ratingSum += rating[key] * key
    }
    console.log("sum: ", ratingSum);
    const ratingAvg = ratingSum / totalRatings;
    console.log("avg: ", ratingAvg);

    // handle rating

    return (
        <div className='flex items-center gap-4 p-2'>
            <div className='w-fit'>
                <div className='text-center text-zinc-800'>
                    <p className='text-5xl'>{ratingAvg.toFixed(1)}</p>
                    <div className='flex justify-center py-2 text-green-500'>
                        {
                            Array.from({ length: 5 }).map((a, index) => {
                                return (
                                    <FaStar key={index} />
                                )
                            })
                        }
                    </div>
                    <p className='text-sm'>
                        <span className='font-bold'>{totalRatings} </span>
                        reviews
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 flex-grow items-center'>
                {
                    Array.from({ length: 5 }).map((a, index) => {
                        return (
                            <div key={index} className=' flex gap-2  items-center w-full'>
                                <span>{5 - index}</span>
                                <div className='bg-slate-200 h-3 w-full rounded-full'>
                                    <div className='bg-green-400 h-3 rounded-full' style={{ width: `${(5 - index + 1) * 10}%` }}></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default BookRating;
