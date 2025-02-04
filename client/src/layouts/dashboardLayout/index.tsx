import SideBar from '@/components/dashboard/sidebar';
import useResponsive from '@/hooks/useResponsive';
import { Outlet } from 'react-router-dom';

const DashBoardLayout = () => {
  // 더미데이터
  const { image, name, email, subjects } = {
    image: 'https://avatars.githubusercontent.com/u/55848610?v=4',
    name: '강지은',
    email: 'kkang@gmail.com',
    subjects: ['운영체제', '네트워크', 'OS'],
  };

  const { isMobile, isTabletMd } = useResponsive();

  return (
    <div className="flex pt-16">
      {isMobile || isTabletMd ? (
        <>모바일</>
      ) : (
        <div className="box-border flex flex-1 flex-col gap-4 bg-Main p-8 md:flex-col-reverse lg:flex-row">
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
