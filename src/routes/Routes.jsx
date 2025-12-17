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
import EmployeeList from "../pages/Dashboard/HRDashboard/EmployeeList/EmployeeList";
import UpgradePackage from "../pages/Dashboard/HRDashboard/UpgradePackage/UpgradePackage";
import PrivateRoute from "./PrivateRoute";
import RequestAsset from "../pages/Dashboard/EmployeeDashboard/RequestAsset.jsx/RequestAsset";
import MyAssets from "../pages/Dashboard/EmployeeDashboard/MyAssets/MyAssets";
import MyTeam from "../pages/Dashboard/EmployeeDashboard/MyTeam/MyTeam";
import EmployeeRoute from "./EmployeeRoute";
import HRRoute from "./HRRoute";

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
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/asset-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AssetList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-asset",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AddAsset />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-requests",
        element: (
          <PrivateRoute>
            <HRRoute>
              <AllRequest />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/employee-list",
        element: (
          <PrivateRoute>
            <HRRoute>
              <EmployeeList />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/upgrade-package",
        element: (
          <PrivateRoute>
            <HRRoute>
              <UpgradePackage />
            </HRRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/request-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <RequestAsset />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-asset",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyAssets />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/my-team",
        element: (
          <PrivateRoute>
            <EmployeeRoute>
              <MyTeam />
            </EmployeeRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
