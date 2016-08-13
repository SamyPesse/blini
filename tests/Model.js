const expect = require('expect');
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
