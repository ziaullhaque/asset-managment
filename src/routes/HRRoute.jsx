import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const HRRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role === "hr") return children;

  return <Navigate to={"/"} replace="true" />;
};

export default HRRoute;
