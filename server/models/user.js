const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  email: { type: String, required: true, unique: true },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
