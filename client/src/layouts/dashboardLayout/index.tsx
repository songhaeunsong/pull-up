import { useGetMemberInfo } from '@/api/member';
import SideBar from '@/components/dashboard/sidebar';
import MobileTopBar from '@/components/dashboard/sidebar/MobileTopBar';
import useResponsive from '@/hooks/useResponsive';
import { Outlet, useNavigate } from 'react-router-dom';

const DashBoardLayout = () => {
  const { isMobile, isTabletMd } = useResponsive();
  const navigate = useNavigate();
  const { data: member } = useGetMemberInfo();

  if (!member?.email) {
    navigate('/');
    return;
  }

  const onClick = () => {
    console.log('about');
  };

  return (
    <div className="flex min-h-screen bg-Main pt-[94px] sm:pt-16">
      {isMobile || isTabletMd ? (
        <div className="flex flex-col gap-5 p-6">
          <MobileTopBar
            image={member.profileImageUrl}
            name={member.name}
            email={member.email}
            subjects={member.interestSubjects}
            onClick={onClick}
          />
          <Outlet />
        </div>
      ) : (
        <div className="box-border flex flex-1 flex-col gap-4 p-8 md:flex-col-reverse lg:flex-row">
          <main className="flex h-full flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <SideBar
            image={member.profileImageUrl}
            name={member.name}
            email={member.email}
            subjects={member.interestSubjects}
            onClick={onClick}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
