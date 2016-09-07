const Promise = require('q');
const { List, Map } = require('immutable');
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

    describe('String', function() {

        describe('toMongo', function() {

            it('should cast value as a string', function() {
                const type = Type.String();
                return expect(type.toMongo(14)).toBe('14');
            });

        });

        describe('toJS', function() {

            it('should cast value as a string', function() {
                const type = Type.String();
                return expect(type.toMongo(15)).toBe('15');
            });

        });

    });

    describe('Number', function() {

        describe('toMongo', function() {

            it('should cast value as a number', function() {
                const type = Type.Number();
                return expect(type.toMongo('14')).toBe(14);
            });

        });

        describe('toJS', function() {

            it('should cast value as a number', function() {
                const type = Type.Number();
                return expect(type.toMongo('15')).toBe(15);
            });

        });

    });

    describe('.List', function() {

        describe('.validate', function() {
            const whole = Type.List(Type.Mixed(), {
                validations: [
                    function(value) {
                        if (value.size > 1) throw new Error('error');
                        else return value;
                    }
                ]
            });

            const withType = Type.List(
                Type.Number({
                    validations: [
                        function(value) {
                            if (value > 2) throw new Error('error');
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

    describe('Map', function() {

        describe('.validate', function() {
            const whole = Type.Map(Type.Mixed(), {
                validations: [
                    function(value) {
                        if (value.size > 1) throw new Error('error');
                        else return value;
                    }
                ]
            });

            const withType = Type.Map(
                Type.Number({
                    validations: [
                        function(value) {
                            if (value > 2) throw new Error('error');
                            else return value;
                        }
                    ]
                })
            );

            it('should validate the whole map (1)', function() {
                return whole.validate(Map({a: 1, b: 2}))
                    .then(function(result) {
                        throw new Error('It should have failed');
                    }, function() {
                        return Promise();
                    });
            });

            it('should validate the whole map (2)', function() {
                return whole.validate(Map({ a: 1 }));
            });

            it('should validate inner elements (1)', function() {
                return withType.validate(Map({ a: 1, b: 2, c: 0, d: 1, e: 2 }));
            });
        });

        describe('.compare', function() {

            it('should return empty changes for same list', function() {
                const a = Map({a: 1, b: 4});
                const b = Map({a: 1, b: 4});
                const type = Type.Map();
                const changes = type.compare(a, b, 'someMap');

                expect(changes.size).toBe(0);
            });

            it('should return $set changes for modifications', function() {
                const a = Map({a: 1, b: 4});
                const b = Map({a: 1, b: 3});
                const type = Type.Map();
                const changes = type.compare(a, b, 'someMap');

                expect(changes.size).toBe(1);
                expect(changes.get(0).path).toBe('someMap.b');
                expect(changes.get(0).type).toBe('$set');
                expect(changes.get(0).value).toBe(3);
            });

            it('should return $unset changes for removed items', function() {
                const a = Map({a: 1, b: 4, c: 5});
                const b = Map({a: 1, b: 4});
                const type = Type.Map();
                const changes = type.compare(a, b, 'someMap');

                expect(changes.size).toBe(1);
                expect(changes.get(0).path).toBe('someMap.c');
                expect(changes.get(0).type).toBe('$unset');
            });

        });

    });

});
