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

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
  };

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 text-white bg-gray-950 top-0 z-10">
      <div className="text-3xl font-bold">
        {/* 로고 들어가야할 자리 */}
        <Link to="/">Pull Up!</Link>
      </div>

      <nav className="flex space-x-6">
        {headerItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`text-xl font-semibold transition-colors duration-200 pb-1 ${
              location.pathname === item.path
                ? 'text-gray-50 border-b-2 border-gray-50'
                : 'text-gray-500 hover:text-gray-200'
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
