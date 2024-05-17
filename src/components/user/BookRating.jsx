/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { FaStar } from 'react-icons/fa';

const BookRating = ({ reviews }) => {
    // Define ratings data

    const rating = {}

    reviews.forEach(review => {
        if (rating[review.rating]) {
            rating[review.rating]++
        } else {
            rating[review.rating] = 1;
        }
    })

    // const ratings = {
    //     '2': 1,
    //     '3': 4,
    //     '4': 2,
    //     '5': 1
    // }

    // Calculate total ratings
    let totalRatings = reviews.length + 1; // to handle when totalratings is 0. divide by 0 will create abnormal UI
    let ratingSum = 0;
    console.log("rating obj: ", rating);
    for (let key in rating) {
        console.log("rating: ", rating[key]);
        ratingSum += rating[key] * key
    }
    console.log("sum: ", ratingSum);
    let ratingAvg = 0;
    if (totalRatings > 0) {
       ratingAvg =  ratingSum / totalRatings;
    }
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
                                    <FaStar key={index} className={ratingAvg > index+1 ? 'text-green-500' : 'text-slate-200'} />
                                )
                            })
                        }
                    </div>
                    <p className='text-sm'>
                        <span className='font-bold'>{totalRatings-1} </span>
                        reviews
                    </p>
                </div>
            </div>
            <div className='flex flex-col gap-y-2 flex-grow items-center'>
                {
                    Array.from({ length: 5 }).map((a, index) => {
                        return (
                            <div key={index} className=' flex gap-2  items-center justify-between w-full'>
                                <span>{5 - index}</span>
                                <div className='bg-slate-200  h-3 flex-grow rounded-full border'>
                                    <div className='bg-green-400 h-3 rounded-full' style={{ width: `${(rating[5-index] || 0)/totalRatings * 100}%` }}></div>
                                </div>
                                <span className='text-zinc-400 px-1'>{rating[5-index] || 0}</span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

export default BookRating;
