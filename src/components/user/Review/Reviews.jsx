/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useContext } from "react";
import ReviewTemplate from "./ReviewTemplate";
import "./Review.scss";
import UserContext from "../../../context/UserContext";
import { FaStar } from "react-icons/fa";

function Reviews({ onDeleteReview, reviews }) {
  const { user } = useContext(UserContext)
  const handleDelete = () => {
    onDeleteReview()
  };
  return (
    <>
      <div className="w-full relative">
        {
          reviews.map((review, index) => {
            return (
              <div className="">
                <div>
                  <ReviewTemplate
                    key={index}
                    review={review}
                    onDeleteReview={handleDelete}
                  />

                </div>

              </div>
            )
          })
        }
      </div>
    </>
  );
}

export default Reviews;