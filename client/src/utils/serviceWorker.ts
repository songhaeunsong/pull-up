import { registerDeviceToken } from '@/api/member';
import { queryClient } from '@/main';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';

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
  navigator.serviceWorker
    .register('firebase-messaging-sw.js')
    .then(function () {
      console.log('Service Worker 등록 성공');
    })
    .catch(function (error) {
      console.log('Service Worker 등록 실패:', error);
    });
}

// 알림 허용
export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('알림이 차단되었습니다.');
      return;
    }

    // 토큰 가져오기
    const currentToken = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID,
    });

    if (!currentToken) {
      console.log('등록된 토큰이 없습니다.');
      return;
    }

    await queryClient.fetchQuery({
      queryKey: ['device-token'],
      queryFn: () => registerDeviceToken(currentToken),
    });
  } catch (error) {
    console.error('토큰 가져오기 실패: ', error);
  }
}
