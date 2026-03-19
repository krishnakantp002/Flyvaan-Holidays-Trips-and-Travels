import Logo from "/logo.png";
import React, { useContext, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaGithub,
} from "react-icons/fa";
import Newsletter from "../../shared/Newsletter";
import { AuthContext } from "../../context/AuthContext";

const Footer = () => {
  const { role } = useContext(AuthContext);

  return (
    <>
      {role === "admin" ? null : (
        <footer className="bg-gray-800 text-white px-5 py-8">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <img
                src={Logo}
                alt="Flyvaan Holidays Logo"
                className="h-24 w-64 md:mr-12 object-contain"
              />
              <div className="flex flex-col mt-8 text-center md:text-left">
                <p className="mb-2">Address: Plot no 2 near Bharat city, Tila more, Ghaziabad, Uttar Pradesh-201102</p>
                <p className="mb-2">Phone: +91 9572752525</p>
                <p className="mb-2">Email: flyvaanholidays@gmail.com</p>
                <p>&copy; flyvaan holidays. all rights are reserved</p>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="flex md:flex-col gap-4 mt-4 md:mt-0">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebookF />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaYoutube />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaGithub />
              </a>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
