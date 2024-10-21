
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import Dashboard from "./Layout/Dashboard";
import Vendors from "./pages/Vendors";
import Users from "./pages/Users";
import Coupons from "./pages/Coupons";
import Reviews from "./pages/Reviews";
import Vehicles from "./pages/Vehicles";
import Bookings from "./pages/Bookings";
import Transactions from "./pages/Transactions";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="vendors" element={<Vendors />} />
          <Route path="users" element={<Users />} />
          <Route path="coupons" element={<Coupons />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/auth/*">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Navigate to="/auth/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
