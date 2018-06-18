var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(username) {
    console.log('last  ....', username);
    return userModel.findOne({username: username});
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials, {username: 1, password: 1});
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, newUser) {
    return userModel.update({_id: userId},
        {$set: newUser})
}



var api = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByUsername: findUserByUsername,
    findUserByCredentials: findUserByCredentials,
    deleteUser: deleteUser,
    updateUser: updateUser

};

module.exports = api;