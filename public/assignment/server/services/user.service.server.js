var model = require("./../models/user.model.js")()

module.exports = function(app, Model) {

    app.post('/api/assignment/user', createUser);
    app.put('/api/assignment/user/:id', updateUser);
    app.delete('/api/assignment/user/:id', deleteUser);
    app.get('/api/assignment/user', getUser);
    app.get('/api/assignment/user/:id', getUserById);

    function createUser(req, res) {
        res.json(model.createUser(req.body));
    }

    function updateUser(req, res) {
        var id = req.params.id;
        var updates = req.body;
        updates._id = id;
        res.json(model.updateUser(updates));
    }

    function deleteUser(req, res) {
        res.json(model.deleteUserById(req.params.id));
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
        res.json(model.findUserById(uid));

    }

    function login(req, res) {
        res.json(model.findUserByCredentials(req.query.username, req.query.password));
    }

    function getUserByUsername(req, res) {
        res.json(model.findUserByUsername(req.query.username))
    }

    function getAllUsers(req, res) {
        res.json(model.findAllUsers());
    }
};