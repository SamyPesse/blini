const express = require('express');
const User = require('../models/post');

const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('auth');
});

router.post('/', function(req, res, next) {
    const { username, password } = req.body;

    User.login(username, password)
    .then(function() {
        res.redirect('/');
    }, next);
});

module.exports = router;
