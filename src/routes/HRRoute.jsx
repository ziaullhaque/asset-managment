// import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
// import { Navigate } from "react-router";
// import useRole from "../hooks/useRole";

// const HRRoute = ({ children }) => {
//   const { role, isRoleLoading } = useRole();

//   if (isRoleLoading) return <LoadingSpinner />;

//   if (role === "hr") return children;

//   return <Navigate to="/" replace={true} />;
// };

// export default HRRoute;
import { Navigate } from "react-router";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import useRole from "../hooks/useRole";

const HRRoute = ({ children }) => {
  const { role, isRoleLoading } = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  if (role !== "hr") {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

export default HRRoute;
