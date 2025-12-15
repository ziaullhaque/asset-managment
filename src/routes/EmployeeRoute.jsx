import React from "react";
import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "employee") return children;

  return <Navigate to={"/"} replace="true" />;
};

export default EmployeeRoute;
