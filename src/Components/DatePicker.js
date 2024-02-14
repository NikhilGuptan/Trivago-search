
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ label, selectedDate, onChange, minDate, maxDate }) => {
  return (
    <div className="date-picker">
      <label>{label}</label>
      <DatePicker
        selected={selectedDate}
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        dateFormat="MM/dd/yyyy"
      />
    </div>
  );
};

export default CustomDatePicker;
