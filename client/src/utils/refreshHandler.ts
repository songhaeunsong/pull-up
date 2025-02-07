import { type ReactNode, useEffect } from 'react';
import { reissue } from '@/api/auth';

const TOKEN_REFRESH_INTERVAL = 1000 * 60 * 14; // 14분

interface RefreshHandlerProps {
  children: ReactNode;
}

export const RefreshHandler = ({ children }: RefreshHandlerProps) => {
  useEffect(() => {
    // 주기적으로 토큰 갱신
    const refreshInterval: NodeJS.Timeout = setInterval(reissue, TOKEN_REFRESH_INTERVAL);

    // 페이지 언로드 직전 상태 감지
    const handleBeforeUnload = () => {
      clearInterval(refreshInterval);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 페이지 로드/새로고침 시 즉시 토큰 재발급
    reissue();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(refreshInterval);
    };
  }, []);

  return children;
};
