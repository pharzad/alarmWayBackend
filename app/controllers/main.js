'use strict';

var app = require('../app');
var User = require('../../app/models/user');

function getUsers(req, res) {

    var user = new User();

    User.find(function (err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
}

function verify(req, res) {

    var user = new User();
    var email = req.body.email;

    User.find({
        email: email
    }, function (err, response) {
        if (err)
            res.send(err);

        res.json(response);
    });
}

function login(req, res) {

    var user = new User();
    var email = req.body.email;
    var password = req.body.password;

    User.find({
        email: email,
        password: password
    }, function (err, response) {
        if (err)
            res.send(err);

        res.json(response);
    });
}

function updateUser(req, res) {


    User.findById(req.params.user_id, function (err, user) {

        if (err)
            res.send(err);

        user.name = req.body.name;
        user.email = req.body.email;
        user.pic = req.body.pic;
        user.location = req.body.location;
        user.gender = req.body.gender;
        user.alarms = req.body.alarms;

        // save the bear
        user.save(function (err) {
            if (err)
                res.send(err);

            res.json(
                user
            );
        });

    });
}

function createUser(req, res) {

    var user = new User();
    
    console.log(JSON.stringify(req));

    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    user.pic = req.body.pic;
    user.location = req.body.location;
    user.gender = req.body.gender;

    User.find({
        email: req.body.email
    }, function (err1, tempUser) {

        if (tempUser.length === 0) {

            user.save(function (err) {
                if (err)
                    res.send(err);

                res.json({
                    user: user,
                    message: 'success'
                });
            });
        } else {
            res.json({
                message: 'exist'
            });
        }
    });
}


function deleteUser(req, res) {

    User.remove({
        _id: req.params.user_id
    }, function (err, user) {
        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });
    });
}

function deletealarm(req, res) {

    User.findByIdAndUpdate({
            _id: req.params.user_id
        }, {
            $pull: {
                alarms: {
                    _id: req.params.alarm_id
                }
            }
        },
        function (err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
}

// Routes
app.get('/wayalarm/users', getUsers);
app.post('/wayalarm/verify', verify);
app.post('/wayalarm/login', login);
app.put('/wayalarm/user/:user_id', updateUser);
app.post('/wayalarm/user', createUser);
app.delete('/wayalarm/user/:user_id', deleteUser);
app.delete('/wayalarm/user/:user_id/alarm/:alarm_id', deletealarm);
//app.delete('/wayalarm/user/:user_id/alarms', deletealarms);