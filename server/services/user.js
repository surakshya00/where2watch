const UserModel = require('../models/user');

async function getUserById(userId) {
  const user = await UserModel.findById(userId).exec();
  return user;
}

async function createUser(email, firstName, lastName) {
  // determine if email already exists
  const isExistingEmail = await UserModel.exists({
    email: email,
  });
  if (isExistingEmail) {
    throw new Error('email already exists');
  }

  const newUser = await UserModel.create({
    email,
    firstName,
    lastName,
  });
  return newUser;
}

async function emailExists(email) {
  return await UserModel.exists({ email });
}

module.exports = {
  getUserById,
  createUser,
  emailExists,
};
