import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import { AiOutlineMenu } from "react-icons/ai";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";
import useAuth from "../../../hooks/useAuth";
import avatarImg from "../../../assets/placeholder.jpg";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#006d6f]/20 shadow-sm">
      {/* <Container> */}
      {/*  className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-[#006d6f]/20 shadow-sm" */}
      <div>
        <Container>
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-[#006d6f] font-extrabold text-2xl"
            >
              <Logo size={40} color="#006d6f" />
              AssetManagement
            </Link>

            {/* About (Desktop) */}
            <div className="hidden md:flex">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 text-[#006d6f] bg-[#006d6f]/10 rounded-lg transition font-semibold"
                    : `px-4 py-2 text-gray-700 hover:text-[#006d6f] hover:bg-[#006d6f]/10 rounded-lg transition font-semibold`
                }
                to="/"
              >
                Home
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 text-[#006d6f] bg-[#006d6f]/10 rounded-lg transition font-semibold"
                    : `px-4 py-2 text-gray-700 hover:text-[#006d6f] hover:bg-[#006d6f]/10 rounded-lg transition font-semibold`
                }
                to="/about"
              >
                About
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "px-4 py-2 text-[#006d6f] bg-[#006d6f]/10 rounded-lg transition font-semibold"
                    : `px-4 py-2 text-gray-700 hover:text-[#006d6f] hover:bg-[#006d6f]/10 rounded-lg transition font-semibold`
                }
                to="/support"
              >
                Support
              </NavLink>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="p-3 md:px-4 border border-[#006d6f]/30 bg-white rounded-lg flex items-center gap-3 cursor-pointer hover:shadow-md transition"
              >
                <AiOutlineMenu className="text-[#006d6f] text-xl" />
                <img
                  className="hidden md:block w-9 h-9 rounded-full border border-[#006d6f]/40"
                  referrerPolicy="no-referrer"
                  src={user?.photoURL || avatarImg}
                  alt="profile"
                />
              </div>

              {isOpen && (
                <div className="absolute right-0 top-14 w-[45vw] md:w-[13vw] bg-white border border-[#006d6f]/20 rounded-xl shadow-xl overflow-hidden">
                  <div className="flex flex-col">
                    <Link
                      to="/"
                      className="md:hidden px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                    >
                      Home
                    </Link>

                    <Link
                      to="/about"
                      className="md:hidden px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                    >
                      About
                    </Link>
                    <Link
                      to="/support"
                      className="md:hidden px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                    >
                      Support
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to="/dashboard"
                          className="px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                        >
                          Dashboard
                        </Link>

                        <button
                          onClick={logOut}
                          className="px-4 py-3 text-left text-red-600 hover:bg-red-50 transition font-semibold"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                        >
                          Login
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-3 hover:bg-[#006d6f]/10 transition font-semibold text-gray-700"
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </div>
      {/* </Container> */}
    </div>
  );
};

export default Navbar;
