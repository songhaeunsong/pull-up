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
    const handleRedirect = async () => {
      if (!isAuthLoading && !auth) {
        navigate('/signin');
        return;
      }

      if (auth && !isAuthLoading) {
        const memberData = await refetch();

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
          console.log('멤버 정보 저장: ', memberData);
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
