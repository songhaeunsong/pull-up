import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

interface UsePromptReturn {
  isBlocked: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
  setException: () => void; // 페이지 이동 예외 설정 함수
}

const usePrompt = (): UsePromptReturn => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    // 페이지 경로가 달라지는 경우에만 페이지 이동 차단
    return currentLocation.pathname !== nextLocation.pathname;
  });

  const [isBlocked, setIsBlocked] = useState(false);
  const [allowNavigation, setAllowNavigation] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (blocker.state === 'blocked') {
      if (allowNavigation) {
        // 예외가 설정된 경우 즉시 이동 허용
        blocker.proceed();
      } else {
        setIsBlocked(true);
      }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker, allowNavigation]);

  const handleProceed = () => {
    setIsBlocked(false);
    blocker.proceed?.(); // 사용자가 경고 모달에서 이동을 허용한 경우
  };

  const handleCancel = () => {
    setIsBlocked(false);
    blocker.reset?.(); // 사용자가 경고 모달에서 이동을 취소한 경우
  };

  const setException = () => {
    setAllowNavigation(true); // 페이지 이동 예외 설정
  };

  return { isBlocked, handleProceed, handleCancel, setException };
};

export default usePrompt;
