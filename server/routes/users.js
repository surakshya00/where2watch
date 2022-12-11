const express = require('express');
const { getJWTFromHeader, setJWTToCookie } = require('../auth');
const { decodeFirebaseJWTToken } = require('../auth/firebase');
const { authenticateUser } = require('../middleware/auth');
const { createUser, emailExists, getUserByEmail } = require('../services/user');

const router = express.Router();

// route to get all watchlists for the user
router.post('/register', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;
    const user = await createUser(email, firstName, lastName);
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.post('/login', async (req, res) => {
  try {
    let token = getJWTFromHeader(req);
    if (token === '') {
      return res
        .status(401)
        .json({ message: 'missing JWT token in request header' });
    }

    // retrieve user info
    const { email, name } = req.body;
    if (!email) {
      throw new Error('no email provided for user');
    }

    // verify email matches the one in JWT token
    const payload = await decodeFirebaseJWTToken(token);
    if (email !== payload.email) {
      throw new Error(
        'email mismatch. Provided email does not match the one in the JWT',
      );
    }

    const isExistingEmail = await emailExists(email);
    if (!isExistingEmail) {
      const { firstName, lastName } = decodeRawName(name || '');
      await createUser(email, firstName, lastName);
    }

    const user = await getUserByEmail(email);

    setJWTToCookie(res, token);
    return res.status(200).json({
      token,
      user,
    });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
});

router.get('/validate', authenticateUser, async (req, res) => {
  return res.status(200).json({ message: 'is authenticated', user: req.user });
});

function decodeRawName(name) {
  const result = {
    firstName: '',
    lastName: '',
  };

  if (name !== '') {
    const nameSegments = name.split(' ');
    result.firstName = nameSegments[0];
    if (nameSegments.length > 1) {
      const lastNameSegments = nameSegments.slice(1);
      result.lastName = lastNameSegments.join(' ');
    }
  }

  return result;
}

router.post('/logout', authenticateUser, async (req, res) => {
  setJWTToCookie(res, '');
  return res.status(200).json({ message: 'successfully logged out' });
});

module.exports = router;
