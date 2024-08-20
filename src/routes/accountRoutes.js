const accountController = require('../controllers/accountController');
const authenticateToken = require("../utils/authenticateToken");

async function accountRoutes(fastify, options) {
    fastify.post('/register', accountController.register);
    fastify.post('/login', accountController.login);
    fastify.post('/account', { preValidation: [authenticateToken] }, accountController.createAccount)
}

module.exports = accountRoutes;