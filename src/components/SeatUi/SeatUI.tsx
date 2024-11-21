import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { NavigationIcon as Steering, User, AlertCircle } from "lucide-react";

interface SeatDetails {
  [seatNo: string]: {
    name: string;
    destination: string;
    time: string;
  } | null;
}

const SeatUI: React.FC = () => {
  const [selectedBus, setSelectedBus] = useState<string>("S098"); // Default selected bus
  const [selectedTime, setSelectedTime] = useState<string>("8:00 AM"); // Default selected time
  const [seats, setSeats] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Load seat availability based on selected bus and time
    if (selectedBus && selectedTime) {
      const savedSeats = JSON.parse(localStorage.getItem(selectedBus) || "{}");
      const filteredSeats: { [key: string]: boolean } = {};

      const rows = ["A", "B", "C", "D", "E"];
      rows.forEach((row) => {
        for (let i = 1; i <= 3; i++) {
          const seatNo = `${row}${i}`;
          const booking = savedSeats[seatNo];
          // Check if the seat is booked for the selected time
          filteredSeats[seatNo] = booking?.time === selectedTime;
        }
      });

      setSeats(filteredSeats);
    }
  }, [selectedBus, selectedTime]);

  const handleSeatClick = (seatNo: string) => {
    if (seats[seatNo]) {
      toast.error("This seat is already booked!", {
        position: "top-center",
        autoClose: 2000,
        icon: <AlertCircle className="text-red-500" />,
      });
    } else {
      // Redirect to SeatBookingForm with busNo and seatNo in the URL
      navigate(`/booking/${selectedBus}/${seatNo}`);
    }
  };

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E"];
    return rows.map((row) => (
      <div key={row} className="flex justify-center mb-4">
        {[1, 2, 3].map((col) => {
          const seatNo = `${row}${col}`;
          return (
            <motion.button
              key={seatNo}
              className={`w-16 h-16 m-2 border-2 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                seats[seatNo]
                  ? "bg-gray-500 text-black cursor-not-allowed"
                  : "bg-white text-black hover:bg-green-600"
              } ${col === 1 ? "mr-10" : ""}`}
              onClick={() => handleSeatClick(seatNo)}
              disabled={seats[seatNo]}
              whileHover={seats[seatNo] ? {} : { scale: 1.05 }}
              whileTap={seats[seatNo] ? {} : { scale: 0.95 }}
            >
              {seats[seatNo] ? <User size={20} /> : seatNo}
            </motion.button>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Bus Seat Layout</h1>
          </div>

          {/* Dropdowns for bus and time selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Bus</label>
            <select
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
              className="w-full border-2 rounded-md p-2 mb-4"
            >
              <option value="S098">Bus S098</option>
              <option value="S099">Bus S099</option>
              <option value="S100">Bus S100</option>
            </select>

            <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full border-2 rounded-md p-2"
            >
              <option value="8:00 AM">8:00 AM</option>
              <option value="9:00 AM">9:00 AM</option>
              <option value="5:00 PM">5:00 PM</option>
              <option value="6:00 PM">6:00 PM</option>
            </select>
          </div>


          {/* Seat Layout */}
          <div className="border-4 border-gray-300 rounded-xl p-6">
            {/* Driver */}
            <div className="relative mb-6">
              
                <div className="flex justify-center mb-8">
                <motion.div
                    className="w-16 h-16 bg-blue-500 text-black flex items-center justify-center font-bold rounded-full ml-[calc(12rem)]"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Driver
                </motion.div>
                </div>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-center">Seat Layout</h3>
            <div>{renderSeats()}</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SeatUI;
