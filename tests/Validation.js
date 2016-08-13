const expect = require('expect');
const { Validation } = require('../src');

describe('Validation', function() {
    describe('minLength', function() {
        const validate = Validation.minLength(10, 'err message');

        it('should fail if length is inferior', function() {
            expect(function () {
                validate('Hello');
            }).toThrow('err message');
        });

        it('should pass if length is superior', function() {
            validate('Hello World !!');
        });
    });

    describe('maxLength', function() {
        const validate = Validation.maxLength(10, 'err message');

        it('should fail if length is superior', function() {
            expect(function () {
                validate('Hello World !!');
            }).toThrow('err message');
        });

        it('should pass if length is inferior', function() {
            validate('Hello');
        });
    });
});
