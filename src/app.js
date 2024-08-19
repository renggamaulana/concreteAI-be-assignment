const fastify = require('fastify')({ logger: true });
const authRoutes = require('./routes/authRoutes');

// fastify.register(require('fastify-formbody'));
fastify.register(authRoutes, { prefix: '/auth' });

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        fastify.log.info(`Server running at http://localhost:3000`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
