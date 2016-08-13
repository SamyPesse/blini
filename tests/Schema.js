const expect = require('expect');
const { Type } = require('../src');
const userSchema = require('./fixtures/userSchema');

describe('Schema', function() {

    describe('.getDefaultValues', function() {

        it('should return a map with all fields', function() {
            const values = userSchema.getDefaultValues();

            expect(values).toEqual({
                username: null,
                name: null
            });
        });

    });

    describe('.getType', function() {

        it('should return the type if the key exists', function() {
            const type = userSchema.getType('username');
            expect(type).toBeA(Type);
        });

        it('should return undefined if the key does not exists', function() {
            const type = userSchema.getType('unknown');
            expect(type).toBe(undefined);
        });

    });

});
