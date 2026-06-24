import React from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { GradientText } from '../components/ui/GradientText';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-400">Log in to your <GradientText>GrowStack</GradientText> account.</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-glassBorder rounded-xl focus:outline-none focus:border-primary text-white"
              placeholder="student@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input 
              type="password" 
              required
              className="w-full px-4 py-3 bg-black/50 border border-glassBorder rounded-xl focus:outline-none focus:border-primary text-white"
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full py-4 text-lg">Log In to Dashboard</Button>
        </form>
        
        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <Link to="/register" className="text-secondary hover:underline">Apply for Internship</Link>
        </p>
      </GlassCard>
    </div>
  );
}
