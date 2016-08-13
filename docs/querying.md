# Querying

Mrgo uses an immutable version of [mquery](https://github.com/aheckmann/mquery) to build MongoDB queries.

Comparing to Mongoose, Mrgo queries doesn't have a `.then` and promise interface,
you have to explicitly call '.exec()'.

### Execute the query
`Query.exec(): Promise<List>`

`.exec` returns a promise resolving with a list of all documents

```js
Post.where('clicks').gt(999).exec()
    .then(function(list) {

    });
```

### Stream documents
`Query.fetch(): Promise`

`.exec` returns a list of all documents by accumulating results from MongoDB.

```js
Post.where('clicks').gt(999).exec()
    .then(function(list) {
        // No more results
    }, function(err) {
        // Error
    }, function(post) {
        // Receive a document
    });
```

### Query one document
`Query.findOne(): Query`

```js
Post.findOne({ _id: '...' }).exec()
    .then(function(post) {

    });``
```
