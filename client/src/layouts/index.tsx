import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="h-screen w-full">
      <Header />
      <main className="h-full w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
