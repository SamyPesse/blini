# Differences with Mongoose

This guide showcases the main differences between Mongoose and Blini, and how to adapt your code to switch to Blini.

### Promises-only, no more callback

While Mongoose supports both callback and promises. Blini does not support callback, but only promises.

### Documents are immutable

Documents in Mongoose were mutable, you can work with the same document instance:

```js
/* Mongoose */

let user = new User();

user.username = '...';
user.name = '...';

user.save(function(err) {
    user.doSomething();
});
```

While in Blini, Documents should be treated as *values* rather than *objects*:

```js
/* Blini */

let user = new User();

let modifiedUser = user.merge({
    username: '...',
    name: '...'
});

modifiedUser.save()
.then(function(savedUser) {
    savedUser.doSomething();
});
```

### Queries are not promises

Mongoose has a very special API for Query that can be used as promises using `.then`.

```js
/* Mongoose */

User.find().then(function(docs) {
    ...
});
```

Blini requires an explicit call to `.exec()` to execute the query and gain access to the promise.

```js
/* Blini */

User.find().exec().then(function(docs) {
    ...
});
```

### No hooks

Blini does not provide an hooks API. Extending the library behavior can be done while inheriting a model.

For example to hook the save, in mongoose you can use `.pre` and `.post`.

But the `.post` **cannot be executed in the async chain**, which can cause issues since documents are mutable.

```js
/* Mongoose */

userSchema.pre('save', function (next) {
    if (!this.created) this.created = new Date;
    next();
});

userSchema.pre('post', function() {
    pushUserToAnalytics(this);
});
```

In Bline, while this example should be adapted using a proper validations, you can compose `.save`:

```js
/* Blini */

class User extends Model(userSchema, connection, 'User') {
    save() {
        let user = this;

        if (!user.created) {
            user = user.set('created', new Date);
        }

        return super.save.call(user)
        .then(function(newUser) {
            return pushUserToAnalytics(newUser)
                .thenResolve(newUser);
        });
    }
}
```
