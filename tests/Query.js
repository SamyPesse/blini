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
                    expect(result.size).toBe(4);
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

        it('should return "null" if not found', function() {
            return (new Query(User))
                .findOne({ username: 'doesntexist' }).exec()
                .then(function(user) {
                    expect(user).toBeFalsy();
                });
        });
    });

    describe('.remove()', function() {
        it('should return result from mongo', function() {
            return (new Query(User))
                .remove({ username: 'remove-query-remove' }).exec()
                .then(function(result) {
                    expect(result.n).toBe(1);
                    expect(result.ok).toBe(1);
                });
        });

        it('should not fail if document does not exist', function() {
            return (new Query(User))
                .remove({ username: 'doesntexist' }).exec()
                .then(function(result) {
                    expect(result.n).toBe(0);
                    expect(result.ok).toBe(1);
                });
        });
    });

});
