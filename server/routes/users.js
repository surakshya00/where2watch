const express = require('express');
const {
  getJWTFromHeader,
  getJWTFromCookie,
  setJWTToCookie,
} = require('../auth');
const { createUser, emailExists } = require('../services/user');

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
    let accessToken = getJWTFromHeader(req);
    if (accessToken === '') {
      accessToken = getJWTFromCookie(req);
    }

    if (accessToken === '') {
      return res
        .status(401)
        .json({ message: 'missing access token in request header/cookie' });
    }

    // upsert user info
    const { email, name } = req.body;
    if (email === '') {
      throw new Error('no email provided for user');
    }

    const isExistingEmail = await emailExists(email);
    if (!isExistingEmail) {
      const { firstName, lastName } = decodeRawName(name);
      await createUser(email, firstName, lastName);
    }

    setJWTToCookie(res, accessToken);
    return res.status(200).json({
      accessToken,
    });
  } catch (e) {
    return res.status(500).json({ message: e.toString() });
  }
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

module.exports = router;
