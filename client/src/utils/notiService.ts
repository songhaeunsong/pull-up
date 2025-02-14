import { registerServiceWorker, requestPermission } from './serviceWorker';

export const setupNotification = async () => {
  try {
    await registerServiceWorker();
    await requestPermission();
  } catch (error) {
    console.error('알림 설정 실패:', error);
  }
};
