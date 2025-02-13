import { login } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { queryClient } from '@/main';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { refetch } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewAnswerId } = memberStore();

  useEffect(() => {
    const handleRedirect = async () => {
      const auth = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: login,
      });

      if (auth) {
        const memberData = await refetch();

        if (memberData) {
          // 미가입 혹은 관심과목 미선택
          if (!auth.isSignedUp || !memberData.interestSubjects) {
            setIsLoggedIn(true);
            navigate('/signup');
            return;
          }

          // 유저 정보 저장
          setMember(memberData);
          setIsLoggedIn(true);
          setIsSolvedToday(auth.isSolvedToday);
          setInterviewAnswerId(auth.interviewAnswerId);
        } else {
          toast.error('사용자 정보가 없습니다.', { position: 'bottom-center' });
        }
      } else {
        toast.error('로그인 정보가 없습니다.', { position: 'bottom-center' });
      }

      navigate('/');
      return;
    };

    handleRedirect();
  }, [navigate]);

  return null;
};

export default RedirectPage;
