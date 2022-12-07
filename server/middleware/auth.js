const { getJWTFromCookie } = require('../auth');
const { verifyFirebaseToken } = require('../auth/firebase');
const { getUserByEmail } = require('../services/user');

async function authenticateUser(req, res, next) {
  try {
    // check if JWT is stored in cookie
    const token = getJWTFromCookie(req);
    if (token === '') {
      return res.status(401).json({ message: 'not authenticated' });
    }

    // validate JWT with firebase
    const payload = await verifyFirebaseToken(token);
    email = payload.email;

    // retrieve user by email
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'no user found' });
    }

    // save user in the request
    req.user = user;
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }

  return next();
}

module.exports = {
  authenticateUser,
};
