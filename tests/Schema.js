const expect = require('expect');
const { Type } = require('../src');
const userSchema = require('./fixtures/userSchema');

describe('Schema', function() {

    describe('.getDefaultValues', function() {

        it('should return a map with all fields', function() {
            const values = userSchema.getDefaultValues();

            expect(values).toEqual({
                username: undefined,
                name: undefined
            });
        });

    });

    describe('.getTypeByKey', function() {

        it('should return the type if the key exists', function() {
            const type = userSchema.getTypeByKey('username');
            expect(type).toBeA(Type.String);
        });

        it('should return undefined if the key does not exists', function() {
            const type = userSchema.getTypeByKey('unknown');
            expect(type).toBe(undefined);
        });

    });

});
