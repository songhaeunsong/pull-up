import { useRef } from 'react';
import { useWebSocketStore } from '@/stores/useWebSocketStore';

interface StartSendTimerProps {
  key: string;
  durationMs: number;
  destination: string;
  payload: Record<string, unknown>;
}

const useSendTimerManager = () => {
  const timeoutMapRef = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const { sendMessage } = useWebSocketStore();

  const startSendTimer = ({ key, durationMs, destination, payload }: StartSendTimerProps) => {
    if (timeoutMapRef.current.has(key)) {
      clearTimeout(timeoutMapRef.current.get(key)!);
    }

    const timeout = setTimeout(() => {
      sendMessage(destination, payload);
      timeoutMapRef.current.delete(key);
    }, durationMs);

    timeoutMapRef.current.set(key, timeout);
  };

  const clearSendTimer = (key: string) => {
    if (timeoutMapRef.current.has(key)) {
      clearTimeout(timeoutMapRef.current.get(key)!);
      timeoutMapRef.current.delete(key);
    }
  };

  return { startSendTimer, clearSendTimer };
};

export default useSendTimerManager;
