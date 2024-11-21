import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { loadBusData } from "../../Store/busSlice";
import { User, AlertCircle, Clock, Bus,LifeBuoy  } from "lucide-react";

const SeatUI: React.FC = () => {
  const [selectedBus, setSelectedBus] = useState<string>("S098"); // Default selected bus
  const [selectedTime, setSelectedTime] = useState<string>("8:00 AM"); // Default selected time
  const dispatch = useAppDispatch();
  const buses = useAppSelector((state) => state.buses);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedBus) {
      dispatch(loadBusData(selectedBus)); // Load data from localStorage to Redux for the selected bus
    }
  }, [selectedBus, dispatch]);

  const seatData = buses[selectedBus] || {};

  const handleSeatClick = (seatNo: string) => {
    const seat = seatData[seatNo];
    if (seat && seat.time === selectedTime) {
      toast.error("This seat is already booked!", {
        position: "top-center",
        autoClose: 2000,
        icon: <AlertCircle className="text-red-500" />,
      });
    } else {
      // Redirect to the SeatBookingForm for booking
      navigate(`/booking/${selectedBus}/${seatNo}`);
    }
  };

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E"];
    return rows.map((row) => (
      <div key={row} className="flex justify-center mb-4">
        {[1, 2, 3].map((col) => {
          const seatNo = `${row}${col}`;
          const isBooked = seatData[seatNo]?.time === selectedTime;
          return (
            <motion.button
              key={seatNo}
              className={`w-16 h-16 m-2 border-2 rounded-lg flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                isBooked
                  ? "bg-gray-500 text-black cursor-not-allowed"
                  : "bg-white text-blue-800 hover:bg-green-600"
              } ${col === 1 ? "mr-10" : ""}`}
              onClick={() => handleSeatClick(seatNo)}
              disabled={isBooked}
              whileHover={isBooked ? {} : { scale: 1.05 }}
              whileTap={isBooked ? {} : { scale: 0.95 }}
            >
              {isBooked ? <User size={20} /> : seatNo}
            </motion.button>
          );
        })}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 mt-4 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Bus Seat Layout
            </h1>
          </div>

          {/* Dropdowns for bus and time selection */}
          <div className="mb-6">
            {/* Select Bus Section */}
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <Bus className="w-5 h-5 mr-2 text-blue-500" />{" "}
              {/* Added Bus icon */}
              Select Bus
            </label>
            <select
              value={selectedBus}
              onChange={(e) => setSelectedBus(e.target.value)}
              className="w-full border-2 rounded-md p-2 mb-4"
            >
              <option value="S098">Bus S098</option>
              <option value="S099">Bus S099</option>
              <option value="S100">Bus S100</option>
            </select>

            {/* Select Time Section */}
            <label className="block text-gray-700 font-semibold mb-2 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />{" "}
              {/* Added Clock icon */}
              Select Time
            </label>
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
                 <LifeBuoy/> Driver
                </motion.div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4 text-center">
             Seat Layout
            </h3>
            <div>{renderSeats()}</div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SeatUI;
