# Getting started

### Installing

Mrgo is an npm module, so to install it you do:

```
$ npm install mrgo --save
```

### Importing

Once you've install it, you'll need to import it.

```js
import { Schema, Model, Validation, Type, Connection } from 'mrgo'
```

### Create a connection to MongoDB

The first step

In addition to loading the module, you need to give Mrgo a connection to work with. Without it, Mrgo can't access the database.

The connection doesn't require to be initialized, it'll be established as soon as database operations are required.

```js
const connection = new Connection('mongodb://localhost:27017/myproject');
```

### Create a schema

A schema describe the structure of the documents. It is basically a map of field name to [`Type`](./types.md).

```js
const userSchema = new Schema({
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

### Create a new model

Once the data schema is defined, the next step is to create the model which store operations
around the database for a schema.

```js
class User extends Model(userSchema, connection, 'users') {
    static getByUsername(username) {
        return this
            .findOne({
                username: username
            })
            .exec();
    }
}
```
