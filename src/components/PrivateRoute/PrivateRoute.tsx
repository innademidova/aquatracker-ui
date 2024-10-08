import { useGetCurrentUserQuery } from "@/app/api/userApi.ts";
import React from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  element: React.ComponentType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element: Element }) => {
  const { data: currentUser, error, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !currentUser) {
    return <Navigate to="/" />;
  }

  return <Element />;
};

export default PrivateRoute;
