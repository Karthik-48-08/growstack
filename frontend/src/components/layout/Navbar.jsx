import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b-0 rounded-none bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tighter">
              <GradientText>GrowStack</GradientText>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/programs" className="text-base font-medium text-gray-300 hover:text-white transition-colors">Programs</Link>
            <Link to="/why-us" className="text-base font-medium text-gray-300 hover:text-white transition-colors">Why Us</Link>
            <Link to="/success" className="text-base font-medium text-gray-300 hover:text-white transition-colors">Success</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-base font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
            <Link to="/register">
              <Button variant="primary">Start Internship</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
