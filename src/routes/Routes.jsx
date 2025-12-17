import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Error from "../components/Home/Error/Error";
import Home from "../pages/Home/Home";
import About from "../components/Home/About/About";
import Support from "../components/Home/Support/Support";
import Login from "../pages/Login/Login";
import JoinAsHR from "../pages/JoinAsHR/JoinAsHR";
import JoinAsEmployee from "../pages/JoinAsEmployee/JoinAsEmployee";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard/Dashboard";
import Profile from "../components/Profile/Profile";
import AssetList from "../pages/Dashboard/HRDashboard/AssetList/AssetList";
import AddAsset from "../pages/Dashboard/HRDashboard/AddAsset/AddAsset";
import AllRequest from "../pages/Dashboard/HRDashboard/AllRequest/AllRequest";
import PrivateRoute from "./PrivateRoute";
import RequestAsset from "../pages/Dashboard/EmployeeDashboard/RequestAsset.jsx/RequestAsset";
import MyAssets from "../pages/Dashboard/EmployeeDashboard/MyAssets/MyAssets";
import MyTeam from "../pages/Dashboard/EmployeeDashboard/MyTeam/MyTeam";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/join-hr",
        element: <JoinAsHR />,
      },
      {
        path: "/join-employee",
        element: <JoinAsEmployee />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      //hr
      {
        path: "/dashboard/asset-list",
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-asset",
        element: (
          <PrivateRoute>
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-requests",
        element: (
          <PrivateRoute>
            <AllRequest />
          </PrivateRoute>
        ),
      },
      //employee
      {
        path: "/dashboard/request-asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-asset",
        element: (
          <PrivateRoute>
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
