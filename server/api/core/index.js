exports.register = function (server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: (req, reply) => reply({ message: 'Found me' })
    });

    function onPreResponse(request, reply) {

        const res = request.response;

        if (res.isBoom) {
            if (res.isJoi) {
                res.output.statusCode = 422;
                res.output.payload.statusCode = 422;
                res.output.payload.error = res.name;

                return reply.continue();
            }
        }

        reply.continue();
    }

    server.ext('onPreResponse', onPreResponse);

    next();
};


exports.register.attributes = {
    name: 'core'
};
