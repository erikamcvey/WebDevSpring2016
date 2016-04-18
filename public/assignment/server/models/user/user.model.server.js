var uuid = require("node-uuid");
var q = require("q");

module.exports = function(db, mongoose) {
    var UserSchema = require("./user.schema.server.js")(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUserById: deleteUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user) {
        var deferred = q.defer();
        var _id = uuid.v1();
        var userNew = {
            "_id": _id,
            "username": user.username,
            "password": user.password,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email" : user.email,
            "roles" : [user.roles]
        };

        UserModel.create(userNew, function (error, doc) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        var deferred = q.defer();
        UserModel.find(
            function(error, doc) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(
            {"_id": userId},
            function(error, doc) {
                if (error) {
                    deferred.reject(error);
                }
                else {
                    deferred.resolve(doc);
                }
            })
        return deferred.promise;
    }

    function updateUser(userId, newUser) {
        var deferred = q.defer();
        UserModel.update (
            {_id: userId},
            {$set: newUser},
            function (error, doc) {
                if(error) {
                    deferred.reject(error);
                }
                else {
                    UserModel.findById(userId,
                        function (err, user) {
                            if(err) {
                                deferred.reject(err);
                            }
                            else {
                                deferred.resolve(user);
                            }
                        });
                }
            });
        return deferred.promise;
    }

    function deleteUserById(userId) {
        var deferred = q.defer();
        UserModel.remove(
            {_id: userId},
            function(error, doc) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(findAllUsers());
                }
            });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i] === username) {
                return users[i];
            }
        }
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.findOne(
            { username: username,
                password: password },

            function(error, doc) {
                if (error) {
                    deferred.reject(error);
                } else {
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};