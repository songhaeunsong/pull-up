import { useContext, useEffect, useState } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

function useConfirmExit(message: string, when: boolean) {
  const { navigator } = useContext(NavigationContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [nextNavigation, setNextNavigation] = useState<Parameters<typeof navigator.push> | null>(null);

  useEffect(() => {
    if (!when) return;

    const originalPush = navigator.push;

    navigator.push = (...args: Parameters<typeof originalPush>) => {
      setNextNavigation(args);
      setModalOpen(true);
    };

    return () => {
      navigator.push = originalPush;
    };
  }, [navigator, when]);

  const handleConfirm = () => {
    if (nextNavigation) {
      navigator.push(...nextNavigation);
    }
    setModalOpen(false);
  };

  const handleCancel = () => {
    setNextNavigation(null);
    setModalOpen(false);
  };

  return { isModalOpen, handleConfirm, handleCancel, message };
}

export function usePrompt(message: string, when = true) {
  const { isModalOpen, handleConfirm, handleCancel } = useConfirmExit(message, when);

  useEffect(() => {
    if (when) {
      window.onbeforeunload = () => message;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [message, when]);

  return { isModalOpen, handleConfirm, handleCancel, message };
}
