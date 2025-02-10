import { useAuthInfo } from '@/api/auth';
import { useGetMemberInfo } from '@/api/member';
import { memberStore } from '@/stores/memberStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectPage = () => {
  const navigate = useNavigate();
  const { data: auth, isLoading: isAuthLoading } = useAuthInfo();
  const { data: member, isLoading: isMemberLoading } = useGetMemberInfo();
  const { setMember, setIsSolvedToday, setIsLoggedIn, setInterviewId } = memberStore();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isAuthLoading && !isMemberLoading && auth && member) {
        // 미가입시
        if (!auth.isSignedUp) {
          setIsLoggedIn(true);
          navigate('/signup');
          return;
        } else {
          // 관심과목 미선택시
          if (!member.interestSubjects) {
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

      if (!isAuthLoading && !auth) {
        navigate('/signin');
      }
    };

    handleRedirect();
  }, [auth, member, isAuthLoading, isMemberLoading]);

  return null;
};

export default RedirectPage;
