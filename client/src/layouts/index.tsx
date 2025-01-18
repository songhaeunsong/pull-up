import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex items-start justify-center flex-1 px-8 py-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
