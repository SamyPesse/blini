# Discriminators

Discriminators are a schema inheritance mechanism. They enable you to have multiple models with overlapping schemas on top of the same underlying MongoDB collection.

```js
const eventSchema = new Schema({
    type: Type.String(),
    time: Type.Date()
});

class Event extends Model(eventSchema, connection, 'Event') {
    get summary() {
        return `${this.time}: event ${this.type}`;
    }
}
```


```js
const visitEventSchema = new Schema({
    url: Type.String()
});

class VisitEvent extends Event.discriminate({ type: 'visit' }, visitEventSchema) {
    get summary() {
        return `${this.time}: a click on ${this.url}`;
    }
}
```
