const expect = require('expect');
const { List } = require('immutable');

const { Query } = require('../src');
const User = require('./fixtures/user');

describe('Query', function() {

    describe('.find()', function() {

        it.only('should return all documents', function() {
            return (new Query(User))
                .find().exec()
                .then(function(result) {
                    expect(result).toBeA(List);
                    expect(result.size).toBe(1);
                });
        });

    });

});
