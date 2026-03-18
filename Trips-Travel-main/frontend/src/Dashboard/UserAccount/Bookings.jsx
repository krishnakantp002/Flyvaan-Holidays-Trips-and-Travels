import React, { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import BookingCard from "../../shared/BookingCard";

const Bookings = () => {
  const { user, token } = useContext(AuthContext);
  const { apiData: bookings } = useFetch(`${BASE_URL}/booking/${user._id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return (
    <div className="py-8">
      <div className="flex flex-col gap-5">
        <table className="w-full table-auto text-xs md:text-sm gap-4 border-collapse border">
          <thead className="w-full py-2">
            <tr>
              <th className="tableData">Tour</th>
              <th className="hidden md:block tableData">Persons</th>
              <th className="tableData">Booked for</th>
              <th className="tableData">Price</th>
              <th className="tableData">Status</th>
              <th className="tableData">Action</th>
            </tr>
          </thead>
          {bookings?.map((booking) => (
            <BookingCard booking={booking} key={booking._id} />
          ))}
        </table>
      </div>
    </div>
  );
};

export default Bookings;
