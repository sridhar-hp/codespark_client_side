import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { accessToken, isAuthenticated } = useSelector((state) => state.auth);
  const token = accessToken || localStorage.getItem('accessToken');

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
