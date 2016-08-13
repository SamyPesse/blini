const { Connection } = require('../../src');

const URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/testing';

module.exports = new Connection(URL);
