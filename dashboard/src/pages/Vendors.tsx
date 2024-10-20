import { useEffect, useState } from "react";
import { axiosInstance } from "./../../axiosInstance";
import { Trash2, Pencil, Plus } from "lucide-react";
import AddVendor from "../modals/AddVendor";
import toast from "react-hot-toast";
import EditVendor from "../modals/EditVendor";
const Vendors = () => {
  const [vendors, setVendors] = useState<any>([]);
  const [vendorId, setVendorId] = useState<any>();
  const [showModal, setShowModal] = useState<any>(false);
  const [editModal,setEditModal]=useState<any>(false);

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
      const res = await axiosInstance.delete("/vendor/" + id);
      if (res.status === 200) {
        toast.success("Successfully deleted the Vendor");
        getAllVendors()
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  const closeModal = async () => {
    setShowModal(false);
  };

  const editClose=async()=>{
    setEditModal((prev:any)=>{
      return !prev;
    })
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
           
            {vendors?.map((vendor: any) => {
             return (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {vendor?.vendorId}
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {vendor?.name}
              </th>
              <td className="px-6 py-4">{vendor?.email}</td>
              <td className="px-6 py-4">{vendor?.phone}</td>
              <td className="px-6 py-4">{new Date(vendor?.createdAt).toLocaleDateString()}</td>
              <td className="flex gap-6 m-3 justify-end">
                <a
                  onClick={() => {
                    console.log("clicking")
                    setVendorId(vendor?.vendorId);
                    setEditModal(true);
                  }}
                  className="cursor-pointer"
                >
                  <Pencil />
                </a>
                <a
                  onClick={() => {
                    setVendorId(vendor?.vendorId);
                    deleteVendor(vendor?.vendorId);
                  }}
                  className="cursor-pointer"
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
      {showModal && <AddVendor openModal={showModal} close={closeModal} getVendors={getAllVendors} />}
      {editModal && (
        <EditVendor
          openModal={editModal}
          close={editClose}
          vendorId={vendorId}
          getVendors={getAllVendors}
        />
      )}
    </div>
  );
};

export default Vendors;
