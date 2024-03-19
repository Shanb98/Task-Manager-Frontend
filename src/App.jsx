import React, { useState ,useContext ,useEffect} from 'react'; 

import './App.css';
import CalendarHeader from "./components/CalenderHeader"; 
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import { getMonth } from "./util";
import GlobalContext from "./context/GlobalContext";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth()); 
  const { monthIndex } = useContext(GlobalContext);
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
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
