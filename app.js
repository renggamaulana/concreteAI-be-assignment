
const fastify = require('fastify')({ logger: true });

// const swaggerConfig = require('./src/configs/swagger');
const accountRoutes = require('./src/routes/accountRoutes');
const paymentRoutes = require('./src/routes/paymentRoutes');
require('dotenv').config();

// swaggerConfig(fastify);

// Register Routes
fastify.register(accountRoutes);
fastify.register(paymentRoutes, { prefix: '/transactions'});

// Start Server
const start = async () => {
  try {
    await fastify.listen({ port:3000 });
    fastify.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();