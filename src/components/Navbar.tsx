import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, LogOut } from 'lucide-react';
import { getStreak } from '../utils/streak';

const Navbar = () => {
  const [streak, setStreak] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    setStreak(getStreak());
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
            <Home size={24} />
            <span className="font-bold text-lg">French Learning</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-full">
              <span className="font-semibold">🔥 {streak} Day Streak</span>
            </div>
            {!isHome && (
              <Link 
                to="/" 
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <LogOut size={24} />
                <span>Exit</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;