exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, reply) => reply({ message: 'Found me' })
    });

    next();
};


exports.register.attributes = {
    name: 'core'
};
