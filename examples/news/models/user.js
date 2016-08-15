const { Schema, Model, Type, Validation } = require('blini');
const connection = require('./connection');

const userSchema = Schema({
    username: Type.String({
        validation: [
            Validation.required('Username is required'),
            Validation.minLength(1),
            Validation.maxLength(30)
        ]
    }),

    password: Type.String({
        validation: [
            Validation.required('Password is required')
        ]
    })
});

class User extends Model(userSchema, connection, 'User') {

    // Check a password against an user
    checkPassword(password) {
        // You should never do this and use an hash of the password in db instead!!
        return this.password === password;
    }

    // Login an user
    static login(username, password) {
        return this.findByUsername(username).exec()
        .then(function(user) {
            if (!user.checkPassword(password)) {
                throw new Error('Invalid password');
            }

            return user;
        });
    }

    // Get an user by its username
    static findByUsername(username) {
        return this.findOne({
            username: username
        });
    }
}

module.exports = User;
