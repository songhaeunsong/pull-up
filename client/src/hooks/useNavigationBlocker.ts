import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

const usePrompt = () => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  useEffect(() => {
    // 새로고침이나 브라우저 종료 시 경고창 표시
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // 리액트 라우터 경로 이동 감지
    if (blocker.state === 'blocked') {
      if (window.confirm('정말로 이동하시겠습니까?')) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 제거
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker, blocker.state]);
};

export default usePrompt;
