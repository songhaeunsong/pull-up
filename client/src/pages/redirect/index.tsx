import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading: isAuthLoading } = useAuthInfo();
  const { refetch } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewAnswerId } = memberStore();

  useEffect(() => {
    if (isAuthLoading) return;
    if (!auth) {
      console.log('조회 후 유저 정보 없음');
      navigate('/signin');
      return;
    }

    const handleRedirect = async () => {
      console.log('리다이렉트');
      console.log('현재 상태:', { isAuthLoading, auth });
      if (!isAuthLoading && !auth) {
        console.log('유저 정보 없음');
        navigate('/signin');
        return;
      }

      if (!isAuthLoading && auth) {
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
  }, [auth, isAuthLoading]);

  return null;
};

export default RedirectPage;
