import dayjs from "dayjs";
import React, { useContext, useState  } from "react";
import logo from "../assets/logo.jpeg";
import GlobalContext from "../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import user from "../assets/user.png";
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import Cookies from 'js-cookie';
import {  jwtDecode } from "jwt-decode";
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }

  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }

  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

  function handleDropdown() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleLogout() {
    navigate("/"); 
  }

  function username() {
    const jwtToken = Cookies.get('jwtToken');
    if (!jwtToken) {
      console.error('JWT token not found');
      return ''; 
    }
    const decoded = jwtDecode(jwtToken);
    const jsonUser = JSON.stringify(decoded, null, 2);
    const userObject = JSON.parse(jsonUser);
    const username = userObject.user.username ;
    const role = userObject.user.userRole ;
  
    return (username + " (" +role+")") ;
  }

  return (
    <header className="px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
        <h1 className="mr-10 text-xl text-gray-500 font-bold">
          My Task Manager
        </h1>
        <button
          onClick={handleReset}
          className="border bg-blue-500 text-white rounded py-2 px-4 mr-5"
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="text-xl text-gray-500 font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h2>
      </div>
      <div className="relative">
        <button onClick={handleDropdown} className="flex items-center text-gray-500 hover:text-gray-700">
        <img src={user} alt="Profile" className="w-8 h-8 rounded-full mr-2" />{/* Using FaUserCircle icon for profile */}
          <span className="font-semibold">{username()}</span>
          <span className="material-icons-outlined cursor-pointer ml-2">
            arrow_drop_down
          </span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg py-1 z-50">
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              <FaUserCircle className="inline-block w-4 h-4 mr-2" /> {/* Using FaUserCircle icon for profile */}
              Profile
            </a>
            <a href="#" onClick={handleLogout} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
              <FaSignOutAlt className="inline-block w-4 h-4 mr-2" /> {/* Using FaSignOutAlt icon for logout */}
              Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

