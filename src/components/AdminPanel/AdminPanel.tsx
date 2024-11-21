import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SeatDetails {
  [seatNo: string]: {
    name: string;
    destination: string;
    time: string;
  } | null;
}

const AdminPanel: React.FC = () => {
  const [selectedBus, setSelectedBus] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [seatData, setSeatData] = useState<SeatDetails>({});
  const navigate = useNavigate();

  // Load seat data for the selected bus and time from localStorage
  useEffect(() => {
    if (selectedBus && selectedTime) {
      const savedData = JSON.parse(localStorage.getItem(selectedBus) || "{}");
      // Filter the data by the selected time
      const filteredData: SeatDetails = {};
      Object.keys(savedData).forEach((seatNo) => {
        const booking = savedData[seatNo];
        if (booking && booking.time === selectedTime) {
          filteredData[seatNo] = booking;
        }
      });
      setSeatData(filteredData);
    } else {
      setSeatData({});
    }
  }, [selectedBus, selectedTime]);

  const handleViewSeats = () => {
    if (!selectedBus || !selectedTime) {
      alert("Please select both a bus and a time to view its details.");
      return;
    }
    navigate(`/seats/${selectedBus}`); // Navigate to Seat UI for the selected bus
  };

  const handleSeatClick = (seatNo: string) => {
    const details = seatData[seatNo];
    if (details) {
      alert(
        `Seat ${seatNo} is booked by ${details.name}.\nDestination: ${details.destination}\nTime: ${details.time}`
      );
    } else {
      alert(`Seat ${seatNo} is available.`);
    }
  };

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E"];
    return rows.map((row) => (
      <div key={row} className="flex justify-center mb-2">
        {[1, 2, 3].map((col) => {
          const seatNo = `${row}${col}`;
          const isBooked = !!seatData[seatNo];
          return (
            <button
              key={seatNo}
              className={`w-16 h-16 m-1 border rounded-lg ${
                isBooked ? "bg-gray-400 cursor-pointer" : "bg-white"
              } ${col === 1 ? "mr-10" : ""}`} // Add margin-right to the first column
              onClick={() => handleSeatClick(seatNo)}
            >
              {seatNo}
            </button>
          );
        })}
      </div>
    ));
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        {/* Admin Form */}
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Select Bus</label>
          <select
            value={selectedBus}
            onChange={(e) => setSelectedBus(e.target.value)}
            className="w-full border-2 rounded-md p-2"
          >
            <option value="">Choose Bus</option>
            <option value="S098">Bus S098</option>
            <option value="S099">Bus S099</option>
            <option value="S100">Bus S100</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
          <select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            className="w-full border-2 rounded-md p-2"
          >
            <option value="">Choose Time</option>
            <option value="8:00 AM">8:00 AM</option>
            <option value="9:00 AM">9:00 AM</option>
            <option value="5:00 PM">5:00 PM</option>
            <option value="6:00 PM">6:00 PM</option>
          </select>
        </div>
        <button
          onClick={handleViewSeats}
          className="bg-blue-500 text-white px-4 py-2 rounded-md w-full mb-6"
        >
          See Details of {selectedBus || "Selected Bus"} at {selectedTime || "Selected Time"}
        </button>

        {/* Bus Details */}
        {selectedBus && selectedTime && (
          <div>
            <h2 className="text-lg font-semibold mb-2">
              Bus Details - {selectedBus} at {selectedTime}
            </h2>
            <div className="bg-gray-200 p-4 rounded-lg">
              <h3 className="text-sm font-bold mb-4">Seat Layout</h3>
              <div>{renderSeats()}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
