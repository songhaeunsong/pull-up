import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderItem {
  label: string;
  path: string;
}

const MobileHeader = () => {
  const location = useLocation();
  const headerItems: HeaderItem[] = [
    { label: '시험모드', path: '/exam' },
    { label: '게임모드', path: '/game' },
    { label: '돌아보기', path: '/dashboard' },
  ];

  const loginItem: HeaderItem = { label: '로그인', path: '/signin' };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfo = '';

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-10 flex w-full max-w-[430px] flex-col items-center justify-between gap-5 bg-white/50 px-4 py-3 text-black shadow-sm backdrop-blur-sm sm:hidden',
      )}
    >
      <div className="flex w-full items-center justify-between">
        <div className="text-2xl font-bold">
          <Link to={!userInfo ? '/' : '/today'}>Pull Up!</Link>
        </div>
        <Link
          key={loginItem.path}
          to={loginItem.path}
          className={cn(
            {
              'border-b-[3px] border-primary-500 text-primary-500': location.pathname === loginItem.path,
              'border-b-[3px] border-transparent text-stone-800 hover:text-stone-950':
                location.pathname !== loginItem.path,
            },
            'text-sm font-semibold transition-colors duration-200',
          )}
          onClick={loginItem.label === '로그아웃' || loginItem.label === '로그인' ? handleAuthClick : undefined}
        >
          {loginItem.label}
        </Link>
      </div>

      <nav className="flex space-x-8">
        {headerItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              {
                'border-b-[3px] border-primary-500 text-primary-500': location.pathname === item.path,
                'border-b-[3px] border-transparent text-stone-800 hover:text-stone-950':
                  location.pathname !== item.path,
              },
              'text-lg font-semibold transition-colors duration-200',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default MobileHeader;
