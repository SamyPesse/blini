# orm

Modern ORM for MongoDB based on [immutable](https://facebook.github.io/immutable-js/) data structure and promises.

### Installation

```
$ npm install --save
```

### Usage

```js
const { Schema, Model, Validation, Type, Connection } = require('orm')
```

##### Create a connection to MongoDB

```js
const connection = new Connection('mongodb://localhost:27017/myproject');
```

##### Create a schema

A schema describe the structure of the documents.

```js
const schema = new Schema({
    username: Type.String({
        validation: [
            Validation.required(),
            Validation.minLength(3, 'Username should be 3 characters min'),
            Validation.maxLength(30, 'Username should be 40 characters max')
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

#### `Connection(url: String)`

Create a new connection to MongoDB.

###### `connection.close(): Promise`

Close the connection to MongoDB.

#### `Type`

###### `Type.String`, `Type.Number`, `Type.ObjectID` and `Type.Mixed`

Native JavaScript types.

###### `Type.List(type: Type)`

Lists are ordered indexed dense collections, much like a JavaScript Array.

###### `Type.Set(type: Type)`

A Collection of unique values.

###### `Type.Map(type: Type)`

Map is an unordered iterable of (key, value) pairs

###### `Type.Ref(model: String)`

Reference to another document.

#### `Validation`

###### `Validation.required(message: String)`

A validation to enforce that a field is defined.

###### `Validation.default(value: Mixed)`

A validation to default the value if non existant.
