import { useGetMemberInfo } from '@/api/member';
import SideBar from '@/components/dashboard/sidebar';
import MobileTopBar from '@/components/dashboard/sidebar/MobileTopBar';
import useResponsive from '@/hooks/useResponsive';
import Page404 from '@/pages/404';
import { Member } from '@/types/member';
import { Suspense, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  const { isMobile, isTabletMd } = useResponsive();
  const { data: member } = useGetMemberInfo();
  const [memberData, setMemberData] = useState<Member>();

  useEffect(() => {
    if (member) {
      setMemberData(member);
    }
  }, [member]);

  if (!memberData) {
    return <Page404 />;
  }

  return (
    <div className="flex min-h-screen bg-Main pt-[94px] sm:pt-16">
      {isMobile || isTabletMd ? (
        <div className="flex flex-col gap-5 p-6">
          <MobileTopBar
            image={memberData.profileImageUrl}
            name={memberData.name}
            email={memberData.email}
            subjects={memberData.interestSubjects}
          />
          <Outlet />
        </div>
      ) : (
        <div className="box-border flex flex-1 flex-col gap-4 p-8 md:flex-col-reverse lg:flex-row">
          <main className="flex h-full flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <Suspense fallback={<div>사이드바 로딩 중...</div>}>
            <SideBar
              image={member?.profileImageUrl ?? ''}
              name={member?.name ?? ''}
              email={member?.email ?? ''}
              subjects={member?.interestSubjects ?? []}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
