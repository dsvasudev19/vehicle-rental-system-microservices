import React from "react";
import { useAuth } from "./AuthContext";

const AuthLayout = ({ children }) => {
  const { user, loading } = useAuth();
  if (!user && !loading) {
    window.location.href = "/auth/login";
  }
  return <>{children}</>;
};

export default AuthLayout;
