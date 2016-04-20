var multer = require('multer');
module.exports = function(app, ClothingModel) {

    app.post('/api/project/clothing', multer({ dest: '/Users/mcvey/webdevelopment/public/project/images/'}).single('upl'), addClothing);
    app.post('/api/project/markdirty', markDirty);
    app.post('/api/project/markclean', markClean);
    app.put('/api/project/clothing/:id', updateClothing);
    app.post('/api/project/delete', deleteClothing);
    app.get('/api/project/clothing/user/:id/clean/:clean', getClothing);
    app.get('/api/project/all/clothing/:id', getAllClothes);
    app.get('/api/project/search/clothing/:query', searchClothing);

    function addClothing(req, res) {
       var path = __dirname + req.file.path;
        ClothingModel.addClothing(req.body, req.file.filename, req.user._id);
        res.status(204).end();
    }

    function markDirty(req, res) {
        var clothes = req.body.selected;
        ClothingModel.markClothingAs(clothes, false);
        res.status(204).end();
    }
    function markClean(req, res) {
        var dirtyClothes = req.body.selected;
        ClothingModel.markClothingAs(dirtyClothes, true);
        res.status(204).end();
    }

    function updateClothing(req, res) {
        var id = req.params.id;
        var updates = req.body;
        updates._id = id;
        ClothingModel.updateClothing(updates)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function deleteClothing(req, res) {
        ClothingModel.deleteClothingById(req.body.selected);
        res.status(204).end();
            //.then(
            //    function(doc) {
            //        res.json(doc);
            //    },
            //    function(err) {
            //        res.json(err);
            //    }
            //)
    }

    function getClothing(req, res) {
        var userId = req.params.id;
        var clean = req.params.clean;
        ClothingModel.someClothingForUser({user_id: userId, clean: clean})
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }
    function getAllClothes(req, res) {
        var userId = req.params.id;
        ClothingModel.allClothingForUser({user_id: userId})
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }
    function searchClothing(req, res) {
        var query = req.params.query;
        ClothingModel.findClothingByName(query)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }
};