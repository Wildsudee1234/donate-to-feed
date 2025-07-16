import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, token } = useAuth();

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  if (roles.length && !roles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
