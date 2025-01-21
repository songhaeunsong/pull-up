import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-start justify-center overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
