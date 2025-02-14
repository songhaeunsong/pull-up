import SideBar from '@/components/dashboard/sidebar';
import MobileTopBar from '@/components/dashboard/sidebar/MobileTopBar';
import { useMember } from '@/hooks/useMember';
import useResponsive from '@/hooks/useResponsive';
import Page404 from '@/pages/404';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  const { isMobile, isTabletMd } = useResponsive();
  const memberInfo = useMember().memberInfo;

  if (!memberInfo) {
    return <Page404 />;
  }

  return (
    <div className="flex min-h-screen bg-Main pt-[94px] sm:pt-16">
      {isMobile || isTabletMd ? (
        <div className="flex flex-col gap-5 p-6">
          <MobileTopBar
            image={memberInfo.profileImageUrl}
            name={memberInfo.name}
            email={memberInfo.email}
            subjects={memberInfo.interestSubjects}
          />
          <Outlet />
        </div>
      ) : (
        <div className="box-border flex flex-1 flex-col gap-4 p-8 md:flex-col-reverse lg:flex-row">
          <main className="flex h-full flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <SideBar
            image={memberInfo.profileImageUrl}
            name={memberInfo.name}
            email={memberInfo.email}
            subjects={memberInfo.interestSubjects}
          />
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
