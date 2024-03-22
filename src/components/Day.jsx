import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);
  const {
    setDaySelected,
    setShowEventModal,
    setSelectedEvent,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {

    async function fetchData() {
      const jwtToken = Cookies.get('jwtToken');
      try {
        const response = await axios.get('http://localhost:5001/api/users/getdata', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });
        console.log(response.data);
        return response.data;
        
      } catch (error) {
        console.error('Failed to fetch events:', error);

        return [];


      }
    }

    async function updateDayEvents() {
      const data = await fetchData();
      // Filter events for the current day
      const eventsForDay = data.filter(event => dayjs(event.day).isSame(day, 'day'));
      setDayEvents(eventsForDay);
    }

    updateDayEvents();
  }, [day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }

  return (
    <div className="border border-gray-200 flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && (
          <p className="text-sm mt-1">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {/* Render events for the current day */}
        {dayEvents.map((evt, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 ml-3 text-gray-600 text-sm rounded mb-1 truncate flex items-center justify-center`}
          >
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
}
