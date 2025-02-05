import { useAuthInfo } from '@/api/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading } = useAuthInfo();

  console.log('useAuthInfo response:', auth);

  useEffect(() => {
    if (!isLoading && auth) {
      if (!auth.isSignedUp) {
        navigate('/signup');
      } else {
        // 오늘의 질문 id 받아오기
        navigate(auth.isSolvedToday ? '/interview/result' : '/interview');
      }
    }

    if (!isLoading && !auth) {
      navigate('/signin');
    }
  }, [auth, isLoading, navigate]);

  return null;
};

export default RedirectPage;
