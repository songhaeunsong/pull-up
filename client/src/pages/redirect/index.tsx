import { useAuthInfo } from '@/api/auth';
import { registerServiceWorker, requestPermission } from '@/utils/serviceWorker';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading } = useAuthInfo();

  useEffect(() => {
    const setupNotification = async () => {
      try {
        await registerServiceWorker();
        await requestPermission();
      } catch (error) {
        console.error('알림 설정 실패:', error);
      }
    };

    const handleRedirect = async () => {
      if (!isLoading && auth) {
        if (!auth.isSignedUp) {
          await setupNotification();
          navigate('/signup');
        } else {
          navigate(auth.isSolvedToday ? '/interview/result' : '/interview');
        }
      }

      if (!isLoading && !auth) {
        navigate('/signin');
      }
    };

    handleRedirect();
  }, [auth, isLoading, navigate]);

  return null;
};

export default RedirectPage;
