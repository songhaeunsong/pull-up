import { login } from '@/api/auth';
import { queryClient } from '@/main';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { setIsSolvedToday, setIsLoggedIn, setInterviewAnswerId } = memberStore();

  useEffect(() => {
    const handleRedirect = async () => {
      const auth = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: login,
      });

      if (!auth) {
        toast.error('로그인 정보가 없습니다.', { position: 'bottom-center' });
      }

      // 로그인 정보 저장
      setIsLoggedIn(true);
      setIsSolvedToday(auth.isSolvedToday);
      setInterviewAnswerId(auth.interviewAnswerId);

      // 비회원가입 시
      if (!auth.isSignedUp) {
        navigate('/signup');
        return;
      }

      navigate('/');
      return;
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default RedirectPage;
