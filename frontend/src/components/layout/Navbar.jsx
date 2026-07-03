import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { GradientText } from '../ui/GradientText';
import useAuthStore from '../../lib/authStore';
import { LogOut, BookOpen, LayoutDashboard } from 'lucide-react';

export default function Navbar() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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
            <Link
              to="/programs"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
            >
              Programs
            </Link>
            <Link
              to="/why-us"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
            >
              Why Us
            </Link>
            <Link
              to="/success"
              className="text-base font-medium text-gray-300 hover:text-white transition-colors"
            >
              Success
            </Link>
          </div>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Link>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold">
                  {user.name?.[0]?.toUpperCase() || 'U'}
                </div>
                <span className="text-sm font-medium pr-1 max-w-[120px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                title="Log out"
                className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="text-base font-medium text-gray-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link to="/register">
                <Button variant="primary">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Internship
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}