import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut, FiPlusCircle, FiUsers, FiMail, FiMessageSquare } from 'react-icons/fi';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <FiMessageSquare className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">DiscussionHub</span>
          </Link>
        </div>

        {/* Navigation Links - Center aligned */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/create" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FiPlusCircle className="mr-2 h-5 w-5" />
              Create Post
            </Link>
            <Link 
              to="/friends" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FiUsers className="mr-2 h-5 w-5" />
              Friends
            </Link>
            <Link 
              to="/contact" 
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FiMail className="mr-2 h-5 w-5" />
              Contact
            </Link>
          </div>
        )}

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={logout}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                <FiLogOut className="mr-2 h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="hidden sm:block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {isAuthenticated && (
        <div className="md:hidden flex justify-around py-2 border-t border-gray-200">
          <Link 
            to="/create" 
            className="flex flex-col items-center text-xs text-gray-500 hover:text-blue-600"
          >
            <FiPlusCircle className="h-5 w-5 mb-1" />
            <span>Create</span>
          </Link>
          <Link 
            to="/friends" 
            className="flex flex-col items-center text-xs text-gray-500 hover:text-blue-600"
          >
            <FiUsers className="h-5 w-5 mb-1" />
            <span>Friends</span>
          </Link>
          <Link 
            to="/contact" 
            className="flex flex-col items-center text-xs text-gray-500 hover:text-blue-600"
          >
            <FiMail className="h-5 w-5 mb-1" />
            <span>Contact</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;