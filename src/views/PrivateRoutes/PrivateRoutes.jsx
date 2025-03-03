import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/MainContext';
import { useEffect, useState } from 'react';
import { checkValidUser } from '../../services/login/loginServices';
import LoadingContainer from '../../components/LoadingContainer/LoadingContainer';

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { setIsAuthenticated, setUser } = useAuth();
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      setLoading(true);
      const token = localStorage.getItem('access');

      if (!token) {
        setIsAuthenticated(false);
        setAuthenticated(false);
        setLoading(false);
        return;
      }

      const userId = JSON.parse(token);
      if (userId && userId?.id) {
        try {
          const isValid = await checkValidUser(userId?.id);
          if (isValid) {
            setIsAuthenticated(true);
            setAuthenticated(true);
            setUser(userId?.id);
          } else {
            setIsAuthenticated(false);
            setAuthenticated(false);
          }
        } catch (error) {
          console.error('Error during authentication check:', error);
          setIsAuthenticated(false);
          setAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
        setAuthenticated(false);
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, [location, setUser, setIsAuthenticated]);

  if (loading) {
    return <LoadingContainer />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/LogIn" state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoutes;
