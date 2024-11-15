/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from "../../../Axios/axios"
import { review } from '../../../data/review'
import { FaStar } from 'react-icons/fa6'

function MyReviews() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  const [reviews, setReviews] = useState(null)

  useEffect(() => {
    const fetchReviews = async () => {
      const res = await axios.get("/api/review/get-user-reviews", {
        headers: {
          Authorization: `Bearer ${currentUser?.token}`
        }
      })
      setReviews(res.data)
    }

    fetchReviews()

  }, [currentUser?.token])

  return (
    <>
      <p className='text-xl'>My Reviews and Ratings</p>
      <div>
        {
          reviews?.length > 0 ? (
            reviews?.map((rev, index) => {
              return (
                <div key={index} className='flex justify-center pb-2 '>
                  <div className='flex flex-col items-center md:flex-row gap-2 p-2 rounded-md w-fit md:w-3/5  bg-slate-100 md:shadow-md'>
                    <div className='w-1/4 flex justify-center gap-x-5 items-center'>
                      <div className='flex gap-x-2 border'>
                        <img src={`https://covers.openlibrary.org/b/isbn/${rev.book.isbn}-L.jpg`} alt={rev.book.title} width={80} />
                        {/* <p>Book name</p> */}
                      </div>
                    </div>
                    <div className=' md:w-3/4'>
                      <div className='flex items-center gap-x-3 mb-2'>
                        <div className='flex gap-x-1 items-center '>
                          {
                            Array.from({ length: 5 }).map((index) => (
                              <FaStar key={index} className='text-orange-500' />
                            ))
                          }
                        </div>
                        <p className='text-zinc-500 text-sm'>24 March 2024</p>
                      </div>
                      <q className='text-zinc-500 italic text-sm'>{rev.comment}</q>
                      <div>
                        <button className='bg-red-600 text-white text-sm border px-5 py-1 rounded-full shadow'>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div>

            </div>
          )
        }
      </div>
    </>
  )
}

export default MyReviews