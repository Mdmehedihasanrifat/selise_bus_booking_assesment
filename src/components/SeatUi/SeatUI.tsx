import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NavigationIcon as Steering, User, AlertCircle } from 'lucide-react'

const SeatUI: React.FC = () => {
  const [seats, setSeats] = useState<{ [key: string]: boolean }>({})
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null)

  useEffect(() => {
    const savedSeats = JSON.parse(localStorage.getItem("bus_S098") || "{}")
    const initialSeats: { [key: string]: boolean } = {}
    const rows = ["A", "B", "C", "D", "E"]
    rows.forEach((row) => {
      for (let i = 1; i <= 3; i++) {
        const seatNo = `${row}${i}`
        initialSeats[seatNo] = savedSeats[seatNo] || false
      }
    })
    setSeats(initialSeats)
  }, [])

  const handleSeatClick = (seatNo: string) => {
    if (seats[seatNo]) {
      toast.error("This seat is already booked!", {
        position: "top-center",
        autoClose: 2000,
        icon: <AlertCircle className="text-red-500" />,
      })
    } else {
      toast.promise(
        new Promise((resolve) => {
          setTimeout(() => {
            const updatedSeats = { ...seats, [seatNo]: true }
            setSeats(updatedSeats)
            localStorage.setItem("bus_S098", JSON.stringify(updatedSeats))
            resolve(true)
          }, 1000)
        }),
        {
          pending: 'Booking your seat...',
          success: `Seat ${seatNo} successfully booked!`,
          error: 'Error booking seat',
        }
      )
    }
  }

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E"]
    return rows.map((row) => (
      <div key={row} className="flex justify-center mb-4">
        {[1, 2, 3].map((col) => {
          const seatNo = `${row}${col}`
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
              onMouseEnter={() => setHoveredSeat(seatNo)}
              onMouseLeave={() => setHoveredSeat(null)}
              aria-label={seats[seatNo] ? `Seat ${seatNo} is booked` : `Book seat ${seatNo}`}
            >
              {seats[seatNo] ? <User size={20} /> : seatNo}
            </motion.button>
          )
        })}
      </div>
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Bus Seat Layout</h1>
            <div className="text-sm font-medium text-gray-500">Bus No: S098</div>
          </div>
          <div className="relative">
            <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
              <Steering size={48} className="text-gray-400" />
            </div>
            <div className="border-4 border-gray-300 rounded-xl p-6">
              <div className="flex justify-center mb-8">
                {/* Driver section aligned with the third column */}
                <motion.div
                  className="w-16 h-16 bg-blue-500 text-black flex items-center justify-center font-bold rounded-full ml-[calc(12rem)]"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Driver
                </motion.div>
              </div>
              <div>{renderSeats()}</div>
            </div>
          </div>
          <div className="mt-6 flex items-center bg-slate-300 p-4 justify-center space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-500 rounded-full mr-2"></div>
              <span>Booked</span>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500 flex items-center justify-center">
            <AlertCircle size={16} className="mr-1" />
            <span>Click on an available seat to book</span>
          </div>
        </div>
      </div>
      {hoveredSeat && !seats[hoveredSeat] && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg"
        >
          <p className="text-sm font-semibold">Seat {hoveredSeat}</p>
          <p className="text-xs text-gray-500">Click to book this seat</p>
        </motion.div>
      )}
      <ToastContainer />
    </div>
  )
}

export default SeatUI
