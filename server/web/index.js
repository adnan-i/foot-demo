const Path = require('path');
exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, reply) => reply.view('index')
    });

    server.route({
        method: 'GET',
        path: '/dist/{param*}',
        handler: {
            directory: {
                path: Path.join(__dirname, '../../client/dist'),
                redirectToSlash: true,
                index: false
            }
        }
    });

    // Catch-all route
    server.route({
        method: '*',
        path: '/{p*}',
        handler: (req, reply) => reply.view('index')
    });


    next();
};

exports.register.attributes = {
    name: 'web',
    dependencies: ['visionary', 'inert']
};
