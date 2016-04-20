var uuid = require("node-uuid");
var q = require("q");

module.exports = function(db, mongoose) {
    var ClothingSchema = require("./clothing.schema.server.js")(mongoose);
    var ClothingModel = mongoose.model('ClothingModel', ClothingSchema);

    var api = {
        addClothing: addClothing,
        allClothingForUser: allClothingForUser,
        findClothingById: findClothingById,
        updateClothing: updateClothing,
        deleteClothingById: deleteClothingById,
        findClothingByName: findClothingByName,
        markClothingAs: markClothingAs,
        someClothingForUser: someClothingForUser
    };
    return api;

    function addClothing(item, filepath, user) {
        var deferred = q.defer();
        item.img = '/project/images/' + filepath;
        item.user_id = user;
        item.clean = true;
        ClothingModel.create(item, function (error, doc) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function allClothingForUser(params) {
        return ClothingModel.find({user_id: params.user_id})
            .then(
                function(clothes) {
                return clothes;
            });
    }
    function someClothingForUser(params) {
        return ClothingModel.find({user_id: params.user_id, clean: params.clean})
            .then(
                function(clothes) {
                    return clothes;
                });
    }

    function findClothingById(itemId) {
        var deferred = q.defer();
        return ClothingModel.findOne({_id: itemId}).
            then(
            function(item) {
                return item;
            }
        );
    }

    function updateClothing(clothingId, newItem) {
        var deferred = q.defer();
        ClothingModel.update (
            {_id: clothingId},
            {$set: newItem},
            function (error, doc) {
                if(error) {
                    deferred.reject(error);
                }
                else {
                    ClothingModel.findById(userId,
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

    function deleteClothingById(itemId) {
        return ClothingModel.findById(itemId)
            .then(function(doc) {
                doc.remove();
            });
    }

    function findClothingByName(name) {
        var deferred = q.defer();
        ClothingModel.find({name: name},
        function(error, doc) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function markClothingAs(item, clean) {
        var deferred = q.defer();

        return ClothingModel.findOneAndUpdate({_id: item}, {clean: clean}, function (error, doc) {
            if (error) {
                deferred.reject(error);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }
};