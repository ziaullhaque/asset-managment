import React from "react";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner/LoadingSpinner";
import MyAssets from "../EmployeeDashboard/MyAssets/MyAssets";
import Statistics from "../HRDashboard/Statistics/Statistics";

const Dashboard = () => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "employee") return <MyAssets />;

  if (role === "hr") return <Statistics />;
};

export default Dashboard;
