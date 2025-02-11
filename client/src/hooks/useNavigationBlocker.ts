import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

interface UsePromptReturn {
  isBlocked: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
  setException: () => void; // 예외 처리를 위한 함수 추가
}

const usePrompt = (): UsePromptReturn => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  const [isBlocked, setIsBlocked] = useState(false);
  const [nextNavigation, setNextNavigation] = useState<(() => void) | null>(null);
  const [allowNavigation, setAllowNavigation] = useState(false); // 이동 예외 상태 추가

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (blocker.state === 'blocked' && !allowNavigation) {
      setIsBlocked(true);
      setNextNavigation(() => blocker.proceed);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker, allowNavigation]);

  const handleProceed = () => {
    setIsBlocked(false);
    nextNavigation?.();
  };

  const handleCancel = () => {
    setIsBlocked(false);
    blocker.reset?.();
  };

  // 페이지 이동 예외를 설정하는 함수
  const setException = () => {
    setAllowNavigation(true);
    blocker.proceed?.(); // 페이지 이동을 허용하고 즉시 이동 수행
  };

  return { isBlocked, handleProceed, handleCancel, setException };
};

export default usePrompt;
