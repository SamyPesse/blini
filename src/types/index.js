const { ObjectID } = require('mongodb');
const TypeNative = require('./Native');

module.exports = {
    // Native types
    String:   TypeNative(String),
    Number:   TypeNative(Number),
    Date:     TypeNative(Date),
    ObjectID: TypeNative(ObjectID),
    Mixed:    TypeNative(x => x),

    // Iterable types
    List:     require('./List'),
    Map:      require('./Map'),
    Set:      require('./Set'),
    
    // Other types
    Ref:      require('./Ref'),
};
