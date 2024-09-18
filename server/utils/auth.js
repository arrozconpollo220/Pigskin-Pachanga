const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = 'doublesecretprobation';
const expiration = '2h';

module.exports = {
    authenticationError: new GraphQLError('Could not authenticate user.', {
        extensions: {
            code: 'UNAUTHENTICATED',
        }
    }),
    signToken: function ({ email, name, _id }) {
        const payload = { email, name, _id };
        return jwt.sign({ data: payload }, secret,  { expiresIn: expiration });
    },
};