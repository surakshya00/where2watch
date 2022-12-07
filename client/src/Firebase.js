import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAlmOQEp0HjtZHn3GwwS4bD9xkb0xDLhRI',
  authDomain: 'what2watch-c439a.firebaseapp.com',
  projectId: 'what2watch-c439a',
  storageBucket: 'what2watch-c439a.appspot.com',
  messagingSenderId: '112832403286',
  appId: '1:112832403286:web:dacb496bf8b33b601228f7',
  measurementId: 'G-FL2T5SKX9B',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);

export default app;
