const fastifySwagger = require('fastify-swagger');

function swaggerConfig(fastify) {
fastify.register(fastifySwagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'ConcreteAI BE Assignment',
        description: 'API documentation for Transaction Services',
        version: '1.0.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: true, 
  });
}

module.exports = swaggerConfig;