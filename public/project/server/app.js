"use strict";
module.exports = function(app, db, mongoose, passport) {

    var userModel = require("./models/user/user.model.server.js")(db, mongoose);
    var clothingModel = require("./models/clothing/clothing.model.server.js")(db, mongoose);
    var advertisementModel = require("./models/advertisement/advertisement.model.server.js")(db, mongoose);

    require("./service/user.service.server.js")(app, userModel, passport);
    require("./service/clothing.service.server.js")(app, clothingModel);
    require("./service/advertisement.service.server.js")(app, advertisementModel);

};