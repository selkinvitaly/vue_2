module.exports = {
    server: {
        port: 3001,
        protocol: 'http',
        hostname: 'localhost'
    },
    handlers: [
        './handlers/body-parser',
        './handlers/request-id',
        './handlers/cors',
        './handlers/http-logger',
        './handlers/api/v1/users'
    ]
};
