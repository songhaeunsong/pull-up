import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';

interface UsePromptReturn {
  isBlocked: boolean;
  handleProceed: () => void;
  handleCancel: () => void;
  disablePrompt: () => void;
  enablePrompt: () => void;
}

const usePrompt = (): UsePromptReturn => {
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return currentLocation.pathname !== nextLocation.pathname;
  });

  const [isEnabled, setIsEnabled] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [nextNavigation, setNextNavigation] = useState<(() => void) | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isEnabled) return;
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    if (isEnabled && blocker.state === 'blocked') {
      setIsBlocked(true);
      setNextNavigation(() => blocker.proceed);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [blocker, isEnabled]);

  const handleProceed = () => {
    setIsBlocked(false);
    nextNavigation?.();
  };

  const handleCancel = () => {
    setIsBlocked(false);
    blocker.reset?.();
  };

  const disablePrompt = () => setIsEnabled(false);
  const enablePrompt = () => setIsEnabled(true);

  return { isBlocked, handleProceed, handleCancel, disablePrompt, enablePrompt };
};

export default usePrompt;
