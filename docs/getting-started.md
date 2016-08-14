# Getting started

### Installing

Blini is an npm module, so to install it you do:

```
$ npm install Blini --save
```

### Importing

Once you've install it, you'll need to import it.

```js
import { Schema, Model, Validation, Type, Connection } from 'Blini'
```

### Create a connection to MongoDB

The first step

In addition to loading the module, you need to give Blini a connection to work with. Without it, Blini can't access the database.

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

Follow the ["Create a Schema"](create-schema.md) guide to get more insight on
how schemas work.

### Create a new document model

Once the data schema is defined, the next step is to create the model which store operations
around the database for a schema.

```js
class User extends Model(userSchema, connection, 'User') {
    static getByUsername(username) {
        return this
            .findOne({
                username: username
            })
            .exec();
    }
}
```

### Create new documents

Using the document model, we can initialize new document instances and populate the database:

```js
let user = new User({
    username: 'JohnDoe'
})

user.save()
    .then(function(savedUser) {
        ...
    })
```

### Query the collection

Querying documents from the database and update it:

```js
User.findOne({ username: 'JohnDoe' })
    .then(function(user) {
        const modified = user.merge({
            username: "John"
        })

        return modified.save()
    })
```
