import { Ban, Trash2 } from "lucide-react";
import  { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import toast from "react-hot-toast";
import AddCoupon from "../modals/AddCoupon";
import { Plus } from "lucide-react";

const Coupons = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [showModal,setShowModal]=useState<any>(false);

  const blockTheCoupon = async (id: number) => {
    try {
      const res = await axiosInstance.get("/coupon/block/" + id);
      if (res?.status === 200) {
        toast.success("Coupon Blocked Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  

  const getAllCoupons = async () => {
    try {
      const res = await axiosInstance.get("/coupon");
      if (res.status === 200) {
        setCoupons(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTheCoupon = async (id: number) => {
    try {
      const res = await axiosInstance.delete("/coupon/" + id);
      if (res?.status === 200) {
        toast.success("Coupon Deleted Successfully");
        getAllCoupons()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCoupons();
  }, []);

  const closeModal=()=>{
    setShowModal(false)
  }

  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Coupon Management
          </h1>
          <button
            className="btn bg-gray-900 rounded p-2 text-white flex gap-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Plus />
            Add Coupon
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Coupon Code
              </th>
              <th scope="col" className="px-6 py-3">
                Type (Flat | Percentage)
              </th>
              <th scope="col" className="px-6 py-3">
                Discount
              </th>
              <th scope="col" className="px-6 py-3">
                Min. Purchase Value
              </th>
              <th scope="col" className="px-6 py-3">
                Max. Discount Value
              </th>
              <th scope="col" className="px-6 py-3">
                Expiry Date
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
           
            {coupons?.map((coupon: any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {coupon?.code}
                  </th>
                  <td className="px-6 py-4">{coupon?.type}</td>
                  <td className="px-6 py-4">{coupon?.discount}</td>
                  <td className="px-6 py-4">{coupon?.minPurchaseValue}</td>
                  <td className="px-6 py-4">{coupon?.maxDiscountValue}</td>
                  <td className="px-6 py-4">
                    {new Date(coupon?.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 flex gap-3">
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        blockTheCoupon(coupon?.id);
                      }}
                    >
                      <Ban />
                    </a>
                    <a
                      className="cursor-pointer"
                      onClick={() => {
                        deleteTheCoupon(coupon?.id);
                      }}
                    >
                      <Trash2 />
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        showModal && <AddCoupon openModal={showModal} close={closeModal} />
      }
    </div>
  );
};

export default Coupons;
