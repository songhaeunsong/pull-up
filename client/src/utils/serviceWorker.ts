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
  const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');

  // Service Worker에 Firebase 설정 전달
  registration.active?.postMessage({
    type: 'FIREBASE_CONFIG',
    config: firebaseConfig,
  });
}

// 아이폰 확인
function isIOSDevice() {
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
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
  } else if (isIOSDevice()) {
    toast.info('사이트 알림을 받으려면 홈 화면에 앱을 추가해주세요!', {
      position: 'bottom-center',
      toastId: 'ios-notification',
    });
  } else {
    toast.info('사이트 알림을 허용해서 오늘의 문제를 매일 받아보세요!', {
      position: 'bottom-center',
      toastId: 'notification',
    });
  }
}
