const expect = require('expect');
const { List } = require('immutable');

const { Change } = require('../src');
const User = require('./fixtures/user');

describe('Model', function() {

    describe('constructor', function() {

    });

    describe('.isClean', function() {

        it('should return false for empty documents', function() {
            const user = new User();
            expect(user.isClean()).toBeFalsy();
        });

    });

    describe('.save', function() {

        it('should insert a new document', function() {
            const user = new User({
                username: 'test'
            });

            return user.save();
        });

    });

    describe('.query', function() {

        it('should return a query object', function() {
            User.query();
        });

    });

    describe('.compareWith', function() {

        it('should return changes as a list', function() {
            const a = new User({ name: 'Hello' });
            const b = new User({ name: 'World' });

            const changes = a.compareWith(b);

            expect(changes).toBeA(List);
            expect(changes.size).toBe(1);

            const change = changes.get(0);

            expect(change.path).toBe('name');
            expect(change.value).toBe('World');
            expect(change.type === Change.TYPES.SET);
        });

        it('should detect multiple changes', function() {
            const a = new User({ name: 'Hello', username: 'hello' });
            const b = new User({ name: 'World' });

            const changes = a.compareWith(b);

            expect(changes).toBeA(List);
            expect(changes.size).toBe(2);

            const set = changes.find(change => change.type === Change.TYPES.SET);
            expect(set.path).toBe('name');
            expect(set.value).toBe('World');

            const unset = changes.find(change => change.type === Change.TYPES.UNSET);
            expect(unset.path).toBe('username');
        });

    });

    /* describe('.remove', function() {

        it('should remove the document from the database', function() {
            return User.findOne({
                username: 'Test'
            })
            .then(function(user) {
                return user.remove();
            })
            .then(function() {
                return User.findOne({
                    username: 'Test'
                });
            })
            .then(function(user) {
                expect(user).toBeFalsy();
            });
        });

    });*/

});
