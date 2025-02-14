import { registerDeviceToken } from '@/api/member';
import { queryClient } from '@/main';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import { toast } from 'react-toastify';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// service worker 등록
export async function registerServiceWorker() {
  navigator.serviceWorker.register('firebase-messaging-sw.js');
}

// 알림 허용
export async function requestPermission() {
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    // 토큰 가져오기
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID,
    });

    if (!currentToken) {
      return;
    }

    await queryClient.fetchQuery({
      queryKey: ['device-token'],
      queryFn: () => registerDeviceToken(currentToken),
    });
  } else {
    toast.info('사이트 알림을 허용해서 오늘의 문제를 매일 받아보세요!', {
      position: 'bottom-center',
      toastId: 'notification',
    });
  }
}
