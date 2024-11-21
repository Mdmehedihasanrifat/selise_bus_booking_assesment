
import { Outlet } from "react-router-dom"; 
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar /> 
      <Outlet /> {/* This renders the current route's component */}
    </>
  );
}

export default App;

