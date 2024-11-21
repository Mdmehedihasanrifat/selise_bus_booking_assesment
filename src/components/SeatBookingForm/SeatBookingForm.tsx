
'use client'

import React, { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAppDispatch } from "../../Store/hooks"
import { bookSeat } from "../../Store/busSlice"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { motion } from "framer-motion"
import { User, Bus, MapPin, Clock, ArrowLeft } from 'lucide-react'

const SeatBookingForm: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { busNo, seatNo } = useParams<{ busNo: string; seatNo: string }>()
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    time: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.destination || !formData.time) {
      toast.error("Please fill in all fields", { position: "top-center" })
      return
    }

    if (busNo && seatNo) {
      dispatch(
        bookSeat({
          busNo,
          seatNo,
          booking: formData,
        })
      )
      toast.success(`Seat ${seatNo} booked successfully!`, {
        position: "top-center",
      })
      setTimeout(() => {
        navigate("/")
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <div className="flex items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </motion.button>
          <h1 className="text-2xl font-bold text-center text-gray-800 flex-grow">Seat Booking</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <User className="mr-2 text-blue-500" size={16} />
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="busNo" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <Bus className="mr-2 text-blue-500" size={16} />
                Bus No
              </label>
              <input
                type="text"
                id="busNo"
                value={busNo}
                disabled
                className="w-full border border-gray-200 rounded-md p-2 bg-gray-100 text-gray-600"
              />
            </div>
            <div>
              <label htmlFor="seatNo" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <MapPin className="mr-2 text-blue-500" size={16} />
                Seat No
              </label>
              <input
                type="text"
                id="seatNo"
                value={seatNo}
                disabled
                className="w-full border border-gray-200 rounded-md p-2 bg-gray-100 text-gray-600"
              />
            </div>
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <MapPin className="mr-2 text-blue-500" size={16} />
              Select Destination
            </label>
            <select
              id="destination"
              name="destination"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              value={formData.destination}
              onChange={handleChange}
            >
              <option value="">Choose Destination</option>
              <option value="Mirpur 11">Mirpur 11</option>
              <option value="Uttara">Uttara</option>
              <option value="Dhanmondi">Dhanmondi</option>
            </select>
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <Clock className="mr-2 text-blue-500" size={16} />
              Select Time
            </label>
            <select
              id="time"
              name="time"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
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
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out font-medium"
          >
            Book Seat
          </motion.button>
        </form>
      </motion.div>
      <ToastContainer />
    </div>
  )
}

export default SeatBookingForm