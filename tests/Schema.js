const expect = require('expect');
const { Type } = require('../src');

const userSchema = require('./fixtures/userSchema');
const teamSchema = require('./fixtures/teamSchema');

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

    describe('.resolveTypeByKey', function() {

        it('should return the type if the key exists', function() {
            const type = userSchema.resolveTypeByKey('username');
            expect(type).toBeA(Type.String);
        });

        it('should return undefined if the key does not exists', function() {
            const type = userSchema.resolveTypeByKey('unknown');
            expect(type).toBe(undefined);
        });

        it('should return the a deep type if exists', function() {
            const type = teamSchema.resolveTypeByKey('members.user');
            expect(type).toBeA(Type.Ref);
        });

    });

});
