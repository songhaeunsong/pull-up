self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
self.importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Firebase 설정
self.firebase.initializeApp({
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
});

const messaging = self.firebase.messaging();

// 백그라운드 메시지
messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: payload.notification.tag,
    data: payload.data,
    requireInteraction: true,
    vibrate: [200, 100, 200],

    // 안드로이드 옵션
    actions: payload.notification.actions || [],
    renotify: true,
    click_action: payload.notification.click_action || 'FLUTTER_NOTIFICATION_CLICK',
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});

self.addEventListener('push', function (e) {
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };

  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  e.waitUntil(self.registration.showNotification(notificationTitle, notificationOptions));
});

self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = 'https://www.pull-up.store/signin';
  event.notification.close();
  event.waitUntil(self.clients.openWindow(url));
});
