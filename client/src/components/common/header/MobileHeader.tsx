import { logout } from '@/api/auth';
import { cn } from '@/lib/utils';
import { memberStore } from '@/stores/memberStore';
import { Link, useLocation } from 'react-router-dom';

interface HeaderItem {
  label: string;
  path: string;
}

const MobileHeader = () => {
  const location = useLocation();
  const { member, isLoggedIn, logoutMember, isSolvedToday, interviewId } = memberStore();

  const headerItems: HeaderItem[] = [
    { label: '시험모드', path: '/exam' },
    { label: '게임모드', path: '/game' },
    { label: '대시보드', path: '/dashboard' },
  ];
  const loginItem: HeaderItem = { label: isLoggedIn ? '로그아웃' : '로그인', path: isLoggedIn ? '/' : '/signin' };

  const handleAuthClick = async () => {
    if (isLoggedIn) {
      await logout();
      logoutMember();
      console.log(isLoggedIn);
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
          <Link to={!isLoggedIn || !member ? '/' : !isSolvedToday ? '/interview' : `/interview/result/${interviewId}`}>
            Pull Up!
          </Link>
        </div>
        <Link
          key={loginItem.path}
          to={loginItem.path}
          className={cn(
            {
              'border-b-[3px] border-primary-500 text-primary-500':
                location.pathname.split('/')[1] === loginItem.path.split('/')[1],
              'border-b-[3px] border-transparent text-stone-800 hover:text-stone-950':
                location.pathname.split('/')[1] !== loginItem.path.split('/')[1] && loginItem.path == '/',
            },
            'text-sm font-semibold transition-colors duration-200',
          )}
          onClick={handleAuthClick}
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
