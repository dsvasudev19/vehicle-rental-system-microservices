import { Outlet } from "react-router-dom";
import { BadgeIndianRupee, CarFront, ChartNoAxesColumnDecreasing, CreditCard, LayoutDashboard, SquarePen, UserCog, Users,Tickets } from "lucide-react";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [path,setPath]=useState<any>("");

  useEffect(()=>{
    const route=window.location.pathname;
    setPath(route)
  })

  return (
    <div className="w-full h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                href="/dashboard/home"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/home" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <LayoutDashboard />
                <span className="ms-3">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/vendors"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white  dark:hover:bg-gray-700 group ${
                  path === "/dashboard/vendors" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <UserCog />
                <span className="flex-1 ms-3 whitespace-nowrap">Vendors</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/bookings"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/bookings" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <ChartNoAxesColumnDecreasing />
                <span className="flex-1 ms-3 whitespace-nowrap">Bookings</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/users"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/users" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <Users />
                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/vehicles"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/vehicles" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <CarFront />
                <span className="flex-1 ms-3 whitespace-nowrap">Vehicles</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/coupons"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/coupons" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <CreditCard />
                <span className="flex-1 ms-3 whitespace-nowrap">Coupons</span>
              </a>
            </li>

            <li>
              <a
                href="/dashboard/transactions"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/transactions" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <BadgeIndianRupee />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Transactions
                </span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/reviews"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/reviews" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <SquarePen />
                <span className="flex-1 ms-3 whitespace-nowrap">Reviews</span>
              </a>
            </li>
            <li>
              <a
                href="/dashboard/support"
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white dark:hover:bg-gray-700 group ${
                  path === "/dashboard/support" ? "bg-gray-700 text-white hover:bg-gray-700" : "hover:bg-gray-200"
                }`}
              >
                <Tickets />
                <span className="flex-1 ms-3 whitespace-nowrap">Support</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-1 sm:ml-64 h-full bg-gray-300">
        <Outlet />
        {/* <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 h-full">
          <Outlet />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
