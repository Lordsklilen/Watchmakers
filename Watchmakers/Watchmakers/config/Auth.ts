const jwt = require('express-jwt');
const getTokenFromSession = (req) => {
    var authorization = req.session.Authorization;
    if (authorization) {
        return authorization;
    }
    return null;
};
const auth = {
    required: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromSession
    }),
    optional: jwt({
        secret: 'secret',
        userProperty: 'payload',
        getToken: getTokenFromSession,
        credentialsRequired: false,
    })
};

module.exports = auth;