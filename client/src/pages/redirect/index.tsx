import { useAuthInfo } from '@/api/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading } = useAuthInfo();

  useEffect(() => {
    if (!isLoading && auth) {
      if (!auth.isSignedUp) {
        navigate('/signup');
      } else {
        navigate(auth.isSolvedToday ? '/today/result' : '/today');
      }
    }

    if (!isLoading && !auth) {
      navigate('/signin');
    }
  }, [auth, isLoading, navigate]);

  return null;
};

export default RedirectPage;
