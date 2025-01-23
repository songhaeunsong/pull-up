import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface HeaderItem {
  label: string;
  path: string;
}

const Header = () => {
  const location = useLocation();
  const headerItems: HeaderItem[] = [
    { label: '시험모드', path: '/exam' },
    { label: '게임모드', path: '/game' },
    { label: '돌아보기', path: '/dashboard' },
    { label: '로그인', path: '/signin' },
  ];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userInfo = '';

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <header className="fixed top-0 z-10 flex w-full items-center justify-between bg-white/50 p-4 px-10 text-black shadow-sm backdrop-blur-sm">
      <div className="text-3xl font-bold">
        {/* 로그인이면 로고->오늘의 문제, 비로그인이면 로고->메인인 */}
        <Link to={!userInfo ? '/' : '/today'}>Pull Up!</Link>
      </div>

      <nav className="flex space-x-6">
        {headerItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`pb-1 text-xl font-semibold transition-colors duration-200 ${
              location.pathname === item.path
                ? 'border-b-[3px] border-primary-500 text-primary-500'
                : 'text-stone-800 hover:text-stone-950'
            }`}
            onClick={item.label === '로그아웃' || item.label === '로그인' ? handleAuthClick : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
