

import React, { useState, useEffect, useRef } from 'react';
import './GuestRoomsSelector.css';

const GuestRoomsSelector = ({ onRoomsChange, onAdultsChange, onChildrenChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [petFriendly, setPetFriendly] = useState(false);

  const modalRef = useRef(null);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleApply = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="guest-rooms-selector-wrapper">
      <div className="guest-rooms-selector" onClick={toggleModal}>
        <label>Guests & Rooms</label>
        <span>({adults} Guests, {rooms} Room)</span>
      </div>
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal" ref={modalRef}>
            <div className="modal-content">
              <div className="modal-header">
                <h3>Guests & Rooms</h3>
                <button className="close-button" onClick={toggleModal}>×</button>
              </div>
              <div className="modal-body">
                <div className="guests">
                  <h4>Adults</h4>
                  <div className="control">
                    <button onClick={() => setAdults(Math.max(adults - 1, 1))}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => setAdults(adults + 1)}>+</button>
                  </div>
                </div>
                <div className="guests">
                  <h4>Children</h4>
                  <div className="control">
                    <button onClick={() => setChildren(Math.max(children - 1, 0))}>-</button>
                    <span>{children}</span>
                    <button onClick={() => setChildren(children + 1)}>+</button>
                  </div>
                </div>
                <div className="rooms">
                  <h4>Rooms</h4>
                  <div className="control">
                    <button onClick={() => setRooms(Math.max(rooms - 1, 1))}>-</button>
                    <span>{rooms}</span>
                    <button onClick={() => setRooms(rooms + 1)}>+</button>
                  </div>
                </div>
                <div className="pet-friendly">
                  <label>
                    <input
                      type="checkbox"
                      checked={petFriendly}
                      onChange={(e) => setPetFriendly(e.target.checked)}
                    />
                    Pet Friendly
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button onClick={handleApply}>Apply</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestRoomsSelector;
