import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { registerServiceWorker, requestPermission } from '@/utils/serviceWorker';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading } = useAuthInfo();
  const { data: member } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn } = memberStore();

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
          setIsLoggedIn(true);

          navigate('/signup');
          return;
        } else {
          if (!member) {
            toast.error('회원 정보가 없습니다.', {
              position: 'bottom-center',
            });
            navigate('/signin');
            return;
          }

          if (!member.interestSubjects) {
            setIsLoggedIn(true);
            navigate('/signup');
            return;
          }

          // 유저 정보 저장
          setMember(member);
          setIsLoggedIn(true);
          setIsSolvedToday(auth.isSolvedToday);
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
