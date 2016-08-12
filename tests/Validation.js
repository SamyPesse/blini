const expect = require('expect');

const { Validation } = require('../src');

describe('Validation', function() {

    describe('minLength', function() {
        const validation = Validation.minLength(10, 'err message');

        it('should fail if length is inferior', function() {
            expect(function () {
                validation.validate('Hello');
            }).toThrow('err message');
        });

        it('should pass if length is superior', function() {
            validation.validate('Hello World !!');
        });

    });

});
