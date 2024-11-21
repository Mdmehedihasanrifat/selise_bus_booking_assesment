'use client'

import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../Store/hooks"
import { loadBusData } from "../../Store/busSlice"
import { motion, AnimatePresence } from "framer-motion"
import {  Clock, User, MapPin, X, List,Bus } from 'lucide-react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface SeatInfo {
  name: string
  destination: string
  time: string
}

const AdminPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const buses = useAppSelector((state) => state.buses)

  const [selectedBus, setSelectedBus] = useState<string>("S098")
  const [selectedTime, setSelectedTime] = useState<string>("8:00 AM")
  const [filteredSeats, setFilteredSeats] = useState<{ [seatNo: string]: SeatInfo }>({})
  const [modalSeat, setModalSeat] = useState<{ seatNo: string; info: SeatInfo | null } | null>(null)
  const [showSidePanel, setShowSidePanel] = useState(false)

  useEffect(() => {
    if (selectedBus) {
      dispatch(loadBusData(selectedBus))
    }
  }, [selectedBus, dispatch])

  useEffect(() => {
    if (selectedBus && selectedTime) {
      const seatData = buses[selectedBus] || {}
      const filtered = Object.keys(seatData).reduce((acc, seatNo) => {
        const seat = seatData[seatNo]
        if (seat && seat.time === selectedTime) {
          acc[seatNo] = seat
        }
        return acc
      }, {} as { [seatNo: string]: SeatInfo })
      setFilteredSeats(filtered)
    }
  }, [selectedBus, selectedTime, buses])

  const handleSeatClick = (seatNo: string) => {
    const seat = filteredSeats[seatNo]
    setModalSeat({ seatNo, info: seat || null })
  }

  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E"]
    return rows.map((row) => (
      <div key={row} className="flex justify-center mb-2">
        {[1, 2, 3].map((col) => {
          const seatNo = `${row}${col}`
          const isBooked = !!filteredSeats[seatNo]
          return (
            <motion.button
              key={seatNo}
              className={`w-10 h-10 m-1 border rounded-md flex items-center justify-center text-sm font-medium ${
                isBooked ? "bg-gray-200 text-gray-600" : "bg-white text-gray-800 hover:bg-gray-100"
              } ${col === 1 ? "mr-6" : ""}`}
              onClick={() => handleSeatClick(seatNo)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {seatNo}
            </motion.button>
          )
        })}
      </div>
    ))
  }

  const totalSeats = 15
  const bookedSeats = Object.keys(filteredSeats).length
  const availableSeats = totalSeats - bookedSeats

  const chartData = {
    labels: ['Available', 'Booked'],
    datasets: [
      {
        data: [availableSeats, bookedSeats],
        backgroundColor: ['#3B82F6', '#9CA3AF'],
        borderColor: ['#2563EB', '#6B7280'],
        borderWidth: 1,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">Admin Panel</h1>
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="busSelect" className="block text-sm font-medium text-gray-700 mb-1">
              <Bus className="w-5 h-5 mr-2 text-blue-500" />  Select Bus
              </label>
              <select
                id="busSelect"
                value={selectedBus}
                onChange={(e) => setSelectedBus(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="S098">Bus S098</option>
                <option value="S099">Bus S099</option>
                <option value="S100">Bus S100</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeSelect" className="block text-sm font-medium text-gray-700 mb-1">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />  Select Time
              </label>
              <select
                id="timeSelect"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="8:00 AM">8:00 AM</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="6:00 PM">6:00 PM</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-grow">
              <h2 className="text-lg font-medium mb-4 text-gray-800">
                Bus {selectedBus} at {selectedTime}
              </h2>
              <div className="mb-4 text-sm text-gray-600">
                Available Seats: <span className="font-medium text-blue-600">{availableSeats}</span> / {totalSeats}
              </div>
              {renderSeats()}
            </div>
            <div className="w-full md:w-64">
              <h3 className="text-lg font-medium mb-2 text-gray-800">Seat Occupancy</h3>
              <div className="h-64">
                <Pie data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowSidePanel(true)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center justify-center"
        >
          <List className="mr-2" size={18} />
          Show Passenger List
        </button>
      </div>

      <AnimatePresence>
        {modalSeat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setModalSeat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-lg p-6 w-80 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalSeat(null)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
              <h3 className="text-lg font-medium mb-4">Seat {modalSeat.seatNo}</h3>
              {modalSeat.info ? (
                <div className="space-y-2 text-sm">
                  <p className="flex items-center">
                    <User className="mr-2" size={16} />
                    <span className="font-medium">Name:</span> {modalSeat.info.name}
                  </p>
                  <p className="flex items-center">
                    <MapPin className="mr-2" size={16} />
                    <span className="font-medium">Destination:</span> {modalSeat.info.destination}
                  </p>
                  <p className="flex items-center">
                    <Clock className="mr-2" size={16} />
                    <span className="font-medium">Time:</span> {modalSeat.info.time}
                  </p>
                </div>
              ) : (
                <p className="text-green-600">This seat is available.</p>
              )}
            </motion.div>
          </motion.div>
        )}

        {showSidePanel && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween' }}
            className="fixed inset-y-0 right-0 w-80 bg-white shadow-lg p-6 z-50"
          >
            <button
              onClick={() => setShowSidePanel(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h3 className="text-lg font-medium mb-4">Passenger List</h3>
            <div className="space-y-4">
              {Object.entries(filteredSeats).map(([seatNo, info]) => (
                <div key={seatNo} className="border-b pb-2">
                  <p className="font-medium">Seat {seatNo}</p>
                  <p className="text-sm">{info.name}</p>
                  <p className="text-xs text-gray-600">{info.destination}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPanel