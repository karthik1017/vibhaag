const express = require('express');
const router = express.Router();
var verifyToken = require('../../auth/verify-token');

const _ = require('lodash');
const { User } = require('../models/user');

// get all the users
router.get('/', (req, res) => {
    User.find().then(users => {
        res.send(users);
    })
        .catch(err => {
            res.send(err);
        })
});

// get the specific user
router.get('/:id', (req, res) => {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.send(user)
    })
});

// delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id
    User.findByIdAndRemove(id).then(user => {
        if (user) {
            res.send({
                user,
                notice: 'successfully deleted user'
            });
        }
        else {
            res.send(404).send({
                notice: 'the user already removed'
            });
        }
    }).catch(err => {
        res.send(err);
    })
})

// create a user
router.post('/', (req, res) => {
    let body = _.pick(req.body, ['name', 'email', 'password', 'roles']);
    let user = new User(body);
    user.save().then((user) => {
        res.send(user);
    })
        .catch(err => {
            res.send(err);
        })
});

// update a specific user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'role', 'email']);
    User.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(user => {
            res.send(user)
        }).catch(err => {
            res.send(err);
        })
})

module.exports = {
    usersController: router
}

// nodemon index.js development

// Mongo Server Command
// mongod --dbpath d:\code\mongo-data