const Promise = require('q');
const { List } = require('immutable');
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

    describe('.List', function() {

        describe('.validate', function() {
            const whole = Type.List(Type.Mixed(), {
                validations: [
                    function(value) {
                        if (value.size > 1) throw 'error';
                        else return value;
                    }
                ]
            });

            const withType = Type.List(
                Type.Number({
                    validations: [
                        function(value) {
                            if (value > 2) throw 'error';
                            else return value;
                        }
                    ]
                })
            );

            it('should validate the whole list (1)', function() {
                return whole.validate(List([1, 2]))
                    .then(function(result) {
                        throw new Error('It should have failed');
                    }, function() {
                        return Promise();
                    });
            });

            it('should validate the whole list (2)', function() {
                return whole.validate(List([1]));
            });

            it('should validate inner elements (1)', function() {
                return withType.validate(List([1, 2, 0, 1, 2]));
            });

            it('should validate the whole list (2)', function() {
                return withType.validate(List([1, 2, 3, 1, 2]))
                    .then(function(result) {
                        throw new Error('It should have failed');
                    }, function() {
                        return Promise();
                    });
            });

        });

        describe('.compare', function() {

            it('should return empty changes for same list', function() {
                const a = List([1, 4]);
                const b = List([1, 4]);
                const type = Type.List();
                const changes = type.compare(a, b, 'someList');

                expect(changes.size).toBe(0);
            });

            it('should return $set changes for modifications', function() {
                const a = List([1, 4]);
                const b = List([1, 3]);
                const type = Type.List();
                const changes = type.compare(a, b, 'someList');

                expect(changes.size).toBe(1);
                expect(changes.get(0).path).toBe('someList.1');
                expect(changes.get(0).type).toBe('$set');
                expect(changes.get(0).value).toBe(3);
            });

            it('should return $unset changes for removed items', function() {
                const a = List([1, 4, 2]);
                const b = List([1, 4]);
                const type = Type.List();
                const changes = type.compare(a, b, 'someList');

                expect(changes.size).toBe(1);
                expect(changes.get(0).path).toBe('someList.2');
                expect(changes.get(0).type).toBe('$unset');
            });

        });

    });

});
