const { Model } = require('../../src');

const connection = require('./connection');
const teamSchema = require('./userSchema');

class Team extends Model(teamSchema, connection, 'Team', { collection: 'teams' }) {

}

module.exports = Team;
