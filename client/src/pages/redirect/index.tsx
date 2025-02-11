import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading: isAuthLoading } = useAuthInfo();
  const { refetch } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewId, setInterviewAnswerId } = memberStore();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isAuthLoading && !auth) {
        navigate('/signin');
        return;
      }

      if (auth && !isAuthLoading) {
        const memberData = await refetch();
        console.log('memberData', memberData);

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

          // 유저 정보 저장
          setMember(memberData);
          setIsLoggedIn(true);
          setIsSolvedToday(auth.isSolvedToday);
          setInterviewId(auth.interviewId);
          setInterviewAnswerId(auth.interviewAnswerId);
          navigate(auth.isSolvedToday ? `/interview/result/${auth.interviewId}` : '/interview');
        }
      }
    };

    handleRedirect();
  }, [auth, isAuthLoading]);

  return null;
};

export default RedirectPage;
