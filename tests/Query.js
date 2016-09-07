const expect = require('expect');
const { List } = require('immutable');

const { Query } = require('../src');
const User = require('./fixtures/user');

describe('Query', function() {

    describe('.find()', function() {
        it('should return all documents', function() {
            return (new Query(User))
                .find().exec()
                .then(function(result) {
                    expect(result).toBeA(List);
                    expect(result.size).toBe(2);
                });
        });
    });

    describe('.findOne()', function() {
        it('should return a document', function() {
            return (new Query(User))
                .findOne({ username: 'johndoe' }).exec()
                .then(function(user) {
                    expect(user).toBeA(User);
                    expect(user.username).toBe('johndoe');
                });
        });
    });

});
