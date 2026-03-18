import React, { useContext, useState } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const BookingCard = ({ booking }) => {
  const { user, token } = useContext(AuthContext);
  const { tourName, totalPrice, maxGroupSize, date, _id, status } = booking;
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const confirmDelete = async () => {
    const result = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (result) {
      deleteBooking();
    }
  };

  const deleteBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const { message } = await response.json();

      if (response.ok) {
        location.reload();
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const reviewPayload = {
        username: user?.username || "Guest",
        reviewText,
        rating,
      };

      const response = await fetch(`${BASE_URL}/review/${tourName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(reviewPayload),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success("Review Submitted Successfully!");
        setShowReview(false);
        setReviewText("");
        setRating(5);
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <>
      <tbody className="rounded overflow-hidden py-8 px-3 bg-gray-100 shadow-lg relative">
        <tr className="w-full text-center overflow-hidden">
          <td className="tableData text-start">{tourName}</td>
          <td className="hidden md:table-cell tableData">{maxGroupSize}</td>
          <td>{date}</td>
          <td>{totalPrice}</td>
          <td className="capitalize font-semibold">{status}</td>
          <td className="flex flex-col md:flex-row justify-center items-center gap-2">
            {status === 'approved' && (
              <Link
                to={`/pay/${_id}`}
                className="btn my-2 !bg-green-600 hover:!bg-green-700 w-full md:w-auto text-sm py-2 px-3 text-center"
              >
                Pay Now
              </Link>
            )}

            {(status === 'pending' || status === 'approved') && (
              <button
                onClick={confirmDelete}
                className="noCbtn bg-black my-2 hover:bg-gray-900 text-white w-full md:w-auto text-sm py-2 px-3"
              >
                Cancel
              </button>
            )}

            {status === 'paid' && (
              <>
                <span className="text-green-600 font-bold hidden md:block">Completed</span>
                <button
                  onClick={() => setShowReview(!showReview)}
                  className="btn my-2 w-full md:w-auto text-sm py-1 px-3 bg-yellow-500 hover:bg-yellow-600 text-white"
                >
                  {showReview ? "Cancel" : "Write Review"}
                </button>
              </>
            )}
          </td>
        </tr>

        {showReview && (
          <tr className="w-full">
            <td colSpan="6" className="p-4 bg-white border-t border-gray-200">
              <form onSubmit={submitReview} className="flex flex-col gap-3 max-w-lg mx-auto">
                <h4 className="font-bold text-lg text-start">Review your journey: {tourName}</h4>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(num => (
                    <span
                      key={num}
                      onClick={() => setRating(num)}
                      className={`cursor-pointer text-xl ${rating >= num ? 'text-orange-500' : 'text-gray-300'}`}
                    >
                      <FaStar />
                    </span>
                  ))}
                </div>
                <textarea
                  required
                  rows="3"
                  className="w-full border p-2 rounded focus:outline-none focus:border-BaseColor"
                  placeholder="Share your experience..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <button type="submit" className="btn self-end py-2 px-6">Submit Review</button>
              </form>
            </td>
          </tr>
        )}
      </tbody>
    </>
  );
};

export default BookingCard;
