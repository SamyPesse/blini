# Populating references

There are no joins in MongoDB but sometimes we still want references to documents in other collections. This is where population comes in.

Population is the process of automatically replacing the specified paths in the document with document(s) from other collection(s). We may populate a single document, multiple document.

### Using references in a schema

The [`Type.Ref`](./reference/types.md#references) allows you to insert populatable references
in your documents.

For example, consider a blog, where posts are stored in a collection, and comments for these posts are stored
in another one; each comment should reference the parent post.

```js
const commentSchema = new Schema({
    post: Type.Ref('Post', {
        validations: [
            Validation.required()
        ]
    }),
    author: Type.Ref('Author', {
        validations: [
            Validation.required()
        ]
    })
});

class Comment extends Model(commentSchema, connection, 'Comment') {

}
```

### Populating fields when querying

When fetching all comments posted by an author, we want to display the related blog articles:

```js
Comment
    .find({
        author: currentUser
    })
    .populate('post')
    .skip(0).limit(100)
    .exec()
    .then(function(comments) {

    });
```

### Populate field of an existing document

If the document has already been queried, we can populate a field:

```js
comment.populate('post')
    .then(function(newComment) {
        // newComment.post is a Post instance
    });
```

### Populating sub-documents
