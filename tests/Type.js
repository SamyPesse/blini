const Promise = require('q');
const expect = require('expect');

const { Type, Validation } = require('../src');

describe('Type', function() {

    describe('.validate', function() {

        it('should return a promise, resolved with the input', function() {
            const type = Type.String();

            return type.validate('Hello')
                .then(function(result) {
                    expect(result).toBe('Hello');
                });
        });

        it('should call all validation functions', function() {
            const type = Type.String({
                validations: [
                    Validation.minLength(1),
                    Validation.maxLength(3, 'too long')
                ]
            });

            return type.validate('Hello')
                .then(function(result) {
                    throw new Error('It should have failed');
                }, function() {
                    return Promise();
                });
        });

    });

});
