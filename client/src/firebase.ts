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

// 알림 허용
async function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      // 디바이스 토큰 가져오기
      getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID })
        .then((currentToken) => {
          if (currentToken) {
            console.log('디바이스 토큰: ', currentToken);
          } else {
            console.log('등록된 토큰이 없습니다.');
          }
        })
        .catch((err) => {
          console.error('토큰 가져오기 실패: ', err);
        });
    } else {
      console.log('알림이 차단되었습니다.');
    }
  });
}

requestPermission();
