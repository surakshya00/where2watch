const COOKIE_NAME = 'where2watch-firebase-token';

const cookieExpirationInHour = 6;

function getJWTFromCookie(req) {
  return req?.cookies?.[COOKIE_NAME] || '';
}

function getJWTFromHeader(req) {
  const headers = req.headers.authorization;
  if (headers && headers.startsWith('Bearer ')) {
    return headers.split(' ')[1];
  }
  return '';
}

// Save JWT as cookie for outgoing response
function setJWTToCookie(res, payload) {
  res.cookie(COOKIE_NAME, payload, {
    maxAge: cookieExpirationInHour * 60 * 60 * 1000,
    httpOnly: process.env.NODE_ENV !== 'production',
  });
}

module.exports = {
  COOKIE_NAME,
  getJWTFromCookie,
  getJWTFromHeader,
  setJWTToCookie,
};
