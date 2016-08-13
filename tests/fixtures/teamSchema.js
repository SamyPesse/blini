const { Schema, Type, Validation } = require('../../src');

const memberSchema = Schema({
    user: Type.Ref('User'),
    role: Type.String({
        validations: [
            Validation.oneOf(['admin', 'member'])
        ]
    })
});

const teamSchema = Schema({
    name:     Type.String(),
    members:  Type.List(memberSchema)
});

module.exports = teamSchema;
