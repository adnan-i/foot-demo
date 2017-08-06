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


    next();
};

exports.register.attributes = {
    name: 'web',
    dependencies: ['visionary', 'inert']
};
