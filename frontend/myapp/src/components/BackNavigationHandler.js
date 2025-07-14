import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BackNavigationHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = () => {
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location, navigate]);

  return null;
};

export default BackNavigationHandler;
