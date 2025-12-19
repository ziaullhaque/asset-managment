import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { FaBars } from "react-icons/fa";
import {
  LayoutDashboard,
  Package,
  Users,
  ClipboardList,
  PlusCircle,
  ArrowUpCircle,
  User,
  LogOut,
  Boxes,
} from "lucide-react";
import { useState } from "react";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";
import LoadingSpinner from "../components/Shared/LoadingSpinner/LoadingSpinner";
import Logo from "../components/Shared/Logo/Logo";
import Swal from "sweetalert2";

const DashboardLayout = () => {
  const { role, isRoleLoading } = useRole();
  const { user, logOut } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  if (isRoleLoading) return <LoadingSpinner />;

  const HRLinks = [
    { id: 1, name: "Statistics", path: "/dashboard", icon: LayoutDashboard },
    { id: 2, name: "Asset List", path: "/dashboard/asset-list", icon: Boxes },
    {
      id: 3,
      name: "Add Asset",
      path: "/dashboard/add-asset",
      icon: PlusCircle,
    },
    {
      id: 4,
      name: "All Requests",
      path: "/dashboard/all-requests",
      icon: ClipboardList,
    },
    {
      id: 5,
      name: "Employee List",
      path: "/dashboard/employee-list",
      icon: Users,
    },
    {
      id: 6,
      name: "Upgrade Package",
      path: "/dashboard/upgrade-package",
      icon: ArrowUpCircle,
    },
  ];

  const employeeLinks = [
    { id: 1, name: "My Assets", path: "/dashboard/my-asset", icon: Package },
    { id: 2, name: "My Team", path: "/dashboard/my-team", icon: Users },
    {
      id: 3,
      name: "Request Assets",
      path: "/dashboard/request-asset",
      icon: ClipboardList,
    },
  ];

  const dashboardLinks = role === "employee" ? employeeLinks : HRLinks;

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006d6f",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
    });

    if (result.isConfirmed) {
      await logOut();
      navigate("/");
      Swal.fire("Logged out!", "You have been logged out.", "success");
    }
  };

  return (
    <div className="min-h-screen bg-[#006d6f]/10">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 bg-white border-r-2 border-gray-200 shadow-xl`}
      >
        {/* Sidebar Header - Branding */}
        <div className="h-20 flex items-center justify-center border-b-2 border-gray-100 bg-[#006d6f]/10 ">
          <Link to="/" className="flex items-center gap-2">
            <Logo size={40} color="#006d6f" />
            <div className="text-center">
              <h1 className="text-xl font-bold">Asset Management</h1>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {/* Dashboard Links */}
            {dashboardLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <li key={link.id}>
                  <NavLink
                    to={link.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-[#006d6f] text-white shadow-lg"
                        : "text-gray-700 hover:bg-[#006d6f]/10  hover:text-[#006d6f]"
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="text-lg" />
                    <span className="font-medium">{link.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Profile & Logout */}
        <div
          className={`p-4 border-t-2 border-gray-100 ${
            role === "employee" ? "mt-130" : "mt-90"
          }`}
        >
          {/* <hr /> */}
          <NavLink
            to="/dashboard/profile"
            onClick={() => setIsSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-[#006d6f] text-white shadow-lg"
                  : "text-gray-700 hover:bg-[#006d6f]/10 hover:text-[#006d6f]"
              }`
            }
          >
            <User className="text-lg" />
            <span className="font-medium">Profile</span>
          </NavLink>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          >
            <LogOut className="text-lg" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Navbar */}
        <header className="sticky top-0 z-20 h-20 bg-white border-b-2 border-gray-200 shadow-sm">
          <div className="h-full px-4 md:px-6 flex items-center justify-between">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden btn btn-ghost btn-square text-gray-700"
            >
              <FaBars className="text-xl" />
            </button>

            {/* Page Title */}
            <div className="flex-1 lg:flex-none">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                {dashboardLinks.find((link) => link.path === location.pathname)
                  ?.name || "Dashboard"}
              </h2>
            </div>

            <div className="relative lg:hidden">
              <img
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                src={
                  user?.photoURL ||
                  "https://i.ibb.co.com/k2WMVyqq/pngtree-portrait-of-attractive-male-doctor-png-image-14354532.png"
                }
                className="w-9 h-9 rounded-full ring-2 ring-[#006d6f] cursor-pointer"
              />

              {mobileMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border z-50">
                  <NavLink
                    to="/dashboard/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-2 hover:bg-gray-100 rounded-lg"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 rounded-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Desktop User Info */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                <span className="font-semibold rounded-md bg-[#006d6f]/10  inline-block px-2 py-0.5 text-xs">
                  {role === "hr" ? "HR" : "Employee"}
                </span>
                <p className="text-sm font-semibold text-gray-900">
                  {user?.displayName || "User"}
                </p>
                <p className="text-xs text-gray-600">{user?.email}</p>
              </div>
              <div className="avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-[#006d6f]">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co.com/k2WMVyqq/pngtree-portrait-of-attractive-male-doctor-png-image-14354532.png"
                    }
                    alt={user?.displayName || "User"}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)] p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
