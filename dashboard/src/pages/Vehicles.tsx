import { useEffect, useState } from "react";
import { axiosInstance } from "./../../axiosInstance";
import { Trash2, Pencil, Plus, Bike, Car } from "lucide-react";
import toast from "react-hot-toast";
import AddVehicle from "../modals/AddVehicle";
const Vehicles = () => {
  const [vehicles, setVehicles] = useState<any>([]);
  const [vehicleId, setVehicleId] = useState<any>();
  const [showModal, setShowModal] = useState<any>(false);

  const getAllVehicles = async () => {
    try {
      const res = await axiosInstance.get("/vehicle");
      if (res.status === 200) {
        setVehicles(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVehicle = async (id: number) => {
    try {
      const res = await axiosInstance.delete("/vehicle/" + id);
      if (res.status === 200) {
        toast.success("Successfully deleted the vehicle");
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
    <div>
      <div className="relative overflow-x-auto">
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
                CreatedAt
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
                Yamaha FZ V4
              </th>
              <td className="px-6 py-4">TS 23 FL 8373</td>
              <td className="px-6 py-4">
                <Bike />
              </td>
              <td className="px-6 py-4">Racing</td>
              <td className="px-6 py-4">Hyderabad</td>
              <td className="px-6 py-4">989</td>
              <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              <td className="flex gap-6 m-3 justify-end">
                <a className="cursor-pointer">
                  <Pencil />
                </a>
                <a
                  onClick={() => {
                    setVehicleId(1);
                    deleteVehicle(vehicleId);
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
                Harley Davidson X440
              </th>
              <td className="px-6 py-4">BR 38 FL 4934</td>
              <td className="px-6 py-4">
                <Bike />
              </td>
              <td className="px-6 py-4">Vintage</td>
              <td className="px-6 py-4">Bihar</td>
              <td className="px-6 py-4">8998</td>
              <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              <td className="flex gap-6 m-3 justify-end">
                <a>
                  <Pencil />
                </a>
                <a
                  onClick={() => {
                    setVehicleId(1);
                    deleteVehicle(vehicleId);
                  }}
                >
                  <Trash2 />
                </a>
              </td>
            </tr>

            {vehicles?.map((vehicle: any) => {
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
                <td className="px-6 py-4">{vehicle?.price}</td>
                <td className="px-6 py-4">
                  {new Date(vehicle?.createdAt).toLocaleDateString()}
                </td>
                <td className="flex gap-6 m-3 justify-end">
                  <a
                    onClick={() => {
                      setVehicleId(vehicle?.id);
                    }}
                  >
                    <Pencil />
                  </a>
                  <a
                    onClick={() => {
                      setVehicleId(1);
                      deleteVehicle(vehicleId);
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
      {showModal && <AddVehicle openModal={showModal} close={closeModal} />}
    </div>
  );
};

export default Vehicles;