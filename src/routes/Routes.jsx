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
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
    ],
  },
]);
