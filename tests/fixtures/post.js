const { Model } = require('../../src');

const connection = require('./connection');
const postSchema = require('./postSchema');

class Post extends Model(postSchema, connection, 'Post', { collection: 'posts' }) {

}

module.exports = Post;
