/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { FaTrash, FaReply, FaPen, FaPlus, FaMinus, FaStar } from "react-icons/fa";
import UserContext from "../../../context/UserContext";
import moment from "moment";

function ReviewTemplate({ review, onDeleteReview, }) {
  const { user } = useContext(UserContext)
  const reviewDate = new Date(review.reviewDate)
  const [upvotes, setUpvotes] = useState(review?.upvotes);
  const [upvotesDisabled, setUpvoteDisabled] = useState(false)
  const [downvotesDisabled, setDownvoteDisabled] = useState(false)


  const handleUpvotes = () => {
    setUpvotes(upvotes + 1)
    setUpvoteDisabled(true)
    setDownvoteDisabled(false)
  }

  const handleDownvotes = () => {
    setUpvotes(upvotes - 1)
    setDownvoteDisabled(true)
    setUpvoteDisabled(false)
  }


  return (
    <div className="relative">
      <div className="commentTemplate">
        <div className="flex items-center">
          <div className="upvote rounded-md">
            <button
              className="rounded-t-md border-b border-slate-200 disabled:cursor-not-allowed disabled:bg-slate-200"
              disabled={upvotesDisabled}
              onClick={handleUpvotes}
            >
              <FaPlus />
            </button>
            <p className="py-1">{upvotes}</p>
            <button
              className="rounded-b-md border-t border-slate-200 disabled:cursor-not-allowed disabled:bg-slate-200"
              disabled={downvotesDisabled}
              onClick={handleDownvotes}
            >
              <FaMinus />
            </button>
          </div>
        </div>
        <div className="description">
          <div className="header">
            <div className="bg-orange-700 text-white rounded-full w-7 h-7 font-extrabold flex justify-center items-center">
              <p>{review.username[0].toUpperCase()}</p>
            </div>
            <p className="username">
              <span className=" text-base">{review.username}</span>
              {user.email === review?.email && <span className="px-2 ml-1 bg-blue-900 text-white rounded-md">you</span>}
            </p>
            <p className="time">{moment(reviewDate).fromNow()}</p>
            <div className="reply">
              {user.email === review.email && (
                <div className="flex">
                  <div onClick={onDeleteReview} className="del gap-1">
                    <span className="deleteIcon">
                      <FaTrash />
                    </span>{" "}
                    <span className="delete">Delete</span>
                  </div>

                </div>
              )}
            </div>
          </div>
          <div className="message">
            {review.comment}
          </div>
        </div>
      </div>
      <div className="flex gap-1 text-xs absolute top-2 right-2">
        {
          Array.from({ length: 5 }).map((a, index) => {
            return (
              <FaStar key={index} className={review.rating > index ? "text-green-600" : "text-slate-200"} />
            )
          })
        }
      </div>

    </div>
  );
}
export default ReviewTemplate;