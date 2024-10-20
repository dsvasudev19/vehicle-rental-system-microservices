import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";

const Bookings = () => {
  const [bookings, setBookings] = useState<any[]>([]);

  const getAllBookings = async () => {
    try {
      const res = await axiosInstance.get("/bookings");
      if (res?.status === 200) {
        setBookings(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Booking Management
          </h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Booking Id
              </th>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Id
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                From
              </th>
              <th scope="col" className="px-6 py-3">
                To
              </th>
              <th scope="col" className="px-6 py-3">
                Booking Date
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
           
            {bookings?.map((booking: any, index: any) => {
              return (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {booking?.bookingId}
                  </th>
                  <td className="px-6 py-4">{booking?.userId}</td>
                  <td className="px-6 py-4">{booking?.vehicleId}</td>
                  <td className="px-6 py-4">{booking?.price}</td>
                  <td className="px-6 py-4">
                    {new Date(booking?.fromDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking?.toDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(booking?.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{booking?.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
