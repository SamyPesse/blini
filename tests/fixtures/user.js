const { Model } = require('../../src');

const connection = require('./connection');
const userSchema = require('./userSchema');

class User extends Model(userSchema, connection, 'users') {

}

module.exports = User;
