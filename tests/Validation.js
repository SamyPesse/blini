const expect = require('expect');
const { Validation } = require('../src');

describe('Validation', function() {
    describe('.minLength', function() {
        const validate = Validation.minLength(10, 'err message');

        it('should throw a good default message', function() {
            expect(function() {
                Validation.minLength(10)('Hello', 'a');
            }).toThrow('"a" should be longer than 10 characters');
        });

        it('should throw if length is inferior', function() {
            expect(function() {
                validate('Hello');
            }).toThrow('err message');
        });

        it('should pass if length is superior', function() {
            validate('Hello World !!');
        });
    });

    describe('.maxLength', function() {
        const validate = Validation.maxLength(10, 'err message');

        it('should throw a good default message', function() {
            expect(function() {
                Validation.maxLength(2)('Hello', 'a');
            }).toThrow('"a" should be less than 2 characters');
        });

        it('should throw if length is superior', function() {
            expect(function() {
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

        it('should throw a good default message', function() {
            expect(function() {
                Validation.required()(undefined, 'a');
            }).toThrow('"a" is required');
        });

        it('should throw if value is undefined', function() {
            expect(function() {
                validate(undefined);
            }).toThrow('err message');
        });

        it('should pass if value is null', function() {
            expect(validate(null)).toBe(null);
        });
    });

    describe('.oneOf', function() {
        const validate = Validation.oneOf([1, 2, 3], 'err message');

        it('should throw a good default message', function() {
            expect(function() {
                Validation.oneOf([1,2])(3, 'a');
            }).toThrow('"a" should be one of 1, 2');
        });

        it('should throw if value is undefined', function() {
            expect(function() {
                validate(undefined);
            }).toThrow('err message');
        });

        it('should throw if value is not present in the list', function() {
            expect(function() {
                validate(4);
            }).toThrow('err message');
        });

        it('should pass if value is in the list', function() {
            expect(validate(1)).toBe(1);
            expect(validate(2)).toBe(2);
            expect(validate(3)).toBe(3);
        });
    });
});
