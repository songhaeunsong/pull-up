import Header from '@/components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <div className="h-screen">
      <Header />
      <main className="h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
