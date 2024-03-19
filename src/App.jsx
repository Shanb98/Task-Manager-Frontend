import React, { useState } from 'react'; // Make sure to import React

import './App.css';
import CalendarHeader from "./components/CalenderHeader"; // Corrected import path for CalendarHeader
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth()); // Corrected variable name: currentMonth
  return (
    <div className="h-screen flex flex-col">
      <CalendarHeader />
      <div className="flex flex-1">
        <Sidebar />
        <Month month={currentMonth} /> {/* Corrected variable name: currentMonth */}
      </div>
    </div>
  );
}

export default App;
