const { Connection } = require('../../src');

const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/testing';
const connection = new Connection(URL);

module.exports = connection;
