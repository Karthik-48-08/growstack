import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-glassBorder bg-dark py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              GrowStack
            </span>
            <p className="mt-2 text-sm text-gray-400">
              Transforming students into job-ready developers.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GrowStack Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
