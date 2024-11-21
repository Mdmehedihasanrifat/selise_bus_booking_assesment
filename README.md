
Selise Bus Service - Seat Booking System
Selise Bus Service is a web-based application designed to streamline the process of booking bus seats, manage reservations, and provide administrative oversight with an easy-to-use interface.

🚀 Live Demo
https://selise-assesment-bus-booking-072152.netlify.app/

🛠️ Features
User Features:
Interactive Seat Selection:

Visual seat layout with real-time booking status.
Seat states include:
Available: Clickable seats.
Booked: Disabled seats with user details displayed in the Admin Panel.
Seat Booking Form:

Users can book a seat by entering their name, destination, and time.
Dynamic form validation and error handling.
Bus and Time Selection:

Dropdown menus to select the desired bus and schedule.
Seat availability updates dynamically based on selections.
Admin Features:
Seat Layout Overview:

Visual representation of booked and available seats.
Details about seat availability for each bus and time slot.
Passenger Information:

Access detailed booking information (Name, Destination, Time).
Occupancy Insights:

Interactive Pie Chart showing booked vs. available seats.

🏗️ Tech Stack
Frontend:
React: Component-based user interface.
React Router: Client-side routing.
Framer Motion: Animations for a seamless user experience.
Chart.js: Visual data representation (Pie chart).
React Toastify: Toast notifications for user feedback.
Lucide React: Icons for better UI/UX.
State Management:
Redux Toolkit: For managing global application state.
Backend/Storage:
LocalStorage: Stores seat booking data persistently.
Styling:
TailwindCSS: Responsive and modern UI design.


📄 How to Run Locally
Clone the Repository:

git clone https://github.com/your-username/selise-bus-service.git
cd selise-bus-service
Install Dependencies:

bash:

npm install
Start the Development Server:

Copy code
npm start
The application will run on http://localhost:5173/

Build for Production:

bash

npm run build



Selise Bus Service - Seat Booking System
Selise Bus Service is a web-based application designed to streamline the process of booking bus seats, manage reservations, and provide administrative oversight with an easy-to-use interface.

🚀 Live Demo
Click here to view the live app

🛠️ Features
User Features:
Interactive Seat Selection:

Visual seat layout with real-time booking status.
Seat states include:
Available: Clickable seats.
Booked: Disabled seats with user details displayed in the Admin Panel.
Seat Booking Form:

Users can book a seat by entering their name, destination, and time.
Dynamic form validation and error handling.
Bus and Time Selection:

Dropdown menus to select the desired bus and schedule.
Seat availability updates dynamically based on selections.
Admin Features:
Seat Layout Overview:

Visual representation of booked and available seats.
Details about seat availability for each bus and time slot.
Passenger Information:

Access detailed booking information (Name, Destination, Time).
Exportable passenger list for each bus and time.
Occupancy Insights:

Interactive Pie Chart showing booked vs. available seats.
🏗️ Tech Stack
Frontend:
React: Component-based user interface.
React Router: Client-side routing.
Framer Motion: Animations for a seamless user experience.
Chart.js: Visual data representation (Pie chart).
React Toastify: Toast notifications for user feedback.
Lucide React: Icons for better UI/UX.
State Management:
Redux Toolkit: For managing global application state.
Backend/Storage:
LocalStorage: Stores seat booking data persistently.
Styling:
TailwindCSS: Responsive and modern UI design.
📄 How to Run Locally
Clone the Repository:

bash
Copy code
git clone https://github.com/Mdmehedihasanrifat/selise_bus_booking_assesment.git
cd selise_bus_booking_assesment
Install Dependencies:

bash
Copy code
npm install
Start the Development Server:

bash

npm start
The application will run on http://localhost:5173.

Build for Production:

bash

npm run build


📂 Project Structure
src/
├── components/
│   ├── AdminPanel/         # Admin Panel with booking overview
│   ├── SeatUI/             # Main seat selection interface
│   ├── SeatBookingForm/    # Form for booking seats
├── Store/
│   ├── hooks.ts            # Custom Redux hooks
│   ├── busSlice.ts         # Redux slice for managing bus data
│   ├── Store.ts            # Redux store configuration
├── App.tsx                 # Main App component
├── index.tsx               # Entry point
├── index.css               # Global styles
├── main.tsx                # added router and Redux here

📌 Features to Expand
Database Integration: Replace LocalStorage with a cloud-based backend (e.g., Firebase, MongoDB).
Authentication: Allow users to log in and track their bookings.
Payment Integration: Enable online payments for seat reservations.
Admin Dashboard Enhancements:
Export data to CSV/Excel.
Advanced reporting with additional graphs.

