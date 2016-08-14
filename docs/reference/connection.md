## Connection

```js
import { Connection } from 'Blini'
```

A connection is a low-level interface between <name> and the MongoDB database.

#### `Connection(url: String)`

Create a new connection to MongoDB.

#### `connection.close(): Promise`

Close the connection to MongoDB.
