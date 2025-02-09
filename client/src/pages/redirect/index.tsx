import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: member } = useGetMemberInfo();
  const { data: auth, isLoading } = useAuthInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewId } = memberStore();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoading && auth) {
        // 미가입시
        if (!auth.isSignedUp) {
          setIsLoggedIn(true);
          navigate('/signup');
          return;
        } else {
          // 관심과목 미선택시
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
