// import { Navigate, useLocation } from "react-router";
// import useAuth from "../hooks/useAuth";
// import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";

// const PrivateRoute = ({ children }) => {
//   const { user, loading } = useAuth();
//   const location = useLocation();

//   if (loading) return <LoadingSpinner />;
//   if (user) return children;
//   return (
//     <Navigate to="/login" state={{ from: location.pathname }} replace={true} />
//   );
//   // return <Navigate to="/login" state={location.pathname} replace="true" />;
// };

// export default PrivateRoute;
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
