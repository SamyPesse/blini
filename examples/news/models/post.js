const { Schema, Model, Type, Validation } = require('blini');
const isUrl = require('is-url');
const connection = require('./connection');

const postSchema = Schema({
    user: Type.Ref('User', {
        validation: [
            Validation.required()
        ]
    }),

    title: Type.String({
        validations: [
            Validation.required('Post title is required'),
            Validation.minLength(1),
            Validation.maxLength(200)
        ]
    }),

    url: Type.String({
        validations: [
            Validation.default(''),

            // Validation are pure JS functions:
            function(value) {
                if (value && !isUrl(value)) {
                    throw new Error('Invalid url');
                }

                return value;
            }
        ]
    }),

    upvotes: Type.Set(Type.Ref('User'))
});

class Post extends Model(postSchema, connection, 'Post') {

}

module.exports = Post;
