import { useState, useEffect } from 'react';
import AdminAuth from '@/components/AdminAuth';
import AdminDashboard from '@/components/AdminDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(authenticated);
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return <AdminDashboard onLogout={handleLogout} />;
};

export default Admin; 