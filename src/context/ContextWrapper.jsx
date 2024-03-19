import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
  } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

export default function ContextWrapper(props) {
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    useEffect(() => {
        if (smallCalendarMonth !== null) {
          setMonthIndex(smallCalendarMonth);
        }
      }, [smallCalendarMonth]);
  
    return (
      <GlobalContext.Provider 
        value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        }}
        >

        {props.children}
      </GlobalContext.Provider>
    );
  }
  