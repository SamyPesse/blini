<img src="logo.png" width="220" />

`mrgo` (pronounced "Mister Go") is a modern ORM for **MongoDB** based on [immutable](https://facebook.github.io/immutable-js/) data structure and promises.

**Mrgo is currently in alpha.** API may changed, don't use it for production applications.

### Example

```js
import { Schema, Type, Model, Connection } from 'mrgo'
const connection = new Connection('mongodb://localhost/test')

const postSchema = new Schema({
    title: Type.String(),
    views: Type.Set(Type.String)
})

class Post extends Model(postSchema, connection, 'Cat') {
    get summary() {
        return `Post ${this.title},  ${this.likes.size} readers`
    }

    addView(ip) {
        const { views } = this;
        return this.merge({
            views: views.add(ip)
        })
    }
}

const post = new Post({ title: 'My Super blog post' })

post.addView('127.0.0.1').save()
    .then(function(savedPost) {
        console.log(savedPost.summary)
    })
```

### Why?

First of all, this library is a Work-In-Progress and Proof-Of-Concept.

Before creating Mrgo, I've used a lot [Mongoose](http://mongoosejs.com) for production applications, Mrgo borrowed a few concepts from it.

### Principles

Mrgo tries to solve the question of ["Why?"](#why) with a few principles:

1. **Immutable data:** By using Immutable.js, the Mrgo is built in a stateless fashion using immutable data structures, which leads to much easier to reason about code, and a much easier time working with data sets.

2. **Simplicity:** Mrgo tries to reduce the number of concepts.

3. **Composition:** Instead of relying on a custom plugins logic to handle extensibility,
Mrgo with ES6 classes inheritances use compositions to extend models.

### Documentation

If you're using Mrgo for the first time, check out the [Getting Started](docs/getting-started.md) guides and the Core Concepts to familiarize yourself with Mrgo's architecture and mental models. Once you've gotten familiar with those, you'll probably want to check out the full API Reference.

- **Guides**
    - [Getting started](docs/getting-started.md)
    - [Create a Schema](docs/create-schema.md)
    - [Querying](docs/querying.md)
    - [Populating references](docs/populating.md)
- **References**
    - [Connection](docs/reference/connection.md)
    - [Types](docs/reference/types.md)
    - [Validations](docs/reference/validations.md)

### Contributing!

All contributions are super welcome!

Slate is [Apache-licensed](LICENSE).
