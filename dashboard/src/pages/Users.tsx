import { useEffect, useState } from "react";
import { axiosInstance } from "../../axiosInstance";
import { Trash2 } from "lucide-react";
import toast from "../../node_modules/react-hot-toast/dist/index";

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

  const deleteUser = async (id: number) => {
    try {
      const res = await axiosInstance.delete("/users/" + id);
      if (res?.status === 200) {
        toast.success("User Deleted Successfully");
        getAllUsers()
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
            {users?.map((user: any,index:any) => {
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {user?.userId}
                  </th>
                  <td className="px-6 py-4 flex">{user?.name}</td>
                  <td className="px-6 py-4">{user?.email}</td>
                  <td className="px-6 py-4">+91 {user?.phone}</td>

                  <td className="px-6 py-4">
                    {new Date(user?.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex justify-end mr-6 mt-3">
                    <a
                      onClick={() => {
                        deleteUser(user?.userId);
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
    </div>
  );
};

export default Users;
