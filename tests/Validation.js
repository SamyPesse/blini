const expect = require('expect');
const { Validation } = require('../src');

describe('Validation', function() {
    describe('.minLength', function() {
        const validate = Validation.minLength(10, 'err message');

        it('should throw if length is inferior', function() {
            expect(function () {
                validate('Hello');
            }).toThrow('err message');
        });

        it('should pass if length is superior', function() {
            validate('Hello World !!');
        });
    });

    describe('.maxLength', function() {
        const validate = Validation.maxLength(10, 'err message');

        it('should throw if length is superior', function() {
            expect(function () {
                validate('Hello World !!');
            }).toThrow('err message');
        });

        it('should pass if length is inferior', function() {
            validate('Hello');
        });
    });

    describe('.default', function() {
        const validate = Validation.default('value');

        it('should return default value when undefined', function() {
            expect(validate(undefined)).toBe('value');
        });

        it('should return value if null', function() {
            expect(validate(null)).toBe(null);
        });
    });

    describe('.required', function() {
        const validate = Validation.required('err message');

        it('should throw if value is undefined', function() {
            expect(function () {
                validate(undefined);
            }).toThrow('err message');
        });

        it('should pass if value is null', function() {
            expect(validate(null)).toBe(null);
        });
    });
});
