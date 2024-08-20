// require('dotenv').config();
const fastify = require('fastify')({ logger: true });

// const swaggerConfig = require('./configs/swagger');
const accountRoutes = require('./src/routes/accountRoutes');
const transactionRoutes = require('./src/routes/transactionRoutes');
require('dotenv').config();

// Register Routes
fastify.register(accountRoutes);
// fastify.register(transactionRoutes);

// Running server
fastify.listen({ port: 3000 }, err => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening on http://localhost:3000`);
});
