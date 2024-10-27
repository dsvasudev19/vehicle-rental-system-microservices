import { useEffect, useState } from "react";
import { axiosInstance } from "./../../axiosInstance";
import { Trash2, Pencil, Plus, Bike, Car } from "lucide-react";
import toast from "react-hot-toast";
import AddVehicle from "../modals/AddVehicle";
import ClockLoader from "react-spinners/ClockLoader";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const [vehicleId, setVehicleId] = useState<any>();
  const [showModal, setShowModal] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);

  const getAllVehicles = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/vehicle");
      if (res.status === 200) {
        setVehicles(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      const res = await axiosInstance.delete("/vehicle/" + id);
      if (res.status === 200) {
        toast.success("Successfully deleted the vehicle");
        getAllVehicles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVehicles();
  }, []);

  const closeModal = async () => {
    setShowModal(false);
  };

  return (
    <div className="w-full h-full">
      <div className="relative overflow-x-auto w-full h-full">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold">
            Vehicle Management
          </h1>
          <button
            className="btn bg-gray-900 rounded p-2 text-white flex gap-2"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <Plus />
            Add Vehicle
          </button>
        </div>
        {loading ? (
          <div className="flex justify-center text-center items-center w-full !h-[90%]">
            <ClockLoader color="#085387" size={200} />
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Vehicle name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg No
                </th>
                <th scope="col" className="px-6 py-3">
                  Wheeler
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  PricePerHr
                </th>

                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vehicles?.map((vehicle: any) => {
                return (
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
                      {vehicle.name}
                    </th>
                    <td className="px-6 py-4">{vehicle?.regNo}</td>
                    <td className="px-6 py-4">
                      {vehicle?.wheelCount === 2 ? <Bike /> : <Car />}
                    </td>
                    <td className="px-6 py-4">{vehicle?.type}</td>
                    <td className="px-6 py-4">{vehicle?.location}</td>
                    <td className="px-6 py-4">{vehicle?.pricePerHr}</td>

                    <td className="flex gap-6 m-3 justify-end">
                      <a
                        onClick={() => {
                          setVehicleId(vehicle?.id);
                        }}
                      >
                        <Pencil className="cursor-pointer hover:text-green-700"/>
                      </a>
                      <a
                        onClick={() => {
                          setVehicleId(1);
                          deleteVehicle(vehicleId);
                        }}
                      >
                        <Trash2 className="cursor-pointer hover:text-red-700"/>
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      {showModal && <AddVehicle openModal={showModal} close={closeModal} getVehicles={getAllVehicles}/>}
    </div>
  );
};

export default Vehicles;
