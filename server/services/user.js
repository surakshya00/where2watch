const UserModel = require('../models/user');

async function getUserById(userId) {
  const user = await UserModel.findById(userId).exec();
  return user;
}

async function createUser(email, username, password) {
  // Determine if the username already exists
  const isExistingUsername = await UserModel.exists({
    username: username,
  });
  if (isExistingUsername) {
    throw new Error('username already exists');
  }

  // determine if email already exists
  const isExistingEmail = await UserModel.exists({
    email: email,
  });
  if (isExistingEmail) {
    throw new Error('email already exists');
  }

  const newUser = await UserModel.create({
    username,
    email,
    password,
  });
  return newUser;
}

module.exports = {
  getUserById,
  createUser,
};
