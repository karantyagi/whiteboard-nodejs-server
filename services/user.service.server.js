module.exports = function (app) {
    app.get('/api/user', findAllUsers);
    app.get('/api/user/:userId', findUserById);
    app.get('/api/user/username/:username', findUserByUsername);
    app.get('/api/user/:username/:password', findUserByCredentials);
    app.delete('/api/user/:userId', deleteUser);
    app.put('/api/user/:userId', updateUser);
    app.post('/api/user', createUser);
    app.get('/api/profile', profile);
    app.post('/api/logout', logout);
    app.post('/api/login', login);

    var userModel = require('../models/user/user.model.server');

    function login(req, res) {
        // console.log('in login');
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

    function logout(req, res) {
        req.session.destroy();
        res.sendStatus(200);
    }

    function findUserById(req, res) {
        var id = req.params['userId'];
        userModel.findUserById(id)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByUsername(req, res) {
        var username = req.params['username'];
        // console.log('Username at server : ',username);
        userModel.findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            })
    }

    function findUserByCredentials(req, res) {
        var username = req.params['username'];
        var password = req.params['password'];
        userModel.findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            })
    }

    function profile(req, res) {
        console.log(req.session);
        if(req.session['currentUser'] != null) {
            res.send(req.session['currentUser']);
        } else { res.send(
            {
                'username' : 'No session maintained'
            });}


    }

    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(function (user) {
                req.session['currentUser'] = user;
                res.send(user);
            })
    }

    function findAllUsers(req, res) {
        userModel.findAllUsers()
            .then(function (users) {
                res.send(users);
            })
    }

    function deleteUser(req, res) {
        var id = req.params['userId'];
        userModel.deleteUser(id)
            .then(findAllUsers);
    }

    function updateUser(req, res) {
        var userId = req.params['userId'];
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(function (user) {
                res.send(user);
            })
    }


}