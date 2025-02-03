import Header from '@/components/common/header/Header';
import MobileHeader from '@/components/common/header/MobileHeader';
import { cn } from '@/lib/utils';
import { Outlet } from 'react-router';

const SM_STYLE = 'mx-auto max-w-[430px]';
const BASIC_STYLE = 'sm:mx-0 sm:max-w-full sm:h-screen sm:w-full';

const MainLayout = () => {
  return (
    <div className={cn(SM_STYLE, BASIC_STYLE)}>
      <Header />
      <MobileHeader />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
