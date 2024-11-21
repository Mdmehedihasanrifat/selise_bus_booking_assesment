import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import SeatUI from "../src/components/SeatUI/SeatUI";
import SeatBookingForm from "../src/components/SeatBookingForm/SeatBookingForm";
import AdminPanel from "../src/components/AdminPanel/AdminPanel";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <SeatUI />, // Default route (SeatUI)
  },
  {
    path: "/booking/:busNo/:seatNo",
    element: <SeatBookingForm></SeatBookingForm>, 
  },
  {
    path: "/admin",
    element: <AdminPanel></AdminPanel>,
  },
]);

// Render the application
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
