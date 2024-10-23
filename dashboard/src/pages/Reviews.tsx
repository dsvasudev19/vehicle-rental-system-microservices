import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { Star } from "lucide-react";
import ClockLoader from "react-spinners/ClockLoader";

const Reviews = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);

  const getAllReviews = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/review");
      if (res.status === 200) {
        setReviews(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Review Management
          </h1>
        </div>
        {loading ? (
          <div className="flex justify-center text-center items-center w-full !h-[90%]">
            <ClockLoader color="#085387" size={200} />
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Vehicle Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>
                <th scope="col" className="px-6 py-3">
                  Content
                </th>
                <th scope="col" className="px-6 py-3">
                  Posted On
                </th>
              </tr>
            </thead>
            <tbody>
              {reviews?.map((review: any) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {review?.vehicleId}
                    </th>
                    <td className="px-6 py-4 flex">
                      {Array.from({ length: review?.rating }).map(
                        (_, index) => {
                          return <Star key={index} />;
                        }
                      )}
                    </td>
                    <td className="px-6 py-4">{review?.content}</td>
                    <td className="px-6 py-4">{review?.postedOn}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Reviews;
