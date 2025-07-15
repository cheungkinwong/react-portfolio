import React from 'react';
import { useAuth } from '../hooks/useAuth';

export default function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { isAuthenticated, loading } = useAuth();
  const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

  if (loading) return null;

  if (!isAuthenticated) {
    window.location.href = LOGIN_URL;
    return null;
  }

  return children;
}
