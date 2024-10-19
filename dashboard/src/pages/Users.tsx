import{ useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import {  Trash2 } from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState<any[]>([]);

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get("/users");
      if (res.status === 200) {
        setUsers(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      <div className="relative overflow-x-auto">
        <div className="flex justify-between mt-3 mb-3">
          <h1 className="text-2xl capitalize font-semibold text-gray-900">
            Users Management
          </h1>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User Id
              </th>
              <th scope="col" className="px-6 py-3">
                Name
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
                13
              </th>
              <td className="px-6 py-4 flex">Ram</td>
              <td className="px-6 py-4">ram@gmail.com</td>
              <td className="px-6 py-4">+91 3489839483</td>
              <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              <td className="flex justify-end mr-6 mt-3">
                <a>
                  <Trash2 />
                </a>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                87
              </th>
              <td className="px-6 py-4 flex">Panth</td>
              <td className="px-6 py-4">panth@gmail.com</td>
              <td className="px-6 py-4">+91 8834873434</td>

              <td className="px-6 py-4">{new Date().toLocaleDateString()}</td>
              <td className="flex justify-end mr-6 mt-3">
                <a>
                  <Trash2 />
                </a>
              </td>
            </tr>
            {users?.map((user: any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.id}
                  </th>
                  <td className="px-6 py-4 flex">{user?.name}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">+91 {user?.phone}</td>

                  <td className="px-6 py-4">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
