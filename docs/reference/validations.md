# Validations

```js
import { Validation } from 'mrgo'
```

A Validation allows you to define a transformation or rejection that will be applied to data before flushing to the database.

- [General validations](#general-validations)
    - [required](#required)
    - [default](#default)
- [String validations](#string-validations)
    - [minLength](#minlength)
    - [maxLength](#maxlength)
    - [regExp](#regexp)
    - [oneOf](#oneof)
- [Iterable validations](#iterable-validations)
    - [limitAt](#limitat)

## General validations

### `required`
`Validation.required(message: String)`

Enforce that the field is set, throw an error with `message` otherwise.

### `default`
`Validation.default(value: Mixed)`

Defaults the value of the field if non existant. It doesn't reject the valuation, only transform the data set.

## String Validations

### `minLength`
`Validation.minLength(min: Number, message: String)`

Enforce that the string value is at least `min` characters long.

### `maxLength`
`Validation.maxLength(max: Number, message: String)`

Enforce that the string value is less than `max` characters long.

### `regExp`
`Validation.regExp(re: RegExp, message: String)`

Enforce that the string value match a RegExp (`re`).

### `oneOf`
`Validation.oneOf(constants: Array, message: String)`

Enforce that the value is one of the constants.

## Iterable Validations

### `limitAt`
`Validation.limitAt(max: Number)`

Enforce that iterable doesn't have more than `max` element, it does not throw error, but normalize the value.
