const express = require('express');
const Post = require('../models/post');

const router = express.Router();

// List most upvoted posts
router.get('/', function(req, res, next) {
    Post.findPosts()
    .populate('user')
    .sort('-upvotes')
    .limit(100)
    .exec()
    .then(function(posts) {
        res.render('homepage', {
            posts
        });
    }, next);
});

module.exports = router;
