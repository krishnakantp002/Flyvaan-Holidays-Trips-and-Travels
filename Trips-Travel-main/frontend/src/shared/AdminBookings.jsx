import React, { useContext } from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const BookingCard = ({ booking }) => {
  const { token } = useContext(AuthContext);
  const {
    tourName,
    fullName,
    userId,
    phone,
    totalPrice,
    maxGroupSize,
    date,
    createdAt,
    _id,
    status
  } = booking;

  const setCreatedAt = new Date(createdAt);
  const newCreatedAt = setCreatedAt.toDateString(); // Get a string representing the date portion

  const booked = new Date(date);
  const bookedFor = booked.toDateString(); // Get a string representing the date portion

  const confirmDelete = async () => {
    const result = window.confirm("Is this booking completed?");
    if (result) {
      deleteBooking();
    }
  };

  const deleteBooking = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { message } = await response.json();

      if (response.ok) {
        // toast.success(message)
        location.reload();
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch(`${BASE_URL}/booking/${_id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: "approved" })
      });
      const { message } = await response.json();

      if (response.ok) {
        toast.success("Booking Approved!");
        location.reload();
      } else {
        toast.error(message);
      }
    } catch (err) {
      toast.error("Server not responding");
    }
  };

  return (
    <>
      <tbody className="rounded overflow-hidden py-8 px-3 border-b-gray-500 border-b-[1px]   ">
        <tr className="w-full text-center overflow-hidden">
          <td className="">{tourName}</td>
          <td className="">{fullName}</td>
          <td className="">{userId}</td>
          <td className="">{maxGroupSize}</td>
          <td className="">{phone}</td>
          <td className="">{bookedFor}</td>
          <td className="">{newCreatedAt}</td>
          <td className="">{totalPrice}</td>
          <td className="capitalize font-semibold">{status}</td>
          <td>
            {status === 'pending' ? (
              <button onClick={handleApprove} className="btn my-2 mx-2 !bg-green-600 hover:!bg-green-700">
                Approve
              </button>
            ) : (
              <button onClick={confirmDelete} className="btn my-2 mx-2 ">
                Completed
              </button>
            )}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default BookingCard;
