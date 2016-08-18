const TypeNative = require('./Native');

module.exports = {
    // Native types
    String:   TypeNative(String),
    Number:   TypeNative(Number),
    Date:     TypeNative(Date),

    // Iterable types
    List:     require('./List'),
    Map:      require('./Map'),
    Set:      require('./Set'),

    // Other types
    ObjectID: require('./ObjectID'),
    Ref:      require('./Ref'),
    Mixed:    require('./Mixed')
};
