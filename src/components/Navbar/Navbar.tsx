import { Link } from "react-router-dom";
import { User, BusFront, Armchair } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <BusFront className="w-6 h-6 mr-1" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 text-transparent bg-clip-text mr-1">
                Selise
              </span>
              <span className="text-2xl font-semibold text-gray-800">
                Bus Service
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label="Menu"
              onClick={() => {
                const mobileMenu = document.getElementById("mobile-menu");
                mobileMenu.classList.toggle("hidden");
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className="md:hidden hidden space-y-1 px-2 pt-2 pb-3"
        >
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2 rounded-md"
          >
            Book Seat
          </Link>
          <Link
            to="/admin"
            className="block text-gray-700 hover:text-blue-600 text-base font-medium px-3 py-2 rounded-md"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
