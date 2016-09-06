# Create a Schema

A Schema defines the shape of the documents within a collection. It is basically a map of field name to [`Type`](./types.md).

It contains specs for transforming and validating each fields.

### Create

Setup your schema for your collection by creating a new instance of `Blini.Schema`.

`Schema` takes only one argument a map of `field: String` to `type: Type`.

```js
const { Schema, Type } = require('blini');

const userSchema = new Schema({
    username: Type.String({
        validation: [
            Validation.required(),
            Validation.minLength(3),
            Validation.maxLength(30)
        ],
        index: {
            unique: true
        }
    }),
    books: Type.Set(Type.Ref('Book'), {
        validations: [
            Validation.default([]),
        ]
    })
});
```

### Native types

Native types like `String`, `Number` and `ObjectID`.

### Validation

All types (natives and iterables) are taking as last argument a spec of options.

The `validation` option lets you specify an array of validations functions to use.

See [Validations](./reference/validations.md) for more details about the helper validation methods (note that a validation can be any function taking a `value` and retuning the transformed value or throwing an error).


### Iterable

Blini doesn't have a type for mixed/object or array, instead it's using immutable data structure:
`Type.List`, `Type.Set` and `Type.Map`.

Each of these types take a `Type` as first argument, it will be used to normalize and validate
inner data.

```js
const postSchema = new Schema({
    title: Type.String(),
    body:  Type.String(),
    tags:  Type.Set(Type.String())
});
```

### Sub-documents

Since `Schema` inherits from `Type`, you can add schema for shaping sub-documents.

```js
const commentSchema = new Schema({
    author: Type.Ref('Author'),
    body:   Type.String()
});

const postSchema = new Schema({
    title:    Type.String(),
    body:     Type.String(),
    author:   Type.Ref('Author'),
    comments: Type.List(commentSchema)
});
```

### References
