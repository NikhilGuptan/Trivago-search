

import React, { useState, useRef, useEffect } from 'react';
import CustomDatePicker from './DatePicker';
import GuestRoomsSelector from './GuestRoomsSelector';
import './SearchBar.css'; 
const suggestions = ['Paris', 'New York', 'Tokyo', 'London', 'Rome'];

const SearchBar = () => {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [minCheckOutDate, setMinCheckOutDate] = useState(new Date());
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);


  const inputRef = useRef(null);


  const maxCheckInDate = new Date();
  maxCheckInDate.setFullYear(maxCheckInDate.getFullYear() + 1);

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
    setMinCheckOutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000)); 
    
    if (checkOutDate < date) {
      setCheckOutDate(new Date(date.getTime() + 24 * 60 * 60 * 1000));
    }
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  const handleSearch = () => {
    console.log({
      destination,
      checkInDate: checkInDate.toDateString(),
      checkOutDate: checkOutDate.toDateString(),
      rooms,
      adults,
      children,
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setDestination(suggestion);
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar">
      <div className="search-options">
        <div className="autocomplete" ref={inputRef}>
          <input
            type="text"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setShowSuggestions(true);
            }}
            placeholder="Enter destination"
            onFocus={() => setShowSuggestions(true)}
          />
          {showSuggestions && destination && (
            <div className="suggestions">
              {suggestions
                .filter((item) => item.toLowerCase().includes(destination.toLowerCase()))
                .map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
            </div>
          )}
        </div>
        <CustomDatePicker
          label="Check-in"
          selectedDate={checkInDate}
          onChange={handleCheckInDateChange}
          minDate={new Date()}
          maxDate={maxCheckInDate}
        />
        <CustomDatePicker
          label="Check-out"
          selectedDate={checkOutDate}
          onChange={handleCheckOutDateChange}
          minDate={minCheckOutDate}
          maxDate={maxCheckInDate}
        />
        <GuestRoomsSelector
          onRoomsChange={(value) => setRooms(value)}
          onAdultsChange={(value) => setAdults(value)}
          onChildrenChange={(value) => setChildren(value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
