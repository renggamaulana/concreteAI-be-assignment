const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {
    fastify.post('/register', authController.registerHandler);
    fastify.post('/login', authController.loginHandler);
}

module.exports = authRoutes;
