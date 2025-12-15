import React from "react";
import { NavLink } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <Container>
        {" "}
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="text-[#006d6f] font-extrabold text-2xl mb-6 flex items-center gap-2">
                <Logo size={40} color="#006d6f" />
                AssetManagement
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                A powerful asset management platform to help companies track
                equipment, automate workflows, and enhance operational
                efficiency.
              </p>

              <div className="flex space-x-4">
                <a
                  className="w-10 h-10 rounded-full bg-[#006d6f]/10 flex items-center justify-center text-[#006d6f] hover:bg-[#006d6f] hover:text-white transition"
                  href="#"
                >
                  <FaFacebookF />
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-[#006d6f]/10 flex items-center justify-center text-[#006d6f] hover:bg-[#006d6f] hover:text-white transition"
                  href="#"
                >
                  <FaTwitter />
                </a>
                <a
                  className="w-10 h-10 rounded-full bg-[#006d6f]/10 flex items-center justify-center text-[#006d6f] hover:bg-[#006d6f] hover:text-white transition"
                  href="#"
                >
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">
                Quick Links
              </h4>

              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  <NavLink to="/" className="hover:text-[#006d6f] transition">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className="hover:text-[#006d6f] transition"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/support"
                    className="hover:text-[#006d6f] transition"
                  >
                    Support
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/support"
                    className="hover:text-[#006d6f] transition"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-gray-900 mb-6 text-lg">
                Contact Info
              </h4>

              <ul className="space-y-4 text-sm text-gray-600">
                <li className="flex items-center gap-3">
                  <FaPhoneAlt className="text-[#006d6f]" /> +880 1800-000000
                </li>
                <li className="flex items-center gap-3">
                  <FaEnvelope className="text-[#006d6f]" />
                  info@assetmanagement.com
                </li>
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-[#006d6f] mt-1" />
                  Corporate Office, Business District
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600">
            <p>© 2025 AssetManagement. All rights reserved.</p>

            <div className="flex gap-6">
              <a className="hover:text-[#006d6f] transition" href="#">
                Privacy Policy
              </a>
              <a className="hover:text-[#006d6f] transition" href="#">
                Terms of Service
              </a>
              <a className="hover:text-[#006d6f] transition" href="#">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
