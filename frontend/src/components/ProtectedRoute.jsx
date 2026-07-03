import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../lib/authStore';

/**
 * Wrap a route to require login. Redirects to /login while remembering
 * where the user wanted to go, so they land back here after auth.
 */
export default function ProtectedRoute({ children, adminOnly = false }) {
  const token = useAuthStore((s) => s.token);
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}