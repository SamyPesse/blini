# Changes

```js
import { Change } from 'Blini'
```

When saving Blini diffs the current document with the loaded version to only update required fields.

[`a.compareWith(b)`](./document.md#comparewith) can be use to compare a document version with another one,
it returns a list of changes to transform `a` in to `b`.

### Properties

```js
Change {
    type:  String,
    path:  String,
    value: Mixed
}
```

`type` may be `Change.TYPES.SET` or `Change.TYPES.UNSET`.

### `toMongo`
`toMongo(changes: List<Change>): Object`

Convert a list of changes into a [MongoDB update](https://docs.mongodb.com/manual/reference/method/db.collection.update/)'s body.
