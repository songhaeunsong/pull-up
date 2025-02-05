import SideBar from '@/components/dashboard/sidebar';
import MobileTopBar from '@/components/dashboard/sidebar/MobileTopBar';
import useResponsive from '@/hooks/useResponsive';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  // 더미데이터
  const { image, name, email, subjects } = {
    image: 'https://avatars.githubusercontent.com/u/55848610?v=4',
    name: '강지은',
    email: 'kkang@gmail.com',
    subjects: ['운영체제', '네트워크', '데이터베이스', '컴퓨터구조', '알고리즘', '자료구조'],
  };

  const { isMobile, isTabletMd } = useResponsive();

  return (
    <div className="flex min-h-screen bg-Main pt-[94px] sm:pt-16">
      {isMobile || isTabletMd ? (
        <div className="flex flex-col gap-5 p-6">
          <MobileTopBar image={image} name={name} email={email} subjects={subjects} />
          <Outlet />
        </div>
      ) : (
        <div className="box-border flex flex-1 flex-col gap-4 p-8 md:flex-col-reverse lg:flex-row">
          <main className="flex h-full flex-1 overflow-y-auto">
            <Outlet />
          </main>
          <SideBar image={image} name={name} email={email} subjects={subjects} />
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
