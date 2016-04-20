var q = require("q");
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(app, UserModel, passport) {
    var auth = authorized;
    app.put("/api/project/ad/user/:userId", auth, updateUserByIdAd);
    app.get("/api/project/ad/user", auth, getAllUsers);
    app.post("/api/project/login", passport.authenticate('project'), login);
    app.post('/api/project/logout', logout);
    app.post('/api/project/register', createUser);
    app.put("/api/project/user/:id", auth, updateUser);
    app.delete('/api/project/user/:id', deleteUser);
    app.get('/api/project/user', getUser);
    app.get('/api/project/user/:id', getUserById);
    app.get("/api/loggedin", loggedin);


    passport.use('project', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        UserModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if (!user) { return done(null, false); }
                    return done(null, user);
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.followers) {
            return User
                .findById(user._id)
                .then(
                    function(user) {
                        done(null, user);
                    },
                    function(err) {
                        done(err, null);
                    }
                );
        }
        else {
            UserModel
                .findUserById(user._id)
                .then(
                    function(user) {
                        done(null, user);
                    },
                    function(err) {
                        done(err, null);
                    }
                );
        }
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };


    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.send(req.user);
        } else {
            res.send(req.isAuthenticated() ? req.user : '0');
        }

    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function createUser(req, res) {
        UserModel.createUser(req.body)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            );
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var updates = req.body;
        updates._id = id;

        UserModel.updateUser(id, updates)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            );
    }

    function deleteUser(req, res) {
        UserModel.deleteUserById(req.params.id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            );
    }

    function getUser(req, res) {
        // need to switch on context
        if (req.query.username && req.query.password) {
            return login(req, res);
        } else if (req.query.username) {
            return getUserByUsername(req, res);
        } else {
            return getAllUsers(req, res);
        }
    }

    function getUserById(req, res) {
        var uid = req.params.id;
        UserModel.findUserById(uid)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            );

    }

    function getUserByUsername(req, res) {
        UserModel.findUserByUsername(req.query.username)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            );
    }

    function getAllUsers(req, res) {
       UserModel.findAllUsers()
           .then(
               function(doc) {
                   res.json(doc);
               },
               function(err) {
                   res.json(err);
               }
           );
    }

    function isAd(user) {
        if(user.role == "advertiser") {
            return true
        }
        return false;
    }

    function updateUserByIdAd(req, res) {
        if (isAd(req.user)) {
            var userId = req.params.userId;
            var user = req.body;

            UserModel
                .updateUserByIdAd(userId, user)
                .then(
                    function(doc) {
                        return UserModel.getAllUsers();
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(doc) {
                        res.json(doc);
                    },
                    function(err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }
};