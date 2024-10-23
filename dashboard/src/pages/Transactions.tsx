import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";
import ClockLoader from "react-spinners/ClockLoader";

const Transactions = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<any>(false);

  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/payment/transactions");
      if (res.status === 200) {
        setTransactions(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      const res = await axiosInstance.delete(
        "/payment/delete-transaction/" + id
      );
      if (res.status === 200) {
        toast.success("Successfully Deleted the Transactions");
        getAllTransactions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Transaction Management
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
                  Transaction Id
                </th>
                <th scope="col" className="px-6 py-3">
                  User Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  orderId
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction: any) => {
                return (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {transaction?.transactionId}
                    </th>
                    <td className="px-6 py-4">{transaction?.userId}</td>
                    <td className="px-6 py-4">{transaction?.amount / 100}</td>
                    <td className="px-6 py-4">{transaction?.orderId}</td>
                    <td className="px-6 py-4">{transaction?.status}</td>
                    <td className="px-6 py-4">
                      {new Date(transaction?.createdAt).toLocaleDateString()}
                    </td>
                    <td className="flex justify-end gap-6 mt-3 me-3">
                      <a
                        onClick={() => {
                          deleteTransaction(transaction?.transactionId);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash />
                      </a>
                    </td>
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

export default Transactions;
