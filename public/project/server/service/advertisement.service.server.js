var multer = require('multer');
module.exports = function(app, AdvertisingModel) {

    app.post('/api/project/advertisement', multer({ dest: '/Users/mcvey/webdevelopment/public/project/images/'}).single('upl'), addAd);
    app.put('/api/project/advertisement/:id', updateAdvertisement);
    app.delete('/api/project/advertisement/:id', deleteAd);
    app.get('/api/project/advertisement/:id', getAds);
    app.get('/api/project/all/advertisement', getAllAds);


    function addAd(req, res) {
        AdvertisingModel.addAd(req.body, req.file.filename, req.user._id);
        res.status(204).end();
    }

    function updateAdvertisement(req, res) {
        var id = req.params.id;
        var updates = req.body;
        updates._id = id;
        AdvertisingModel.updateAd(updates)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function deleteAd(req, res) {
        AdvertisingModel.deleteAdById(req.params.id)
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function getAds(req, res) {
        var userId = req.params.id;
        AdvertisingModel.allAdsForUser({user_id: userId})
            .then(
                function(doc) {
                    res.json(doc);
                },
                function(err) {
                    res.json(err);
                }
            )
    }

    function getAllAds(req, res) {
        AdvertisingModel.getAllAds()
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