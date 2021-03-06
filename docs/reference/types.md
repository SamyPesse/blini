# Types

```js
import { Type } from 'Blini'
```

Types are definitions for schema fields. It defines how data should be serialized to MongoDB
and deserialized from it, combine with a set of data validations to apply.

All types can accept as last argument an object `{ index: Index, validations: Array<Validation> }`. Checkout the references of [`Index`](./index.md) and [`Validation`](./validations.md)

- [Native Types](#native-types)
- [Iterable Types](#iterable-types)
    - [List](#list)
    - [Map](#map)
- [References](#references)

## Native Types

`Type.String`, `Type.Number`, `Type.Date`, `Type.ObjectID` and `Type.Mixed`

These are native JavaScript/MongoDB types.

## Iterable Types

### `List`
`Type.List(type: Type)`

Lists are ordered indexed dense collections, much like a JavaScript Array.
Type of values is enforced by `type`.

### `Set`
`Type.Set(type: Type)`

Similar to [`List`](#list), but with unique values.

### `Map`
`Type.Map(type: Type)`

Map is an unordered iterable of (key, value) pairs.
Type of values is enforced by `type`.

## References
`Type.Ref(model: String)`

Reference to another document.
