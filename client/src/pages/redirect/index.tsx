import { useAuthInfo } from '@/api/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading } = useAuthInfo();

  useEffect(() => {
    const checkAuth = () => {
      if (!isLoading && auth) {
        if (!auth.isSignedUp) {
          navigate('/signup');
        }

        if (!auth.isSolvedToday) {
          navigate('/today');
        } else {
          navigate('/today/result');
        }
      }
    };

    checkAuth();
  }, [navigate]);

  return null;
};

export default RedirectPage;
