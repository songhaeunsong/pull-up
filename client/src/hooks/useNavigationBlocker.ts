import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

interface UsePromptReturn {
  isBlocked: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
}

const usePrompt = (): UsePromptReturn => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  const [isBlocked, setIsBlocked] = useState(false);
  const [nextNavigation, setNextNavigation] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (blocker.state === 'blocked') {
      setIsBlocked(true);
      setNextNavigation(() => blocker.proceed);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker]);

  const handleProceed = () => {
    setIsBlocked(false);
    nextNavigation?.();
  };

  const handleCancel = () => {
    setIsBlocked(false);
    blocker.reset?.();
  };

  return { isBlocked, handleProceed, handleCancel };
};

export default usePrompt;
