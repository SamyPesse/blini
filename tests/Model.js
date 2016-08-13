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

    });

});
