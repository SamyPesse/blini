# mrgo

`mrgo` (pronounced "Mister Go") is a modern ORM for **MongoDB** based on [immutable](https://facebook.github.io/immutable-js/) data structure and promises.

**Mrgo is currently in beta.** Don't use it for production applications.

### Why?

### Principles

Mrgo tries to solve the question of ["Why?"](#why) with a few principles:

1. **Immutable data:** By using Immutable.js, the Mrgo is built in a stateless fashion using immutable data structures, which leads to much easier to reason about code, and a much easier time working with data sets.

2. **Simplicity:** Mrgo tries to  reduce the number of concepts.

3. **Composition:** Instead of relying on a custom plugins logic to handle extensibility,
Mrgo with ES6 classes inheritances use compositions to extend models.

### Documentation

If you're using Mrgo for the first time, check out the [Getting Started](docs/getting-started.md) guides and the Core Concepts to familiarize yourself with Mrgo's architecture and mental models. Once you've gotten familiar with those, you'll probably want to check out the full API Reference.

- **Guides**
    - [Getting started](docs/getting-started.md)
    - [Querying](docs/querying.md)
    - [Populating references](docs/populating.md)
- **References**
    - [Connection](docs/reference/connection.md)
    - [Types](docs/reference/types.md)
    - [Validations](docs/reference/validations.md)
