import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import SeatUI from "../src/components/SeatUI/SeatUI";
import SeatBookingForm from "../src/components/SeatBookingForm/SeatBookingForm";
import AdminPanel from "../src/components/AdminPanel/AdminPanel";
import { Provider } from "react-redux";
import { store } from "./Store/Store";
import App from "./App";

// Define routes
const router = createBrowserRouter([
  {
    path: "/", // Parent route for all children
    element: <App />, // App serves as the layout component
    children: [
      {
        path: "/", // Default route (SeatUI)
        element: <SeatUI />,
      },
      {
        path: "/booking/:busNo/:seatNo",
        element: <SeatBookingForm />,
      },
      {
        path: "/admin",
        element: <AdminPanel />,
      },
    ],
  },
]);

// Render the application
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);