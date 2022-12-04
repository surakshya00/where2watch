const firebase = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyAlmOQEp0HjtZHn3GwwS4bD9xkb0xDLhRI',
  authDomain: 'what2watch-c439a.firebaseapp.com',
  projectId: 'what2watch-c439a',
  storageBucket: 'what2watch-c439a.appspot.com',
  messagingSenderId: '112832403286',
  appId: '1:112832403286:web:dacb496bf8b33b601228f7',
  measurementId: 'G-FL2T5SKX9B',
};

const app = firebase.initializeApp(firebaseConfig);

const auth = getAuth(app);

async function verifyFirebaseToken(token) {
  throw new Error('failed to verify firebase access token');
}

module.exports = {
  app,
  auth,
  verifyFirebaseToken,
};
