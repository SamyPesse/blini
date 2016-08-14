# Create a Schema

A Schema defines the shape of the documents within a collection.

### Native types

Native types like `String`, `Number` and `ObjectID`.

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
