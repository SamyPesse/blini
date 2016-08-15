const { Schema, Model, Type, Validation } = require('blini');
const connection = require('./connection');

const commentSchema = Schema({
    user: Type.Ref('User', {
        validation: [
            Validation.required()
        ]
    }),

    parent: Type.Ref('Comment'),

    body: Type.String({
        validations: [
            Validation.default(''),
            Validation.maxLength(200)
        ]
    }),

    upvotes: Type.Set(Type.Ref('User'))
});

class Comment extends Model(commentSchema, connection, 'Post') {
    // Fetch all root comments for a post
    static findByPost(post) {
        return this.find({
            post: post,
            parent: null
        });
    }

    // Fetch posts with a specific parent
    static findByParent(post) {
        return this.find({
            parent: post
        });
    }

}

module.exports = Comment;
