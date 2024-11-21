import { Link } from "react-router-dom";
import { User,BusFront,Armchair } from "lucide-react";

const Navbar = () => {


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
            <BusFront className="w-6 h-6 mr-1  " />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text mr-1">
                
                 Selise
              </span>
              <span className="text-2xl font-semibold text-gray-800">Bus Service</span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:ml-6 md:flex md:space-x-8">
            <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-600 transition duration-300 ease-in-out"
              >
                <Armchair className="w-4 h-4 mr-1" />
                Book Seat
              </Link>
              <Link
                to="/admin"
                className="text-gray-700 hover:text-blue-600 inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-blue-600 transition duration-300 ease-in-out"
              >
                <User className="w-4 h-4 mr-1" />
                Admin Panel
              </Link>
             
            
            </div>
          </div>
         
         
            
         
    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
