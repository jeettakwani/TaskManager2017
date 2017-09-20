var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function (app, model) {
    "use strict";
    var uuid = require('node-uuid');
    var auth = authorized;
    

    app.all('/api/assignment/user', function (req, res, next) {
        if (req.query.username != null && req.query.password != null) {
            findUserByCredentials(req, res);
        } else if (req.query.username && !req.query.password) {
            findUserByUsername(req, res);
        }
        else {
            next();
        }
    });

    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.post ('/api/assignment/register',       register);
    app.post('/api/assignment/logout',         logout);

    passport.use('assignment',new LocalStrategy(assignLocalStrategy));

    function assignLocalStrategy(username,password,done)
    {
        //userModel.findUserByCredentials(username,password).then(
        model.findUserByUsername(username).then(
            function(user)
            {
                if(!user)
                {
                    return done(null,false);
                }
                else
                {
                    console.log(user);
                    if(user && bcrypt.compareSync(password,user.password)) {
                        console.log("in compare sync");
                        return done(null, user);
                    }
                }
            },
            function(err)
            {
                if(err)
                {
                    return done(err);
                }
            }
        );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user,done)
    {
        if(user.type == 'assignment') {
            //console.log("in check for assignment");
            model.findUserById(user._id).then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;
        //newUser.password = bcrypt.hashSync(req.body.password);
        //newUser.roles = ['admin'];

        model
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    if(user) {
                        res.json(null);
                    } else {
                        return model.createUser(newUser);
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function  createUser(req, res) {
        var newUser = req.body;
        delete newUser['_id'];
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["user"];
        }

        // first check if a user already exists with the username
        model
            .createUser(newUser)
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }


    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }


    function findUserByUsername(req, res) {

        var username = req.query.username;
        var user = model.findUserByUsername(username)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        var user = model.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    res.json(doc)
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};