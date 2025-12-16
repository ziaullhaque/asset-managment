import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Error from "../components/Home/Error/Error";
import Home from "../pages/Home/Home";
import About from "../components/Home/About/About";
import Support from "../components/Home/Support/Support";
import Login from "../pages/Login/Login";
import JoinAsHR from "../pages/JoinAsHR/JoinAsHR";
import JoinAsEmployee from "../pages/JoinAsEmployee/JoinAsEmployee";
// import SignUp from "../pages/SignUp/SignUp";
// import JoinHR from "../pages/JoinHR";
// import JoinEmployee from "../pages/JoinEmployee";

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
      // {
      //   path: "/sign-up",
      //   element: <SignUp />,
      // },
      // {
      //   path: "/join-hr",
      //   element: <JoinHR />,
      // },
      // {
      //   path: "/join-employee",
      //   element: <JoinEmployee />,
      // },
    ],
  },
]);
