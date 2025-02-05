// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const fb = import.meta.env;

const firebaseConfig = {
  apiKey: fb.API_KEY,
  authDomain: fb.AUTH_DOMAIN,
  projectId: fb.PROJECT_ID,
  storageBucket: fb.STORAGE_BUCKET,
  messagingSenderId: fb.MESSAGING_SENDER_ID,
  appId: fb.APP_ID,
  measurementId: fb.MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
