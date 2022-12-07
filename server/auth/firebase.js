const { initializeApp } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { getAuth } = require('firebase/auth');

const app = initializeApp({
  credential: credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  // databaseURL: 'https://<DATABASE_NAME>.firebaseio.com',
});

const auth = getAuth(app);

async function verifyFirebaseToken(token) {
  const decodedToken = await getAuth(app).verifyIdToken(token);
  console.log(decodedToken);
  throw new Error('failed to verify firebase access token');
}

module.exports = {
  app,
  auth,
  verifyFirebaseToken,
};
