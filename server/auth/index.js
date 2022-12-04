const COOKIE_NAME = 'where2watch-access-token';

const cookieExpirationInHour = 6;

function getAccessTokenFromCookie(req) {
  return req?.cookies?.[COOKIE_NAME] || '';
}

function getAccessTokenFromHeader(req) {
  const headers = req.headers.authorization;
  if (headers && headers.startsWith('Bearer ')) {
    return headers.split(' ')[1];
  }
  return '';
}

// Save JWT as cookie for outgoing response
function setAccessTokenToCookie(res, payload) {
  res.cookie(COOKIE_NAME, payload, {
    maxAge: cookieExpirationInHour * 60 * 60 * 1000,
    httpOnly: process.env.NODE_ENV !== 'production',
  });
}

module.exports = {
  COOKIE_NAME,
  getAccessTokenFromCookie,
  getAccessTokenFromHeader,
  setAccessTokenToCookie,
};
