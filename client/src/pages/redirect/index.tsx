import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { registerServiceWorker, requestPermission } from '@/utils/serviceWorker';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: member } = useGetMemberInfo();
  const { data: auth, isLoading } = useAuthInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewId } = memberStore();

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
      await setupNotification();
      if (!isLoading && auth) {
        if (!auth.isSignedUp) {
          setIsLoggedIn(true);
          navigate('/signup');
          return;
        } else {
          if (!member?.interestSubjects) {
            setIsLoggedIn(true);
            navigate('/signup');
            return;
          }

          // 유저 정보 저장
          setMember(member);
          setIsLoggedIn(true);
          setIsSolvedToday(auth.isSolvedToday);
          setInterviewId(auth.interviewId);
          console.log('auth.isSolvedToday', auth.isSolvedToday);
          navigate(auth.isSolvedToday ? `/interview/result/${auth.interviewId}` : '/interview');
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
