const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["patient", "doctor", "admin"], 
    default: "patient",
    required: true 
  },
});

const User = module.exports = mongoose.model("User", UserSchema);

module.exports.getUserById = function (id) {
  return User.findById(id).exec();
};

module.exports.getUserByUsername = function (username) {
  const query = { username: username };
  return User.findOne(query).exec();
};

module.exports.addUser = function(newUser) {
  return bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(newUser.password, salt))
    .then((hash) => {
      newUser.password = hash;
      return newUser.save();
    })
    .then((savedUser) => savedUser)
    .catch((error) => {
      throw error;
    });
};



module.exports.comparePassword = function (candidatePassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, hash)
      .then((isMatch) => resolve(isMatch))
      .catch((error) => reject(error));
  });
};

