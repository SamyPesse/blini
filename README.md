# orm

Modern ORM for MongoDB based on [immutable](https://facebook.github.io/immutable-js/) data structure.

### Installation

```
$ npm install --save
```

### Usage

```js
const { Schema, Model, Validation, Type } = require('orm')
```

##### Create a schema

A schema describe the structure of the documents.

```js
const schema = new Schema({
    username: Type.String({
        validation: [
            Validation.minLength(3, 'Username should be 3 characters min'),
            Validation.maxLength(30, 'Username should be 40 characters max')
        ],
        index: {
            unique: true
        }
    }),
    books: Type.Set(
        Type.Ref('Book')
    )
})
```

##### Create a new model

```js
class User extends Model(schema) {
    static getByUsername(username) {

    }
}
```

### API

#### `Type`

###### `Type.String` and `Type.Number`

Native JavaScript types.

###### `Type.List(type: Type)`

Lists are ordered indexed dense collections, much like a JavaScript Array.

###### `Type.Set(type: Type)`

A Collection of unique values.

###### `Type.Map(type: Type)`

Map is an unordered iterable of (key, value) pairs

###### `Type.Ref(model: String)`

Reference to another document.
