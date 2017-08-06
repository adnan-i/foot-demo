const Composer = require('./index');
Composer((err, server) => {

    if (err) {
        throw err;
    }

    server.ext('onPreResponse', (request, reply) => {

        if (request.response.isBoom) {
            const err = request.response;
            const errName = err.output.payload.error;
            const statusCode = err.output.payload.statusCode;

            return reply({
                statusCode: statusCode,
                errName: errName
            })
            .code(statusCode);
        }

        reply.continue();
    });

    server.start((error) => {

        if (error) {
            throw error;
        }

        console.log(`Started server on port ${server.info.port}`);
    });
});
