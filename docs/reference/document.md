# Document

Document instance are created from a model.

- [Methods](#methods)
    - [`isClean`](#isclean)
    - [`set`](#set)
    - [`merge`](#merge)
    - [`save`](#save)
    - [`remove`](#remove)
    - [`validate`](#validate)
    - [`populate`](#populate)
- [Static Methods](#static-methods)
    - [`find`](#find)
    - [`count`](#count)
    - [`discriminate`](#discriminate)

## Methods

### `isClean`
`isClean() => Boolean`

Returns `true` is the document has been modified since being fetched from the database.

If the document is new, `isClean` will return `false`.

### `isSaved`
`isSaved() => Boolean`

Return `true` is the document is already saved in the database.

### `set`
`set(property: String, value: Mixed) => Document`

Returns a new Document also containing the updated key, value pair.

### `merge`
`merge(properties: Object|Map) => Document`

Returns a new Document resulting from merging the provided Iterables (or JS objects) into this Document. In other words, this takes each entry of each iterable and sets it on this Document.

### `save`
`save() => Promise<Document>`

Saves this document. it commits the document to the MongoDB collection.

### `remove`
`remove() => Promise`

Removes this document from the database.

### `validate`
`validate() => Promise<Document>`

Validate the document values, it returns the new document with validated values or a rejected promise.

### `populate`
`populate(fields: String|Map<String, Options>|List<String>) => Promise<Document>`

Populates document references.

## Static Methods

### `find`
`find(conditions: Object) => Query`

Finds matching documents in a database collection.

### `count`
`count(conditions: Object) => Query`

Counts number of matching documents in a database collection.

### `discriminate`
`discriminate(conditions: Object) => Model`

Create a new document model by discriminating the current one.
