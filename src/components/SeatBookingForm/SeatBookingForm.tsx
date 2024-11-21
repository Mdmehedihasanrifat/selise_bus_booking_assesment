'use client';

import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SeatBookingForm: React.FC = () => {
    const { busNo, seatNo } = useParams()
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.destination || !formData.time) {
      toast.error("Please fill in all fields", { position: "top-center" });
      return;
    }

    const savedSeats = JSON.parse(localStorage.getItem(busNo) || "{}");
    savedSeats[seatNo] = formData;
    localStorage.setItem(busNo, JSON.stringify(savedSeats));

    toast.success(`Seat ${seatNo} booked successfully!`, { position: "top-center" });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Seat Booking Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              className="w-full border-2 rounded-md p-2"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Bus No</label>
            <input
              type="text"
              value={busNo}
              disabled
              className="w-full border-2 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Seat No</label>
            <input
              type="text"
              value={seatNo}
              disabled
              className="w-full border-2 rounded-md p-2 bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Destination</label>
            <select
              name="destination"
              className="w-full border-2 rounded-md p-2"
              value={formData.destination}
              onChange={handleChange}
            >
              <option value="">Choose Destination</option>
              <option value="Mirpur 11">Mirpur 11</option>
              <option value="Uttara">Uttara</option>
              <option value="Dhanmondi">Dhanmondi</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
            <select
              name="time"
              className="w-full border-2 rounded-md p-2"
              value={formData.time}
              onChange={handleChange}
            >
              <option value="">Choose Time</option>
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Book Seat
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SeatBookingForm;
