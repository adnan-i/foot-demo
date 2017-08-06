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

    server.ext('onPostHandler', (req, reply) => {

        try {
            const res = req.response;
            const isNotFound = res.output && res.output.statusCode === 404;
            const isGet = req.method === 'get';
            const isDistOrApi = ((req.path.indexOf('/api') === 0) || (req.path.indexOf('/dist') === 0));
            if (res.isBoom && isGet && !isDistOrApi && isNotFound) {
                return reply.view('index');
            }
            return reply.continue();
        } catch (e) {
            console.log(e);
            return reply.continue();
        }

    });


    next();
};

exports.register.attributes = {
    name: 'web',
    dependencies: ['visionary', 'inert']
};
