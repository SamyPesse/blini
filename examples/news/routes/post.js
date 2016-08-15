const express = require('express');
const Comment = require('../models/comment');

const router = express.Router();

// Display details about a post
router.get('/', function(req, res, next) {
    const { post } = req;

    Promise.all([
        Comment.findByPost(post)
            .populate('user')
            .sort('-upvotes')
            .limit(100)
            .exec(),
        post.populate('user')
    ])
    .spread(function(comments, post) {
        res.render('post', {
            post,
            comments
        });
    }, next);
});

module.exports = router;
