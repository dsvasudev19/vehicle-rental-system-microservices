import { useEffect, useState } from "react";
import { axiosInstance } from "./../../axiosInstance";
import { Trash2, Pencil, Plus } from "lucide-react";
import AddVendor from "../modals/AddVendor";
import toast from "react-hot-toast";
const Vendors = () => {
  const [vendors, setVendors] = useState<any>([]);
  const [vendorId, setVendorId] = useState<any>();
  const [showModal,setShowModal]=useState<any>(false);

  const getAllVendors = async () => {
    try {
      const res = await axiosInstance.get("/vendor");
      if (res.status === 200) {
        setVendors(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVendor = async (id: number) => {
    try {
        const res=await axiosInstance.delete("/vendor/"+id);
        if(res.status===200){
            toast.success("Successfully deleted the toast");
        }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  const closeModal=async()=>{
    setShowModal(false);
  }

  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold">
            Vendor Management
          </h1>
          <button
            className="btn bg-gray-900 rounded p-2 text-white flex gap-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Plus />
            Add Vendor
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Vendor name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="flex gap-6 m-3 justify-end">
                <a className="cursor-pointer">
                  <Pencil />
                </a>
                <a
                  onClick={() => {
                    setVendorId(1);
                    deleteVendor(vendorId);
                  }}
                  className="cursor-pointer"
                >
                  <Trash2 />
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                1
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                Apple MacBook Pro 17"
              </th>
              <td className="px-6 py-4">Silver</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="flex gap-6 m-3 justify-end">
                <a>
                  <Pencil />
                </a>
                <a
                  onClick={() => {
                    setVendorId(1);
                    deleteVendor(vendorId);
                  }}
                >
                  <Trash2 />
                </a>
              </td>
            </tr>

            {vendors?.map((vendor: any) => {
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {vendor?.id}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {vendor?.name}
                </th>
                <td className="px-6 py-4">{vendor?.email}</td>
                <td className="px-6 py-4">{vendor?.phone}</td>
                <td className="px-6 py-4">{vendor?.createdAt}</td>
                <td>
                  <a onClick={()=>{
                    setVendorId(vendor?.id)
                  }}>
                    <Pencil />
                  </a>
                  <a
                    onClick={() => {
                      setVendorId(vendor?.id);
                      deleteVendor(vendorId);
                    }}
                  >
                    <Trash2 />
                  </a>
                </td>
              </tr>;
            })}
          </tbody>
        </table>
      </div>
      {showModal && <AddVendor openModal={showModal} close={closeModal} />}
    </div>
  );
};

export default Vendors;
