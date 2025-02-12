import { login } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { queryClient } from '@/main';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { refetch } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewAnswerId } = memberStore();

  queryClient.getQueryData(['auth']);

  useEffect(() => {
    const handleRedirect = async () => {
      console.log('리다이렉트');

      const auth = await queryClient.fetchQuery({
        queryKey: ['auth'],
        queryFn: login,
      });

      if (!auth) {
        console.log('유저 정보 없음');
        navigate('/signin');
        return;
      } else {
        console.log('멤버 정보 요청');
        const memberData = await refetch();
        console.log('멤버 정보 요청 성공');

        if (memberData) {
          // 미가입시
          if (!auth.isSignedUp) {
            setIsLoggedIn(true);
            navigate('/signup');
            return;
          }

          // 관심과목 미선택시
          if (!memberData.interestSubjects) {
            setIsLoggedIn(true);
            navigate('/signup');
            return;
          }

          console.log('로그인 완료');

          // 유저 정보 저장
          setMember(memberData);
          setIsLoggedIn(true);
          setIsSolvedToday(auth.isSolvedToday);
          setInterviewAnswerId(auth.interviewAnswerId);
          navigate(auth.isSolvedToday ? `/interview/result/${auth.interviewAnswerId}` : '/interview');
        }
      }
    };

    handleRedirect();
  }, [navigate, refetch, setInterviewAnswerId, setIsLoggedIn, setIsSolvedToday, setMember]);

  return null;
};

export default RedirectPage;
