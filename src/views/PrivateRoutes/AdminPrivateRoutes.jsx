import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';
import { useEffect, useState } from 'react';
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';
import { checkValidAdminUser } from '../../services/admin/adminservice';

const AdminPrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { setIsAdminAuthenticated, setAdmin } = useAuth();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminAuthStatus = async () => {
      setLoading(true);
      const token = localStorage.getItem('admin');

      if (!token) {
        setIsAdminAuthenticated(false);
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      const userId = JSON.parse(token);
      if (userId && userId?.id) {
        try {
          const isValid = await checkValidAdminUser(userId?.id);
          if (isValid) {
            setIsAdminAuthenticated(true);
            setAuthenticated(true);
            setAdmin(userId?.id);
          } else {
            setIsAdminAuthenticated(false);
            setAuthenticated(false);
          }
        } catch (error) {
          console.error('Error during authentication check:', error);
          setIsAdminAuthenticated(false);
          setAuthenticated(false);
        }
      } else {
        setIsAdminAuthenticated(false);
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAdminAuthStatus();
  }, [location, setAdmin, setIsAdminAuthenticated]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/log-in" state={{ from: location }} />;
  }

  return children;
};

export default AdminPrivateRoutes;
