import React, { useEffect, useRef, useState } from 'react';

import 'boxicons';
import { DateRange  } from 'react-date-range';

import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { addDays} from 'date-fns';
import format from 'date-fns/format';

export default function SelectDateRange({ onSelectDateRange }) {

const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

 const [range, setRange] = useState([
    {startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection',
}
])
   

 const refTwo = useRef(null)

 useEffect(()=>{
  document.addEventListener("keydown", hideOnEscape, true)
  document.addEventListener("click", hideOnClickOutside, true)
 },[])

 const hideOnEscape = (e)=>{
  if(e.key === "Escape"){
    setIsDatePickerOpen(false)
  }
 }
 const hideOnClickOutside = (e)=>{
  // console.log(refTwo.current);
//   console.log(e.target);

  if(refTwo.current && !refTwo.current.contains(e.target)){
    setIsDatePickerOpen(false)
  }
  
 }
  const handleDateInputClick = () => {
    setIsDatePickerOpen(!isDatePickerOpen); 
  };

  const handleDateChange = (item) => {
    const { startDate, endDate } = item.selection || {};
    if (startDate && endDate) {
      setRange([item.selection]);
      console.log("Selected Start Date:", startDate); 
      console.log("Selected End Date:", endDate); 
      onSelectDateRange({ startDate, endDate });
    } else {
      console.error("Date selection is undefined");
    }
  };
  
  
  return (

<div className='flex-col flex-col-5'>
              <label>Select Date Range</label>
              <input 
                type='text' 
                placeholder='Select the date Range' 
                value={`${format(range[0].startDate, "MM/dd/yyyy")} to ${format(range[0].endDate, "MM/dd/yyyy")}`} 
                onClick={handleDateInputClick} 
                readOnly
              />
             <box-icon type='solid' name='calendar'></box-icon>
              <div ref={refTwo}>
                {isDatePickerOpen && (
                  <DateRange  
                    onChange = {handleDateChange}
                    editableDateInputs = {true}
                    moveRangeOnFirstSelection = {false}
                    ranges={range}
                    className='calendarElement'
                    months={1}
                  />
                )}
              </div>
             
            </div>

  );
}
