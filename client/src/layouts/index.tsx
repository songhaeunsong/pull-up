import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-1 justify-center items-start px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
