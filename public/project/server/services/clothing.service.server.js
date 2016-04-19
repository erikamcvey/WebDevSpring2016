module.exports = function(app, ClothingModel) {

    app.post('/api/project/clothing', addClothing);
    app.put('/api/project/clothing/:id', updateClothing);
    app.delete('/api/project/clothing/:id', deleteClothing);
    app.get('/api/project/clothing/user/:id/clean/:clean', getClothing);
    app.get('/api/project/clothing/:id', getClothingById);

    function addClothing(req, res) {
        ClothingModel.addClothing(req.body)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
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
        ClothingModel.deleteClothingById(req.params.id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function getClothing(req, res) {
        console.log("nowww Im here");
        var userId = req.params.id;
        var clean = req.params.clean;
        ClothingModel.allClothingForUser({user_id: userId, clean: clean})
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function getClothingById(req, res) {
        var id = req.params.id;
        ClothingModel.findClothingById(id)
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