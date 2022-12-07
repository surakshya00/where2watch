const { initializeApp } = require('firebase-admin/app');
const { credential } = require('firebase-admin');
const { getAuth } = require('firebase-admin/auth');

const serviceAccount = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_URL,
};

const app = initializeApp({
  credential: credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

async function decodeFirebaseJWTToken(token) {
  const decodedToken = await getAuth(app).verifyIdToken(token);
  return decodedToken;
}

module.exports = {
  app,
  decodeFirebaseJWTToken,
};
