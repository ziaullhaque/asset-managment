// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: role, isLoading: isRoleLoading } = useQuery({
//     enabled: !loading && !!user?.email,
//     queryKey: ["role", user?.email],
//     queryFn: async () => {
//       const { data } = await axiosSecure.get("/user/role");
//       return data.role;
//     },
//   });
//   return { role, isRoleLoading };
// };

// export default useRole;
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: role = "employee", 
    isLoading: isRoleLoading,
  } = useQuery({
    enabled: !loading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/role");
      return res.data?.role || "employee";
    },
  });

  return { role, isRoleLoading };
};

export default useRole;
